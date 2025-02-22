import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import CustomButton from "./CustomButton";

interface LocationPermissionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isVisible,
  onClose,
}) => {
  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header]}>
          <MaterialIcons
            style={{ marginTop: 4 }}
            name="location-off"
            size={25}
            color={Colors.black}
          />
          <View style={{ left: 10 }}>
            <Text style={[styles.headerText, { fontSize: 14 }]}>
              Enable location permission
            </Text>

            {/* Description */}
            <Text style={styles.description}>
              Please enable location permissions for a better experience
            </Text>
          </View>
        </View>
        {/* Steps */}
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View
              style={{
                backgroundColor: Colors.primary,
                padding: 6,
                borderRadius: 999,
              }}
            >
              <FontAwesome5 name="dog" size={14} color={Colors.white} />
            </View>

            <Text style={styles.stepText}>Choose "Supertails"</Text>
          </View>
          <View
            style={{
              height: 30,
              backgroundColor: "#D9D9D9",
              width: 1,
              marginLeft: 14,
            }}
          />
          <View style={styles.step}>
            <View
              style={{
                backgroundColor: Colors.primary,
                padding: 6,
                borderRadius: 999,
              }}
            >
              <Feather name="map-pin" size={16} color={Colors.white} />
            </View>
            <Text style={styles.stepText}>Go to location</Text>
          </View>
          <View
            style={{
              height: 30,
              backgroundColor: "#D9D9D9",
              width: 1,
              marginLeft: 14,
            }}
          />
          <View style={styles.step}>
            <View
              style={{
                backgroundColor: Colors.primary,
                padding: 6,
                borderRadius: 999,
              }}
            >
              <MaterialIcons name="touch-app" size={16} color={Colors.white} />
            </View>
            <Text style={styles.stepText}>Click on "While using app"</Text>
          </View>
        </View>

        {/* Button */}
        {/* <TouchableOpacity style={styles.button} onPress={openSettings}>
          <Text style={styles.buttonText}>Go to settings</Text>
        </TouchableOpacity> */}
        <CustomButton
          onPress={openSettings}
          style={styles.button}
          title="Go to settigs"
          color={Colors.primary}
          textColor={Colors.white}
        />
      </View>
    </Modal>
  );
};

export default LocationPermissionModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    // alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 12,
    color: Colors.modalDescriptionText,
    textAlign: "left",
    marginBottom: 15,
    lineHeight: 15,
    letterSpacing: 0,
  },
  stepsContainer: {
    width: "95%",
    marginBottom: 20,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    marginLeft: 8,
    color: "#333",
  },
  button: {
    backgroundColor: "#F97316",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
