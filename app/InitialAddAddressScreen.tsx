import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { AppDispatch, useAppSelector } from "@/store";
import { deleteAddress, setDefaultAddress } from "@/store/slices/addressSlice";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  Pressable,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";

const InitialAddAddressScreen: React.FC = () => {
  const addresses = useAppSelector((state) => state.address.addresses);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleBtnPress = () => {
    router.push("/AddAddressAutoSelect");
  };

  useEffect(() => {
    console.log(addresses);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Saved Addresses
        </Text>

        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                marginBottom: 10,
                backgroundColor: "#f5f5f5",
                borderRadius: 16,
                // flexDirection: "row",
                marginHorizontal: 20,
                overflow: "hidden",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.receiverName} ({item.petName})
              </Text>
              <Text>
                {item.flatHouseNumber}, {item.buildingName}
              </Text>
              <Text>{item.addressLine1}</Text>
              <Text>
                {item.city}, {item.state} - {item.pincode}
              </Text>
              <Text>Phone: {item.receiverNumber}</Text>

              {/* Edit Button */}
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  backgroundColor: "blue",
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/AddAddressManually",
                    params: { id: item.id },
                  })
                }
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Edit
                </Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  backgroundColor: "red",
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() => dispatch(deleteAddress(item.id))}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Delete
                </Text>
              </TouchableOpacity>

              {/* Set Default Button */}
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  backgroundColor: item.isDefault ? "gray" : "green",
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() => dispatch(setDefaultAddress(item.id))}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {item.isDefault ? "Default Address" : "Set as Default"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Add Address"
          color={Colors.primary}
          textColor={Colors.white}
          textStyle={styles.buttonText}
          onPress={handleBtnPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Optional background color
  },
  content: {
    flex: 1, // Pushes the button to the bottom
  },
  buttonContainer: {
    backgroundColor: Colors.surface, // White background
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InitialAddAddressScreen;
