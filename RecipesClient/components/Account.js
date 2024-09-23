import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";

export default function Account({ navigation }) {
  const [imageVisibility, setImageVisibility] = useState(false);
  const [iconVisibility, setIconVisibility] = useState(true);
  const { currentUser } = useSelector((state) => state.setter);
  const [userName, setUserName] = useState("");
  const [userDiets, setUserDiets] = useState([]);
  const [diets, setDiets] = useState([]);
  const [userCurrentDiets, setUserCurrentDiets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.Login);
      if (!currentUser.ImageUrl) {
        setIconVisibility(true);
      } else {
        setImageVisibility(true);
        setIconVisibility(false);
      }
    }
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const userDietsResponse = await axios.get(
        "http://192.168.1.7:8080/linked/userDiets"
      );
      const dietsResponse = await axios.get(
        "http://192.168.1.7:8080/linked/dietLabels"
      );

      if (userDietsResponse.status === 201) {
        setUserDiets(userDietsResponse.data);
      }

      if (dietsResponse.status === 201) {
        setDiets(dietsResponse.data);
      }

      const userDietIds = userDietsResponse.data
        .filter((userDiet) => userDiet.UserId === currentUser.Id)
        .map((userDiet) => userDiet.DietLabelId);

      const filterDiets = dietsResponse.data.filter((diet) =>
        userDietIds.includes(diet.Id)
      );
      setUserCurrentDiets(filterDiets);
    } catch (error) {
      console.error(error);
    }
  };

  const userLogout = async () => {
    SecureStore.setItemAsync("AccessToken", "")
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Ошибка при очищении токена: ", error);
      });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        {iconVisibility && (
          <FontAwesome6 style={styles.userIcon} name="user-circle" size={140} />
        )}
        {imageVisibility && (
          <Image
            style={styles.userImage}
            source={{ uri: currentUser ? currentUser.ImageUrl : null }}
          />
        )}
        <Text style={styles.text}>{userName ? userName : "Username"} </Text>
      </View>

      <View style={styles.userInfoView}>
        <Text style={styles.userInfoLabel}>Пол</Text>
        <Text style={styles.userInfoText}>
          {currentUser ? currentUser.Gender : "none"}
        </Text>
      </View>

      <View style={styles.userInfoView}>
        <Text style={styles.userInfoLabel}>Вес</Text>
        <Text style={styles.userInfoText}>
          {currentUser ? currentUser.Weight : "none"}
        </Text>
      </View>

      <View style={styles.userInfoView}>
        <Text style={styles.userInfoLabel}>Рост</Text>
        <Text style={styles.userInfoText}>
          {currentUser ? currentUser.Growth : "none"}
        </Text>
      </View>

      <View style={styles.userInfoView}>
        <Text style={styles.userInfoLabel}>Диеты</Text>
        <View style={styles.dietList}>
          {userCurrentDiets.length > 0 ? (
            userCurrentDiets.map((diet, index) => (
              <Text key={index} style={styles.userDietText}>
                {diet.Label}
              </Text>
            ))
          ) : (
            <Text style={styles.userInfoText}>Нет диет</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.exitBtn} onPress={() => userLogout()}>
        <Text style={styles.exitText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    width: "*",
    height: "*",
    backgroundColor: "#cacce8",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  userImage: {
    marginTop: Platform.OS === "android" ? 50 : 25,
    padding: 20,
    marginVertical: 10,
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  userIcon: {
    marginTop: Platform.OS === "android" ? 50 : 25,
    padding: 20,
    marginVertical: 10,
    width: 180,
    height: 180,
    color: "black",
  },
  text: {
    fontFamily: "mw-bold",
    fontSize: 20,
    marginBottom: 10,
  },
  userInfoView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
  userInfoLabel: {
    fontFamily: "mw-regular",
    marginHorizontal: 10,
    fontWeight: "600",
    fontSize: 16,
    padding: 10,
  },
  userInfoText: {
    fontFamily: "mw-light",
    fontWeight: "10",
    marginHorizontal: 10,
    fontSize: 16,
    padding: 10,
  },
  userDietText: {
    fontFamily: "mw-light",
    fontWeight: "10",
    textAlign: "right",
    fontSize: 14,
    padding: 5,
    marginRight: 10,
  },
  dietList: {
    flexDirection: "column",
  },
  exitBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "93%",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#5258f2",
    position: "absolute",
    marginHorizontal: 15,
    bottom: 20,
  },
  exitText: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
});
