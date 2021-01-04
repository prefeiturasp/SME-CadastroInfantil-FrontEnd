import React, { useState, Fragment } from "react";
import moment from "moment";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputText } from "../../components/Input/InputText";
import { InputFile } from "../../components/Input/InputFile";
import { InputComData } from "../../components/DatePicker";
import {
  composeValidators,
  required,
  somenteCaracteresEEspacos,
  validaCEP,
  validaRangeCEP,
  validaCPF,
  validaEmail,
  validaTelefoneOuCelular,
  somenteAlfanumericos,
  apenasUmEspaco,
  semLetraSolta,
} from "../../helpers/validators";
import Select from "../../components/Select";
import { NACIONALIDADES } from "../../constants/NACIONALIDADES";
import { UF_ESTADOS } from "../../constants/UF_ESTADOS";
import {
  arrayToOptions,
  getError,
  agregarDefault,
  deepCopy,
} from "../../helpers/helpers";
import { NECESSIDADES_ESPECIAIS } from "../../constants/NECESSIDADES_ESPECIAIS";
import formatString from "format-string-by-pattern";
import { getEnderecoPorCEP } from "../../services/cep.service";
import Botao from "../../components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../components/Botao/constants";
import { postFormulario } from "../../services/formulario.service";
import { formataPayload } from "./helper";
import "./style.scss";
import {
  toastError,
  toastSuccess,
  toastWarn,
} from "../../components/Toast/dialogs";
import CadastroComSucesso from "../CadastroComSucesso";
import { RadioButtonSexo } from "./components/RadioButtonSexo";
import { RadioButtonGenerico } from "./components/RadioButtonGenerico";
import { RACAS_CORES } from "./constants";
import { RadioButtonSimNao } from "./components/RadioButtonSimNao";

