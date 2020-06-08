import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const postFormulario = async (payload) => {
  return await axios.post(`${API_URL}/v1/cadastro/`, payload);
};
