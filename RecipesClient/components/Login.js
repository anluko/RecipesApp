import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { userLogin } from "../api/apiUser";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";
import { userFind } from "../api/apiUser";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Notification from "../notifications/notifications";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [fadeSuccessAnim] = useState(new Animated.Value(0));
  const [fadeErrorAnim] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  const loginUser = async () => {
    try {
      if (inputLogin == "" || inputPassword == "") {
        showNotification(fadeErrorAnim);
        alert("Пожалуйста заполните все данные");
        return;
      }

      userLogin({
        Login: inputLogin,
        Password: inputPassword,
      })
        .then((result) => {
          if (result.status == 200) {
            loadUser(jwtDecode(result.data.token).userId);

            SecureStore.setItemAsync("AccessToken", result.data.token)
              .then(() => {
                showNotification(fadeSuccessAnim);
                setTimeout(() => {
                  navigation.navigate("Main");
                }, 1500);
              })
              .catch((error) => {
                showNotification(fadeErrorAnim);
                console.log("Ошибка при сохранении токена: ", error);
              });
          }
        })
        .catch((err) => {
          showNotification(fadeErrorAnim);
          console.error("Ошибка при входе: ", err);
        });
    } catch (error) {
      showNotification(fadeErrorAnim);
      console.error("Ошибка при обработке пользователей:", error);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainView}>
        <View style={styles.autorizeView}>
          <Text style={styles.simpleText}>Вход в аккаунт</Text>
          <View style={styles.loginInputView}>
            <Ionicons style={styles.loginIcon} name="person" size={24} />
            <TextInput
              style={styles.loginInput}
              placeholder="Логин"
              onChangeText={(text) => setInputLogin(text)}
            />
          </View>
          <View style={styles.passwordInputView}>
            <View style={styles.passwordInputAndIcon}>
              <FontAwesome style={styles.passwordIcon} name="lock" size={24} />
              <TextInput
                style={styles.passwordInput}
                placeholder="Пароль"
                secureTextEntry={isPasswordVisible}
                autoCapitalize="none"
                onChangeText={(text) => setInputPassword(text)}
              />
            </View>
            <FontAwesome
              name="eye"
              style={styles.hidePassword}
              size={24}
              onPress={() => setIsPasswordVisible(false)}
              onPressOut={() => setIsPasswordVisible(true)}
            />
          </View>
          <Pressable style={styles.enterBtn} onPress={() => loginUser()}>
            <Text style={styles.btnText}>ВОЙТИ</Text>
          </Pressable>
        </View>

        <View style={styles.registrateView}>
          <Text style={styles.simpleRegText}>Нет аккаунта?</Text>
          <Pressable
            style={styles.regBtn}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.btnText}>СОЗДАТЬ</Text>
          </Pressable>
        </View>

        <Notification
          type="success"
          message="Успешно выполнено!"
          fadeAnim={fadeSuccessAnim}
        />
        <Notification
          type="error"
          message="Произошла ошибка!"
          fadeAnim={fadeErrorAnim}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
  },
  autorizeView: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.06)",
    marginHorizontal: 30,
    borderRadius: 15,
  },
  registrateView: {
    marginTop: 20,
    marginHorizontal: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  simpleText: {
    fontSize: 22,
    alignSelf: "center",
    fontFamily: "mw-regular",
    marginVertical: 20,
  },
  simpleRegText: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "mw-regular",
    marginVertical: 10,
  },
  loginInputView: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "70&",
  },
  loginInput: {
    fontSize: 19,
    padding: 5,
    paddingTop: 10,
    marginLeft: 5,
    fontFamily: "mw-italic",
    placeholderTextColor: "grey",
    color: "black",
  },
  loginIcon: {
    color: "black",
  },
  passwordInputView: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordInputAndIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    padding: 5,
    fontSize: 19,
    paddingTop: 10,
    marginLeft: 3,
    fontFamily: "mw-italic",
    placeholderTextColor: "grey",
    color: "black",
  },
  passwordIcon: {
    color: "black",
    padding: 5,
  },
  hidePassword: {
    color: "black",
  },
  enterBtn: {
    backgroundColor: "#5258f2",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 30,
    marginVertical: 30,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontFamily: "mw-regular",
    textAlign: "center",
    padding: 5,
  },
  regBtn: {
    backgroundColor: "#5258f2",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 20,
  },
});
