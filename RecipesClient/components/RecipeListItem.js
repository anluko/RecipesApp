import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function RecipeListItem( { listItem, navigation } ) {

  useEffect(() => {

  });

  return (
    <TouchableOpacity style = { styles.touchItem } onPress = { () => navigation.navigate('Про рецепт', listItem)}>
      <View style = { styles.itemsView }>
        <Image style = {styles.image} source = {{ uri: listItem.ImageUrl }} onError={(e) => console.log('Image load error', e.nativeEvent.error)}/> 
        
        <View style = { styles.nameAnons }>
            <Text style = { styles.title }>{ listItem.Label }</Text>
        </View>     
      </View> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchItem: {
    justifyContent: 'center',
    borderRadius: 15,
  },
  itemsView: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.028)',
    padding: 20,
    overflow: 'hidden',
    marginHorizontal: 10
  },
  image: {
    width: '98%',
    height: 200,
    borderRadius: 15
  },  
  nameAnons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  title: {
    fontFamily: 'mw-regular',
    fontSize: 20,
    textAlign: 'left',
    color: '#474747'
  },
});