import axios from "axios";
import { API_URL } from "../config";

export const postFormulario = async (payload) => {
  return await axios.post(`${API_URL}/v1/cadastro/`, payload);
};
