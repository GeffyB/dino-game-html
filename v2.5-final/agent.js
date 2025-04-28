// ------------------------------------------------------------
// agent.js — DinoFauro IA 🤖🦖
// Versão: v2.5-finalmerge | Correção Final de Saltos e Abaixar
// ------------------------------------------------------------

// ========== [ESTADOS DE CONTROLE DA IA] ========== //

let tempoDesdeUltimaAcao = 999;
let oDinoTaPulando = false;
let oDinoTaAbaixando = false;

// ========== [LOOP PRINCIPAL DE DECISÃO DA IA] ========== //

function iniciarIA() {
  tempoDesdeUltimaAcao = 999;

  const loopIA = setInterval(() => {
    if (houveColisao || !jogoEmAndamento || !modoIA) {
      clearInterval(loopIA);
      return;
    }

    const obstaculoMaisProximo = obstaculosAtivos[0];
    if (!obstaculoMaisProximo) return;

    const distancia = obstaculoMaisProximo.offsetLeft - dinofauro.offsetLeft;
    const tipo = obstaculoMaisProximo.classList.contains("obstaculo-voador") ? "voador" : "chao";

    // 🛠 Distância proporcional para saltos corretos
    const distanciaLimite = 25 * velocidadeGlobal;

    if (
      distancia < distanciaLimite &&
      distancia > 0 &&
      tempoDesdeUltimaAcao > 15 &&
      !oDinoTaPulando &&
      !oDinoTaAbaixando
    ) {
      if (tipo === "voador") {
        fazerDinoDarUmaAbaixada();
      } else {
        fazerDinoDarAquelaPulada();
      }
      tempoDesdeUltimaAcao = 0;
    }

    tempoDesdeUltimaAcao++;
  }, 20);
}

// ========== [AÇÕES: PULAR OU ABAIXAR] ========== //

function fazerDinoDarAquelaPulada() {
  if (pulandoNoAr || houveColisao || !jogoEmAndamento) return;
  dinofauroPula();
}

function fazerDinoDarUmaAbaixada() {
  if (pulandoNoAr || houveColisao || !jogoEmAndamento) return;
  
  oDinoTaAbaixando = true;
  dinofauroAbaixa(true);

  // 🛠 Mantém abaixado por 400ms e depois levanta
  setTimeout(() => {
    dinofauroAbaixa(false);
    oDinoTaAbaixando = false;
  }, 400);
}
