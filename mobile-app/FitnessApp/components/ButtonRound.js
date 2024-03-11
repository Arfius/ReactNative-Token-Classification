import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ButtonRound({ label, theme, onPress}) {
    if (theme === "primary") {
        return (
          <View style={[styles.buttonContainer]}>

            <Pressable
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={onPress}>
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </Pressable>
          </View>
        );
      }
      return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
              <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
          </View>
      );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom:10
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  buttonIcon: {
    paddingRight: 8,
  },

  buttonLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
