import type { WCAGCriterion, SpeechStep } from '../types';

export const WCAG_CRITERIA: WCAGCriterion[] = [
  {
    id: '1.3.1',
    code: 'WCAG 1.3.1',
    title: 'Informações e Relações',
    principle: 'Perceptível',
    level: 'A',
    impact: 'Crítico',
    inaccessibleExplanation: 'Uso de <div> ou <p> para simular rótulos, sem relação programática com o <input>. O leitor de tela lê apenas "Edição em branco" sem saber o que é solicitado.',
    accessibleExplanation: 'Uso de <label htmlFor="campo-id"> vinculado explicitamente ao id do <input>. A tecnologia assistiva anuncia automaticamente o rótulo ao focar no campo.',
    inaccessibleCode: `<!-- INACESSÍVEL: Rótulo visual sem vínculo -->
<div class="label">Nome Completo *</div>
<input type="text" placeholder="Digite seu nome..." />`,
    accessibleCode: `<!-- ACESSÍVEL: Associação semântica total -->
<label for="nome-completo">
  Nome Completo <span aria-hidden="true" class="req">*</span>
</label>
<input 
  id="nome-completo" 
  name="nome" 
  type="text" 
  required 
  aria-required="true"
  placeholder="Ex: Carlos Oliveira" 
/>`,
    screenReaderInaccessible: 'Edição em branco.',
    screenReaderAccessible: 'Nome Completo, obrigatório, campo de edição. Ex: Carlos Oliveira.'
  },
  {
    id: '1.4.3',
    code: 'WCAG 1.4.3',
    title: 'Contraste Mínimo',
    principle: 'Perceptível',
    level: 'AA',
    impact: 'Alto',
    inaccessibleExplanation: 'Textos auxiliares e placeholders utilizam cores ultra-claras (#a0aec0 / #cbd5e1 sobre branco), gerando contraste de apenas 1.5:1 (muito abaixo do mínimo 4.5:1 exigido). Pessoas com baixa visão ou em ambientes ensolarados não conseguem ler.',
    accessibleExplanation: 'Cores com contraste de 8.2:1 para texto normal e 4.8:1 para placeholders e textos auxiliares (#334155 e #64748b sobre branco), atendendo ao padrão rigoroso AAA.',
    inaccessibleCode: `/* INACESSÍVEL: Contraste insuficiente (1.5:1) */
.subtitulo {
  color: #cbd5e1; /* Invisível para baixa visão */
}
.helper-text {
  color: #d1d5db;
  font-size: 11px;
}`,
    accessibleCode: `/* ACESSÍVEL: Alto contraste garantido (8.2:1) */
.subtitulo {
  color: #334155; /* Perceptível por qualquer usuário */
}
.helper-text {
  color: #1e293b;
  font-size: 13px;
}`,
    screenReaderInaccessible: 'Texto quase invisível visualmente.',
    screenReaderAccessible: 'Texto perfeitamente legível com alto contraste.'
  },
  {
    id: '2.1.1',
    code: 'WCAG 2.1.1',
    title: 'Acessível por Teclado',
    principle: 'Operável',
    level: 'A',
    impact: 'Crítico',
    inaccessibleExplanation: 'O botão de envio é implementado com uma <div> estilizada e evento onClick. Ele não recebe foco pela tecla Tab e não dispara com as teclas Enter ou Barra de Espaço.',
    accessibleExplanation: 'Uso de elemento nativo <button type="submit">. Ele entra naturalmente na ordem do Tab, dispara com Enter/Espaço e possui a semântica de botão reconhecida por qualquer dispositivo.',
    inaccessibleCode: `<!-- INACESSÍVEL: Div simulando botão -->
<div class="fake-button" onclick="handleSubmit()">
  Cadastrar Newsletter
</div>
<!-- Não pode ser focado com Tab, nem ativado por teclado! -->`,
    accessibleCode: `<!-- ACESSÍVEL: Botão semântico nativo -->
<button type="submit" class="btn-primary">
  <svg aria-hidden="true">...</svg>
  Cadastrar Newsletter
</button>`,
    screenReaderInaccessible: '(Silêncio. O elemento é completamente ignorado na navegação por Tab).',
    screenReaderAccessible: 'Botão: Cadastrar Newsletter. Pressione Espaço ou Enter para ativar.'
  },
  {
    id: '2.4.7',
    code: 'WCAG 2.4.7',
    title: 'Foco Visível',
    principle: 'Operável',
    level: 'AA',
    impact: 'Crítico',
    inaccessibleExplanation: 'A regra CSS "outline: none" foi aplicada nos campos sem fornecer indicador alternativo. Usuários de teclado ficam completamente perdidos sem saber onde o foco está localizado.',
    accessibleExplanation: 'Indicador visual de foco nítido (:focus-visible) com anel duplo colorido de 2px e deslocamento (outline-offset), tornando evidente o elemento ativo.',
    inaccessibleCode: `/* INACESSÍVEL: Remove o cursor visual de foco */
input:focus {
  outline: none; /* Destrói a navegação por teclado */
  border-color: #cbd5e1;
}`,
    accessibleCode: `/* ACESSÍVEL: Anel de foco nítido e acessível */
input:focus-visible,
button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
}`,
    screenReaderInaccessible: 'Foco invisível: usuário de teclado não sabe onde está.',
    screenReaderAccessible: 'Foco destacado com anel azul de 2px de espessura.'
  },
  {
    id: '4.1.2',
    code: 'WCAG 4.1.2',
    title: 'Nome, Função e Valor',
    principle: 'Robusto',
    level: 'A',
    impact: 'Alto',
    inaccessibleExplanation: 'Checkbox fake feita com <div> sem atributos de acessibilidade (role="checkbox", aria-checked). Clicar no texto adjacente não marca a caixa.',
    accessibleExplanation: 'Uso do <input type="checkbox"> padrão envolvido por <label> com alvo de clique amplo (mínimo 44x44px). Suporta leitura imediata de "marcado / desmarcado".',
    inaccessibleCode: `<!-- INACESSÍVEL: Checkbox simulada sem estado acessível -->
<div class="fake-checkbox" onclick="toggle()">
  <span class="box"></span> Concordo com os termos...
</div>`,
    accessibleCode: `<!-- ACESSÍVEL: Checkbox nativa acessível com Label -->
<div class="form-checkbox">
  <input 
    type="checkbox" 
    id="termos" 
    name="termos" 
    required 
    aria-required="true" 
  />
  <label for="termos">
    Concordo com os termos e condições da plataforma e declaro que li a política de privacidade. <span aria-hidden="true">*</span>
  </label>
</div>`,
    screenReaderInaccessible: 'Caixa de seleção desmarcada (sem nome associado).',
    screenReaderAccessible: 'Concordo com os termos e condições da plataforma e declaro que li a política de privacidade, caixa de seleção desmarcada, obrigatório.'
  }
];

