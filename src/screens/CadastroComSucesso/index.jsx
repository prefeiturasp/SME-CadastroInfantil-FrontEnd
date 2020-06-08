import React, { Component } from "react";
import "./style.scss";

class CadastroComSucesso extends Component {
  render() {
    return (
      <div className="container">
        <div className="card card-success">
          Pré Cadastro efetuado com sucesso.
          <br />
          <br />
          Aguarde o contato da Diretoria Regional de Educação da sua região.{" "}
          <br />
          <br />
          <span>Protocolo: 000001</span>
        </div>
      </div>
    );
  }
}

export default CadastroComSucesso;
