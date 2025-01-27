import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

function CatGridTile({ title, color, pushButton }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={pushButton}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CatGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4, //This provides a shadow for android
    backgroundColor: "white", //This is needed for ios shadow
    shadowColor: "black", //the shadow properties create a shadow on ios.
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    // overflow: "hidden",
  },
  title: {
    // fontWeight: "bold",
    fontSize: 30,
    fontFamily: "lotr",
    // overflow: "hidden",
  },
});
