# 🦖 DinoFauro – Versão v1-blocos

Jogo estilo *Dino Run* com agente IA heurístico simples. Desenvolvido como MVP funcional para testes e evolução com Aprendizado por Reforço.

## Estrutura do Projeto

- `index.html` — Estrutura da página e interface do jogo.
- `style.css` — Estilização dos elementos gráficos (HUD, arena, personagens).
- `game.js` — Lógica principal do jogo, controle de modos, mecânica de pulo, cronômetro e colisões.
- `agent.js` — Função de pulo automática usada pelo agente IA.

## Funcionalidades Implementadas

### ✅ MVP Jogável com IA Heurística
- Jogo funciona tanto em **modo IA** quanto **modo Jogador**.
- IA pula automaticamente com base na distância do obstáculo.
- Jogador usa **barra de espaço** para controlar o dinofauro.

### ✅ Controle de Execução
- Botão "Iniciar Jogo" ativa o jogo e aplica o modo selecionado (IA ou jogador).
- Botão "Parar Jogo" pausa o jogo e reseta o estado para escolha de novo modo.

### ✅ HUD de Métricas
- Tempo de sobrevivência (formato `hh:mm:ss`).
- Pulos realizados (ainda não instrumentado).
- Obstáculos evitados (ainda não instrumentado).
- Estado atual: "Em jogo", "Pausado", "Game Over".

### ✅ Ciclo de Jogo Controlado
- IA e cronômetro só iniciam após o clique em "Iniciar".
- Game Over mostra alerta e bloqueia controles até novo start.
- Animação do espinhudo pausada até o jogo começar.

## Próximas Etapas

- Instrumentar contagem real de **pulos realizados** e **obstáculos evitados**.
- Introduzir **randomização de obstáculos** (posição, frequência, velocidade).
- Início da transição para **aprendizado por reforço** (Q-Learning, DQN).
- Testes comparativos entre IA heurística e agentes treinados.

## Sobre o Projeto
Este repositório faz parte de uma jornada prática de construção de agentes inteligentes em jogos 2D simples, evoluindo da heurística ao aprendizado automático.

> Organização modular, código comentado com foco em reusabilidade e controle total do ciclo de execução.
