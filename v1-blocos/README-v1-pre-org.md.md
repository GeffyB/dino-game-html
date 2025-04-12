# Dino Game — Versão 1: Protótipo em Blocos 🟩🌵

Esta é a primeira versão funcional do Dino Game, utilizando elementos básicos (`<div>`) representando o dinossauro (`dinofauro`) e o obstáculo (`espinhudo`), com um agente heurístico simples.

---

##  Objetivo da Versão
Implementar um MVP funcional que:
- Simula o ambiente básico do jogo
- Permite testar pulos e colisões
- Usa uma IA heurística simples baseada em distância
- Serve de base para iteração futura (sprites, RL, etc)

---

##  Status Atual
- O `dinofauro` é renderizado como um bloco verde
- O `espinhudo` é um bloco vermelho que avança da direita
- O agente toma decisões baseadas em distância
- ❌ **Bug atual:** o agente pula constantemente desde o início e ainda colide no pouso

---

##  Próximos Passos
- Ajustar a condição de pulo para evitar saltos contínuos
- Corrigir o tempo de reação e a altura para evitar colisões
- Adicionar contadores de performance (pulos, pontuação)

---

##  Observações
Esta versão foi mantida como "raw" propositalmente para servir como referência de primeira fase do projeto.  
Outras versões futuras serão adicionadas em pastas separadas.

