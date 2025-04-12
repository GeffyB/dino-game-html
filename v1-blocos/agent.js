// ------------------------------------------------------------
// DinoFauro 🦖 – Agente Heurístico Simples
// Versão: v1-blocos | Controle do Agente por Distância + Cooldown
// ------------------------------------------------------------

// Esse arquivo contém apenas a função de pulo do agente IA
// O loop de decisão (setInterval) está no game.js para manter controle unificado


// Flag para saber se o dinofauro está pulando
let oDinoTaPulando = false;
let tempoDesdeUltimoPulo = 999; // começa liberado para pular


// Função usada pela IA para executar o pulo com as mesmas regras do jogador
function fazerDinoDarAquelaPulada() {
  if (oDinoTaPulando) return;
  oDinoTaPulando = true;

  let altura = 0;
  const alturaMaxima = 100;
  const subida = 4;
  const descida = 3;

  const subir = setInterval(() => {
    if (altura >= alturaMaxima) {
      clearInterval(subir);
      const descer = setInterval(() => {
        if (altura <= 0) {
          clearInterval(descer);
          oDinoTaPulando = false;
        } else {
          altura -= descida;
          dinofauro.style.bottom = `${altura}px`;
        }
      }, 10);
    } else {
      altura += subida;
      dinofauro.style.bottom = `${altura}px`;
    }
  }, 10);
}