export const INACCESSIBLE_SPEECH_SCRIPT: SpeechStep[] = [
  {
    text: "Página carregada.",
    explanation: "O leitor lê o documento, mas faltam marcos semânticos como <main> ou <header>."
  },
  {
    text: "Newsletter TechInclusiva.",
    explanation: "Lido como texto simples porque foi usado <div> ou <p> em vez de cabeçalho estruturado <h1>/<h2>."
  },
  {
    text: "Receba novidades sobre front-end e computação. Preencha seus dados abaixo.",
    explanation: "Texto com baixo contraste lido pelo leitor, mas ilegível para baixa visão."
  },
  {
    text: "Edição em branco.",
    targetElement: "inacc-nome",
    explanation: "FALHA CRÍTICA: Sem <label> vinculado, o leitor não sabe que este campo é para o 'Nome Completo'!"
  },
  {
    text: "Edição em branco.",
    targetElement: "inacc-email",
    explanation: "FALHA CRÍTICA: O usuário não sabe se deve digitar e-mail, telefone ou CPF."
  },
  {
    text: "Edição em branco.",
    targetElement: "inacc-msg",
    explanation: "Mais um campo anônimo sem nome acessível."
  },
  {
    text: "Caixa de seleção desmarcada.",
    targetElement: "inacc-terms",
    explanation: "FALHA: O leitor lê a caixa, mas não anuncia o texto do termo porque o <label> não está associado!"
  },
  {
    text: "Fim do formulário.",
    targetElement: "inacc-btn",
    explanation: "FALHA GRAVE: O botão 'Cadastrar' não foi lido porque é uma <div> não focável! O usuário cego acha que o formulário nem tem botão de envio!"
  }
];

export const ACCESSIBLE_SPEECH_SCRIPT: SpeechStep[] = [
  {
    text: "Página carregada. Região principal.",
    explanation: "Presença de marco semântico <main> orienta o usuário de leitor de tela."
  },
  {
    text: "Título nível 2: Newsletter TechInclusiva.",
    explanation: "Hierarquia correta com <h2>: o usuário pode navegar diretamente por cabeçalhos teclando 'H'."
  },
  {
    text: "Receba novidades sobre front-end e computação acessível. Preencha seus dados abaixo.",
    explanation: "Instrução inicial clara com contraste aprovado no nível AAA."
  },
  {
    text: "Nome Completo, obrigatório, campo de edição. Exemplo: Carlos Oliveira.",
    targetElement: "acc-nome",
    explanation: "SUCESSO: <label htmlFor> anuncia o nome exato e o atributo 'required' avisa que é obrigatório."
  },
  {
    text: "E-mail institucional ou pessoal, obrigatório, campo de edição. carlos@exemplo.com.br. Nunca compartilharemos seu e-mail com terceiros.",
    targetElement: "acc-email",
    explanation: "SUCESSO: O atributo aria-describedby faz o leitor anunciar a dica de privacidade automaticamente ao focar no e-mail!"
  },
  {
    text: "Mensagem ou Dúvida, opcional, campo de edição. Escreva sua mensagem aqui.",
    targetElement: "acc-msg",
    explanation: "SUCESSO: Informa com clareza que o campo não é obrigatório."
  },
  {
    text: "Concordo com os termos e condições da plataforma e declaro que li a política de privacidade, obrigatório, caixa de seleção desmarcada.",
    targetElement: "acc-terms",
    explanation: "SUCESSO: O texto completo dos termos é lido junto com o estado atual da caixa."
  },
  {
    text: "Botão: Cadastrar Newsletter. Pressione Espaço ou Enter para enviar.",
    targetElement: "acc-btn",
    explanation: "SUCESSO: Elemento <button> nativo 100% acessível por teclado com anúncio de função perfeito."
  }
];
