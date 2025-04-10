// ------------------------------------------------------------
// DinoFauro 🦖 – Módulo de Jogo (mundo e física)
// Versão: v1-blocos ✅
// ------------------------------------------------------------

// Seleciona os heróis e vilões
// Usando escopo global para acesso compartilhado com agent.js
window.dinofauro = document.getElementById("dinofauro");
window.espinhudo = document.getElementById("espinhudo");

// ------------------------------------------------------------
// Estado do pulo (bloqueia múltiplos pulos manuais)
let pulandoNoAr = false;

// ------------------------------------------------------------
// Função de pulo (manual, usada pelo jogador)
function dinofauroPula() {
  if (pulandoNoAr) return; // Impede pulo duplo (estilo pro player)

  pulandoNoAr = true;
  let altura = 0;

  const puloAlturaMax = 100;
  const velocidadeSubida = 4;
  const velocidadeDescida = 3;

  // Subida do dinofauro
  const subir = setInterval(() => {
    if (altura >= puloAlturaMax) {
      clearInterval(subir);

      // Início da descida
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

// ------------------------------------------------------------
// Controle manual ativável (usuário joga com teclado)
// Para ativar, basta remover os comentários abaixo:
  
/*
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    dinofauroPula();
  }
});
*/

// ------------------------------------------------------------
// Verifica colisão entre o dinofauro e o espinhudo
function checarColisao() {
  const dinofauroBox = dinofauro.getBoundingClientRect();
  const espinhudoBox = espinhudo.getBoundingClientRect();

  if (
    dinofauroBox.right > espinhudoBox.left + 5 &&
    dinofauroBox.left < espinhudoBox.right - 5 &&
    dinofauroBox.bottom > espinhudoBox.top
  ) {
    alert("💀 Game Over! O Espinhudo venceu essa rodada...");
    location.reload();
  }
}

// ------------------------------------------------------------
// Loop de verificação de colisão
setInterval(checarColisao, 10);