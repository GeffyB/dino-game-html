//  IA Heurística com Logs para v2.0-analytics

let oDinoTaPulando = false;
let tempoDesdeUltimoPulo = 999;

function fazerDinoDarAquelaPulada() {
  if (oDinoTaPulando || houveColisao || !jogoEmAndamento) return;

  oDinoTaPulando = true;

  pulosRealizados++;
  document.getElementById("pulos").innerText = `🦘 Pulos: ${pulosRealizados}`;

  // Novo: log estruturado para análise (v2.0)
  logEventos.push({
    tempo: tempoDeSobrevivencia,
    evento: "pulo",
    agente: "IA",
    distancia: Math.floor(espinhudo.offsetLeft - dinofauro.offsetLeft),
    velocidade: velocidadeEspinhudo
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
