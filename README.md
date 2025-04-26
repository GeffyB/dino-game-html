# Dino Game IA 🦖🤖

Este repositório contém a construção incremental de uma IA treinada para jogar o famoso jogo do dinossauro do Chrome, com múltiplas versões documentadas e organizadas para fins didáticos, acadêmicos e de portfólio.

## 🎯 Objetivos do Projeto

- Desenvolver múltiplas versões do jogo com complexidade crescente  
- Explorar heurísticas, aprendizado por reforço e aprendizado por imitação  
- Usar design evolutivo para facilitar estudos, tutoriais e publicação de artigos  

---

## 🛠 Tecnologias Utilizadas

- HTML + CSS + JS Vanilla  
- DOM Manipulation  
- IA Heurística simples  
- *(Futuro)* Sprites com animação  
- *(Futuro)* Agentes com Aprendizado por Reforço (RL)

---

## 📚 Versões

| Versão         | Descrição                                           | Status          |
|----------------|-----------------------------------------------------|-----------------|
| `v1-blocos`    | MVP com blocos, HUD e IA heurística básica          | ✅ Finalizada    |
| `v2.0`         | Instrumentação de logs (exportação e análise)       | ✅ Finalizada    |
| `v2.1-func`    | Obstáculos múltiplos, movimento dinâmico, IA adapt. | ✅ Finalizada    |
| `v2.2`         | *(Planejado)* Mecânica de abaixar (tecla ↓)         | 🔜 Em breve      |
| `v3-vision`    | *(Futuro)* IA com visão computacional (sprites)     | 🔜               |
| `v4-RL`        | *(Futuro)* Agente RL com ambiente Gym-like          | 🔜               |

---

## Histórico de Versões

| Versão        | Descrição                                                  | Status          |
|---------------|-------------------------------------------------------------|-----------------|
| v1.0          | MVP inicial com blocos, heurística simples                  | ✅ Concluído    |
| v1.1          | HUD de Pulos e Obstáculos evitados                          | ✅ Concluído    |
| v1.2          | Obstáculos com spawn e velocidade randomizada               | ✅ Concluído    |
| v1.3          | Instrumentação de logs para análise de desempenho           | ✅ Concluído    |
| v2.0          | Exportação de logs para `.json`                             | ✅ Concluído    |
| v2.1          | Tentativa com sprites visuais (arquivada)                   | ❌ Arquivado    |
| v2.3-balance  | Velocidade global uniforme, múltiplos obstáculos e abaixar  | ✅ Em andamento |

---

> Observação: As versões seguem um formato progressivo baseado em milestones de funcionalidade.  
> Versões experimentais ou arquivadas (como v2.1) são documentadas mas não evoluídas.


## 👤 Autor

Criado e mantido por [GeffyB](https://github.com/GeffyB), com variáveis inesperadas, muitos erros e código quase limpo.

---

## 📂 Estrutura do Projeto

```bash
dino-game-html/
├── v1-blocos/         # Versão principal (atualmente em v2.1-func)
│   ├── index.html
│   ├── style.css
│   ├── game.js
│   ├── agent.js (legado)
│   └── README.md      # Histórico detalhado por versão
├── v2-sprites/        # Reservado para versão visual com sprites
└── README.md          # Visão geral (este arquivo)
