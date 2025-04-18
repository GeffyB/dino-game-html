// ------------------------------------------------------------
// DinoFauro 🦖 – Módulo Principal do Jogo
// Versão: v2.1-func | Suporte a múltiplos obstáculos
// ------------------------------------------------------------

// ========== [VARIÁVEIS GLOBAIS] ========== //

// Elementos do DOM
window.dinofauro = document.getElementById("dinofauro");

// Estados de controle
let pulandoNoAr = false;
let tempoDeSobrevivencia = 0;
let pulosRealizados = 0;
let obstaculosEvitados = 0;
let houveColisao = false;
let modoIA = true;
let jogoEmAndamento = false;
let cronometroID = null;

let logEventos = [];
let obstaculosAtivos = [];
let intervaloSpawn = 1200;

// ========== [FUNÇÕES DE MECÂNICA DE JOGO] ========== //

function dinofauroPula() {
  if (pulandoNoAr) return;
  pulandoNoAr = true;
  pulosRealizados++;
  document.getElementById("pulos").innerText = `🦘 Pulos: ${pulosRealizados}`;

  const obstaculoMaisProximo = obterObstaculoMaisProximo();
  const distancia = obstaculoMaisProximo
    ? Math.floor(obstaculoMaisProximo.getBoundingClientRect().left - dinofauro.getBoundingClientRect().left)
    : -1;

  logEventos.push({
    tempo: tempoDeSobrevivencia,
    evento: "pulo",
    agente: "Jogador",
    distancia,
    velocidade: obstaculoMaisProximo ? obstaculoMaisProximo.dataset.velocidade : 0
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

// ========== [MODO JOGADOR] ========== //

function ativarTecladoJogador() {
  document.addEventListener("keydown", aoPressionarTecla);
}

function aoPressionarTecla(event) {
  if (event.code === "Space" && !houveColisao && jogoEmAndamento) {
    dinofauroPula();
  }
}

// ========== [IA] ========== //

let tempoDesdeUltimoPulo = 999;
let oDinoTaPulando = false;

function iniciarIA() {
  tempoDesdeUltimoPulo = 999;

  const loopIA = setInterval(() => {
    if (houveColisao || !jogoEmAndamento || !modoIA) {
      clearInterval(loopIA);
      return;
    }

    const obstaculo = obterObstaculoMaisProximo();
    if (!obstaculo) return;

    const distancia = obstaculo.getBoundingClientRect().left - dinofauro.getBoundingClientRect().left;
    const velocidade = parseFloat(obstaculo.dataset.velocidade);
    const distanciaLimite = 90 + velocidade * 2.5;

    if (distancia < distanciaLimite && distancia > 0 && !oDinoTaPulando && tempoDesdeUltimoPulo > 15) {
      fazerDinoDarAquelaPulada(distancia, velocidade);
      tempoDesdeUltimoPulo = 0;
    }

    tempoDesdeUltimoPulo++;
  }, 20);
}

function fazerDinoDarAquelaPulada(distancia, velocidade) {
  oDinoTaPulando = true;
  pulosRealizados++;
  document.getElementById("pulos").innerText = `🦘 Pulos: ${pulosRealizados}`;

  logEventos.push({
    tempo: tempoDeSobrevivencia,
    evento: "pulo",
    agente: "IA",
    distancia,
    velocidade
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
          oDinoTaPulando = false;
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

// ========== [TEMPO] ========== //

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

// ========== [OBSTÁCULOS] ========== //

function criarObstaculo() {
  const obstaculo = document.createElement("div");
  obstaculo.classList.add("obstaculo");

  const velocidade = 4 + Math.random() * 2;
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
      logEventos.push({ tempo: tempoDeSobrevivencia, evento: "evitado", agente: modoIA ? "IA" : "Jogador", velocidade });
    }
  });

  requestAnimationFrame(moverObstaculos);
}

function obterObstaculoMaisProximo() {
  const dinoBox = dinofauro.getBoundingClientRect();
  return obstaculosAtivos
    .filter(obs => obs.getBoundingClientRect().left > dinoBox.left)
    .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)[0];
}

// ========== [CICLO DO JOGO] ========== //

function iniciarJogo() {
  houveColisao = false;
  jogoEmAndamento = true;

  tempoDeSobrevivencia = 0;
  pulosRealizados = 0;
  obstaculosEvitados = 0;
  obstaculosAtivos = [];

  document.getElementById("tempo").innerText = `⏱️ Tempo: 00:00:00`;
  document.getElementById("pulos").innerText = `🦘 Pulos: 0`;
  document.getElementById("evitados").innerText = `🧱 Evitados: 0`;
  document.getElementById("status").innerText = `🎮 Em jogo...`;

  iniciarContadorDeTempo();
  if (modoIA) iniciarIA();
  else ativarTecladoJogador();

  setInterval(criarObstaculo, intervaloSpawn);
  requestAnimationFrame(moverObstaculos);
}

function resetarJogo() {
  jogoEmAndamento = false;
  houveColisao = false;
  obstaculosAtivos.forEach(obs => obs.remove());
  obstaculosAtivos = [];

  document.getElementById("status").innerText = "🕹️ Aguardando início...";
  document.removeEventListener("keydown", aoPressionarTecla);

  if (cronometroID) {
    clearInterval(cronometroID);
    cronometroID = null;
  }

  document.getElementById("botao-start").disabled = false;
}

// ========== [COLISÃO] ========== //

function checarColisao() {
  if (houveColisao) return;

  const dinoBox = dinofauro.getBoundingClientRect();
  for (const obstaculo of obstaculosAtivos) {
    const obsBox = obstaculo.getBoundingClientRect();
    if (
      dinoBox.right > obsBox.left + 5 &&
      dinoBox.left < obsBox.right - 5 &&
      dinoBox.bottom > obsBox.top
    ) {
      houveColisao = true;
      jogoEmAndamento = false;

      logEventos.push({
        tempo: tempoDeSobrevivencia,
        evento: "colisao",
        agente: modoIA ? "IA" : "Jogador",
        distancia: Math.floor(obsBox.left - dinoBox.left),
        velocidade: obstaculo.dataset.velocidade
      });

      document.getElementById("status").innerText = "💀 Game Over!";
      document.removeEventListener("keydown", aoPressionarTecla);
      alert("💀 Game Over! O Espinhudo venceu essa rodada...");
      resetarJogo();
      break;
    }
  }
}

setInterval(checarColisao, 10);

// ========== [INTERFACE] ========== //

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
