import React, { Component } from "react";
import "./style.scss";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      toggled: false,
      nome_instituicao: null,
      registro_funcional: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    const { toggled } = this.state;
    const { children, titulo } = this.props;
    return (
      <div id="wrapper" className="row">
        <div id="content-wrapper container" className="offset-md-3 col-md-6">
          <div
            className={`content-wrapper-div ${
              toggled && "toggled"
            } d-flex flex-column p-4`}
          >
            <h1 className="page-title">{titulo}</h1>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
