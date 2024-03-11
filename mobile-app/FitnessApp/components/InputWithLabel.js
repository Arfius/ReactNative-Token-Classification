import { View, TextInput, StyleSheet, Text } from "react-native";
import { useState } from 'react';

export default function InputWithLabel({title, placeholder, onChangeText}) {

  return (
    <View>
        <Text style={styles.labelInput}>
           {title}
        </Text>
        
        <TextInput
          style={styles.input}
          multiline
          onChangeText={onChangeText}
          placeholder={placeholder}
          numberOfLines={4}
          maxLength={250}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        height: 150,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
        marginBottom:20,
        fontSize:20,
        verticalAlign:'top'
      },
    labelInput:{
        fontSize:20,
        marginBottom:10,
        fontWeight:'bold'
    }
})