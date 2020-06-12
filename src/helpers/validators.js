import { validarCPF } from "./helpers";

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (value) =>
  value !== undefined ? undefined : "Campo obrigatório";

export const semCaracteresEspeciais = (value) =>
  value && !/^[\w&.-]+$/i.test(value)
    ? `Não permite caracteres especiais`
    : undefined;

export const somenteCaracteresEEspacos = (value) =>
  value && !/^[a-zA-Z çÇ]+$/i.test(value)
    ? `Somente caracteres sem acento, cedilha e espaços`
    : undefined;

export const validaCEP = (value) => {
  let numero = value.replace("-", "").replace(/_/g, "");
  return numero.length === 8 ? undefined : "Necessário CEP válido!";
};

export const validaCPF = (value) => {
  let cpfValido = validarCPF(value);
  return cpfValido ? undefined : "CPF inválido";
};
export const validaEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email inválido"
    : undefined;

export const telefoneLength = (value) =>
  value && value.length < 14 ? `Ao menos 10 caracteres numéricos` : undefined;

export const validaTelefoneOuCelular = (value) =>
  // value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;
  value && !/^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/g.test(value)
    ? "Telefone/celular inválido"
    : undefined;

export const somenteAlfanumericos = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Somente caracteres alfanuméricos"
    : undefined;
