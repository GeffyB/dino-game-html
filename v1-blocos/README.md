# Histórico da Versão v1-blocos

## 📦 Versão Arquivada: `v2.1-vis` – Sprites Visuais

> Status: ❌ Arquivada (instável)

Tentativa de substituir as `divs` do dinossauro por sprites visuais pixel art personalizados.  
Apesar da estética mais próxima do jogo original, essa versão foi arquivada por apresentar os seguintes problemas:

- Diferenças de alinhamento entre sprites de salto/corrida
- Bug visual: o dinossauro continuava correndo após a colisão
- Hitbox inconsistente devido a áreas transparentes nos sprites
- A tecla de espaço fechava o `alert()` de Game Over e causava bugs no controle

Esses problemas indicam que o sistema atual baseado em `div + classList` ainda é o mais estável e funcional neste estágio do projeto.

### Próximos passos:
- Retomar com a base da `v2.0`
- Evoluir as funcionalidades (múltiplos obstáculos, abaixar, voador)
- Planejar reintrodução dos sprites futuramente, com estrutura mais robusta

---


## 🔹 v2.0 – Instrumentação e Exportação de Logs (Analytics)

### 📅 Data: 16/04/2025

### Objetivo
Criar um sistema de coleta de dados estruturado para futuras análises de desempenho, visualização de decisões e base para papers ou treinamentos supervisionados.

### Implementado
- Array `logEventos[]` que registra ações da IA e do Jogador.
- Logs para:
  - 🦘 Pulos (tempo, distância, agente, velocidade)
  - 💥 Colisões (quando ocorrem, com contexto)
  - 🧱 Obstáculos evitados (registrado via movimento)
- Exportação direta via botão "📤 Exportar Logs"
  - Gera um `.json` com todos os eventos da sessão atual
  - Estrutura padronizada para análise futura

### Exemplo de evento registrado
```json
{
  "tempo": 27,
  "evento": "pulo",
  "agente": "IA",
  "distancia": 113,
  "velocidade": 5.2
}
```

### Uso sugerido
- Coletar séries temporais de ações
- Analisar decisões erradas ou atrasadas
- Treinar modelos supervisionados com base nos logs
- Validar agentes RL contra baseline heurístico

---

## 🔹 v1.3 — IA Heurística Aprimorada + Instrumentação de Logs

### 📅 Data: 16/04/2025

### Objetivo
Aprimorar a IA heurística para lidar melhor com obstáculos aleatórios (introduzidos na v1.2) e iniciar instrumentação de decisões para futuras análises e papers.

### Implementado
- Ajuste da lógica de decisão da IA no `iniciarIA()`:
  - Distância de reação agora é adaptativa: `distanciaLimite = 90 + velocidade * 2.5`
  - Menor tempo entre pulos: `tempoDesdeUltimoPulo > 15`
- Adição de `console.log()` para registrar:
  - Distância entre dinofauro e obstáculo no momento do pulo
  - Velocidade atual do espinhudo
  - Valor do `distanciaLimite` usado na decisão

### Resultado
- IA alcança ~66% de sucesso com comportamento mais natural
- Quando o espinhudo é lento, o pulo ainda pode ser ligeiramente tardio (colisão na descida)
- Instrumentação permite análise objetiva futura (exportação, gráficos, comparação entre heurísticas e RL)

### Observações
- A estrutura de log abre espaço para coleta de dados de treino supervisionado ou avaliação de desempenho RL
- Esse ponto marca o fim da fase "IA heurística pura"

---

## 🔹 v1.2 — Obstáculos com Comportamento Randomizado (spawn e velocidade)

### 📅 Data: 16/04/2025

### Objetivo
Deixar o jogo menos previsível e mais desafiador ao adicionar:
- Obstáculos com **posição de spawn aleatória**
- Velocidade variável de movimento
- Intervalos dinâmicos entre espinhudos

### Implementado
- Substituição da `animation` CSS por controle via `requestAnimationFrame`
- Novo sistema de movimentação do `espinhudo` com `style.left`
- Aleatoriedade aplicada na posição de origem e velocidade de cada obstáculo
- Delay de 1 segundo antes do primeiro espinhudo para dar tempo de reação à IA
- Contador de obstáculos evitados mantido e atualizado no novo loop

### Observações
- A IA heurística ainda funciona, mas com taxa de sucesso inicial ~75%
- Essa etapa cria a base necessária para validação futura de agentes aprendizes (RL)
- Pode ser necessário ajustar `distância` e `tempoDesdeUltimoPulo` para maior precisão

### Compatibilidade
- Modo Jogador permanece funcional
- Modo IA adaptado ao novo sistema com sucesso parcial

---

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
