# Dino Game IA 🦖🤖

Este repositório contém a construção incremental de uma IA treinada para jogar o famoso jogo do dinossauro do Chrome, com múltiplas versões documentadas e organizadas para fins didáticos, acadêmicos e de portfólio.

---

## 🎯 Objetivos do Projeto

- Desenvolver versões simplificadas do jogo para treinamento de IA
- Explorar heurísticas básicas de movimentação (pular/abaixar)
- Evoluir para abordagens de aprendizado por reforço (RL) em versões futuras
- Usar design incremental para estudos, tutoriais e publicações científicas

---

## 🛠 Tecnologias Utilizadas

- HTML + CSS + JavaScript (Vanilla)
- Manipulação de DOM
- Agente de IA baseado em heurísticas simples
- *(Futuro)* Sprites com animações
- *(Futuro)* Agentes com Aprendizado por Reforço

---

## 📚 Versões

| Versão         | Descrição                                                   | Status          |
|----------------|---------------------------------------------------------------|-----------------|
| `v1-blocos`    | MVP funcional com IA básica e obstáculos variados.            | ✅ Finalizado    |
| `v2-sprites`   | *(Planejado)* Introdução de sprites gráficos.                  | 🔜 Em breve     |
| `v3-vision`    | *(Planejado)* IA baseada em visão computacional.               | 🔜 Em breve     |
| `v4-RL`        | *(Planejado)* Agente de Aprendizado por Reforço.               | 🔜 Em breve     |

---

## 📜 Histórico de Desenvolvimento

| Versão        | Evolução Principal                                              | Status          |
|---------------|------------------------------------------------------------------|-----------------|
| v1.0          | MVP inicial com blocos e IA heurística simples                   | ✅ Concluído     |
| v1.1          | HUD com contagem de pulos e obstáculos evitados                  | ✅ Concluído     |
| v1.2          | Obstáculos aleatórios em velocidade e altura                     | ✅ Concluído     |
| v1.3          | Instrumentação de logs para análise posterior                    | ✅ Concluído     |
| v2.0          | Exportação de logs para `.json`                                   | ✅ Concluído     |
| v2.4          | Funções de abaixar refinadas, obstáculos voadores implementados  | ✅ Concluído     |
| v2.5-final    | Agente IA funcionando 100% para obstáculos de solo e voadores    | ✅ Concluído     |

---

## 🚀 Status Atual do Projeto

Atualmente, a versão `v1-blocos` (v2.5-final) está **funcional** e **encerrada** para o escopo proposto:
- IA evita obstáculos normais e voadores corretamente
- HUD, controles e logs funcionando
- Pequeno bug visual conhecido ("caixas fantasmas"), **não impactando jogabilidade**
- Decisão de não investir mais correções nesta versão, focando no **próximo estágio** de evolução:  
migração para uma versão baseada no **Dino Chrome original** para treinos mais avançados.

---

## 🧭 Próximos Passos

- Iniciar novo projeto baseado no Dino Chrome real (sprites + engine mais fiel)
- Aplicar técnicas de:
  - Aprendizado por Reforço (RL)
  - Imitation Learning (Imitação de Jogadas)
  - Deep Q-Learning
- Manter histórico de agentes evoluídos para comparação entre as versões

---

## 👤 Autor

Projeto idealizado e desenvolvido por [GeffyB](https://github.com/GeffyB).  


---

## 📂 Estrutura do Projeto

```bash
dino-game-html/
├── v1-blocos/         # Versão v2.5-final: IA 100% funcional (obstáculos + voadores)
│   ├── index.html
│   ├── style.css
│   ├── game.js
│   ├── agent.js
│   └── README.md      # Histórico detalhado por versão
├── v2.5-final/        # (Pasta recém criada: duplicação da versão estável para ajustes posteriores)
└── README.md          # Este arquivo: visão geral do projeto
