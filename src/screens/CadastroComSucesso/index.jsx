import React, { Component } from "react";
import "./style.scss";

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
      </div>
    );
  }
}

export default CadastroComSucesso;