export const Formulario = () => {
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [protocolo, setProtocolo] = useState("");
  const [apiCEPfora, setApiCEPfora] = useState(false);

  const removeFile = (index) => {
    files.splice(index, 1);
    setFiles(files);
  };

  const onSubmit = async (values) => {
    if (files.length === 0) {
      toastWarn("Anexe a Certidão de nascimento da criança");
    } else {
      let copyValues = deepCopy(values);
      const payload = { dados: formataPayload(copyValues, files) };
      await postFormulario(payload).then((response) => {
        if (response.status === HTTP_STATUS.CREATED) {
          setSubmitted(true);
          toastSuccess("Pré-Cadastro realizado com sucesso");
          setProtocolo(response.data.protocolo);
        } else {
          toastError(getError(response.data));
        }
      });
    }
  };

  return (
    <div>
      {submitted ? (
        protocolo && <CadastroComSucesso protocolo={protocolo} />
      ) : (
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
            nome_irmao: "",
          }}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <section className="crianca">
                <h2>Dados da Criança</h2>
                <Field
                  label="Nome completo da criança"
                  name="nome_crianca"
                  component={InputText}
                  maxlength={255}
                  type="text"
                  placeholder="Nome completo da criança"
                  required
                  toUppercaseActive
                  validate={composeValidators(
                    required,
                    somenteCaracteresEEspacos,
                    apenasUmEspaco,
                    semLetraSolta
                  )}
                />
                <div className="row mt-2">
                  <div className="col-sm-6 col-12">
                    <RadioButtonSexo
                      name="sexo_crianca"
                      label="Sexo da criança"
                      required
                    />
                  </div>
                  <div className="col-sm-6 col-12">
                    <Field
                      label="Data de nascimento da criança"
                      component={InputComData}
                      name="dt_nasc_crianca"
                      showMonthDropdown
                      showYearDropdown
                      minDate={moment(
                        `${moment().year() - 6}-04-01`,
                        "YYYY-MM-DD"
                      ).toDate()}
                      maxDate={moment().toDate()}
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
                        : "col-sm-6 col-12"
                    }
                  >
                    <Field
                      component={Select}
                      name="nacionalidade_crianca"
                      label="País de origem da criança"
                      options={NACIONALIDADES}
                      required
                      validate={required}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  {values.nacionalidade_crianca !== "Brasil" && (
                    <div className="col-sm-6 col-12">
                      <Field
                        label="Data de entrada da criança no país"
                        component={InputComData}
                        name="dt_entrada_brasil"
                        minDate={
                          moment(values.dt_nasc_crianca, "DD-MM-YYYY")._d
                        }
                        maxDate={moment().toDate()}
                        showMonthDropdown
                        showYearDropdown
                        required
                        validate={required}
                        disabled={!values.dt_nasc_crianca}
                        showHelpText={!values.dt_nasc_crianca}
                        helpText={
                          "Para habilitar este campo, preencha a data de nascimento da criança"
                        }
                      />
                    </div>
                  )}
                </div>
                {values.nacionalidade_crianca === "Brasil" && (
                  <div className="row">
                    <div className="col-sm-6 col-12">
                      <Field
                        component={Select}
                        name="uf_nasc_crianca"
                        label="UF de nascimento da criança"
                        options={UF_ESTADOS}
                        required
                        validate={required}
                        naoDesabilitarPrimeiraOpcao
                      />
                    </div>
                    <div className="col-sm-6 col-12">
                      <Field
                        component={Select}
                        name="municipio_nasc_crianca"
                        label="Município de nascimento da criança"
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
                    <RadioButtonGenerico
                      name="raca_cor_crianca"
                      label="Raça/cor"
                      options={RACAS_CORES}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6 col-12">
                    <RadioButtonSimNao
                      name="tem_nee"
                      label="Possui alguma deficiência?"
                      required
                    />
                  </div>
                  {values.tem_nee === "S" && (
                    <div className="col-sm-6 col-12">
                      <Field
                        component={Select}
                        name="tipo_nee"
                        label="Tipo de deficiência"
                        options={agregarDefault(
                          arrayToOptions(NECESSIDADES_ESPECIAIS)
                        )}
                        required
                        validate={required}
                        naoDesabilitarPrimeiraOpcao
                      />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    <Field
                      component={InputText}
                      parse={formatString("12345-678")}
                      label="CEP da criança"
                      name="cep_moradia"
                      required
                      validate={composeValidators(required, validaCEP, validaRangeCEP)}
                      placeholder="Digite o CEP"
                    />
                    <OnChange name="cep_moradia">
                      {async (value, previous) => {
                        if (value.length === 9) {
                          const response = await getEnderecoPorCEP(value);
                          if (response.status === HTTP_STATUS.OK) {
                            if (response.data.resultado === "0") {
                              toastError("CEP não encontrado");
                              values.endereco_moradia = "";
                            } else if (
                              response.data.uf !== "SP" ||
                              response.data.cidade !== "São Paulo"
                            ) {
                              toastError("CEP não é do município de São Paulo");
                              values.endereco_moradia = "";
                            } else {
                              values.endereco_moradia =
                                response.data.tipo_logradouro +
                                " " +
                                response.data.logradouro;
                            }
                          } else {
                            setApiCEPfora(true);
                          }
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-sm-8 col-12">
                    <Field
                      component={InputText}
                      label="Endereço residencial da criança"
                      name="endereco_moradia"
                      required
                      validate={required}
                      disabled={!apiCEPfora}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    <Field
                      component={InputText}
                      maxlength={255}
                      label="Número"
                      name="numero_moradia"
                      required
                      validate={composeValidators(
                        required,
                        somenteAlfanumericos
                      )}
                      toUppercaseActive
                    />
                  </div>
                  <div className="col-sm-8 col-12">
                    <Field
                      component={InputText}
                      maxlength={20}
                      label="Complemento"
                      name="complemento_moradia"
                      validate={somenteAlfanumericos}
                      toUppercaseActive
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <RadioButtonSimNao
                      name="irmao_na_rede"
                      label="A criança tem irmão matriculado em escola municipal de educação infantil?"
                      required
                    />
                  </div>
                  {values.irmao_na_rede === "S" && (
                    <div className="col-12">
                      <Field
                        label="Nome completo do irmão"
                        name="nome_irmao"
                        component={InputText}
                        maxlength={255}
                        type="text"
                        placeholder="Nome completo do irmão"
                        required
                        toUppercaseActive
                        validate={composeValidators(
                          required,
                          somenteCaracteresEEspacos
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <label>
                      <span>* </span>Certidão de nascimento da criança
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
                  label="Nome completo"
                  name="filiacao1_nome"
                  component={InputText}
                  maxlength={255}
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
                  <div className="col-sm-3 col-12">
                    <RadioButtonSimNao
                      name="filiacao1_falecido"
                      label="Falecido?"
                      required
                      onClickSim={() => {
                        values.tipo_responsavel =
                          values.filiacao2_falecido === "S" ||
                          !values.filiacao2_consta
                            ? "3"
                            : null;
                        values.nome_responsavel = null;
                      }}
                    />
                  </div>
                  <div className="col-sm-5 col-12">
                    <RadioButtonSexo
                      name="filiacao1_sexo"
                      label="Sexo Filiação 1"
                      required
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <Field
                      component={Select}
                      name="filiacao1_nacionalidade"
                      label="País de origem"
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
                      onClick={() => {
                        values.tipo_responsavel =
                          values.filiacao2_consta &&
                          values.filiacao1_falecido === "S"
                            ? "3"
                            : values.filiacao2_consta
                            ? null
                            : values.tipo_responsavel;
                        values.nome_responsavel = values.filiacao2_consta
                          ? null
                          : values.nome_responsavel;
                        values.filiacao2_nome = values.filiacao2_consta
                          ? null
                          : values.filiacao2_nome;
                        values.filiacao2_falecido = values.filiacao2_consta
                          ? null
                          : values.filiacao2_falecido;
                        values.filiacao2_sexo = values.filiacao2_consta
                          ? null
                          : values.filiacao2_sexo;
                        values.filiacao2_nacionalidade = values.filiacao2_consta
                          ? "Brasil"
                          : values.filiacao2_nacionalidade;
                      }}
                    />{" "}
                    consta na certidão
                  </label>
                </h2>
                {values.filiacao2_consta && (
                  <Fragment>
                    <Field
                      label="Nome completo"
                      name="filiacao2_nome"
                      component={InputText}
                      maxlength={255}
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
                      <div className="col-sm-3 col-12">
                        <RadioButtonSimNao
                          name="filiacao2_falecido"
                          label="Falecido?"
                          onClickSim={() => {
                            values.tipo_responsavel =
                              values.filiacao1_falecido === "S" ? "3" : null;
                            values.nome_responsavel = null;
                          }}
                          required
                        />
                      </div>
                      <div className="col-sm-5 col-12">
                        <RadioButtonSexo
                          name="filiacao2_sexo"
                          label="Sexo Filiação 2"
                          required
                        />
                      </div>
                      <div className="col-sm-4 col-12">
                        <Field
                          component={Select}
                          name="filiacao2_nacionalidade"
                          label="País de origem"
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
                  <div className="col-sm-6 col-12">
                    <label>
                      <span>* </span>Quem é o responsável?
                    </label>
                    <div>
                      <label>
                        <Field
                          name="tipo_responsavel"
                          component="input"
                          type="radio"
                          required
                          value="1"
                          disabled={
                            !values.filiacao1_nome ||
                            values.filiacao1_falecido === "S"
                          }
                          onClick={() =>
                            (values.nome_responsavel = values.filiacao1_nome)
                          }
                        />{" "}
                        Filiação 1
                      </label>
                      <label className="ml-3">
                        <Field
                          name="tipo_responsavel"
                          component="input"
                          type="radio"
                          required
                          value="2"
                          disabled={
                            !values.filiacao2_nome ||
                            !values.filiacao2_consta ||
                            values.filiacao2_falecido === "S"
                          }
                          onClick={() =>
                            (values.nome_responsavel = values.filiacao2_nome)
                          }
                        />{" "}
                        Filiação 2
                      </label>
                      <label className="ml-3">
                        <Field
                          name="tipo_responsavel"
                          component="input"
                          type="radio"
                          required
                          value="3"
                          onClick={() => (values.nome_responsavel = "")}
                        />{" "}
                        Outro
                      </label>
                    </div>
                  </div>
                  {values.tipo_responsavel === "3" && (
                    <div className="col-sm-6 col-12">
                      <Field
                        label="Grau de Parentesco com a Criança"
                        name="parentesco_responsavel"
                        component={InputText}
                        maxlength={255}
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
                  label="Nome completo do responsável"
                  name="nome_responsavel"
                  component={InputText}
                  maxlength={255}
                  type="text"
                  placeholder="Nome completo do responsável"
                  required
                  validate={composeValidators(
                    required,
                    somenteCaracteresEEspacos
                  )}
                  toUppercaseActive
                />
                <div className="row">
                  <div className="col-sm-6 col-12">
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
                  <div className="col-sm-6 col-12">
                    <Field
                      label="Data de nascimento do responsável"
                      component={InputComData}
                      name="dt_nasc_responsavel"
                      maxDate={
                        moment(values.dt_nasc_crianca, "DD-MM-YYYY").subtract(
                          12,
                          "years"
                        )._d
                      }
                      showMonthDropdown
                      showYearDropdown
                      required
                      validate={required}
                      disabled={!values.dt_nasc_crianca}
                      helpText={
                        values.dt_nasc_crianca
                          ? "Ao menos 12 anos mais velho que a criança"
                          : "Para habilitar este campo, preencha a data de nascimento da criança"
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={InputText}
                      placeholder={"E-mail do responsável"}
                      label="E-mail do responsável"
                      name="email_responsavel"
                      type="text"
                      validate={composeValidators(validaEmail)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <Field
                      component={InputText}
                      placeholder={"Telefone 1 do responsável"}
                      label="Telefone 1 do responsável"
                      parse={
                        values.telefone_responsavel &&
                        values.telefone_responsavel.length + 1 <= 14
                          ? formatString("(99) 9999-9999")
                          : formatString("(99) 99999-9999")
                      }
                      name="telefone_responsavel"
                      required
                      type="text"
                      validate={composeValidators(
                        required,
                        validaTelefoneOuCelular
                      )}
                    />
                  </div>
                  <div className="col-sm-6 col-12">
                    <Field
                      component={InputText}
                      placeholder={"Telefone 2 do responsável"}
                      parse={
                        values.telefone_opcional &&
                        values.telefone_opcional.length + 1 <= 14
                          ? formatString("(99) 9999-9999")
                          : formatString("(99) 99999-9999")
                      }
                      label="Telefone 2 do responsável"
                      name="telefone_opcional"
                      type="text"
                      validate={composeValidators(validaTelefoneOuCelular)}
                    />
                  </div>
                </div>
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
              <div className="duvidas-email">
                <p>Dúvidas? Entre em contato pelo e-mail: <a href = "mailto: cadastroinfantil@sme.prefeitura.sp.gov.br">cadastroinfantil@sme.prefeitura.sp.gov.br</a></p>
              </div>
            </form>
          )}
        />
      )}
    </div>
  );
};

export default Formulario;

