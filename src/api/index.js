import axios from "axios";
import { API_ROOT } from "@/config";

export default {
  githubLogin() {
    const url = `${API_ROOT}auth/github/`;
    return axios.get(url);
  }
};
