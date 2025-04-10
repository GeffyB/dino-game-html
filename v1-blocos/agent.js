// ------------------------------------------------------------
// DinoFauro 🦖 – Agente IA Saltador
// Versão: v1-blocos ✅
// ------------------------------------------------------------

// Elementos do jogo (referência cruzada com game.js)
// Essas variáveis estão sendo utilizadas via escopo global:
// const dinofauro = document.getElementById("dinofauro");
// const espinhudo = document.getElementById("espinhudo");

// ------------------------------------------------------------
// Estado do pulo (controle de ação e cooldown)
let oDinoTaPulando = false;
let tempoDesdeUltimoPulo = 0; // Evita pulo contínuo (cooldown)
  
// ------------------------------------------------------------
// Função principal – faz o dinofauro pular
function fazerDinoDarAquelaPulada() {

  // [DEBUG] Estado atual do dinofauro
  // console.log("Estado: oDinoTaPulando =", oDinoTaPulando, "| tempoDesdeUltimoPulo =", tempoDesdeUltimoPulo);

  if (oDinoTaPulando || tempoDesdeUltimoPulo < 30) {
    // [DEBUG] Ignorado por cooldown ou pulo em andamento
    // console.log("Pulando ignorado (em cooldown ou já no ar)");
    return;
  }

  oDinoTaPulando = true;
  tempoDesdeUltimoPulo = 0;

  let altura = 0;
  const maxAltura = 120;
  const subida = 6;
  const descida = 4;

  // [DEBUG] Início do pulo
  // console.log("Altura inicial:", altura, "Max:", maxAltura);
  // console.log("Iniciando pulo...");

  const sobe = setInterval(() => {
    // console.log("⬆️ Subindo... altura:", altura);
    if (altura >= maxAltura) {
      clearInterval(sobe);

      const desce = setInterval(() => {
        // console.log("⬇️ Descendo... altura:", altura);
        if (altura <= 0) {
          clearInterval(desce);
          oDinoTaPulando = false;
          // console.log("✅ Pousou");
        } else {
          altura -= descida;
          dinofauro.style.transform = `translateY(-${altura}px)`;
        }
      }, 10);

    } else {
      altura += subida;
      dinofauro.style.transform = `translateY(-${altura}px)`;
    }
  }, 10);
}

// ------------------------------------------------------------
// Agente jurássico de decisão: IA reativa por distância
setInterval(() => {
  const espinhudoPos = espinhudo.getBoundingClientRect();
  const dinofauroPos = dinofauro.getBoundingClientRect();

  const distancia = espinhudoPos.right - dinofauroPos.left;

  // [DEBUG] Distância entre IA e obstáculo
  // console.log("Distância entre espinhudo e dinofauro:", distancia);

  if (distancia < 130 && distancia > 0) {
    // console.log("Tentando pular! Distância:", distancia);
    fazerDinoDarAquelaPulada();
  }
}, 10);

// ------------------------------------------------------------
// Cooldown incremental
// Esta função resolve o bug do dinofauro que não pulava
// Mantém o tempo entre pulos controlado
setInterval(() => {
  if (tempoDesdeUltimoPulo < 1000) tempoDesdeUltimoPulo++;
}, 10);
