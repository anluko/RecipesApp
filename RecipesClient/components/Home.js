import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { CheckBox } from "@rneui/themed";
import { BlurView } from "expo-blur";
import NewsForm from "./NewsForm";
import Notification from "../notifications/notifications";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import NewsListItem from "./NewsListItem";

export default function Main({ navigation }) {
  const [fadeSuccessAnim] = useState(new Animated.Value(0));
  const [fadeAcceptedAnim] = useState(new Animated.Value(0));
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { currentUser } = useSelector((state) => state.setter);
  const [dietData, setDietData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [selectedNewsItem, setSelectedNewsItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prevVisibility, setPrevVisibilty] = useState(true);

  useEffect(() => {
    if (newsData.length === 0 || selectedNewsItem === null) return;

    const currentIndex = newsData.findIndex(
      (item) => item.Id === selectedNewsItem.Id
    );

    if (currentIndex === 0) {
      setPrevVisibilty(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDietsresponse = await axios.get(
          "http://192.168.1.7:8080/linked/userDiets"
        );
        if (userDietsresponse.status === 201) {
          for (const userDiet of userDietsresponse.data) {
            if (userDiet.UserId === currentUser.Id) {
              await SecureStore.setItemAsync(
                `hasVisitedMain_${currentUser.Id}`,
                "true"
              );
              setIsFirstVisit(false);
            }
          }
        }
        const newsTabResponse = await axios.get(
          "http://192.168.1.7:8080/linked/newsTabs"
        );
        if (newsTabResponse.status === 201) {
          setNewsData(newsTabResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    showNotification(fadeSuccessAnim);
    checkFirstVisit();

    axios
      .get("http://192.168.1.7:8080/linked/dietLabels")
      .then((response) => {
        if (response.status === 201) {
          let dietsArray = response.data.map((item) => {
            return { key: item.Id, value: item.Label };
          });

          setDietData(dietsArray);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const checkFirstVisit = async () => {
    try {
      const value = await SecureStore.getItemAsync(
        `hasVisitedMain_${currentUser.Id}`
      );

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
    setCheckedItems((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const submitCheckBoxApply = async () => {
    const currentlySelectedItems = dietData.filter(
      (diet) => checkedItems[diet.key]
    );
    setSelectedItems(currentlySelectedItems);

    if (!currentlySelectedItems) {
      Alert.alert("Ошибка", "Пожалуйста, выберите вид вашей диеты.");
      return;
    }

    for (const selectedDiet of currentlySelectedItems) {
      try {
        const result = await axios.post(
          "http://192.168.1.7:8080/linked/userDiets/add",
          {
            UserId: currentUser.Id,
            DietLabelId: selectedDiet.key,
          }
        );

        if (result.status === 201) {
          showNotification(fadeAcceptedAnim);
          await SecureStore.setItemAsync(
            `hasVisitedMain_${currentUser.Id}`,
            "true"
          );
          setTimeout(() => {
            setIsFirstVisit(false);
          }, 1500);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onNewsSelect = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setIsModalVisible(true);
  };

  const setNextNews = () => {
    if (newsData.length === 0 || selectedNewsItem === null) return;

    const currentIndex = newsData.findIndex(
      (item) => item.Id === selectedNewsItem.Id
    );
    console.log(currentIndex);
    const nextIndex = (currentIndex + 1) % newsData.length;
    setSelectedNewsItem(newsData[nextIndex]);
  };

  const setPrevNews = () => {
    if (newsData.length === 0 || selectedNewsItem === null) return;

    const currentIndex = newsData.findIndex(
      (item) => item.Id === selectedNewsItem.Id
    );
    const nextIndex = (currentIndex - 1) % newsData.length;
    setSelectedNewsItem(newsData[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newsTabView}>
        <Text style={styles.newsText}>Новости</Text>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <NewsListItem
              listItem={item}
              navigation={navigation}
              onNewsSelect={onNewsSelect}
            />
          )}
          keyExtractor={(item) => item.Id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.mainModalContainer}>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <BlurView
            intensity={50}
            blurReductionFactor={2}
            tint="systemMaterial"
            style={styles.modalContainer}
          >
            <View style={styles.newsItemView}>
              <AntDesign
                name="closecircle"
                size={34}
                style={styles.closeIcon}
                onPress={() => setIsModalVisible(false)}
              />
              <Pressable
                style={styles.nextOverlayContainer}
                onPress={() => setNextNews()}
              >
                <MaterialIcons name="navigate-next" size={34} color={"white"} />
              </Pressable>
              {prevVisibility && (
                <Pressable
                  style={styles.prevOverlayContainer}
                  onPress={() => setPrevNews()}
                >
                  <MaterialIcons
                    name="navigate-before"
                    size={34}
                    color={"white"}
                  />
                </Pressable>
              )}
              <NewsForm newsItem={selectedNewsItem} />
            </View>
          </BlurView>
        </Modal>
      </View>

      {isFirstVisit && (
        <View style={styles.firstVisitView} animationType="slide">
          <Text style={styles.textHeader}>
            Выберите тип диеты, которую вы хотите придерживаться
          </Text>
          <Text style={styles.textDescription}>
            Это повлияет на вид питания, который сформируется для вас
          </Text>
          {dietData.map((diet) => (
            <CheckBox
              key={diet.key}
              containerStyle={styles.checkBox}
              backgroundColor="#cacce8"
              title={diet.value}
              textStyle={{ fontSize: 16, fontFamily: "mw-light" }}
              checked={checkedItems[diet.key] || false}
              size={28}
              onPress={() => handleCheckBoxChange(diet.key)}
            />
          ))}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => {
              submitCheckBoxApply();
            }}
          >
            <Text style={styles.submitText}>Принять</Text>
          </TouchableOpacity>
        </View>
      )}

      <Notification
        type="success"
        message="Добро пожаловать!"
        fadeAnim={fadeSuccessAnim}
      />
      <Notification
        type="success"
        message="Успешно выполнено!"
        fadeAnim={fadeAcceptedAnim}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
  newsTabView: {
    padding: 20,
  },
  newsText: {
    fontSize: 20,
    fontFamily: "mw-bold",
  },
  firstVisitView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 30,
    backgroundColor: "#cacce8",
  },
  textHeader: {
    fontSize: 18,
    padding: 15,
    paddingBottom: 5,
    fontFamily: "mw-bold",
    textAlign: "center",
  },
  textDescription: {
    fontSize: 14,
    padding: 0,
    fontFamily: "mw-regular",
    textAlign: "center",
  },
  mainModalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  newsItemView: {
    marginHorizontal: 15,
    backgroundColor: "#f2f0f0",
    borderRadius: 15,
    justifyContent: "center",
    height: "60%",
    overflow: "hidden",
  },
  closeIcon: {
    color: "black",
    alignSelf: "flex-end",
  },
  nextOverlayContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  prevOverlayContainer: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  checkBox: {
    backgroundColor: "#cacce8",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#5258f2",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  submitText: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
});
