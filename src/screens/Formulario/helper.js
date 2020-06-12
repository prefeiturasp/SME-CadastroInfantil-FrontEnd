export const formataPayload = (payload, files) => {
  payload.cep_moradia = payload.cep_moradia.match(/\d/g).join("");
  payload.cpf_responsavel = payload.cpf_responsavel.match(/\d/g).join("");
  payload.telefone_responsavel = payload.telefone_responsavel
    .match(/\d/g)
    .join("");
  if (payload.telefone_opcional) {
    payload.telefone_opcional = payload.telefone_opcional.match(/\d/g).join("");
  }
  payload.dt_nasc_crianca = payload.dt_nasc_crianca
    .split("/")
    .reverse()
    .join("-");
  payload.dt_nasc_responsavel = payload.dt_nasc_responsavel
    .split("/")
    .reverse()
    .join("-");
  if (payload.dt_entrada_brasil) {
    payload.dt_entrada_brasil = payload.dt_entrada_brasil
      .split("/")
      .reverse()
      .join("-");
    payload.uf_nasc_crianca = "";
    payload.municipio_nasc_crianca = "";
  }
  payload.certidao_crianca = files[0].arquivo;
  payload.email_responsavel = payload.email_responsavel || "";
  payload.tem_nee = payload.tem_nee === "S";
  payload.filiacao1_falecido = payload.filiacao1_falecido === "S";
  payload.filiacao2_falecido = payload.filiacao2_falecido === "S";
  payload.filiacao2_sexo = payload.filiacao2_sexo || "";
  if (!payload.filiacao2_consta) {
    payload.filiacao2_nacionalidade = "";
    payload.filiacao2_nome = "";
  }
  return payload;
};
