import FormularioPage from "../pages/FormularioPage";
import CadastroComSucessoPage from "../pages/CadastroComSucessoPage";

export const routes = [
  {
    path: "/",
    component: FormularioPage,
    exact: true
  },
  {
    path: "/cadastro-sucesso",
    component: CadastroComSucessoPage,
    exact: true
  },
];
