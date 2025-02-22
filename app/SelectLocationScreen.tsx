import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
  Animated,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import LocationIcon from "../assets/svgs/location-gradient-icon.svg";
import CustomPlaceSearchInput from "@/components/CustomPlaceSearchInput";
import { MaterialIcons } from "@expo/vector-icons";
import LocationPermissionModal from "@/components/LocationPermissionModal";

const { width, height } = Dimensions.get("window");

const SelectLocationScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handlePress = () => {
    console.log("here");
  };

  const onRegionChange = (newRegion: any) => {
    setRegion(newRegion);
  };

  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <CustomPlaceSearchInput />
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
      </View>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
      >
        <Marker draggable coordinate={region}>
          <View style={styles.markerContainer}>
            <Animated.View
              style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]}
            />
            <View style={styles.markerDot} />
          </View>
        </Marker>
      </MapView>
      {/* Use Current Location */}

      <View style={styles.currentLocationBtn}>
        <FontAwesome6 name="location-crosshairs" size={24} color={"#EF6C00"} />
        <Text
          style={{
            color: Colors.primary,
            fontSize: 14,
            lineHeight: 14.4,
            letterSpacing: 0,
            fontWeight: "400",
          }}
        >
          Use current location
        </Text>
      </View>

      {/* Location Info Card */}
      <View style={styles.locationCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ width: "8%" }}>
            <LocationIcon width={25} height={25} />
          </View>
          <View style={{ width: "65%" }}>
            <Text style={styles.title}>Even Healthcare Office</Text>
            <Text>
              11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: Colors.background,
              width: "25%",
              height: "60%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontWeight: "400",
                fontSize: 14,
                lineHeight: 14.4,
              }}
            >
              Change
            </Text>
          </Pressable>
        </View>

        <CustomButton
          onPress={handlePress}
          title="Confirm location"
          color={Colors.primary}
          textColor={Colors.white}
        />
      </View>
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
  },
  permissionText: {
    flex: 1,
    marginLeft: 10,
  },
  permissionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F7",
    padding: 10,
    borderRadius: 5,
    // marginBottom: 16,
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
  searchContainer: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 5,
  },
  searchInput: {
    fontSize: 16,
    height: 40,
  },
  map: {
    width: width,
    height: height * 1,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pulse: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#DAFF6F",
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.markerDot,
  },
  currentLocationBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 80,
    position: "absolute",
    top: height * 0.7 - 20, // Position above location card with some gap
    left: 20,
    right: 20,
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 6,
  },
  locationCard: {
    position: "absolute",
    bottom: 1,
    width: "100%",
    // left: 20,
    // right: 20,
    padding: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    // alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.black,
    lineHeight: 21.6,
    letterSpacing: 0,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff6600",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SelectLocationScreen;
