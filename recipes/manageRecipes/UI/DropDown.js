import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { CATEGORIES, GlobalStyles } from "../../../constants/styles";

const DropDown = ({ style, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  const categoryItems = CATEGORIES.slice(1).map((category) => ({
    label: category.title,
    value: category.id,
  }));

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select a Category</Text> */}
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={categoryItems}
        style={{
          inputAndroid: {
            ...styles.input,
            ...style,
            borderRadius: 6,
          },
          inputIOS: {
            ...styles.input,
            ...style,
          },
          iconContainer: {
            top: 10,
          },
          container: {
            borderRadius: 6,
            overFlow: "hidden",
          },
        }}
        value={selectedValue}
        placeholder={{
          label: "Select a Category...",
          value: null,
          color: GlobalStyles.colors.darkGreen,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    // borderColor: GlobalStyles.colors.darkGreen,
    // backgroundColor: GlobalStyles.colors.darkGreen,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    // width: 200,
    // width: "100%",
    borderWidth: 3,
    borderColor: GlobalStyles.colors.darkOrange,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    color: GlobalStyles.colors.lightOrange,
    // backgroundColor: GlobalStyles.colors.darkGreen,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default DropDown;
