import axios from "axios";
import { API_URL } from "../config";

export const postFormulario2 = async (payload) => {
  return await axios.post(`${API_URL}/v1/cadastro/`, payload);
};

export const postFormulario = async (payload) => {
  const url = `${API_URL}/v1/cadastro/?v=1`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};


export const cpf_existe = async (cpf) => {
  return await axios.get(`${API_URL}/v1/cpf-existe/${cpf}`);
};
