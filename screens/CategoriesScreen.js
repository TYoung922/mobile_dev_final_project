import { StyleSheet, FlatList, View } from "react-native";
import { CATEGORIES, GlobalStyles } from "../constants/styles";
import CatGridTile from "../recipes/components/CatGridTile";

// function CategoriesScreen() {
//   return (
//     <View style={styles.rootContainer}>
//       <Text style={styles.title}>Welcome!</Text>
//       <Text>You have reached the categories screen!</Text>
//     </View>
//   );
// }

function CategoriesScreen({ navigation }) {
  function renderCategories(catData) {
    function pressHandler() {
      navigation.navigate("RecipeOverview", { catId: catData.item.id });
    }

    return (
      <CatGridTile
        title={catData.item.title}
        color={catData.item.color}
        pushButton={pressHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategories}
        numColumns={2}
      />
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.lightGreen,
    // color: "#82b990" // 638C6D
  },
});
