import React, { Component } from "react";
import logoPrefeitura from "../../assets/img/logo-prefeitura.png";
import iconFacebook from "../../assets/img/icon-facebook.png";
import iconInsta from "../../assets/img/icon-insta.png";
import iconYoutube from "../../assets/img/icon-youtube.png";
import seloCommonsCreative from "../../assets/img/selo-commons-creative.png";
import "./rodape.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faComment,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";

export default class Rodape extends Component {
  selectHref(value) {
    window.location.href = value;
  }

  render() {
    return (
      <footer id="rodape">
        <div className="container pt-4 pb-4" id="irrodape">
          <div className="row">
            <div className="col-sm-3 align-middle d-flex align-items-center logo-rodape">
              <a href="https://www.capital.sp.gov.br/">
                <img
                  src={logoPrefeitura}
                  alt="SME Portal Institucional"
                  className="img-fluid"
                ></img>
              </a>
            </div>
            <div className="col-sm-3 align-middle bd-contact">
              <p className="footer-title">
                Secretaria Municipal de <br />
                Educação
              </p>
              <p className="tamanho-13">
                <FontAwesomeIcon
                  style={{ color: "#fff", marginRight: "3px" }}
                  icon={faMapMarker}
                />
                Rua Borges Lagoa, 1230
                <br />
                Vila Clementino
                <br />
                CEP: 04038-003
              </p>
            </div>
            <div className="col-sm-3 align-middle">
              <p className="footer-title">Contatos</p>
              <p className="tamanho-14">
                <FontAwesomeIcon
                  style={{ color: "#fff", marginRight: "3px" }}
                  icon={faPhone}
                />
                <a className="fonte-cor-branca" href="tel:156">
                  156
                </a>
              </p>
              <p className="tamanho-14">
                <FontAwesomeIcon
                  style={{ color: "#fff", marginRight: "3px" }}
                  icon={faComment}
                />
                <a
                  className="fonte-cor-branca"
                  href="https://educacao.sme.prefeitura.sp.gov.br/lista-de-servidores-e-contatos/"
                >
                  Lista de Servidores e Contatos
                </a>
              </p>
              <p className="footer-title">Redes sociais</p>
              <div className="row redes-footer">
                <div className="col-auto pr-0">
                  <a href="https://www.facebook.com/EducaPrefSP/">
                    <img
                      src={iconFacebook}
                      alt="Ir para Facebook da Secretaria"
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
                <div className="col-auto pr-0">
                  <a href="https://www.instagram.com/EducaPrefSP/">
                    <img
                      src={iconInsta}
                      alt="Ir para Instagram da Secretaria"
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
                <div className="col-auto pr-0">
                  <a href="https://www.youtube.com/EducaPrefSP">
                    <img
                      src={iconYoutube}
                      alt="Ir para YouTube da Secretaria"
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 align-middle text-center px-0">
              <figure className="figure-creative-commons">
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR">
                  <img
                    src={seloCommonsCreative}
                    alt="Logotipo Creative Commons. Ir para um link externo da Página Inicial da Creative Commons que é uma organização mundial sem fins lucrativos que permite o compartilhamento e a reutilização da criatividade e do conhecimento por meio do fornecimento de ferramentas gratuitas."
                    className="img-fluid"
                  ></img>
                </a>
              </figure>
              <p className="tamanho-13 mt-2">
                Esta obra está licenciada com uma Licença Creative Commons
                Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
