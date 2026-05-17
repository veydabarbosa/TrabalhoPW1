# PetHub 🐾

Site fictício de pet shop desenvolvido como primeira avaliação da disciplina de Programação Web I.

## Equipe

- Nicole Bruch
- Veyda Barbosa
- Vitor Wöstehoff

## Estrutura do projeto

```
TrabalhoPW1/
├── html/
│   ├── index.html       (página inicial)
│   ├── login.html       (página de login)
│   └── cadastro.html    (página de cadastro do usuário)
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   └── amora-rique.png  (imagem da página inicial)
└── README.md
```

## Páginas

### index.html
Página inicial do site. Apresenta a identidade do PetHub com seção hero, cards de serviços e faixa de destaques. O cabeçalho mostra "Usuário não autenticado" enquanto não há sessão ativa, e exibe o nome e foto do usuário após o login.

### login.html
Tela de autenticação com campos de login e senha. O botão Autenticar só funciona se os dois campos estiverem preenchidos e as credenciais baterem com o cadastro salvo. Erros são exibidos em vermelho abaixo de cada campo.

### cadastro.html
Formulário de cadastro com 6 campos: nome, e-mail, login, senha, data de nascimento, tipo de pet, serviços de interesse e como conheceu o PetHub. Possui validação de e-mail e senha (mínimo 13 caracteres, letra maiúscula, minúscula e número). Inclui seletor de tema Default/Custom que altera a fonte dos labels e o fundo dos inputs.

## Funcionalidades

- Cadastro de usuário salvo no `localStorage`
- Login com validação das credenciais cadastradas
- Exibição do usuário autenticado no cabeçalho de todas as páginas
- Botão de sair que encerra a sessão
- Mostrar/ocultar senha nos formulários de login e cadastro
- Validação de campos com mensagens de erro inline
- Menu com submenus em todas as páginas
- Layout responsivo para mobile e desktop
- Cabeçalho e rodapé fixos
- Tema Custom/Default na página de cadastro

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)