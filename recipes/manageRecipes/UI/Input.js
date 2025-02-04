// import { StyleSheet, Text, TextInput, View } from "react-native";
// import { GlobalStyles } from "../../../constants/styles";

// function Input({ label, invalid, style, textInputConfig }) {
//   // function Input({ label, invalid, style }) {
//   const inputStyles = [styles.input];

//   if (textInputConfig && textInputConfig.multiline) {
//     inputStyles.push(styles.inputMultiLine);
//   }

//   if (invalid) {
//     inputStyles.push(styles.invalidInput);
//   }

//   return (
//     <View style={[styles.inputContainer, style]}>
//       <Text style={[styles.label, invalid && styles.invalidLabel]}>
//         {/* <Text> */}
//         {label}
//       </Text>
//       <TextInput style={inputStyles} {...textInputConfig} />
//     </View>
//   );
// }

// export default Input;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginHorizontal: 4,
//     marginVertical: 16,
//   },
//   label: {
//     fontSize: 12,
//     color: GlobalStyles.colors.darkOrange,
//     marginBottom: 4,
//   },
//   input: {
//     backgroundColor: GlobalStyles.colors.darkGreen,
//     padding: 6,
//     borderRadius: 6,
//     fontSize: 18,
//     color: GlobalStyles.colors.lightGreen,
//   },
//   inputMultiLine: {
//     minHeight: 100,
//     textAlignVertical: "top",
//   },
//   invalidLabel: {
//     color: GlobalStyles.colors.error500,
//   },
//   invalidInput: {
//     backgroundColor: GlobalStyles.colors.error50,
//   },
// });

import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        // autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.lightOrange,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
