import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Platform, FlatList, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import axios from 'axios';
import RecipeListItem from './RecipeListItem';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [cuisineSelected, setCuisineSelected] = useState([]);
  const [dishSelected, setDishSelected] = useState([]);
  const [mealSelected, setMealSelected] = useState([]);
  const [cuisineData, setCuisineData] = useState([]);
  const [dishData, setDishData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [listVisibility, setListVisibility] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.7:8080/cuisineTypes')
      .then((response) => {
        let cuisineArray = response.data.map((item) => {
          return { key: item.Id, value: item.Name }
        });

        setCuisineData(cuisineArray);
      })
      .catch((error) => { console.error(error); })

    axios.get('http://192.168.1.7:8080/dishTypes')
      .then((response) => {
        let dishArray = response.data.map((item) => {
          return { key: item.Id, value: item.Name }
        });

        setDishData(dishArray);
      })
      .catch((error) => { console.error(error); })

    axios.get('http://192.168.1.7:8080/mealTypes')
      .then((response) => {
        let mealArray = response.data.map((item) => {
          return { key: item.Id, value: item.Name }
        });

        setMealData(mealArray);
      })
      .catch((error) => { console.error(error); })

    axios.get('http://192.168.1.7:8080/getRecipes')
      .then((response) => {
        if (response.status === 201) {
          setAllRecipes(response.data);
          setFilteredRecipes(response.data);
        }
      })
      .catch((error) => { console.error(error); })
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setListVisibility(false);
    }
    else {
      setListVisibility(true);
      filterRecipes();
    }  
  }, [searchText]);

  const filterRecipes = () => {
    const filtered = allRecipes.filter(recipe => 
      recipe.Label.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return ( 
    <TouchableWithoutFeedback onPress = { Keyboard.dismiss } >
      <View style = { styles.container }>
        <View style = { styles.elementsContainer }>
          <View style = { styles.searchAndFilterView }>
            <View style = { styles.searchView }> 
              <TextInput 
                style = { styles.searchInput } 
                placeholder = 'Введите рецепт..' 
                value = {searchText}
                onChangeText = { (text) => setSearchText(text) }
                onSubmitEditing = {Keyboard.dismiss}
                placeholderTextColor = { 'grey' }/>
              <AntDesign style = { styles.closeIcon } name = "close" size = { 24 } onPress = { () => setSearchText('') } />
            </View>

            <FontAwesome6 style = { styles.filterIcon } name = "list" size = { 24 } onPress = { () => { setFilterVisibility( (prev) => !prev ); console.log(cuisineSelected);  } } />
          </View>

          {filterVisibility && <View style = { styles.filterElementsView } >
            <MultipleSelectList 
              setSelected = { setCuisineSelected } 
              data = { cuisineData } 
              save = "value"
              placeholder = 'Выберите кухню'
              placeholderTextColor = 'grey'
              fontSize = '18'
              width = '100%'
              fontFamily = 'mw-light'
              searchPlaceholder = 'Поиск..'
              badgeTextStyles = { fontSize = 20 }
              labelStyles = { styles.multiSelectLabel }
              defaultOption = {cuisineSelected.map(option => ({ key: option.key, value: option.value }))}
              label = "Тип кухни"
            />
            <MultipleSelectList 
              setSelected = { setDishSelected } 
              data = { dishData } 
              save = "value"
              placeholder = 'Выберите вид блюда'
              placeholderTextColor = 'grey'
              fontSize = '18'
              fontFamily = 'mw-light'
              searchPlaceholder = 'Поиск..'
              labelStyles = { styles.multiSelectLabel }
              label = "Тип блюда"
            />
            <MultipleSelectList 
              setSelected = { setMealSelected } 
              data = { mealData } 
              save = "value"
              placeholder = 'Выберите вид питания'
              placeholderTextColor = 'grey'
              fontSize = '18'
              fontFamily = 'mw-light'
              searchPlaceholder = 'Поиск..'
              labelStyles = { styles.multiSelectLabel }
              label = "Тип питания"
            />
          </View>}  
        </View>

        {listVisibility && <View style = { styles.listView }>
          <FlatList data = { filteredRecipes } renderItem = { ({ item }) => (
            <RecipeListItem listItem = { item } navigation = { navigation }/>
          )} 
          keyExtractor={(item) => item.Id.toString()}/>
        </View>}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  elementsContainer: {
    backgroundColor: '#cacce8',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: '*',
  },
  listView: {
    padding: 10,
    justifyContent: 'center',
    marginBottom: 40,
  },
  searchAndFilterView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchView: {
    marginTop: Platform.OS === 'android' ? 60 : 35,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    fontFamily: 'mw-regular',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchInput: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
    justifyContent: 'center'
  },
  closeIcon: {
    justifyContent: 'center',
    color: 'black',
    padding: 10
  },
  filterIcon: {
    marginTop: Platform.OS === 'android' ? 45 : 20,
    marginLeft: 10,
    color: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10
  },
  filterElementsView: {
    marginHorizontal: 13,
    marginBottom: 10,
  },
  multiSelectLabel: {
    fontSize: 18,
    fontFamily: 'mw-bold'
  },
});
