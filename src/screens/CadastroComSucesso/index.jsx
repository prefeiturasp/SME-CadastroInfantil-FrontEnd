import React, { Component } from "react";
import "./style.scss";
import Botao from "../../components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../components/Botao/constants";

class CadastroComSucesso extends Component {
  render() {
    const { protocolo } = this.props;
    return (
      <div className="container">
        <div className="card card-success">
          Pré-Cadastro Infantil efetuado com sucesso.
          <br />
          <br />
          Aguarde o contato da Diretoria Regional de Educação da sua região.{" "}
          <br />
          <br />
          <span>Número da Solicitação: {protocolo}</span>
        </div>
        <div className="row pt-3">
          <div className="col-12 text-center">
            <Botao
              texto="Novo cadastro"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE}
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CadastroComSucesso;
