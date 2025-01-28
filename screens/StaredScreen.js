import { StyleSheet, Text, View } from "react-native";

function StaredScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>You have no stared Recipes</Text>
    </View>
  );
}

export default StaredScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
