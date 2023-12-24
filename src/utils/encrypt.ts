import CryptoJS from "crypto-js";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, "asw").toString();
};

export const decryptData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, "asw");
  return bytes.toString(CryptoJS.enc.Utf8);
};
