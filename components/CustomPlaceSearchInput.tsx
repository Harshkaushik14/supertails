import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AddressSplit } from "@/constants/functions";
import { useRouter } from "expo-router";

const CustomPlaceSearchInput: React.FC = () => {
  const router = useRouter();

  return (
    <GooglePlacesAutocomplete
      enablePoweredByContainer={false}
      placeholder="Search area, street, name..."
      onPress={(data, details = null) => {
        console.log("Selected Place:", data, details);
      }}
      query={{
        key: "AIzaSyAasxoqliptkWaRVgUnQ08nBi0OiPktvEw",
        language: "en",
      }}
      fetchDetails={true}
      renderLeftButton={() => (
        <View style={styles.leftIconContainer}>
          <EvilIcons name="search" size={24} color={Colors.textSecondary} />
        </View>
      )}
      renderRow={(data) => (
        <Pressable
          onPress={() => router.push("/ConfirmLocationScreen")}
          style={styles.resultItem}
        >
          <View style={{ alignItems: "center" }}>
            <EvilIcons
              name="location"
              size={30}
              color={Colors.searchLocationIcon}
            />
            <Text style={{ color: "#142E159E", fontSize: 10, marginTop: 4 }}>
              30m
            </Text>
          </View>
          <View style={{ left: 10 }}>
            <Text
              style={[styles.resultText, { fontSize: 14, fontWeight: "600" }]}
            >
              {AddressSplit(data.description, 0)}
            </Text>
            <Text
              style={[
                styles.resultText,
                {
                  fontSize: 12,
                  color: Colors.googleSearchDescText,
                  fontWeight: "300",
                },
              ]}
            >
              {data.description}
            </Text>
          </View>
        </Pressable>
      )}
      styles={{
        textInputContainer: styles.inputContainer,
        textInput: styles.input,
        listView: styles.listView,
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 2,
    // paddingHorizontal: 15,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1.6,
    borderColor: Colors.border,
    paddingHorizontal: 10,
  },
  leftIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rightIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  listView: {
    backgroundColor: "#fff",
    // borderRadius: 10,
    marginTop: 5,
  },
  resultItem: {
    // padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.surface,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CustomPlaceSearchInput;
