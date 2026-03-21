# 🐱 CatGamesVerseSelector

O **CatGamesVerseSelector** é uma plataforma inteligente para descoberta de jogos free-to-play. O sistema utiliza critérios de hardware (RAM) e preferências de gênero para recomendar os melhores títulos, garantindo que o usuário encontre apenas o que realmente roda em sua máquina.

## 🚀 Tecnologias

- **Core:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + DaisyUI
- **Ícones:** Lucide React
- **Animações:** Tailwind Animate / CSS Transitions
- **Context API:** Gerenciamento de áudio e estados globais

## 🏗️ Arquitetura e Padrões

O projeto foi construído seguindo boas práticas de engenharia de software para garantir escalabilidade e legibilidade:

- **Strategy Pattern:** Aplicado para isolar a lógica de filtragem de hardware. Isso permite que diferentes perfis de desempenho (Low-End, Balanced, Genre-Focus) sejam selecionados dinamicamente, evitando o uso excessivo de condicionais (`if/else` ou `switch`) no componente principal.
- **Atomic Design:** Organização da estrutura de componentes dividida em _Atoms_, _Molecules_, _Organisms_ e _Templates_, facilitando a reutilização e manutenção.
- **Barrels (Index Files):** Utilizados em todas as pastas de componentes para simplificar as exportações e manter as importações limpas e organizadas.
- **Server Proxy:** Configurado no `vite.config.ts` para contornar problemas de CORS em ambiente de desenvolvimento, apontando as requisições para a API de forma transparente.

## 📦 Como Rodar Localmente

1. **Clonar o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/cat-games-verse.git](https://github.com/seu-usuario/cat-games-verse.git)
   ```

2. \*_Instalar as dependências:_

   ```bash
   npm install
   ```

3. \*_Executar o projeto::_
   ```bash
   npm run dev
   ```
   -Nota: As requisições à API funcionarão normalmente via localhost devido à configuração de proxy já inclusa no projeto.

## 🛠️ Estrutura das pastas

```plaintext
  src/
  ├── components/         # Atomic Design (Atoms, Molecules, Organisms, Templates)
  │   └── index.ts        # Barrel exports
  ├── hooks/              # Custom Hooks (useGameDiscovery, etc)
  ├── strategies/         # Implementação do Strategy Pattern e constantes
  ├── context/            # AudioContext e outros estados
  └── assets/             # Recursos estáticos (Sons e Imagens)
```

Desenvolvido por Rebeca Pádua Sato 🐈‍⬛
