// ------------------------------------------------------------
// DinoFauro 🦖 – Módulo Principal do Jogo
// Versão: v1-blocos | Organização + Comentários Didáticos ✅
// ------------------------------------------------------------

// ========== [VARIÁVEIS GLOBAIS] ========== //

// Elementos do DOM (compartilhado com agent.js)
window.dinofauro = document.getElementById("dinofauro");
window.espinhudo = document.getElementById("espinhudo");

// Estados de controle
let pulandoNoAr = false;
let tempoDeSobrevivencia = 0;
let pulosRealizados = 0;
let obstaculosEvitados = 0;
let houveColisao = false;
let modoIA = true;
let jogoEmAndamento = false;
let cronometroID = null;


// ========== [FUNÇÕES DE MECÂNICA DE JOGO] ========== //

// Faz o dinofauro pular manualmente (modo jogador)
function dinofauroPula() {
  if (pulandoNoAr) return;
  pulosRealizados++;
  document.getElementById("pulos").innerText = `🦘 Pulos: ${pulosRealizados}`;
  pulandoNoAr = true;
  let altura = 0;

  const puloAlturaMax = 100;
  const velocidadeSubida = 4;
  const velocidadeDescida = 3;

  const subir = setInterval(() => {
    if (altura >= puloAlturaMax) {
      clearInterval(subir);
      const descer = setInterval(() => {
        if (altura <= 0) {
          clearInterval(descer);
          pulandoNoAr = false;
        } else {
          altura -= velocidadeDescida;
          dinofauro.style.bottom = `${altura}px`;
        }
      }, 10);
    } else {
      altura += velocidadeSubida;
      dinofauro.style.bottom = `${altura}px`;
    }
  }, 10);
}


// ========== [FUNÇÕES DE MODO JOGADOR] ========== //

function ativarTecladoJogador() {
  document.addEventListener("keydown", aoPressionarTecla);
}

function aoPressionarTecla(event) {
  if (event.code === "Space" && !houveColisao && jogoEmAndamento) {
    dinofauroPula();
  }
}


// ========== [FUNÇÕES DE MODO IA] ========== //

function iniciarIA() {
  tempoDesdeUltimoPulo = 999;
  const loopIA = setInterval(() => {
    if (houveColisao || !jogoEmAndamento || !modoIA) {
      clearInterval(loopIA);
      return;
    }

    const distancia = espinhudo.offsetLeft - dinofauro.offsetLeft;

    if (
      distancia < 120 &&
      distancia > 0 &&
      !oDinoTaPulando &&
      tempoDesdeUltimoPulo > 30
    ) {
      fazerDinoDarAquelaPulada();
      tempoDesdeUltimoPulo = 0;
    }

    tempoDesdeUltimoPulo++;
  }, 20);
}


// ========== [CONTADOR DE TEMPO] ========== //

function iniciarContadorDeTempo() {
  if (cronometroID) clearInterval(cronometroID);
  tempoDeSobrevivencia = 0;

  const formatarTempo = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const seg = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${seg}`;
  };

  cronometroID = setInterval(() => {
    if (houveColisao || !jogoEmAndamento) {
      clearInterval(cronometroID);
      cronometroID = null;
    } else {
      tempoDeSobrevivencia++;
      document.getElementById("tempo").innerText = `⏱️ Tempo: ${formatarTempo(tempoDeSobrevivencia)}`;
    }
  }, 1000);
}


// ========== [INICIALIZAÇÃO E CICLO DE JOGO] ========== //

function iniciarJogo() {
  houveColisao = false;
  jogoEmAndamento = true;

  tempoDeSobrevivencia = 0;
  pulosRealizados = 0;
  obstaculosEvitados = 0;

  document.getElementById("tempo").innerText = `⏱️ Tempo: 00:00:00`;
  document.getElementById("pulos").innerText = `🦘 Pulos: 0`;
  document.getElementById("evitados").innerText = `🧱 Evitados: 0`;
  document.getElementById("status").innerText = `🎮 Em jogo...`;

  iniciarContadorDeTempo();

  if (modoIA) {
    iniciarIA();
  } else {
    ativarTecladoJogador();
  }

  espinhudo.style.animation = "none";
  void espinhudo.offsetWidth;
  espinhudo.style.animation = "";
  espinhudo.classList.remove("pausado");
}

function resetarJogo() {
  jogoEmAndamento = false;
  houveColisao = false;

  espinhudo.classList.add("pausado");
  document.getElementById("status").innerText = "🕹️ Aguardando início...";

  document.removeEventListener("keydown", aoPressionarTecla);

  if (cronometroID) {
    clearInterval(cronometroID);
    cronometroID = null;
  }
  document.getElementById("botao-start").disabled = false;
}


// ========== [COLISÃO E LOOP PRINCIPAL] ========== //

function checarColisao() {
  if (houveColisao) return;
  const dinofauroBox = dinofauro.getBoundingClientRect();
  const espinhudoBox = espinhudo.getBoundingClientRect();

  if (
    dinofauroBox.right > espinhudoBox.left + 5 &&
    dinofauroBox.left < espinhudoBox.right - 5 &&
    dinofauroBox.bottom > espinhudoBox.top
  ) {
    houveColisao = true;
    jogoEmAndamento = false;
    document.getElementById("status").innerText = "💀 Game Over!";
    document.removeEventListener("keydown", aoPressionarTecla);
    alert("💀 Game Over! O Espinhudo venceu essa rodada...");
    resetarJogo();
  }
}

setInterval(checarColisao, 10);


// ========== [INTERAÇÃO COM A INTERFACE] ========== //

window.onload = () => {
  document.getElementById("status").innerText = "🕹️ Aguardando início...";
};

document.getElementById("botao-start").addEventListener("click", () => {
  modoIA = document.getElementById("modo-jogo").value === "ia";
  iniciarJogo();
  document.getElementById("botao-start").blur();
  document.getElementById("botao-start").disabled = true;
});

document.getElementById("botao-parar").addEventListener("click", () => {
  resetarJogo();
  document.getElementById("status").innerText = "⏸️ Jogo pausado.";
});

espinhudo.addEventListener("animationiteration", () => {
  if (jogoEmAndamento && !houveColisao) {
    obstaculosEvitados++;
    document.getElementById("evitados").innerText = `🧱 Evitados: ${obstaculosEvitados}`;
  }
});
