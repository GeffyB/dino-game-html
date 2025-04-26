// ------------------------------------------------------------
// DinoFauro 🦖 – Módulo Principal do Jogo
// Versão: v2.2-duck | Suporte a abaixar + múltiplos obstáculos
// Versão: v2.3-balance | Velocidade global uniforme nos obstáculos
// ------------------------------------------------------------

// ========== [VARIÁVEIS GLOBAIS] ========== //

// Elementos do DOM
window.dinofauro = document.getElementById("dinofauro");

// Estados de controle
let pulandoNoAr = false;
let abaixando = false;
let tempoDeSobrevivencia = 0;
let pulosRealizados = 0;
let obstaculosEvitados = 0;
let houveColisao = false;
let modoIA = true;
let jogoEmAndamento = false;
let cronometroID = null;
let intervaloSpawn = 1200;

// Controle de obstáculos
let obstaculosAtivos = [];
let velocidadeGlobalObstaculos = 4; // Novo: velocidade inicial global dos obstáculos
let logEventos = [];

// ========== [FUNÇÕES DE MECÂNICA DE JOGO] ========== //

function dinofauroPula() {
  if (pulandoNoAr || abaixando) return;
  pulandoNoAr = true;
  abaixando = false;
  pulosRealizados++;
  document.getElementById("pulos").innerText = `🦘 Pulos: ${pulosRealizados}`;

  logEventos.push({
    tempo: tempoDeSobrevivencia,
    evento: "pulo",
    agente: modoIA ? "IA" : "Jogador",
  });

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

function dinofauroAbaixa() {
  if (pulandoNoAr || abaixando) return;
  abaixando = true;
  dinofauro.style.height = "20px";
  dinofauro.style.bottom = "0px";

  logEventos.push({
    tempo: tempoDeSobrevivencia,
    evento: "abaixar",
    agente: modoIA ? "IA" : "Jogador",
  });
}

function dinofauroLevanta() {
  if (abaixando) {
    dinofauro.style.height = "40px";
    abaixando = false;
  }
}

// ========== [FUNÇÕES DE MODO JOGADOR] ========== //

function ativarTecladoJogador() {
  document.addEventListener("keydown", aoPressionarTecla);
  document.addEventListener("keyup", aoSoltarTecla);
}

function aoPressionarTecla(event) {
  if (!jogoEmAndamento || houveColisao) return;

  if (event.code === "Space") {
    dinofauroPula();
  } else if (event.code === "ArrowDown") {
    dinofauroAbaixa();
  }
}

function aoSoltarTecla(event) {
  if (!jogoEmAndamento || houveColisao) return;

  if (event.code === "ArrowDown") {
    dinofauroLevanta();
  }
}

// ========== [FUNÇÕES DE MODO IA] ========== //

function iniciarIA() {
  tempoDesdeUltimoPulo = 999;
  oDinoTaPulando = false;

  const loopIA = setInterval(() => {
    if (houveColisao || !jogoEmAndamento || !modoIA) {
      clearInterval(loopIA);
      return;
    }

    let obstaculoMaisProximo = obstaculosAtivos.find(obs => {
      const left = parseFloat(obs.style.left);
      return left > 50;
    });

    if (!obstaculoMaisProximo) return;

    const distancia = parseFloat(obstaculoMaisProximo.style.left) - 50;
    const velocidade = velocidadeGlobalObstaculos;
    const distanciaLimite = 90 + velocidade * 2.5;

    if (
      distancia < distanciaLimite &&
      distancia > 0 &&
      !oDinoTaPulando &&
      tempoDesdeUltimoPulo > 15
    ) {
      dinofauroPula();
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

      // Aumenta dificuldade a cada 20 segundos
      if (tempoDeSobrevivencia % 20 === 0) {
        velocidadeGlobalObstaculos += 0.5;
      }
    }
  }, 1000);
}

// ========== [MOVIMENTO DOS OBSTÁCULOS] ========== //

function criarObstaculo() {
  const obstaculo = document.createElement("div");
  obstaculo.classList.add("obstaculo");

  const velocidade = velocidadeGlobalObstaculos; // Agora todos iguais
  const posicaoInicial = 800 + Math.random() * 300;

  obstaculo.style.left = `${posicaoInicial}px`;
  obstaculo.dataset.velocidade = velocidade;

  document.getElementById("game-container").appendChild(obstaculo);
  obstaculosAtivos.push(obstaculo);
}

function moverObstaculos() {
  if (!jogoEmAndamento || houveColisao) return;

  obstaculosAtivos.forEach((obstaculo, index) => {
    let leftAtual = parseFloat(obstaculo.style.left);
    let velocidade = parseFloat(obstaculo.dataset.velocidade);

    obstaculo.style.left = `${leftAtual - velocidade}px`;

    if (leftAtual < -50) {
      obstaculo.remove();
      obstaculosAtivos.splice(index, 1);

      obstaculosEvitados++;
      document.getElementById("evitados").innerText = `🧱 Evitados: ${obstaculosEvitados}`;

      logEventos.push({
        tempo: tempoDeSobrevivencia,
        evento: "evitado",
        agente: modoIA ? "IA" : "Jogador",
        velocidade
      });
    }
  });

  requestAnimationFrame(moverObstaculos);
}

// ========== [INICIALIZAÇÃO E CICLO DE JOGO] ========== //

function iniciarJogo() {
  houveColisao = false;
  jogoEmAndamento = true;
  obstaculosAtivos = [];
  velocidadeGlobalObstaculos = 4; // Reseta no novo jogo

  tempoDeSobrevivencia = 0;
  pulosRealizados = 0;
  obstaculosEvitados = 0;

  document.getElementById("tempo").innerText = `⏱️ Tempo: 00:00:00`;
  document.getElementById("pulos").innerText = `🦘 Pulos: 0`;
  document.getElementById("evitados").innerText = `🧱 Evitados: 0`;
  document.getElementById("status").innerText = `🎮 Em jogo...`;

  dinofauro.style.height = "40px";
  dinofauro.style.bottom = "0px";

  iniciarContadorDeTempo();

  if (modoIA) {
    iniciarIA();
  } else {
    ativarTecladoJogador();
  }

  setInterval(criarObstaculo, intervaloSpawn);
  requestAnimationFrame(moverObstaculos);
}

function resetarJogo() {
  jogoEmAndamento = false;
  houveColisao = false;
  obstaculosAtivos.forEach(obs => obs.remove());
  obstaculosAtivos = [];

  dinofauro.style.height = "40px";
  dinofauro.style.bottom = "0px";

  document.getElementById("status").innerText = "🕹️ Aguardando início...";
  document.removeEventListener("keydown", aoPressionarTecla);
  document.removeEventListener("keyup", aoSoltarTecla);

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

  obstaculosAtivos.forEach(obstaculo => {
    const obstaculoBox = obstaculo.getBoundingClientRect();

    if (
      dinofauroBox.right > obstaculoBox.left + 5 &&
      dinofauroBox.left < obstaculoBox.right - 5 &&
      dinofauroBox.bottom > obstaculoBox.top
    ) {
      houveColisao = true;
      jogoEmAndamento = false;

      logEventos.push({
        tempo: tempoDeSobrevivencia,
        evento: "colisao",
        agente: modoIA ? "IA" : "Jogador",
        distancia: Math.floor(obstaculo.offsetLeft - dinofauro.offsetLeft),
        velocidade: parseFloat(obstaculo.dataset.velocidade)
      });

      document.getElementById("status").innerText = "💀 Game Over!";
      alert("💀 Game Over! O Espinhudo venceu essa rodada...");
      resetarJogo();
    }
  });
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

document.getElementById("botao-exportar").addEventListener("click", exportarLogs);

function exportarLogs() {
  if (logEventos.length === 0) {
    alert("Nenhum evento registrado.");
    return;
  }

  const dados = JSON.stringify(logEventos, null, 2);
  const blob = new Blob([dados], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `logs_dino_${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
