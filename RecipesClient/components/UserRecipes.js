import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  FlatList,
} from "react-native";
import axios from "axios";
import RecipeListItem from "./RecipeListItem";

export default function UserRecipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeDiets, setRecipeDiets] = useState([]);
  const [userDiets, setUserDiets] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { currentUser } = useSelector((state) => state.setter);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (recipes.length && recipeDiets.length && userDiets.length) {
      filterRecipes();
    }
  }, [recipes, recipeDiets, userDiets]);

  const fetchData = async () => {
    try {
      const recipesResponse = await axios.get(
        "http://192.168.1.7:8080/recipes"
      );
      const recipeDietResponse = await axios.get(
        "http://192.168.1.7:8080/linked/recipeDiets"
      );
      const userDietsResponse = await axios.get(
        "http://192.168.1.7:8080/linked/userDiets"
      );

      if (recipesResponse.status === 201) {
        setRecipes(recipesResponse.data);
      }

      if (recipeDietResponse.status === 201) {
        setRecipeDiets(recipeDietResponse.data);
      }

      if (userDietsResponse.status === 201) {
        setUserDiets(userDietsResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterRecipes = () => {
    const filtered = recipes.filter((recipe) => {
      const recipeDietIds = recipeDiets
        .filter((rd) => rd.RecipeId === recipe.Id)
        .map((rd) => rd.DietLabelId);

      return userDiets
        .filter((ud) => ud.UserId === currentUser.Id)
        .some((ud) => recipeDietIds.includes(ud.DietLabelId));
    });

    setFilteredRecipes(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Ваши рецепты</Text>
      <View style={styles.listView}>
        <FlatList
          data={filteredRecipes}
          renderItem={({ item }) => (
            <RecipeListItem listItem={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.Id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: Platform.OS === "android" ? 50 : 15,
    fontFamily: "mw-bold",
    fontSize: 22,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  listView: {
    padding: 10,
    justifyContent: "center",
    marginBottom: 40,
  },
});
