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

| Versão         | Descrição                                             | Status         |
|----------------|---------------------------------------------------------|----------------|
| `v1-blocos`    | MVP com blocos, HUD, IA básica, obstáculos múltiplos, e suporte a abaixar/pular. Finalizado em v2.5. | ✅ Finalizada |
| `v2-sprites`   | *(Planejado)* Introdução de sprites gráficos.           | 🔜 Em breve     |
| `v3-vision`    | *(Planejado)* IA baseada em visão computacional         | 🔜 Em breve     |
| `v4-RL`        | *(Planejado)* Agente RL com ambiente Gym-like           | 🔜 Em breve     |

---

## 📜 Histórico de Versões

| Versão         | Descrição                                                  | Status          |
|-----------------|-------------------------------------------------------------|-----------------|
| v1.0            | MVP inicial com blocos, heurística simples                  | ✅ Concluído     |
| v1.1            | HUD de Pulos e Obstáculos evitados                          | ✅ Concluído     |
| v1.2            | Obstáculos com spawn e velocidade randomizada               | ✅ Concluído     |
| v1.3            | Instrumentação de logs para análise de desempenho           | ✅ Concluído     |
| v2.0            | Exportação de logs para `.json`                             | ✅ Concluído     |
| v2.1-func       | Obstáculos múltiplos, dinâmica de movimento aprimorada      | ✅ Concluído     |
| v2.4            | Funções de abaixar refinadas e visual aprimorado             | ✅ Concluído     |
| v2.5            | Obstáculos voadores adicionados, IA com decisões de pular/abaixar. | ✅ Concluído |

---

> Observação: As versões seguem um formato progressivo baseado em milestones de funcionalidade.  
> Futuras versões com sprites e RL serão adicionadas separadamente.

---

## 👤 Autor

Criado e mantido por [GeffyB](https://github.com/GeffyB), com variáveis inesperadas, muitos erros e código quase limpo.

---

## 📂 Estrutura do Projeto

```bash
dino-game-html/
├── v1-blocos/         # Versão v2.5 finalizada (Blocos básicos + IA)
│   ├── index.html
│   ├── style.css
│   ├── game.js
│   ├── agent.js
│   └── README.md      # Histórico detalhado por versão
├── v2-sprites/        # (Reservado para evolução com sprites)
└── README.md          # Visão geral (este arquivo)
