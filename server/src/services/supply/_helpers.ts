export const isAddress = (address: string) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address);
};

export const fixAddress = (address: string) => {
  address = address.replace(' ', '');
  address = address.toLowerCase();
  if (address.substring(0, 2) !== '0x') {
    return '0x' + address;
  }
  return address;
};
