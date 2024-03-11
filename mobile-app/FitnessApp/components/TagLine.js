import { View, StyleSheet, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TagLine({text, tag}) {

    var icon = "font"
    var color = "grey"

    if ( tag.includes('Duration')){
        icon = 'calendar'
        color = 'blue'
    }else if ( tag.includes('Workout') ){
        icon = 'bicycle'
        color = 'green'
    }else if ( tag.includes('Frequency') ){
        icon = 'hourglass'
        color = 'red'
    }else if ( tag.includes('Number') ){
        icon = 'hashtag'
        color = 'purple'
    }

  return (
    <View style={styles.layout}>
        <FontAwesome
        name={icon}
        color={color}
        style={styles.buttonIcon}
        />
        <Text style={styles.label}>
            {text}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    layout:{
        flexDirection:"row",
        marginBottom: 8
    },
    buttonIcon: {
        paddingRight: 10,
        fontSize: 20,
    },
    label:{
        fontSize:18,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
      },
})