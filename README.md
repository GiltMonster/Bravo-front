# Bravo - PI

O Bravo é um projeto do 3º semestre da faculdade, onde o objetivo final é um e-commerce igual ao [Fox](https://github.com/GiltMonster/Fox_PI) onde foi feito durante o 2º semestre, mas como eu quero sair um pouco da curva, decide sair um pouco da curva quando se refere a tecnologias então vamos para as stacks utilizadas:

## Stack utilizada

**Front-end:** Ionic, Angular;

**Back-end:** Laravel;

**Banco de dados:** MySQL;

## Instalação

Os pre requisitos para rodar o projeto local voce precisa ter instalado na sua maquina:

- Node.js
- API do projeto rodando

Tendo isso, siga os passos abaixo:

Vá para a pasta do projeto:

```bash
cd Bravo-front/
```

Rode o comando abaixo para instalar as dependências:

```bash
npm install
```

Rode o comando abaixo para rodar o projeto:

```bash
ionic serve
```

## Build

Para buildar o projeto para Android ou iOS, siga os passos abaixo, lembrando que para buildar para iOS você precisa de um Mac e o Xcode instalado, o projeto utiliza o capacitor para buildar para Android e iOS, então vamos usar a cli do capacitor ja integrado com a do ionic para fazer o trabalho pesado:

```bash
ionic cap add *platform*
```

Substitua o *platform* pelo sistema operacional que você deseja buildar, no caso do Android seria android e para iOS seria ios, lembrando que para utilizar tanto o Android studio quanto o Xcode você precisa ter o ambiente de desenvolvimento configurado na sua maquina, como as variáveis de ambiente do Android Studio, Android SDK e o Xcode (para iOS).

- Rode o comando abaixo rodar o build com o auxilio do Xcode ou android studio:

```bash
ionic cap run *platform*
```

- Voce pode abrir o projeto no Xcode ou android studio e rodar o build por lá ja com os simuladores

```bash
ionic cap open *platform*
```

## Desenvolvimento


Testar as gerações de erar ícones e splash screens pelo cordova:

```bash
cordova-res --skip-config --copy
```

## Desenvolvedores

|          |               **GitHub**             |
|----------------|-----------------------------|
| [![@GiltMonster](https://avatars.githubusercontent.com/u/71074779?s=64&v=4)](https://github.com/GiltMonster)   |      [**GiltMonster**](https://github.com/GiltMonster) - Lucas Santos 🚁
