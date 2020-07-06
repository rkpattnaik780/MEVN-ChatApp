import axios, { AxiosPromise, AxiosResponse} from "axios";
import { API_ROOT } from "@/config";

export default {
  githubLogin(): Promise<AxiosResponse> {
    const url = `${API_ROOT}auth/github/`;
    return axios.get(url);
  },
  checkIfLoggedIn(): AxiosPromise {
    const url = `${API_ROOT}auth/check/`;
    return axios(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
  },
  signOut(): Promise<AxiosResponse> {
    const url = `${API_ROOT}auth/logout/`;
    return axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
  }
};
