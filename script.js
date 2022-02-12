const usuarios = document.querySelector(".usuarios");
const conteudoMensagem = document.querySelector(".conteudo-mensagem");
const fundoMenu = document.querySelector(".fundo-menu");

let nomeUsuario = { name: "" };
let users = [];

// Entrar na sala

function entrarNaSala(botao) {
    nomeUsuario.name = document.querySelector(".tela-inicial input").value;
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nomeUsuario);
    requisicao.then(sucessoLogin).catch(erroLogin);
    setInterval(recarregarPagina, 3000);
    setInterval(manterConexao, 5000);
}

function sucessoLogin(resposta) {
    segundaTela();
    recarregarMensagens();
}

function erroLogin(erro) {
    nomeUsuario.name = "";
    const mensagemErro = document.querySelector(".mensagem-erro");
    mensagemErro.classList.remove("escondido");
}

// Buscar mensagem do servidor

function recarregarMensagens() {
    let carregarMensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    carregarMensagens.then(buscarDados).catch(error);
}

function buscarDados(resposta) {
    const dados = resposta.data;
    imprimirMensagens(dados);
}

function error() {
    console.log("Erro");
}

// Tela aguardando

function segundaTela() {
    const div = document.querySelector(".tela-inicial");
    div.innerHTML = `
    <div class="tela-aguardando">
        <img src="images/logo.svg" alt="logo">
        <div class="loading"><img src="images/load.png" alt="loading"></div>
        <p>Entrando...</p>
    </div>`
    setTimeout(aguardando, 1500);
}

function aguardando() {
    const telaInicial = document.querySelector(".tela-inicial");
    telaInicial.classList.remove("tela-inicial");
    const telaAguardando = document.querySelector(".tela-aguardando");
    telaAguardando.classList.remove("tela-aguardando");
    telaAguardando.innerHTML = "";
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
    const elementoScroll = document.querySelector(".container").lastElementChild;
    elementoScroll.scrollIntoView();
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

// Barra lateral 

function barraLateral() {
    usuarios.parentNode.classList.remove("escondido");
    fundoMenu.classList.remove("escondido");
    
    const listaParticipantes = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    listaParticipantes.then(listarUsuarios);
}

function listarUsuarios(resposta) {
    users = resposta.data;

    for (let i = 0; i < users.length; i++) {
        let usuario = users[i].name;
        console.log(usuario);
        usuarios.innerHTML += `
        <div class="infos" onclick = "selecionar(this)">
            <ion-icon name="person-circle"></ion-icon>
            <p>${usuario}</p>
            <ion-icon class="check users escondido" name="checkmark"></ion-icon>
        </div> `
    }
}

function esconderMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.add("escondido");  
    fundoMenu.classList.add("escondido");
}   

function selecionar(selecionado) {
    desmarcar(".users");
    let icon = selecionado.querySelector(".check");
    icon.classList.remove("escondido");
}

function selecionarVisibilidade(selecionado) {
    desmarcar(".visible");
    let icon = selecionado.querySelector(".check");
    icon.classList.remove("escondido");
}

function desmarcar(classe) {
    const desmarca = document.querySelectorAll(classe);
    
    desmarca.forEach(function (parametro) {
        parametro.classList.add("escondido");
    });
}

// Enviar mensagem para o servidor

function mandarMensagem() {
    let enviarMensagem = {
        from: nomeUsuario.name,
        to: "Todos",
        text: conteudoMensagem.value,
        type: "message" 
    }

    const request = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", enviarMensagem);
    request.then(mensagemInput).catch(erroNaMensagem);
}

function mensagemInput(resposta) {
    conteudoMensagem.value = "";
}

function erroNaMensagem(erro) {
    window.location.reload();
}

// Envio com enter

conteudoMensagem.addEventListener('keyup', function(e) {
    let key = e.keyCode;
    if (key == 13) { 
        mandarMensagem();
    }
});
    
// Manter conectado

function manterConexao() {
    const manterConectado = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nomeUsuario);
    manterConectado.then();
}

// Recarregar página

function recarregarPagina() {
    recarregarMensagens();
}
