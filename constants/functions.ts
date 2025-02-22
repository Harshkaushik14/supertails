export const AddressSplit = (str: string, val: number) => {
  let address = str.split(",");

  return address[val];
};
