import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomPlaceSearchInput from "@/components/CustomPlaceSearchInput";
import { Colors } from "@/constants/Colors";
import LocationPermissionModal from "@/components/LocationPermissionModal";
import { useRouter } from "expo-router";

const AddAddressAutoSelect = () => {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.permissionContainer}>
        <MaterialIcons
          name="location-off"
          size={24}
          color={Colors.enableTextColor}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.permissionText,
              { fontWeight: "600", color: Colors.enableTextColor },
            ]}
          >
            Enable location permission
          </Text>
          <Text
            style={[
              styles.permissionText,
              {
                fontSize: 12,
                lineHeight: 13.5,
                letterSpacing: 0,
                marginTop: 2,
                fontWeight: "400",
              },
            ]}
          >
            Your precise location helps us deliver on time
          </Text>
        </View>

        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.enableButton}
        >
          <Text style={styles.enableButtonText}>Enable</Text>
        </Pressable>
      </View>
      <CustomPlaceSearchInput />
      <Pressable
        onPress={() => router.push("/AddAddressManually")}
        style={styles.manualAddressButton}
      >
        <Ionicons name="location-outline" size={20} color="#FF6600" />
        <Text style={styles.manualAddressText}>Add address manually</Text>
      </Pressable>

      <LocationPermissionModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  permissionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F7",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  permissionText: {
    flex: 1,
    marginLeft: 10,
  },
  enableButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  enableButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    // letterSpacing:1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  manualAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.white,
    marginTop: 16,
  },
  manualAddressText: {
    marginLeft: 8,
    color: "#FF6600",
    fontWeight: "bold",
  },
});

export default AddAddressAutoSelect;
