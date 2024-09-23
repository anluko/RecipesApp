import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function FullInfo({ route }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [currentRecipeIngredients, setCurrentRecipeIngredients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ingredientsResponse = await axios.get(
        "http://192.168.1.7:8080/ingredients"
      );
      const recipeIngredientsResponse = await axios.get(
        "http://192.168.1.7:8080/linked/recipeIngredients"
      );

      if (ingredientsResponse.status === 201) {
        setIngredients(ingredientsResponse.data);
      }
      if (recipeIngredientsResponse.status === 201) {
        setRecipeIngredients(recipeIngredientsResponse.data);
      }

      const recipeIngredientsIds = recipeIngredientsResponse.data
        .filter((ri) => ri.RecipeId === route.params.Id)
        .map((ri) => ri.IngredientId);
      const filterIngredients = ingredientsResponse.data.filter((ingredient) =>
        recipeIngredientsIds.includes(ingredient.Id)
      );

      setCurrentRecipeIngredients(filterIngredients);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.header}>{route.params.Label}</Text>
          <Image style={styles.image} source={{ uri: route.params.ImageUrl }} />

          <Text style={styles.informationText}>Информация</Text>
          <View style={styles.recipeInfoView}>
            <View style={styles.recipeCaloriesView}>
              <Text style={styles.recipeInfoText}>Ценность</Text>
              <Text style={styles.recipeInfoValue}>
                {route.params.Calories.substring(0, 4)} кКал
              </Text>
            </View>
            <View style={styles.recipeTotalTimeView}>
              <Text style={styles.recipeInfoText}>Время</Text>
              <Text style={styles.recipeInfoValue}>
                {route.params.TotalTime} мин
              </Text>
            </View>
            <View style={styles.recipeTotalWeightView}>
              <Text style={styles.recipeInfoText}>Вес</Text>
              <Text style={styles.recipeInfoValue}>
                {route.params.TotalWeight.substring(0, 4)} г
              </Text>
            </View>
            <View style={styles.recipeTotalCO2View}>
              <Text style={styles.recipeInfoText}>CO2</Text>
              <Text style={styles.recipeInfoValue}>
                {route.params.TotalCO2Emissions.substring(0, 5)} мг
              </Text>
            </View>
          </View>

          <Text style={styles.informationText}>Источник</Text>
          <Text
            style={styles.recipeSourceText}
            onPress={() => Linking.openURL(route.params.SourceUrl)}
          >
            {route.params.Source}
          </Text>

          <Text style={styles.informationText}>Игредиенты</Text>
          {currentRecipeIngredients.length > 0 ? (
            currentRecipeIngredients.map((ingredient, index) => (
              <Text key={index} style={styles.recipeIngredientsInfo}>
                • {ingredient.Text}
              </Text>
            ))
          ) : (
            <Text style={styles.recipeIngredientsInfo}>Нет диет</Text>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 50 : 15,
  },
  header: {
    fontSize: 22,
    padding: 15,
    paddingLeft: 10,
    marginLeft: 15,
    textAlign: "left",
    fontFamily: "mw-bold",
  },
  image: {
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15,
    height: 200,
  },
  informationText: {
    fontFamily: "mw-italic",
    textAlign: "left",
    fontWeight: "600",
    fontSize: 18,
    paddingLeft: 15,
    marginVertical: 15,
    marginLeft: 15,
    paddingBottom: 0,
  },
  recipeInfoView: {
    flexDirection: "row",
    marginVertical: 5,
    paddingLeft: 15,
    paddingRight: 10,
    marginLeft: 5,
    paddingBottom: 0,
  },
  recipeCaloriesView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b1fac5",
    width: "30%",
    padding: 10,
    borderRadius: 15,
  },
  recipeInfoText: {
    fontFamily: "mw-regular",
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 14,
  },
  recipeInfoValue: {
    fontFamily: "mw-light",
    fontSize: 12,
  },
  recipeTotalTimeView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d83fc",
    width: "23%",
    padding: 10,
    marginLeft: 7,
    borderRadius: 15,
  },
  recipeTotalWeightView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eefa66",
    width: "19%",
    padding: 10,
    marginLeft: 7,
    borderRadius: 15,
  },
  recipeTotalCO2View: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d14551",
    width: "22%",
    padding: 10,
    marginLeft: 7,
    borderRadius: 15,
  },
  recipeSourceText: {
    fontFamily: "mw-regular",
    color: "blue",
    paddingLeft: 15,
    marginVertical: 5,
    fontSize: 16,
    marginLeft: 5,
  },
  recipeIngredientsInfo: {
    fontFamily: "mw-regular",
    paddingLeft: 15,
    paddingTop: 5,
    marginVertical: 5,
    fontSize: 16,
    marginLeft: 5,
  },
});
