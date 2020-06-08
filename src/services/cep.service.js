import axios from "axios";

export const getEnderecoPorCEP = async (cep) => {
  return await axios.get(
    `https://republicavirtual.com.br/web_cep.php?cep=${cep}&formato=jsonp`
  );
};
