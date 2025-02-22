import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  id: string;
  flatHouseNumber: string;
  buildingName: string;
  addressLine1: string;
  pincode: string;
  city: string;
  state: string;
  receiverName: string;
  receiverNumber: string | number;
  petName: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  defaultAddressId: string | null;
}

const initialState: AddressState = {
  addresses: [],
  defaultAddressId: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Omit<Address, "id">>) => {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.addresses.push(newAddress);
    },

    editAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },

    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );

      // If deleted address was the default, reset defaultAddressId
      if (state.defaultAddressId === action.payload) {
        state.defaultAddressId =
          state.addresses.length > 0 ? state.addresses[0].id : null;
      }
    },

    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.defaultAddressId = action.payload;
    },
  },
});

export const { addAddress, editAddress, deleteAddress, setDefaultAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
