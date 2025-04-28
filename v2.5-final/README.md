# 🦖 DinoFauro – v2.5-final

**Descrição:**  
Projeto de IA para o jogo "Dino" baseado em blocos simples.  
Inclui obstáculos normais, obstáculos baixos e obstáculos voadores.  
Implementa modo Jogador e modo IA.

---

## 🎮 Como Jogar

- **Espaço (`Space`)** = Pular
- **Seta para Baixo (`↓`)** = Abaixar
- **Selecione o modo:**  
  - 🎮 Jogador → Controle manual usando o teclado.  
  - 🤖 IA → Deixe a IA jogar automaticamente.

---

## 🧠 Recursos de IA

- A IA detecta obstáculos e decide automaticamente:
  - Pular sobre obstáculos de chão.
  - Abaixar para evitar obstáculos voadores.

- A distância de reação é proporcional à velocidade do jogo, permitindo que a IA se adapte ao aumento da dificuldade.

---

## 📤 Exportar Logs

- Durante a execução do jogo, o botão **"📤 Exportar Logs"** gera um **arquivo JSON** com:
  - Tipo de agente (Jogador ou IA).
  - Tempo total sobrevivido.
  - Número de pulos realizados.
  - Número de obstáculos evitados.
  - Lista detalhada dos eventos (com timestamps).

---

## 📋 Estrutura dos Arquivos

- `index.html` → Estrutura da página e HUD.
- `style.css` → Estilo visual dos elementos.
- `game.js` → Mecânica principal do jogo.
- `agent.js` → Comportamento de IA para o Dino.

---

## 🚀 Novidades da v2.5-final

- Implementação de obstáculos voadores.
- Correção de colisão diferenciada (chão x voador).
- Distância de reação dinâmica baseada na velocidade.
- IA com decisão refinada para abaixar e levantar corretamente.
- Exportação automática de logs de partida em JSON.

---

# ✅ Status Atual

- Modo IA funcionando de forma robusta (30+ minutos sem erros).
- Logs prontos para análise de desempenho.
- Estrutura organizada para próximas melhorias.

---

# 📥 Instruções de Uso Rápido

```bash
1. Abra o arquivo index.html em seu navegador.
2. Escolha o modo: Jogador ou IA.
3. Pressione "▶️ Iniciar Jogo" para começar.
4. Após jogar, clique em "📤 Exportar Logs" para salvar o arquivo de dados.
