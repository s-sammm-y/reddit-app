import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { authUser } from '../dummy';
import { Inter_600SemiBold_Italic, useFonts } from '@expo-google-fonts/inter';

export default function Footer() {
  const [fonts] = useFonts({
    Inter_600SemiBold_Italic
  })
  return (
    <View style={styles.footer}>
      
      <Text style={styles.text}>You:{authUser.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:2,
  },
  text: {
    fontFamily:"Inter_600SemiBold_Italic",
    fontSize: 14,
    color:"#e0e0e0"
  },
});
