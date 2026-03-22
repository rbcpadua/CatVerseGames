# 🐱 CatGamesVerseSelector

O **CatGamesVerseSelector** é uma plataforma inteligente para descoberta de jogos free-to-play. O sistema utiliza critérios de hardware (RAM) e preferências de gênero para recomendar os melhores títulos, garantindo que o usuário encontre apenas o que realmente roda em sua máquina.

## 🚀 Tecnologias

- **Core:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + DaisyUI
- **Ícones:** Lucide React
- **Animações:** Tailwind Animate / CSS Transitions
- **Context API:** Gerenciamento de áudio e estados globais
- **Testes de Unidade:** Jest + React Testing Library
- **Testes E2E:** Cypress
- 
## 🏗️ Arquitetura e Padrões

O projeto foi construído seguindo boas práticas de engenharia de software para garantir escalabilidade e legibilidade:

- **Strategy Pattern:** Aplicado para isolar a lógica de filtragem de hardware. Isso permite que diferentes perfis de desempenho (Low-End, Balanced, Genre-Focus) sejam selecionados dinamicamente, evitando o uso excessivo de condicionais (`if/else` ou `switch`) no componente principal.
- **Atomic Design:** Organização da estrutura de componentes dividida em _Atoms_, _Molecules_, _Organisms_ e _Templates_, facilitando a reutilização e manutenção.
- **Barrels (Index Files):** Utilizados em todas as pastas de componentes para simplificar as exportações e manter as importações limpas e organizadas.
- **Server Proxy:** Configurado no `vite.config.ts` para contornar problemas de CORS em ambiente de desenvolvimento, apontando as requisições para a API de forma transparente.

## 🧪 Testes

O projeto conta com uma pirâmide de testes para garantir a confiabilidade das regras de negócio:

- **Testes de Unidade e Integração (Jest):** Focados nas páginas da aplicação. Eles ficam localizados dentro da pasta `src/pages/**/__test__/` para validar o comportamento dos fluxos e interações do usuário.
- **Testes de Ponta a Ponta (Cypress):** Validam o fluxo completo e a jornada do usuário no navegador de ponta a ponta.

Instalando as libs de testes
```bash
# 1. Instalar o Jest e Testing Library para Testes de Unidade (Pages)
npm install --save-dev jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom fast-text-encoding identity-obj-proxy

# 2. Instalar o Cypress para Testes de Ponta a Ponta (E2E)
npm install --save-dev cypress
```

Para rodar os testes:
```bash
# Rodar testes de Unidade (Jest)
npm run jest

# Abrir painel do Cypress para testes E2E
npm run cypress:open
// Ou para abrir o Cy
npx cypress open
     
npm run cypress:run
// Ou para rodar apenas o Cy no terminal
npx cypress run    

# Para rodar Jest e Cypress juntos
npm run test
````

## 📦 Como Rodar Localmente a App

1. **Clonar o repositório:**

   ```bash
      git clone [https://github.com/seu-usuario/cat-games-verse.git](https://github.com/seu-usuario/cat-games-verse.git)
   ```

2. \*_Instalar as dependências:_

   ```bash
      npm install
   ```

3. \*_Executar o projeto:_
   Entre na pasta cat-verse-games e depois execute o comando do gerenciador de pacotes

   ```bash
      npm run dev
   ```

   -Nota: As requisições à API funcionarão normalmente via localhost devido à configuração de proxy já inclusa no projeto.

## 🛠️ Estrutura das pastas

```plaintext
 src/
  ├── assets/             # Recursos estáticos (Sons e Imagens)
  ├── components/         # Atomic Design (Atoms, Molecules, Organisms, Templates)
  ├── context/            # AudioContext e outros estados de tema globais
  ├── hooks/              # Custom Hooks de regras de negócio (useGameDiscovery, etc)
  ├── pages/              # Páginas da aplicação e seus Testes de Unidade (Jest)
  ├── routes/             # Definição e mapeamento de rotas do React Router
  └── strategies/         # Implementação do Strategy Pattern e constantes de hardware
```

Desenvolvido por Rebeca Pádua Sato 🐈‍⬛
