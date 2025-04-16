# Histórico da Versão v1-blocos

## 🔹 v1.1 — HUD com Métricas Dinâmicas (pulos e evitados)

### Data: 16/04/2025

### Objetivo
Instrumentar o HUD com contadores dinâmicos:
- 🦘 Pulos realizados (tanto no modo IA quanto Jogador)
- 🧱 Obstáculos evitados (detecção de término da animação do espinhudo)

### Implementado
- Incremento de `pulosRealizados++` nas funções de pulo manual e IA.
- Atualização da HUD com `document.getElementById("pulos").innerText`.
- Listener `animationiteration` no espinhudo para contar obstáculos evitados.
- Proteção para só contar quando o jogo estiver ativo e sem colisão (`jogoEmAndamento && !houveColisao`).

### Resultado
- HUD atualiza em tempo real.
- Contadores zeram automaticamente a cada `iniciarJogo()`.
- Funciona corretamente em ambos os modos de jogo.

---

## 🔹 v1.0 — MVP com IA Heurística

### Data: 

### Objetivo
Construir um MVP funcional com IA heurística simples e lógica de execução clara para rodar o jogo do dinossauro.

### Funcionalidades
- Execução via botão "Iniciar Jogo" com modo IA ou Jogador.
- Cronômetro com formatação `hh:mm:ss`.
- Controle total do ciclo: iniciar, pausar, detectar colisão.
- HUD inicial com tempo, pulos, evitados (visuais).
- Game Over bloqueia o jogo e aguarda reinício manual.

### Estrutura modular
- `game.js`: controle de estado, execução, HUD e colisão.
- `agent.js`: lógica de pulo IA.
- `index.html` + `style.css`: arena e visualização.

---

> Para referência da estrutura inicial não organizada, veja: `README-v1-pre-org.md`
