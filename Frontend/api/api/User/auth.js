import axiosRequest from "../../AxiosConfig";

export const userLogin = async (body) => {
  const res = await axiosRequest("/user/login", "POST", body);
  return res;
};

export const userSignUp = async (body) => {
  const res = await axiosRequest("/user/signup", "POST", body);
  return res;
};
export const userProfile = async (body,token) => {
  const res = await axiosRequest("/user/profile", "Get", body,token);
  return res;
};

export const appointmentCreate = async (body,token) => {
  const res = await axiosRequest("/user/appointment/create", "POST", body,token);
  return res;
};

export const appointmentCheck = async (body,token) => {
  const res = await axiosRequest("/user/appointment/check", "POST", body,token);
  return res;
};

export const prescriptionGet = async (body,token) => {
  const res = await axiosRequest("/user/prescription/get", "GET", body,token);
  return res;
};