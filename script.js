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