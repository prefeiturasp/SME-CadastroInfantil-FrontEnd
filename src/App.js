import React, { useState } from "react";
import { version } from "../package.json";
import { MenuPrincipal } from "./components/Menu/MenuPrincipal";
import { MenuAcessibilidade } from "./components/Menu/MenuAcessibilidade";
import { Rodape } from "./components/Rodape/Rodape";
import Routes from "./routing/config";
import "./assets/css/styles.scss";

export const App = () => {
  const [alterarFonte, setAlterarFonte] = useState("");
  const [alterarContraste, setAlterarConstraste] = useState("");
  const [apiVersion] = useState(null);

  const handleFonte = () => {
    setAlterarFonte(!alterarFonte);
  };

  const handleConstraste = () => {
    setAlterarConstraste(!alterarContraste);
  };

  return (
    <section
      role="main"
      className={`${alterarFonte && "fonte-maior"} ${
        alterarContraste && "alto-contraste"
      }`}
    >
      <MenuAcessibilidade
        handleFonte={handleFonte}
        handleConstraste={handleConstraste}
      />
      <MenuPrincipal />
      <Routes />
      <Rodape versao={`${version} (API: ${apiVersion})`} />
    </section>
  );
};

export default App;
