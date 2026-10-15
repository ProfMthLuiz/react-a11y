import React from 'react';
import { Eye, GraduationCap, Sparkles, BookOpen, Volume2 } from 'lucide-react';

interface HeaderProps {
  onOpenCodeModal: () => void;
  onOpenGuideModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCodeModal, onOpenGuideModal }) => {
  return (
    <header className="app-header">
      <div className="header-top-row">
        <div className="header-brand">
          <div className="brand-icon-wrapper">
            <Eye className="brand-icon" aria-hidden="true" />
          </div>
          <div>
            <div className="brand-subtitle-badge">
              <GraduationCap size={14} aria-hidden="true" />
              <span>Material Didático para Professores e Alunos</span>
            </div>
            <h1 className="brand-title">
              Laboratório de Acessibilidade Web <span className="highlight-text">(A11y)</span>
            </h1>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button"
            className="header-btn secondary"
            onClick={onOpenGuideModal}
            title="Abrir Cartilha dos Princípios WCAG"
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>Guia WCAG 2.1 (P.O.U.R)</span>
          </button>

          <button 
            type="button"
            className="header-btn primary"
            onClick={onOpenCodeModal}
            title="Comparar código fonte Lado a Lado"
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>Raio-X de Código (Diff)</span>
          </button>
        </div>
      </div>

      <p className="header-lead">
        Estudo de caso comparativo direto: experimente o mesmo formulário com <strong>más práticas comuns</strong> (falhas graves de navegação e contraste) versus a <strong>versão em conformidade WCAG 2.1 AA</strong>. Use os botões de voz para ouvir exatamente como um leitor de tela (NVDA / VoiceOver) interpreta cada um.
      </p>

      <div className="header-tags-bar" role="region" aria-label="Recursos educacionais do laboratório">
        <span className="tag-pill">
          <Volume2 size={13} aria-hidden="true" />
          Síntese de Voz Web em Tempo Real
        </span>
        <span className="tag-pill">
          ⚡ Simulação de Daltonismo & Baixa Visão
        </span>
        <span className="tag-pill">
          ⌨️ Teste Real de Navegação por Teclado (Tab/Shift+Tab)
        </span>
        <span className="tag-pill">
          📐 Verificador de Contraste WCAG (4.5:1 vs 1.5:1)
        </span>
      </div>
    </header>
  );
};
