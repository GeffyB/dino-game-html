// ------------------------------------------------------------
// DinoFauro 🦖 – Módulo Principal do Jogo
// Versão: v2.5-fix | Correções de colisão e spawn de obstáculos voadores
// ------------------------------------------------------------

// ========== [VARIÁVEIS GLOBAIS] ========== //

// Elementos DOM
const dinofauro = document.getElementById("dinofauro");
const overlayGameOver = document.getElementById("overlay-gameover");

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

// Obstáculos
let obstaculosAtivos = [];
let velocidadeGlobal = 4;
let intervaloSpawn = 1500;
let intervaloSpawnID = null;

// Logs
let logEventos = [];

// ========== [FUNÇÕES DE MECÂNICA DE JOGO] ========== //

function dinofauroPula() {
  if (pulandoNoAr || abaixando) return;
  pulandoNoAr = true;
  pulosRealizados++;
  document.getElementById("pulos").innerText = `🦘 Pulos: ${pulosRealizados}`;

  logEventos.push({ tempo: tempoDeSobrevivencia, evento: "pulo", agente: modoIA ? "IA" : "Jogador" });

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
          dinofauro.style.bottom = `0px`;
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

function dinofauroAbaixa(ativo) {
  if (!jogoEmAndamento || pulandoNoAr) return;
  abaixando = ativo;
  dinofauro.style.height = ativo ? "30px" : "60px";
  dinofauro.style.bottom = "0px";
}

// ========== [FUNÇÕES DE JOGADOR HUMANO] ========== //

function ativarTecladoJogador() {
  document.addEventListener("keydown", aoPressionarTecla);
  document.addEventListener("keyup", aoSoltarTecla);
}

function aoPressionarTecla(event) {
  if (!houveColisao && jogoEmAndamento) {
    if (event.code === "Space" && !pulandoNoAr) dinofauroPula();
    if (event.code === "ArrowDown") dinofauroAbaixa(true);
  }
}

function aoSoltarTecla(event) {
  if (event.code === "ArrowDown") dinofauroAbaixa(false);
}

// ========== [OBSTÁCULOS] ========== //

function criarObstaculo() {
  if (!jogoEmAndamento || houveColisao) return;

  const obstaculo = document.createElement("div");
  const tipoAleatorio = Math.random();

  if (tipoAleatorio < 0.7) {
    obstaculo.classList.add("obstaculo");
    obstaculo.style.bottom = "0px";
  } else if (tipoAleatorio < 0.9) {
    obstaculo.classList.add("obstaculo-baixo");
    obstaculo.style.bottom = "0px";
  } else {
    obstaculo.classList.add("obstaculo-voador");
    obstaculo.style.bottom = `${70 + Math.random() * 30}px`;
  }

  obstaculo.style.left = "800px";
  document.getElementById("game-container").appendChild(obstaculo);
  obstaculosAtivos.push(obstaculo);
}

function moverObstaculos() {
  if (!jogoEmAndamento || houveColisao) return;

  obstaculosAtivos.forEach((obstaculo, index) => {
    let leftAtual = parseFloat(obstaculo.style.left);
    obstaculo.style.left = `${leftAtual - velocidadeGlobal}px`;

    if (leftAtual < -50) {
      obstaculo.remove();
      obstaculosAtivos.splice(index, 1);
      obstaculosEvitados++;
      document.getElementById("evitados").innerText = `🧱 Evitados: ${obstaculosEvitados}`;
    }
  });

  requestAnimationFrame(moverObstaculos);
}

// ========== [CONTADOR DE TEMPO E PROGRESSÃO] ========== //

function iniciarContadorDeTempo() {
  if (cronometroID) clearInterval(cronometroID);
  tempoDeSobrevivencia = 0;

  cronometroID = setInterval(() => {
    if (houveColisao || !jogoEmAndamento) {
      clearInterval(cronometroID);
      cronometroID = null;
    } else {
      tempoDeSobrevivencia++;
      const h = String(Math.floor(tempoDeSobrevivencia / 3600)).padStart(2, '0');
      const m = String(Math.floor((tempoDeSobrevivencia % 3600) / 60)).padStart(2, '0');
      const s = String(tempoDeSobrevivencia % 60).padStart(2, '0');
      document.getElementById("tempo").innerText = `⏱️ Tempo: ${h}:${m}:${s}`;

      if (tempoDeSobrevivencia % 10 === 0) velocidadeGlobal += 0.2;
    }
  }, 1000);
}

// ========== [CICLO PRINCIPAL DO JOGO] ========== //

function iniciarJogo() {
  houveColisao = false;
  jogoEmAndamento = true;
  pulandoNoAr = false;
  abaixando = false;
  tempoDeSobrevivencia = 0;
  pulosRealizados = 0;
  obstaculosEvitados = 0;
  velocidadeGlobal = 4;

  document.getElementById("tempo").innerText = `⏱️ Tempo: 00:00:00`;
  document.getElementById("pulos").innerText = `🦘 Pulos: 0`;
  document.getElementById("evitados").innerText = `🧱 Evitados: 0`;
  document.getElementById("status").innerText = `🎾 Em jogo...`;

  overlayGameOver.style.display = "none";

  iniciarContadorDeTempo();

  obstaculosAtivos.forEach(obs => obs.remove());
  obstaculosAtivos = [];

  if (modoIA) iniciarIA();
  else ativarTecladoJogador();

  clearInterval(intervaloSpawnID);
  intervaloSpawnID = setInterval(criarObstaculo, intervaloSpawn + Math.random() * 400);
  requestAnimationFrame(moverObstaculos);
}

function resetarJogo() {
  jogoEmAndamento = false;
  houveColisao = false;

  if (cronometroID) clearInterval(cronometroID);
  if (intervaloSpawnID) clearInterval(intervaloSpawnID);

  obstaculosAtivos.forEach(obs => obs.remove());
  obstaculosAtivos = [];

  dinofauro.style.height = "60px";
  dinofauro.style.bottom = "0px";

  document.getElementById("status").innerText = `🕹️ Aguardando início...`;
  document.getElementById("botao-start").disabled = false;
}

// ========== [COLISÃO COM DIFERENCIAÇÃO] ========== //

function checarColisao() {
  if (houveColisao || !jogoEmAndamento) return;

  const dinoBox = dinofauro.getBoundingClientRect();

  for (const obstaculo of obstaculosAtivos) {
    const obstaculoBox = obstaculo.getBoundingClientRect();
    const tipo = obstaculo.classList.contains("obstaculo-voador") ? "voador" : "chao";

    if (tipo === "chao") {
      if (
        dinoBox.right > obstaculoBox.left + 5 &&
        dinoBox.left < obstaculoBox.right - 5 &&
        dinoBox.bottom > obstaculoBox.top + 5
      ) {
        houveColisao = true;
      }
    } else if (tipo === "voador") {
      if (
        dinoBox.right > obstaculoBox.left + 5 &&
        dinoBox.left < obstaculoBox.right - 5 &&
        dinoBox.top < obstaculoBox.bottom - 5
      ) {
        houveColisao = true;
      }
    }

    if (houveColisao) {
      jogoEmAndamento = false;
      overlayGameOver.style.display = "flex";
      resetarJogo();
      break;
    }
  }
}

setInterval(checarColisao, 10);

// ========== [INTERFACE] ========== //

window.onload = () => {
  document.getElementById("status").innerText = `🕹️ Aguardando início...`;
  overlayGameOver.style.display = "none";
  document.getElementById("modo-jogo").value = "ia"; // Agora realmente começa no modo IA
};

document.getElementById("botao-start").addEventListener("click", () => {
  modoIA = document.getElementById("modo-jogo").value === "ia";
  iniciarJogo();
  document.getElementById("botao-start").blur();
  document.getElementById("botao-start").disabled = true;
});

document.getElementById("botao-parar").addEventListener("click", () => {
  resetarJogo();
});

// ========== [EXPORTAÇÃO DE LOGS] ========== //

document.getElementById("botao-exportar").addEventListener("click", () => {
  if (logEventos.length === 0) {
    alert("Nenhum dado de log para exportar!");
    return;
  }

  const dadosParaExportar = {
    agente: modoIA ? "IA" : "Jogador",
    tempo_total: tempoDeSobrevivencia,
    pulos: pulosRealizados,
    obstaculos_evitados: obstaculosEvitados,
    eventos: logEventos
  };

  const blob = new Blob([JSON.stringify(dadosParaExportar, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `log-dinofauro-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
});
