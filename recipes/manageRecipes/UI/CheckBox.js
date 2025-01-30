import { View, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
// import { MEALS } from "../data/dummy-data";

export const CustomCheckBox = ({ isChecked, onPress, text, textStyles }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 18,
        }}
      > */}
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "black",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          marginTop: 10,
          backgroundColor: isChecked
            ? GlobalStyles.colors.darkOrange
            : GlobalStyles.colors.lightGreen,
        }}
      >
        {isChecked && (
          <Text style={{ color: GlobalStyles.colors.lightGreen }}>✔</Text>
        )}
      </View>
      <Text style={textStyles}>{text}</Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};
