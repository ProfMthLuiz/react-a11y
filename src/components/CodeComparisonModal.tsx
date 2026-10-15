import React, { useState } from 'react';
import { X, Check, Copy, Code2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { WCAG_CRITERIA } from '../data/wcagCriteria';

interface CodeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeComparisonModal: React.FC<CodeComparisonModalProps> = ({ isOpen, onClose }) => {
  const [selectedId, setSelectedId] = useState<string>(WCAG_CRITERIA[0].id);
  const [copiedState, setCopiedState] = useState<'bad' | 'good' | null>(null);

  if (!isOpen) return null;

  const currentCriterion = WCAG_CRITERIA.find(c => c.id === selectedId) || WCAG_CRITERIA[0];

  const handleCopy = (text: string, type: 'bad' | 'good') => {
    navigator.clipboard.writeText(text);
    setCopiedState(type);
    setTimeout(() => setCopiedState(null), 2000);
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="code-modal-title"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="modal-header-title">
            <Code2 size={20} className="text-blue-400" aria-hidden="true" />
            <h2 id="code-modal-title">Raio-X de Código: Como NÃO Fazer vs. Como FAZER</h2>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Fechar janela comparativa de código"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {/* Tab navigation for criteria */}
        <nav className="criteria-nav-tabs" aria-label="Selecione o critério para comparar">
          {WCAG_CRITERIA.map((criterion) => (
            <button
              key={criterion.id}
              type="button"
              className={`criteria-nav-tab ${selectedId === criterion.id ? 'active' : ''}`}
              onClick={() => setSelectedId(criterion.id)}
            >
              <strong>{criterion.code}</strong>
              <span>{criterion.title}</span>
            </button>
          ))}
        </nav>

        {/* Selected Criterion Overview */}
        <div className="criterion-summary-banner">
          <div className="summary-badges">
            <span className="summary-pill principle">{currentCriterion.principle}</span>
            <span className="summary-pill level">Nível {currentCriterion.level}</span>
            <span className="summary-pill impact">Impacto: {currentCriterion.impact}</span>
          </div>
          <p className="summary-text">
            <strong>Objetivo didático:</strong> Entender a diferença prática na implementação em código e como as tecnologias assistivas processam a estrutura na Árvore de Acessibilidade (Accessibility Tree).
          </p>
        </div>

        {/* Side by side code blocks */}
        <div className="code-comparison-grid">
          {/* BAD CODE */}
          <div className="code-panel bad">
            <div className="code-panel-header">
              <div className="panel-title">
                <AlertTriangle size={16} aria-hidden="true" />
                <span>❌ Inacessível (Código Problemático)</span>
              </div>
              <button
                type="button"
                className="copy-btn"
                onClick={() => handleCopy(currentCriterion.inaccessibleCode, 'bad')}
                title="Copiar código incorreto"
              >
                {copiedState === 'bad' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                <span>{copiedState === 'bad' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="code-block bad">
              <code>{currentCriterion.inaccessibleCode}</code>
            </pre>
            <div className="code-explanation bad">
              <strong>Por que falha?</strong>
              <p>{currentCriterion.inaccessibleExplanation}</p>
            </div>
          </div>

          {/* GOOD CODE */}
          <div className="code-panel good">
            <div className="code-panel-header">
              <div className="panel-title">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>✅ Acessível (Conforme WCAG 2.1 AA)</span>
              </div>
              <button
                type="button"
                className="copy-btn"
                onClick={() => handleCopy(currentCriterion.accessibleCode, 'good')}
                title="Copiar código correto"
              >
                {copiedState === 'good' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                <span>{copiedState === 'good' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="code-block good">
              <code>{currentCriterion.accessibleCode}</code>
            </pre>
            <div className="code-explanation good">
              <strong>Como soluciona?</strong>
              <p>{currentCriterion.accessibleExplanation}</p>
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <p className="footer-tip">
            💡 <strong>Dica para a aula:</strong> Inspecione o elemento com o DevTools (F12) e veja a aba <em>Accessibility</em> no navegador para visualizar como a árvore de acessibilidade é construída!
          </p>
          <button type="button" className="modal-btn-confirm" onClick={onClose}>
            Entendi, voltar ao Laboratório
          </button>
        </footer>
      </div>
    </div>
  );
};
