import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

function Button({ children, onPress, mode, style, containerStyle }) {
  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat, style]}>
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              style,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.darkOrange,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: GlobalStyles.colors.lightGreen,
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.darkOrange,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.lightOrange,
    borderRadius: 4,
  },
  pressedText: {
    color: GlobalStyles.colors.lightGreen,
    textAlign: "center",
  },
});
