import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import InitialAddAddressScreen from "./InitialAddAddressScreen";
import AddAddressManually from "./AddAddressManually";
import SelectLocationScreen from "./SelectLocationScreen";
import ConfirmLocation from "./ConfirmLocationScreen";
import AddAddressAutoSelect from "./AddAddressAutoSelect";
import "react-native-get-random-values";
import uuid from "react-native-uuid";

const uniqueId = uuid.v4();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InitialAddAddressScreen />
      {/* <AddAddressManually /> */}
      {/* <SelectLocationScreen /> */}
      {/* <ConfirmLocation/> */}
      {/* <AddAddressAutoSelect /> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
