# Histórico da Versão v1-blocos

## 📦 Versão Atual: `v2.5-final` — IA Heurística com Suporte a Obstáculos Voadores

> Status: ✅ Estável

Esta versão implementa uma IA heurística capaz de:
- Pular obstáculos de chão.
- Abaixar para evitar obstáculos voadores.
- Reagir proporcionalmente à velocidade crescente do jogo.
- Corrigir colisões específicas para diferentes tipos de obstáculos.

**Características principais:**
- Obstáculos variando entre comuns, baixos e voadores.
- Tempo formatado `hh:mm:ss`.
- HUD dinâmico de tempo, pulos e obstáculos evitados.
- Logs de ações da IA e do jogador exportáveis.
- Sistema de game over visual sem interrupção do flow do jogo.

**Limitantes conhecidos:**
- Pequeno bug visual de "obstáculo fantasma" no canto superior esquerdo (não afeta gameplay diretamente, mas influencia nos contadores de evitados).
- IA baseada apenas em regras simples, ainda sem aprendizado adaptativo.

---

## 🔹 v2.1-vis (Arquivada)

> Status: ❌ Arquivada (instável)

Tentativa de usar sprites visuais em vez de blocos simples. Arquivada devido a problemas de alinhamento e colisão inconsistentes.

---

## 🔹 v2.0 — Sistema de Logs e Exportação

Implementação da coleta de eventos:
- 🦘 Pulos.
- 🧱 Obstáculos evitados.
- 💥 Colisões.
- 📤 Exportação de sessões para `.json` estruturado.

---

## 🔹 v1.3 — IA Heurística Aprimorada

- Introduzida reação proporcional à velocidade dos obstáculos.
- Ajustes finos de distância e tempo de resposta para pulos.

---

## 🔹 v1.2 — Obstáculos Randomizados

- Obstáculos com spawn e velocidade aleatórios.
- Implementação da movimentação via `requestAnimationFrame`.

---

## 🔹 v1.1 — HUD Dinâmico

- Contadores de pulos e obstáculos evitados atualizando em tempo real.

---

## 🔹 v1.0 — MVP Funcional

- Primeira versão jogável.
- IA simples para saltar obstáculos básicos.
- Cronômetro, contadores, HUD e lógica básica de colisão.

---

> 📎 Observação: este README consolida e organiza toda a evolução do projeto `v1-blocos`, mantendo o histórico e orientando para futuras melhorias.

