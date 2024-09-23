import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function NewsForm({ newsItem }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: newsItem.ImageUrl }} />
      <Text style={styles.description}> {newsItem.Description} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 15,
  },
  title: {
    fontFamily: "mw-bold",
    fontSize: 22,
    textAlign: "left",
    padding: 15,
    color: "black",
  },
  description: {
    fontFamily: "mw-regular",
    fontSize: 18,
    textAlign: "left",
    padding: 15,
    color: "black",
  },
});
