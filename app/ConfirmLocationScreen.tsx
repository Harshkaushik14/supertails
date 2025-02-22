import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import LocationIcon from "../assets/svgs/location-gradient-icon.svg";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const ConfirmLocationScreen = () => {
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Selected Location" />
      </MapView>

      <View style={styles.detailsContainer}>
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <LocationIcon width={25} height={25} />
            <View style={styles.locationTextContainer}>
              <Text style={styles.title}>Even Healthcare Office</Text>
              <Text style={styles.address}>
                11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka
              </Text>
            </View>
            <Pressable style={styles.changeButton}>
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#EAECF0",
            height: 2,
            marginTop: 16,
            marginBottom: 6,
          }}
        />

        <Text style={styles.sectionTitle}>Enter complete address</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Feather
            name="home"
            style={{ left: 10 }}
            size={16}
            color={Colors.disabled}
          />
          <TextInput
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            placeholder="House No./Flat No."
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <FontAwesome5
            name="building"
            style={{ left: 10 }}
            size={16}
            color={Colors.disabled}
          />
          <TextInput
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            placeholder="Building name"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Entypo
            name="location"
            style={{ left: 10 }}
            size={16}
            color={Colors.disabled}
          />
          <TextInput
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            placeholder="Landmark"
          />
        </View>

        <Text style={styles.sectionTitle}>Save address as</Text>
        <View style={styles.tagContainer}>
          <Pressable style={styles.tag}>
            <Feather name="home" size={16} color={Colors.tagTextColor} />
            <Text style={[styles.tagText, { left: 10 }]}>Home</Text>
          </Pressable>
          <Pressable style={styles.tag}>
            <Ionicons
              name="bag-handle-outline"
              size={16}
              color={Colors.tagTextColor}
            />
            <Text style={[styles.tagText, { left: 10 }]}>Office</Text>
          </Pressable>
          <Pressable style={styles.tag}>
            <Entypo name="location" size={16} color={Colors.tagTextColor} />
            <Text style={[styles.tagText, { left: 10 }]}>Others</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="person-outline"
            style={{ left: 10 }}
            size={16}
            color={Colors.disabled}
          />

          <TextInput
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            placeholder="Receiver's name"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="call-outline"
            style={{ left: 10 }}
            size={16}
            color={Colors.disabled}
          />

          <TextInput
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            placeholder="Receiver's phone number"
            keyboardType="phone-pad"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <FontAwesome5
            name="bone"
            style={{ left: 10 }}
            size={16}
            color={Colors.disabled}
          />
          <TextInput
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            placeholder="Pet's name"
          />
        </View>

        <CustomButton
          style={{ marginTop: 10 }}
          color={Colors.primary}
          textColor={Colors.white}
          onPress={() => router.push("/SelectLocationScreen")}
          title="Save address"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  detailsContainer: { padding: 20, backgroundColor: "#fff" },
  locationCard: {
    backgroundColor: Colors.white,
    // padding: 15,
    // borderRadius: 10,
    // elevation: 5,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationTextContainer: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  address: { fontSize: 14, color: "gray" },
  changeButton: {
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    width: "25%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  changeText: { color: "#ff6600", fontWeight: "bold" },
  sectionTitle: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 16.8,
    letterSpacing: 0,
    marginBottom: 12,
  },
  input: {
    // padding: 10,
    width: "85%",
    padding: 10,
    left: 15,
    // marginTop: 8,
  },
  tagContainer: { flexDirection: "row", marginVertical: 10 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    width: "26%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: { fontSize: 14, fontWeight: "300", color: Colors.tagTextColor },
  saveButton: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default ConfirmLocationScreen;
