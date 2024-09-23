import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { userFind } from "../api/apiUser";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../store/userReducer";
import * as SecureStore from "expo-secure-store";

export default function App({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetToken();
  });

  useEffect(() => {
    if (userId) {
      loadUser(userId);
    }
  }, [userId]);

  const handleGetToken = async () => {
    try {
      const dataToken = await SecureStore.getItemAsync("AccessToken");
      setIsLoading(false);

      if (dataToken) {
        setUserId(jwtDecode(dataToken).userId);
        navigation.navigate("Main");
      }
    } catch (error) {
      setIsLoading(false);
      console.warn("Ошибка получения токена: ", error);
    }
  };

  const loadUser = async (id) => {
    userFind(id)
      .then((result) => {
        if (!result.status === 200) {
          console.warn("Не удалось загрузить пользователя");
        }

        dispatch(setUser(result.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.background}
      >
        <BlurView intensity={40} style={styles.overlay}>
          <Text style={styles.title}>Добро пожаловать в Nutri!</Text>
          <Text style={styles.description}>
            Достигайте своих целей с помощью персонализированных рецептов.
          </Text>
          <Pressable
            style={styles.startBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.startText}>ПРИСТУПИТЬ</Text>
          </Pressable>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 32,
    fontFamily: "mw-bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  description: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "mw-light",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 40,
  },
  startBtn: {
    width: "90%",
    backgroundColor: "#5258f2",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 150,
  },
  startText: {
    fontSize: 18,
    color: "white",
    fontFamily: "mw-regular",
    textAlign: "center",
    padding: 20,
  },
});
