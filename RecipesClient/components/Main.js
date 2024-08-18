import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import Notification from '../notifications/notifications';
import { userFind } from '../api/apiUser';
import axios from 'axios';

export default function App({ navigation, route }) {
  const { userId } = route.params?.userId;
  const [user, setUser] = useState(null);
  const [fadeSuccessAnim] = useState(new Animated.Value(0));
  
  const APP_ID = 'ef28fcb1'; // Ваш App ID
  const APP_KEY = 'a07ff94d5a7660948270b1c32b362092'; // Ваш App Key
  
  const getRecipes = async (query) => {
    const url = 'https://api.edamam.com/api/recipes/v2';

    const params = {
      type: 'public',
      q: query,
      app_id: APP_ID,
      app_key: APP_KEY
    };
  
    try {
      const response = await axios.get(url, { params });
      return response.data.hits; // Возвращает список рецептов
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const translateText = async (text) => {
    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'x-rapidapi-key': 'bc96d48fccmsh03420a0ddc3cf42p1baa8ajsn5df557d0f3fb', 
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        q: text,
        target: 'ru',
        source: 'en'
      }
    };
  
    try {
      const response = await axios.request(options);
      if (response.data && response.data.data && response.data.data.translations) {
        return response.data.data.translations.translatedText;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return null; // Вернем null, если структура ответа не соответствует ожидаемой
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
      return null;
    }
  }

  useEffect(() => {
    if (userId) {
      userFind(userId)
        .then((result) => {
          if (result.status === 200) {
            setUser(result.data);
          } 
          else {
            console.log('Ошибка при получении данных пользователя');
          }
        })
        .catch((error) => {
          console.error('Ошибка запроса: ', error);
        });

      showNotification(fadeSuccessAnim);
    }
  }, [userId]);

  const translateAndSaveRecipes  = async (query) => {
    const recipes = await getRecipes(query);

    if (!recipes) return;

    for (let recipe of recipes) {
      const originalTitle = recipe.recipe.label;
      const originalIngredients = recipe.recipe.ingredientLines;
  
      const translatedTitle = await translateText(originalTitle);
      if (!translatedTitle) {
        console.warn('Title translation failed, skipping recipe');
        continue;
      }
  
      const translatedIngredientsPromises = originalIngredients.map(ingredient => translateText(ingredient));
      const translatedIngredients = await Promise.all(translatedIngredientsPromises);
  
      // Проверка на успешный перевод всех ингредиентов
      if (translatedIngredients.includes(null)) {
        console.warn('Some ingredients translation failed, skipping recipe');
        continue;
      }
  
      // Сохранение переведенных данных в базу данных (здесь это просто вывод на консоль)
      console.log('Translated Recipe:', {
        title: translatedTitle,
        ingredients: translatedIngredients
      });

    }
  }

  const showNotification = (fadeAnim) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  return ( 
    <View style = { styles.container }>
      <Text>{"Добро пожаловать!"}</Text>
      <Button title='Test api' onPress = {() => translateAndSaveRecipes('chicken')}/>
      <Notification type = "success" message = "Добро пожаловать!"  fadeAnim = { fadeSuccessAnim } />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
