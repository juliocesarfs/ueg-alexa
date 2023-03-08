<div align="center">
  <img style="border: 1px solid black" width="400" src="./assets/alexa.gif"/>
</div>

# UEGênio - Assistente Virtual para alunos de Sistemas de Informação

## Sobre

Esse projeto foi desenvolvido como requisito parcial de avaliação do trabalho de conclusão de curso de Sistemas de Informação da [Universidade Estadual de Goiás - Câmpus Central](https://ueg.br/campuscentral/).<br/>
Tendo como principal objetivo auxiliar a jornada acadêmica do Estudande de Sistemas de Informação da UEG.

## Requerimentos
Para executar esse projeto é necessário que você tenha algumas ferramentas instaladas no seu dispositivo.

### Node.js
O download do Node está disponível [aqui](https://nodejs.org/pt-br/download/).
Após o download e instalação do Node.js, abra console do seu dispositivo e verifique se a instalação foi bem sucedida através do comando:
> node -v 

Deve aparecer a versão do Node.js que foi instalada.

### Yarn
Após instalar o Node.js, é necessário instalar o yarn, que é o gerenciador de pacotes do Facebook. Essa instalação é feita através do NPM, que por padrão é instalado junto com o Node.js.
> npm install -g yarn

## Execução
Instale as dependências através do comando 
> yarn install
### Definição das variáveis de ambiente
Crie um arquivo na raiz do projeto chamado .env
O arquivo .env fornece a variável que é fundamental para a comunicação com o back-end.

>baseURL
A URL base para a comunicação com o back-end

### `yarn dev`

O app será executado em modo de desenvolvimento.<br />
na porta [http://localhost:3333](http://localhost:3333)

### Vinculação com o Alexa Developer Console
Para utilizar o projeto, é necessário que você configure o endpoint do seu Alexa Developer Console.

O endpoint desse servidor pode ser "aberto" em modo desenvolvimento utilizando softwares como o [ngrok](https://ngrok.com/)

## Tecnologias

  * Nodejs
  * Typescript
  * Express
  * JWT
  * Axios
  * Alexa Skill kit (sdk)

## Recursos
    - [X] Usuário
        - [X] Vinculação de aulas
        - [X] Desvinculação de aulas
        - [X] Solicitar Informações de aulas
            - [X] Solicitar informações de aulas com o filtro de horário ou nome da disciplina
            - [X] Solicitar informações de aula que está vinculado informado apenas a data
        - [X] Solicitações
            - [X] Solicitação de notas de uma disciplina
            - [X] Solicitação de frequência de uma disciplina
  
 
