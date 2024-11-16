export const getTatumApiKey = (): string => {
  return import.meta.env.VITE_TATUM_API_KEY;
};

export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export enum AssetType {
  ETH = "ETH"
}