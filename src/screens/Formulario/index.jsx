/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, Fragment } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputText } from "../../components/Input/InputText";
import { InputFile } from "../../components/Input/InputFile";
import { InputComData } from "../../components/DatePicker";
import "./style.scss";
import {
  composeValidators,
  required,
  somenteCaracteresEEspacos,
  validaCEP,
  validaCPF,
  validaEmail,
} from "../../helpers/validators";
import Select from "../../components/Select";
import { NACIONALIDADES } from "../../constants/NACIONALIDADES";
import { UF_ESTADOS } from "../../constants/UF_ESTADOS";
import { arrayToOptions } from "../../helpers/helpers";
import { NECESSIDADES_ESPECIAIS } from "../../constants/NECESSIDADES_ESPECIAIS";
import formatString from "format-string-by-pattern";
import { getEnderecoPorCEP } from "../../services/cep.service";
import Botao from "../../components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../components/Botao/constants";
import { postFormulario } from "../../services/formulario.service";

const onSubmit = async (values) => {
  const payload = { dados: values };
  const response = await postFormulario(payload);
  console.log(response);
  window.location.href = "/cadastro-sucesso";
};

export const Formulario = () => {
  const [files, setFiles] = useState("");

  const removeFile = (index) => {
    files.splice(index, 1);
    setFiles(files);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          nacionalidade_crianca: "Brasil",
          filiacao1_nacionalidade: "Brasil",
          filiacao2_nacionalidade: "Brasil",
          uf_nasc_crianca: "São Paulo",
          municipio_nasc_crianca: "São Paulo",
          tem_nee: "false",
          filiacao2_consta: true,
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <section className="crianca">
              <h2>Dados da Criança</h2>
              <Field
                label="Nome Completo da criança"
                name="nome_crianca"
                component={InputText}
                type="text"
                placeholder="Nome completo da criança"
                required
                toUppercaseActive
                validate={composeValidators(
                  required,
                  somenteCaracteresEEspacos
                )}
              />
              <div className="row mt-2">
                <div className="col-6">
                  <label>
                    <span>* </span>Sexo da criança
                  </label>
                  <div>
                    <label>
                      <Field
                        name="sexo_crianca"
                        component="input"
                        type="radio"
                        value="M"
                      />{" "}
                      Masculino
                    </label>
                    <label className="ml-3">
                      <Field
                        name="sexo_crianca"
                        component="input"
                        type="radio"
                        value="F"
                      />{" "}
                      Feminino
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <Field
                    label="Data de nascimento da criança"
                    component={InputComData}
                    name="dt_nasc_crianca"
                    showMonthDropdown
                    showYearDropdown
                    required
                    validate={required}
                  />
                </div>
              </div>
              <div className="row">
                <div
                  className={
                    values.nacionalidade_crianca === "Brasil"
                      ? "col-12"
                      : "col-6"
                  }
                >
                  <Field
                    component={Select}
                    name="nacionalidade_crianca"
                    label="Nacionalidade da criança"
                    options={NACIONALIDADES}
                    required
                    validate={required}
                    naoDesabilitarPrimeiraOpcao
                  />
                </div>
                {values.nacionalidade_crianca !== "Brasil" && (
                  <div className="col-6">
                    <Field
                      label="Data de entrada no país da criança"
                      component={InputComData}
                      name="dt_entrada_brasil"
                      showMonthDropdown
                      showYearDropdown
                      required
                    />
                  </div>
                )}
              </div>
              {values.nacionalidade_crianca === "Brasil" && (
                <div className="row">
                  <div className="col-6">
                    <Field
                      component={Select}
                      name="uf_nasc_crianca"
                      label="UF de Nascimento da Criança"
                      options={UF_ESTADOS}
                      required
                      validate={required}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={Select}
                      name="municipio_nasc_crianca"
                      label="Município de Nascimento da Criança"
                      options={arrayToOptions(
                        UF_ESTADOS.find(
                          (el) => el.nome === values.uf_nasc_crianca
                        ).cidades
                      )}
                      required
                      validate={required}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
              )}
              <div className="row mt-2">
                <div className="col-12">
                  <label>
                    <span>* </span>Raça/Cor
                  </label>
                  <div>
                    <label>
                      <Field
                        name="raca_cor_crianca"
                        component="input"
                        type="radio"
                        value="1"
                      />{" "}
                      Amarela
                    </label>
                    <label className="ml-3">
                      <Field
                        name="raca_cor_crianca"
                        component="input"
                        type="radio"
                        value="2"
                      />{" "}
                      Branca
                    </label>
                    <label className="ml-3">
                      <Field
                        name="raca_cor_crianca"
                        component="input"
                        type="radio"
                        value="3"
                      />{" "}
                      Parda
                    </label>
                    <label className="ml-3">
                      <Field
                        name="raca_cor_crianca"
                        component="input"
                        type="radio"
                        value="4"
                      />{" "}
                      Preta
                    </label>
                    <label className="ml-3">
                      <Field
                        name="raca_cor_crianca"
                        component="input"
                        type="radio"
                        value="5"
                      />{" "}
                      Não declarada
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <label>
                    <span>* </span>Possui necessidade especial?
                  </label>
                  <div>
                    <label>
                      <Field
                        name="tem_nee"
                        component="input"
                        type="radio"
                        value="true"
                      />{" "}
                      Sim
                    </label>
                    <label className="ml-3">
                      <Field
                        name="tem_nee"
                        component="input"
                        type="radio"
                        value="false"
                      />{" "}
                      Não
                    </label>
                  </div>
                </div>
                {values.tem_nee === "true" && (
                  <div className="col-6">
                    <Field
                      component={Select}
                      name="tipo_nee"
                      label="Tipo de Necessidade Especial"
                      options={arrayToOptions(NECESSIDADES_ESPECIAIS)}
                      required
                      validate={required}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-4">
                  <Field
                    component={InputText}
                    parse={formatString("12345-678")}
                    label="CEP da Criança"
                    name="cep_moradia"
                    required
                    validate={composeValidators(required, validaCEP)}
                    placeholder="Digite o CEP"
                  />
                  <OnChange name="cep_moradia">
                    {async (value, previous) => {
                      if (value.length === 9) {
                        const response = await getEnderecoPorCEP(value);
                        if (response.status === 200) {
                          values.endereco_moradia =
                            response.data.tipo_logradouro +
                            " " +
                            response.data.logradouro;
                        }
                      }
                    }}
                  </OnChange>
                </div>
                <div className="col-8">
                  <Field
                    component={InputText}
                    label="Endereço Residencial da Criança"
                    name="endereco_moradia"
                    required
                    validate={required}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Field
                    component={InputText}
                    label="Número"
                    name="numero_moradia"
                    required
                    validate={required}
                    toUppercaseActive
                  />
                </div>
                <div className="col-8">
                  <Field
                    component={InputText}
                    label="Complemento"
                    name="complemento_moradia"
                    toUppercaseActive
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label>
                    <span>* </span>Certidão de Nascimento da Criança
                  </label>
                  <Field
                    component={InputFile}
                    className="inputfile"
                    texto="Anexar"
                    name="files"
                    accept=".png, .jpeg, .jpg"
                    setFiles={setFiles}
                    removeFile={removeFile}
                  />
                </div>
              </div>
              <h2>Filiação 1 (Preferencialmente a Mãe)</h2>
              <Field
                label="Nome Completo"
                name="filiacao1_nome"
                component={InputText}
                type="text"
                placeholder="Nome completo"
                required
                validate={composeValidators(
                  required,
                  somenteCaracteresEEspacos
                )}
                toUppercaseActive
              />
              <div className="row mt-2">
                <div className="col-3">
                  <label>
                    <span>* </span>Falecido?
                  </label>
                  <div>
                    <label>
                      <Field
                        name="filiacao1_falecido"
                        component="input"
                        type="radio"
                        value="true"
                      />{" "}
                      Sim
                    </label>
                    <label className="ml-3">
                      <Field
                        name="filiacao1_falecido"
                        component="input"
                        type="radio"
                        value="false"
                      />{" "}
                      Não
                    </label>
                  </div>
                </div>
                <div className="col-5">
                  <label>
                    <span>* </span>Sexo
                  </label>
                  <div>
                    <label>
                      <Field
                        name="filiacao1_sexo"
                        component="input"
                        type="radio"
                        value="M"
                      />{" "}
                      Masculino
                    </label>
                    <label className="ml-3">
                      <Field
                        name="filiacao1_sexo"
                        component="input"
                        type="radio"
                        value="F"
                      />{" "}
                      Feminino
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <Field
                    component={Select}
                    name="filiacao1_nacionalidade"
                    label="Nacionalidade"
                    options={NACIONALIDADES}
                    required
                    validate={required}
                    naoDesabilitarPrimeiraOpcao
                  />
                </div>
              </div>
              <h2>
                Filiação 2 (Preferencialmente o Pai){" "}
                <label className="ml-2">
                  <Field
                    name="filiacao2_consta"
                    component="input"
                    type="checkbox"
                  />{" "}
                  consta na certidão
                </label>
              </h2>
              {values.filiacao2_consta && (
                <Fragment>
                  <Field
                    label="Nome Completo"
                    name="filiacao2_nome"
                    component={InputText}
                    type="text"
                    placeholder="Nome completo"
                    required
                    validate={composeValidators(
                      required,
                      somenteCaracteresEEspacos
                    )}
                    toUppercaseActive
                  />
                  <div className="row mt-2">
                    <div className="col-3">
                      <label>
                        <span>* </span>Falecido?
                      </label>
                      <div>
                        <label>
                          <Field
                            name="filiacao2_falecido"
                            component="input"
                            type="radio"
                            value="true"
                          />{" "}
                          Sim
                        </label>
                        <label className="ml-3">
                          <Field
                            name="filiacao2_falecido"
                            component="input"
                            type="radio"
                            value="false"
                          />{" "}
                          Não
                        </label>
                      </div>
                    </div>
                    <div className="col-5">
                      <label>
                        <span>* </span>Sexo
                      </label>
                      <div>
                        <label>
                          <Field
                            name="filiacao2_sexo"
                            component="input"
                            type="radio"
                            value="M"
                          />{" "}
                          Masculino
                        </label>
                        <label className="ml-3">
                          <Field
                            name="filiacao2_sexo"
                            component="input"
                            type="radio"
                            value="F"
                          />{" "}
                          Feminino
                        </label>
                      </div>
                    </div>
                    <div className="col-4">
                      <Field
                        component={Select}
                        name="filiacao2_nacionalidade"
                        label="Nacionalidade"
                        options={NACIONALIDADES}
                        required
                        validate={required}
                        naoDesabilitarPrimeiraOpcao
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </section>
            <section className="responsavel">
              <h2>Responsável pela Criança</h2>
              <div className="row mt-2">
                <div className="col-6">
                  <label>
                    <span>* </span>Quem é o responsável?
                  </label>
                  <div>
                    <label>
                      <Field
                        name="tipo_responsavel"
                        component="input"
                        type="radio"
                        value="1"
                      />{" "}
                      Filiação 1
                    </label>
                    <label className="ml-3">
                      <Field
                        name="tipo_responsavel"
                        component="input"
                        type="radio"
                        value="2"
                      />{" "}
                      Filiação 2
                    </label>
                    <label className="ml-3">
                      <Field
                        name="tipo_responsavel"
                        component="input"
                        type="radio"
                        value="3"
                      />{" "}
                      Outro
                    </label>
                  </div>
                  <OnChange name="tipo_responsavel">
                    {async (value, previous) => {
                      if (value === "1") {
                        values.nome_responsavel = values.filiacao1_nome;
                      } else if (value === "2") {
                        values.nome_responsavel = values.filiacao2_nome;
                      }
                    }}
                  </OnChange>
                </div>
                {values.tipo_responsavel === "3" && (
                  <div className="col-6">
                    <Field
                      label="Grau de Relação com a Criança"
                      name="parentesco_responsavel"
                      component={InputText}
                      type="text"
                      placeholder="Ex: Tia, Avó"
                      required
                      validate={composeValidators(
                        required,
                        somenteCaracteresEEspacos
                      )}
                      toUppercaseActive
                    />
                  </div>
                )}
              </div>
              <Field
                label="Nome Completo do Responsável"
                name="nome_responsavel"
                component={InputText}
                type="text"
                placeholder="Nome completo do responsável"
                required
                validate={composeValidators(
                  required,
                  somenteCaracteresEEspacos
                )}
                toUppercaseActive
                disabled={
                  !values.tipo_responsavel ||
                  values.tipo_responsavel === "1" ||
                  values.tipo_responsavel === "2"
                }
              />
              <div className="row">
                <div className="col-6">
                  <Field
                    component={InputText}
                    parse={formatString("999.999.999-99")}
                    label="CPF do responsável"
                    name="cpf_responsavel"
                    required
                    validate={composeValidators(required, validaCPF)}
                    placeholder="Digite o CPF"
                  />
                </div>
                <div className="col-6">
                  <Field
                    label="Data de nascimento do responsável"
                    component={InputComData}
                    name="dt_nasc_responsavel"
                    showMonthDropdown
                    showYearDropdown
                    required
                    validate={required}
                  />
                </div>
              </div>
              <Field
                component={InputText}
                placeholder={"E-mail do responsável"}
                label="E-mail do responsável"
                name="email_responsavel"
                required
                type="text"
                validate={composeValidators(required, validaEmail)}
              />
            </section>
            <div className="row pt-3">
              <div className="col-12 text-right">
                <Botao
                  texto="Enviar"
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.BLUE}
                  disabled={submitting || pristine}
                />
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};
