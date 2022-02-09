// Tela inicial 

function entrar(botao) {
    const div = botao.parentNode;
    div.innerHTML = `
    <div class="tela-aguardando">
        <img src="images/logo.svg" alt="logo">
        <div class="loading"><img src="images/load.png" alt="loading"></div>
        <p>Entrando...</p>
    </div>`
    setTimeout(aguardando, 2000);
}

// Tela aguardando 

function aguardando() {
    const telaInicial = document.querySelector(".tela-inicial");
    telaInicial.classList.remove("tela-inicial");
    const telaAguardando = document.querySelector(".tela-aguardando");
    telaAguardando.classList.remove("tela-aguardando");
    telaAguardando.innerHTML = "";
}

// Barra lateral 

function barraLateral() {
    const fundoMenu = document.querySelector(".fundo-menu");
    fundoMenu.classList.remove("escondido");
    const menu = document.querySelector(".menu");
    menu.classList.remove("escondido");
}

function esconderMenu() {
    const fundoMenu = document.querySelector(".fundo-menu");
    fundoMenu.classList.add("escondido");
    const menu = document.querySelector(".menu");
    menu.classList.add("escondido");
}

// Buscar mensagem do servidor

function buscarDados(resposta) {
    let dados = resposta.data;
    imprimirMensagens(dados);
}

// Imprimir mensagens na tela

function imprimirMensagens(dados) {
    const mensagem = document.querySelector(".container");
    for (let i = 0; i < dados.length; i++) {   
        if (dados[i].type === "status") {
            mensagemStatus(mensagem, dados[i]);
        }   
        else if (dados[i].type === "message") {
            mensagemPublica(mensagem, dados[i]);
        }
        else {
            mensagemPrivada(mensagem, dados[i]);
        }
    }
}

function mensagemStatus(mensagem, dados) {
    mensagem.innerHTML += `
    <div class="mensagem fundo-cinza">
        <p class="horario">${dados.time}</p>
        <p class="nome">${dados.from}</p>
        <p class="acao">${dados.text}</p>
    </div>`
}

function mensagemPublica(mensagem, dados) {
    mensagem.innerHTML += `
    <div class="mensagem fundo-branco">
        <p class="horario">${dados.time}</p>
        <p class="nome">${dados.from}</p>
        <p class="para"> para <strong>${dados.to}</strong></p>
        <p class="texto">: ${dados.text}</p>
    </div>`
}

function mensagemPrivada(mensagem, dados) {
    mensagem.innerHTML += `
    <div class="mensagem fundo-rosa">
        <p class="horario">${dados.time}</p>
        <p class="nome">${dados.from}</p>
        <p class="para"> reservadamente para <strong>${dados.to}</strong></p>
        <p class="texto">: ${dados.text}</p>
    </div>`
}

const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promise.then(buscarDados);