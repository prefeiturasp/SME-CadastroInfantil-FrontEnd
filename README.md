
# Cadastro Infantil

> Para as  **famílias e responsáveis dos estudantes**

> Que  **gostariam de inscrever as crianças na Educação Infantil sem a necessidade do atendimento presencial**

> O  **Cadastro Infantil**

> É um  **formulário online**

> Que  **possibilita o pré-cadastro na rede municipal de educação**

> Diferentemente da **necessidade de atendimento presencial**

> O Nosso produto  **possibilita que as famílias registrem o interesse de ingresso na Educação Infantil**

**Conteúdo:**

1.  [Sobre o Time](#sobre-o-time)

2.  [Sobre o Produto](#sobre-o-produto)

3.  [Como surgiu](#como-surgiu)

4.  [Links Úteis](#links-úteis)

5.  [Comunicação](#comunicação)

6.  [Como contribuir](#como-contribuir)

7.  [Repositórios](#repositórios)

8.  [Documentações Auxiliares](#documentações-auxiliares)

9.  [Instalação e Configuração](#instalação-e-configuração)

----------

## [](#sobre-o-time)Sobre o Time:

| Papel | Titular | Suplente  
|--|--|--|  
| Product Owner | André Sanches, Fátima Abrão | |  
| Agente de Governança | Vítor Ferragini | Fernando |  
| Gerente de Projeto | Aline Freitas | |  
| Scrum Master | Marcos Nastri | |  
| Analista de negócios | Fabrício Ramalho | |  
| Analista Programador | @CalvinRossinhole, @giusepper11, @kelwys | |  

## [](#sobre-o-produto)Sobre o Produto

### [](#objetivos-de-negocio)Objetivos de Negócio

O Cadastro Infantil é um formulário online para realização do pré-cadastro de crianças na Educação Infantil da rede municipal de educação. Com isso, a SME apoia as orientações dos órgãos de saúde de evitar aglomerações e garante maior facilidade e agilidade no momento de inscrição.

**O que é/Faz**

- Um formulário para cadastro da intenção de matrícula na Educação Infantil da rede municipal de São Paulo

**O que não é/não faz**

- Não garante a efetivação da matrícula

- Não realiza todo o processo de matrícula que deve ser seguido de acordo com legislação

### [](#personas)Personas

- Famílias e responsáveis:

> Necessidades: público bastante heterogêneo que gostaria de cadastrar as crianças na Educação Infantil da rede pública

> O que consideram valioso: garantir uma vaga da educação infantil próximo a sua residência e realizar o cadastro com facilidade para a rede municipal inteira

- DRE:

> Necessidade: receber da SME os cadastros realizados no sistema

- SME:

> Necessidade: encaminhar cadastro para as DREs responsáveis inserirem o cadastro no sistema

> O que consideram valioso: acompanhar se todos os cadastros foram realizados

### [](#funcionalidades)Funcionalidades

- Formulário de cadastro de interesse, com e-mail automatizado de confirmação de realização de cadastro

### [](#jornadas)Jornadas

- Família faz cadastro

- SME recebe cadastro e repassa para DRE

- DRE faz cadastro no Eol e retorna para SME

- SME envia e-mail para cadastrante com número do protocolo pelo e-mail próprio do Cadastro Infantil

### [](#roadmap)Roadmap

Não há roadmap previsto, uma vez que a evolução desse produto é realizar o cadastro diretamente via Eol.

## [](#como-surgiu)Como surgiu

### [](#fase-de-descoberta)Fase de Descoberta:

Surgiu da necessidade das famílias e responsáveis realizarem o cadastro na Educação Infantil da rede municipal de ensino durante o período que as escolas estavam com horário reduzido por conta da pandemia.

Com essa situação, identificou-se a possibilidade de criação de um modelo remoto de cadastro para garantir o atendimento a todas as famílias que buscam uma vaga na Educação Infantil na rede municipal.

**Entrevista com a área de negócio:**

Não houve etapa oficial de descoberta por conta da urgência da demanda, mas existiu um momento de pesquisa interna com área de negócios para melhorias no produto.

**Oficina sobre Ateste:**

Não houve oficina de ateste com usuários finais, mas existiram diversos testes internos para melhorias no produto antes do lançamento e também melhorias identificadas a partir de experiências com os primeiros cadastros.

### [](#prototipos)Protótipos:

O protótipo foi criado a partir de documentos produzidos pela área com as informações necessárias para a realização do cadastro infantil.

### [](#testes-de-usabilidade)Testes de Usabilidade:

Não houve oficina de ateste com usuários finais, mas existiram diversos testes internos para melhorias no produto antes do lançamento e também melhorias identificadas a partir de experiências com os primeiros cadastros.

## [](#links-uteis)Links Úteis:

**Homologação:**
https://hom-cadastroinfantil.sme.prefeitura.sp.gov.br/

**Produção:**
https://cadastroinfantil.sme.prefeitura.sp.gov.br/
## [](#comunicacao)Comunicação:

Canal de comunicação

E-mail:
- Alinhamento sobre o produto.
- Comunicar novidades sobre o produto.



## [](#como-contribuir)Como contribuir

Contribuições são **super bem vindas**! Se você tem vontade de construir o pré cadastro infantil conosco, veja o nosso  [guia de contribuição](https://github.com/prefeiturasp/SME/blob/master/docs/CONTRIBUTING.md)  onde explicamos detalhadamente como trabalhamos e de que formas você pode nos ajudar a alcançar nossos objetivos. Lembrando que todos devem seguir nosso  [código de conduta](https://github.com/prefeiturasp/SME/blob/master/docs/CODEOFCONDUCT.md).

## [](#repositorios)Repositórios:

[SME-CADASTRO INFANTIL - FRONT]
https://github.com/prefeiturasp/SME-CadastroInfantil-FrontEnd

[SME-CADASTRO INFANTIL - BACK]
https://github.com/prefeiturasp/SME-CadastroInfantil-BackEnd

## [](#documentacoes-auxiliares)Documentações Auxiliares:

Não se aplica.

## [](#instalacao-e-configuracao)Instalação e Configuração:

## Pré-requisitos

-   npm
-   git

Instruções
---------------

Após clonar o projeto, execute o comando para instalar as bibliotecas utilizadas:

    $ npm install
  
Configurando as variáveis de ambiente
---------------------------
Crie um arquivo *.env* na raiz do projeto. Nele, utilize a variável **REACT_APP_API_URL** com o endereço do backend para realizar as requisições.

    conf
    public
    node_modules
    src
    .env

Execução do projeto
-------------
Para rodar o projeto, basta:

    $ npm start
