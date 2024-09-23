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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import { userAdd } from "../api/apiUser";
import Notification from "../notifications/notifications";

export default function Signup({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [inputGrowth, setInputGrowth] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [fadeSuccessAnim] = useState(new Animated.Value(0));
  const [fadeErrorAnim] = useState(new Animated.Value(0));

  const local_data = [
    {
      label: "Мужчина",
      image: require("../assets/male.png"),
    },
    {
      label: "Женщина",
      image: require("../assets/female.png"),
    },
  ];

  const handleInputChange = (text, type) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    if (type === "growth") {
      setInputGrowth(numericValue);
    } else if (type === "weight") {
      setInputWeight(numericValue);
    }
  };

  const addUser = async () => {
    if (inputLogin == "" || inputPassword == "") {
      alert("Пожалуйста введите логин и пароль!");
      return;
    }

    const user = {
      Login: inputLogin,
      Password: inputPassword,
      Gender: selectedGender,
      Growth: inputGrowth,
      Weight: inputWeight,
    };

    try {
      const result = await userAdd(user);

      if (result.status === 200) {
        console.log("Ответ сервера:", result.data);
        showNotification(fadeSuccessAnim);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1500);
      }
    } catch (err) {
      showNotification(fadeErrorAnim);
      console.error("Ошибка при добавлении пользователя:", err);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainView}>
        <View style={styles.signUpView}>
          <Text style={styles.simpleText}>Регистрация</Text>
          <Text style={styles.enterText}>Введите логин</Text>
          <View style={styles.loginInputView}>
            <TextInput
              style={styles.loginInput}
              placeholder="Логин"
              onChangeText={(text) => setInputLogin(text)}
            />
          </View>
          <Text style={styles.enterText}>Введите пароль</Text>
          <View style={styles.passwordInputView}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Пароль"
              placeholderTextColor={"grey"}
              secureTextEntry={isPasswordVisible}
              autoCapitalize="none"
              onChangeText={(text) => setInputPassword(text)}
            />
            <FontAwesome
              name="eye"
              style={styles.hidePassword}
              size={24}
              onPress={() => setIsPasswordVisible(false)}
              onPressOut={() => setIsPasswordVisible(true)}
            />
          </View>
          <Text style={styles.enterText}>Выберите пол</Text>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            maxHeight={200}
            data={local_data}
            valueField={selectedGender}
            labelField="label"
            imageField="image"
            placeholder="Пол"
            searchPlaceholder="Поиск..."
            value={selectedGender}
            onChange={(item) => {
              setSelectedGender(item.label);
            }}
          />
          <Text style={styles.enterText}>Введите рост</Text>
          <View style={styles.growthInputView}>
            <TextInput
              style={styles.growthInput}
              placeholder="Рост"
              keyboardType="numeric"
              placeholderTextColor={"grey"}
              autoCapitalize="none"
              onChangeText={(text) => handleInputChange(text, "growth")}
              value={inputGrowth}
              maxLength={3}
            />
          </View>
          <Text style={styles.enterText}>Введите вес</Text>
          <View style={styles.weightInputView}>
            <TextInput
              style={styles.weightInput}
              placeholder="Вес"
              keyboardType="numeric"
              placeholderTextColor={"grey"}
              autoCapitalize="none"
              onChangeText={(text) => handleInputChange(text, "weight")}
              value={inputWeight}
              maxLength={3}
            />
          </View>
          <Pressable style={styles.enterBtn} onPress={() => addUser()}>
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
  signUpView: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.06)",
    marginHorizontal: 30,
    borderRadius: 15,
  },
  simpleText: {
    fontSize: 22,
    alignSelf: "center",
    fontFamily: "mw-regular",
    marginVertical: 20,
  },
  loginInputView: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    width: "70&",
  },
  loginInput: {
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    fontFamily: "mw-italic",
    color: "black",
    placeholderTextColor: "grey",
  },
  enterText: {
    marginHorizontal: 15,
    paddingTop: 20,
    fontSize: 18,
    fontFamily: "mw-regular",
  },
  passwordInputView: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70&",
  },
  passwordInput: {
    padding: 5,
    fontSize: 16,
    paddingTop: 10,
    fontFamily: "mw-italic",
    color: "black",
    placeholderTextColor: "grey",
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
  dropdown: {
    marginHorizontal: 15,
    marginTop: 15,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "grey",
    fontFamily: "mw-italic",
  },
  selectedTextStyle: {
    fontFamily: "mw-regular",
    color: "black",
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  growthInputView: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    width: "70&",
  },
  growthInput: {
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    fontFamily: "mw-italic",
    color: "black",
    placeholderTextColor: "grey",
  },
  weightInputView: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    width: "70&",
  },
  weightInput: {
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    fontFamily: "mw-italic",
    color: "black",
    placeholderTextColor: "grey",
  },
});
