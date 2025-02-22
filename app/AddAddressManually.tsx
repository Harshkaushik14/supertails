import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store";
import { addAddress } from "@/store/slices/addressSlice";

const AddAddressManually = () => {
  const [isDefault, setIsDefault] = useState(false);
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.addresses);

  const [flatHouseNumber, setFlatHouseNumber] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverNumber, setReceiverNumber] = useState<string>("");
  const [petName, setPetName] = useState("");

  const [editId, setEditId] = useState<string | null>(null);

  const fetchCityState = async (pincode: string) => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = await response.json();
        if (data[0].Status === "Success") {
          setCity(data[0].PostOffice[0].District);
          setState(data[0].PostOffice[0].State);
        } else {
          Alert.alert("Invalid Pincode", "Please enter a valid pincode.");
          setCity("");
          setState("");
        }
      } catch (error) {
        console.error("Error fetching pincode data", error);
      }
    }
  };

  useEffect(() => {
    console.log("addresses", addresses);
  }, []);

  useEffect(() => {
    if (pincode.length === 6) {
      return;
    }

    if (city !== "" || state !== "") {
      setCity("");
      setState("");
    }
  }, [pincode, city, state]);

  const saveAddress = async () => {
    const payload = {
      flatHouseNumber,
      buildingName,
      addressLine1,
      pincode,
      city,
      state,
      receiverName,
      receiverNumber,
      petName,
    };

    console.log("Dispatching addAddress with payload:", payload);
    await dispatch(addAddress(payload));
    console.log(" addAddress with payload:", addresses);
  };

  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Add address</Text>
      </View>

      {/* Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.sectionTitle}>Address</Text>

          {/* Input Fields */}
          <TextInput
            onChangeText={(text) => {
              setPincode(text);
              fetchCityState(text);
            }}
            keyboardType="numeric"
            maxLength={6}
            style={styles.input}
            placeholder="Pincode"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={city}
              editable={false}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={state}
              editable={false}
            />
          </View>
          <TextInput
            value={flatHouseNumber}
            onChangeText={(text) => {
              setFlatHouseNumber(text);
            }}
            style={styles.input}
            placeholder="House/Flat no."
          />
          <TextInput
            onChangeText={(text) => {
              setBuildingName(text);
            }}
            value={buildingName}
            style={styles.input}
            placeholder="Building no."
          />
          <TextInput
            value={addressLine1}
            onChangeText={(text) => {
              setAddressLine1(text);
            }}
            style={styles.input}
            placeholder="Road Name/ Area/ Colony"
          />

          <Text style={styles.sectionTitle}>Receiver’s details</Text>
          <TextInput
            maxLength={30}
            style={styles.input}
            placeholder="Receiver’s name"
            value={receiverName}
            onChangeText={(text) => {
              setReceiverName(text);
            }}
          />
          <TextInput
            value={receiverNumber}
            onChangeText={(text) => {
              setReceiverNumber(text);
            }}
            style={styles.input}
            maxLength={10}
            placeholder="Receiver’s phone number"
          />
          <TextInput
            value={petName}
            onChangeText={(text) => {
              setPetName(text);
            }}
            style={styles.input}
            placeholder="Pet’s name"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky Bottom Section */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.checkboxContainer}
          onPress={() => setIsDefault(!isDefault)}
        >
          <View style={styles.checkbox}>
            {isDefault && (
              <AntDesign
                name="check"
                style={[styles.checkbox, isDefault && styles.checkboxChecked]}
                size={15}
                color={Colors.white}
              />
            )}
          </View>
          <Text style={styles.checkboxText}>Set as default address</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => saveAddress()}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Save address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  selectedInput: {
    borderColor: "#A855F7",
  },
  bottomContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#000",
    marginLeft: 12,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  checkboxText: {
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#EF6C00",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddAddressManually;
