/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "../../components/Input/InputText";
import { InputComData } from "../../components/DatePicker";
import "./style.scss";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

export const Formulario = () => {
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: "larry", employed: false }}
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
              />
              <div className="row mt-2">
                <div className="col-6">
                  <label>Gênero da criança</label>
                  <div>
                    <label>
                      <Field
                        name="genero"
                        component="input"
                        type="radio"
                        value="masculino"
                      />{" "}
                      Masculino
                    </label>
                    <label className="ml-3">
                      <Field
                        name="genero"
                        component="input"
                        type="radio"
                        value="feminino"
                      />{" "}
                      Feminino
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <Field
                    label="Data de nascimento da criança"
                    component={InputComData}
                    name="data_nascimento"
                    showMonthDropdown
                    showYearDropdown
                    hasIcon
                  />
                </div>
              </div>
              <Field
                label="Nome Completo do Pai da Criança"
                name="nome_pai"
                component={InputText}
                type="text"
                placeholder="Nome completo do Pai da criança"
              />
              <Field
                label="Nome Completo da Mãe da Criança"
                name="nome_mae"
                component={InputText}
                type="text"
                placeholder="Nome completo da mãe da criança"
              />
            </section>
            <section className="responsavel">
              <h2>Dados do Responsável</h2>
              <div className="row mt-2">
                <div className="col-6">
                  <label>Quem é o responsável?</label>
                  <div>
                    <label>
                      <Field
                        name="responsavel"
                        component="input"
                        type="radio"
                        value="pai"
                      />{" "}
                      Pai
                    </label>
                    <label className="ml-3">
                      <Field
                        name="responsavel"
                        component="input"
                        type="radio"
                        value="mae"
                      />{" "}
                      Mãe
                    </label>
                    <label className="ml-3">
                      <Field
                        name="responsavel"
                        component="input"
                        type="radio"
                        value="outro"
                      />{" "}
                      Outro
                    </label>
                  </div>
                </div>
              </div>
            </section>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
