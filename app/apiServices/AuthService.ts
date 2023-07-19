import axios, { AxiosResponse } from "axios";
import { APIUrls } from "./ApiServiceConstants";

const BASE_URL = APIUrls.authUrl;

const handleRequest = async (request: Promise<AxiosResponse>): Promise<any> => {
  try {
    const response: AxiosResponse = await request;
    return response;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (data: any): Promise<any> => {
  return handleRequest(axios.post(BASE_URL, data));
};

export const getUserByEmailId = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(BASE_URL);
    const user = response.data.find((user: any) => user.email === data.email);
    return { data: user, status: response.statusText };
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  addUser,
  getUserByEmailId,
};

export default AuthService;
