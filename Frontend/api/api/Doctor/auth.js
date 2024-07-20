
import axiosRequest from "../../AxiosConfig";

export const doctorLogin = async (body) => {
  const res = await axiosRequest("/doctor/login", "POST", body);
  return res;
};

export const doctorSignUp = async (body) => {
  const res = await axiosRequest("/doctor/signup", "POST", body);
  return res;
};

export const appointmentGet = async (body,token) => {
  const res = await axiosRequest("/doctor/appointment/get", "POST", body,token);
  return res;
};

export const doctorGet = async (body) => {
  const res = await axiosRequest("/doctor/get", "Get", body);
  return res;
};

export const prescriptionCreate = async (body,token) => {
  const res = await axiosRequest("/doctor/prescription/create", "POST", body,token);
  return res;
};