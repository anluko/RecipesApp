import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Notification from '../notifications/notifications';
import * as SecureStore from 'expo-secure-store'
import axios from 'axios';

export default function Main({ navigation, route }) {
  const [fadeSuccessAnim] = useState(new Animated.Value(0));
  const [fadeAcceptedAnim] = useState(new Animated.Value(0));
  const [check1, setCheck1] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { userId } = route.params || {};
  const [dietData, setDietData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  
  useEffect(() => {
    showNotification(fadeSuccessAnim);
    checkFirstVisit();

    axios.get('http://192.168.1.7:8080/dietLabels')
      .then((response) => {
        if (response.status === 201) {
          let dietsArray = response.data.map((item) => {
            return { key: item.Id, value: item.Label }
          });

          setDietData(dietsArray);
        }
      })
      .catch((error) => console.error(error)); 
  }, []);

  const checkFirstVisit = async () => {
    try {
      const value = await SecureStore.getItemAsync(`hasVisitedMain_${userId}`);
      if (value === null) {
        setIsFirstVisit(true);
      } else {
        setIsFirstVisit(false);
      }
    } catch (error) {
      console.error("Ошибка при доступе к SecureStore: ", error);
    }
  };
  
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

  const handleCheckBoxChange = (key) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const submitCheckBoxApply = async () => {
    const currentlySelectedItems = dietData.filter(diet => checkedItems[diet.key]);
    setSelectedItems(currentlySelectedItems);

    if (!currentlySelectedItems) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите вид вашей диеты.');
      return;
    }

    for (const selectedDiet of currentlySelectedItems) {
      try {
        const result = await axios.post('http://192.168.1.7:8080/user-Diets', {
          UserId: userId,
          DietLabelId: selectedDiet.key 
        })
  
        if (result.status === 201) {
          showNotification(fadeAcceptedAnim);
          await SecureStore.setItemAsync(`hasVisitedMain_${userId}`, 'true');
          setTimeout(() => {  
            setIsFirstVisit(false);
          }, 1500);   
        }
      } catch (error) { console.error(error); }
    }
  };

  return ( 
    <View style = { styles.container }>

      {isFirstVisit && <View  style = { styles.firstVisitView }>
        <Text style = { styles.textHeader } >
          Выберите тип диеты, которую вы хотите придерживаться
        </Text>
        <Text style = { styles.textDescription } >
          Это повлияет на вид питания, который сформируется для вас 
        </Text>
        {dietData.map((diet) => (
          <CheckBox
            key = { diet.key }
            containerStyle = { styles.checkBox }
            backgroundColor = '#cacce8'
            title = { diet.value }
            textStyle = {{ fontSize: 16, fontFamily: 'mw-light' }}
            checked = { checkedItems[diet.key] || false}
            size = { 28 }
            onPress = {() => handleCheckBoxChange(diet.key)}
          />
        ))}
        <TouchableOpacity style = { styles.submitBtn } onPress = { () => { submitCheckBoxApply() }}>
          <Text style = { styles.submitText }>Принять</Text> 
        </TouchableOpacity>
      </View>}
      
      <Notification type = "success" message = "Добро пожаловать!"  fadeAnim = { fadeSuccessAnim } />
      <Notification type = "success" message = "Успешно выполнено!"  fadeAnim = { fadeAcceptedAnim } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstVisitView: {
    borderRadius: 20,
    marginHorizontal: 30,
    backgroundColor: '#cacce8',
  },
  textHeader: {
    fontSize: 18,
    padding: 15,
    paddingBottom: 5,
    fontFamily: 'mw-bold',
    textAlign: 'center'
  },
  textDescription: {
    fontSize: 14,
    padding: 0,
    fontFamily: 'mw-regular',
    textAlign: 'center',
  },
  checkBox: {
    backgroundColor: '#cacce8',
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#5258f2',
    marginHorizontal: 15,
    marginVertical: 15
  },
  submitText: {
    fontSize: 18,
    color: 'white',
    padding: 10
  }
});
