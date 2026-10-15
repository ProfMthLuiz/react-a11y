# 🎓 Laboratório Prático de Acessibilidade Web (A11y)
> **Estudo de Caso Comparativo**: Formulário Inacessível vs. Diretrizes WCAG 2.1 Nível AA  
> Criado com **React 19 + TypeScript + Vite** para fins didáticos em sala de aula.

---

## 📸 Visão Geral do Projeto

Este projeto reproduz com fidelidade e interatividade o estudo comparativo lado a lado de um formulário de newsletter:
1. **Lado Esquerdo (Vermelho / O "Antes")**: Versão deliberadamente inacessível contendo as falhas didáticas mais frequentes do front-end moderno.
2. **Lado Direito (Verde / O "Depois")**: Versão 100% em conformidade com as diretrizes internacionais **W3C WCAG 2.1 AA** e a **Lei Brasileira de Inclusão (LBI)**.

---

## 🚀 Como Executar o Projeto

```bash
# Entrar na pasta do projeto
cd acessibilidade-lab

# Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse em seu navegador:  
👉 **`http://localhost:5173`**

---

## 🛠️ Recursos Didáticos Interativos Integrados

### 1. 🔊 Simulação de Leitor de Tela (Web Speech API)
- Clique no botão **"Simular Voz do Leitor"** em qualquer um dos dois lados.
- **Versão 1**: O leitor fala *"Edição em branco... Edição em branco... Caixa de seleção desmarcada"*, sem saber o que pedir ao aluno ou usuário cego. O botão nem sequer é lido!
- **Versão 2**: O leitor anuncia com clareza o nome do campo (*"Nome Completo, obrigatório, campo de edição"*), dicas com `aria-describedby` e botões de ação nativos.
- Inclui **Closed Captions** ao vivo e indicador de onda sonora.

### 2. 👓 Filtros de Daltonismo & Baixa Visão
No seletor superior, simule em tempo real como pessoas com diferentes condições visuais enxergam a página:
- **Protanopia**: Perda de percepção ao vermelho.
- **Deuteranopia**: Perda de percepção ao verde.
- **Tritanopia**: Perda de percepção ao azul.
- **Acromatopsia**: Visão em escala de cinza total (ausência de cones de cor).
- **Baixa Visão / Visão Turva**: Simula catarata e perda de acuidade.
> *Demonstre aos alunos como os textos em cinza claro da Versão 1 desaparecem completamente nesses modos!*

### 3. ⌨️ Inspetor de Teclado & Ordem do Tab
- Ative o botão **"Ordem do Tab"**.
- Badges numéricos (*Tab 1, Tab 2, Tab 3...*) surgirão sobre os campos.
- **Na Versão 1**: O botão de envio exibe um alerta vermelho: `🚫 Não Focável (Ignorado pelo Tab)` porque foi feito com `<div>`.
- **Na Versão 2**: Toda a navegação sequencial é fluida e o anel de foco `outline` de 2px orienta o usuário de teclado.
- Pressione **Tab**, **Shift+Tab**, **Enter** e **Espaço** para ver o HUD flutuante no canto inferior direito rastrear a navegação em tempo real.

### 4. 🎨 Raio-X de Taxas de Contraste
- Ative **"Raio-X de Contraste"** para inspecionar as taxas calculadas pela fórmula WCAG:
  - Textos normais exigem **4.5:1** (Nível AA) e **7.0:1** (Nível AAA).
  - A Versão 1 atinge míseros **1.7:1** (FALHA).
  - A Versão 2 atinge **8.4:1** a **9.1:1** (APROVADO AAA).

### 5. 🔍 Comparador de Código Lado a Lado (Diff)
- Clique no botão superior **"Raio-X de Código (Diff)"** para abrir um modal interativo comparando:
  - `<div>` vs `<label htmlFor>`
  - `<div onclick>` vs `<button type="submit">`
  - `outline: none` vs `:focus-visible`
  - Textos soltos vs `aria-describedby`
  - Botões para copiar código e notas explicativas.

### 6. 📘 Cartilha WCAG (P.O.U.R)
- Guia resumido explicando os 4 pilares:
  - **P**erceptível
  - **O**perável
  - **U**nderstandable (Compreensível)
  - **R**obusto

---

## 📂 Estrutura de Arquivos

```
acessibilidade-lab/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Cabeçalho com selo didático e ações
│   │   ├── Toolbar.tsx             # Barra com filtros de visão, teclado e contraste
│   │   ├── InaccessibleForm.tsx    # Versão 1: Inacessível (O "Antes")
│   │   ├── AccessibleForm.tsx      # Versão 2: Acessível (O "Depois")
│   │   ├── CodeComparisonModal.tsx # Modal de comparação de código fonte (Diff)
│   │   ├── WCAGCheatSheetModal.tsx # Modal com guia dos princípios P.O.U.R
│   │   ├── KeyboardHud.tsx         # HUD de rastreamento de teclas em tempo real
│   │   └── AudioWaveform.tsx       # Efeito visual de áudio do leitor
│   ├── data/
│   │   └── wcagCriteria.ts         # Critérios WCAG 2.1, explicações e roteiros de voz
│   ├── utils/
│   │   └── speech.ts               # Motor de síntese de voz via Web Speech API (pt-BR)
│   ├── types.ts                    # Definições de tipos TypeScript
│   ├── App.tsx                     # Orquestrador principal da interface
│   ├── App.css                     # Estilização completa e responsiva
│   └── index.css                   # Variáveis de design e base
├── index.html                      # HTML5 semântico com filtros SVG de daltonismo
└── package.json
```

---

## 💡 Dicas Pedagógicas para a Aula

1. **Atividade 1 (Navegação sem Mouse)**: Peça aos alunos para desconectarem o mouse ou não tocarem no trackpad. Peça que tentem cadastrar o e-mail na Versão 1 apenas usando `Tab` e `Enter`. Eles perceberão que é **impossível** enviar o formulário! Em seguida, peça que façam o mesmo na Versão 2.
2. **Atividade 2 (Simulação de Daltonismo)**: Aplique o filtro *Acromatopsia* ou *Baixa Visão* e pergunte aos alunos se eles conseguem ler o texto *"Nunca compartilharemos seu e-mail com terceiros"* na Versão 1.
3. **Atividade 3 (Ouvindo com Leitor de Tela)**: Feche os olhos da turma e aperte o botão de simular voz da Versão 1. Pergunte: *"Vocês saberiam dizer o que deve ser digitado no segundo campo?"*. A resposta será não. Depois, toque a Versão 2.
