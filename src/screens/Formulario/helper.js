export const formataPayload = (payload, files) => {
  payload.cep_moradia = payload.cep_moradia.match(/\d/g).join("");
  payload.cpf_responsavel = payload.cpf_responsavel.match(/\d/g).join("");
  payload.telefone_responsavel = payload.telefone_responsavel
    .match(/\d/g)
    .join("");
  payload.dt_nasc_crianca = payload.dt_nasc_crianca
    .split("/")
    .reverse()
    .join("-");
  payload.dt_nasc_responsavel = payload.dt_nasc_responsavel
    .split("/")
    .reverse()
    .join("-");
  payload.certidao_crianca = files[0].arquivo;
  return payload;
};
