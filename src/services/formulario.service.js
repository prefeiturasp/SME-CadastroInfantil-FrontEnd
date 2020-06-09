import axios from "axios";
const API_URL = 'API_URL_REPLACE_ME';

export const postFormulario = async (payload) => {
  return await axios.post(`${API_URL}/v1/cadastro/`, payload);
};
