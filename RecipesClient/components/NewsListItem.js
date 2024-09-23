import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";

export default function NewsListItem({ listItem, navigation, onNewsSelect }) {
  return (
    <TouchableOpacity
      style={styles.touchItem}
      onPress={() => onNewsSelect(listItem)}
    >
      <View style={styles.itemsView}>
        <Image
          style={styles.image}
          source={{ uri: listItem.ImageUrl }}
          onError={(e) => console.log("Image load error", e.nativeEvent.error)}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{listItem.Title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchItem: {
    justifyContent: "center",
    borderRadius: 15,
  },
  itemsView: {
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.028)",
    overflow: "hidden",
    marginTop: 20,
    marginRight: 10,
  },
  image: {
    width: 170,
    height: 130,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#0264fa",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.45)", // Полупрозрачный черный фон
    padding: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontFamily: "mw-regular",
    fontSize: 12,
    textAlign: "left",
    color: "white",
  },
});
