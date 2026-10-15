import React, { useState } from 'react';
import { Volume2, Square, AlertTriangle, ChevronDown, ChevronUp, AlertCircle, VolumeX } from 'lucide-react';
import { AudioWaveform } from './AudioWaveform';
import { WCAG_CRITERIA, INACCESSIBLE_SPEECH_SCRIPT } from '../data/wcagCriteria';

interface InaccessibleFormProps {
  isSpeaking: boolean;
  activeStepIndex: number;
  onStartSpeech: () => void;
  onStopSpeech: () => void;
  showTabOrder: boolean;
  showContrastBadges: boolean;
}

export const InaccessibleForm: React.FC<InaccessibleFormProps> = ({
  isSpeaking,
  activeStepIndex,
  onStartSpeech,
  onStopSpeech,
  showTabOrder,
  showContrastBadges
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [fakeChecked, setFakeChecked] = useState(false);
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleFakeSubmit = () => {
    // Bad practice: Silent or inaccessible alert without focus management
    setFormFeedback('⚠️ Tentativa de envio com dados incompletos! Nenhum aviso sonoro ou foco foi atribuído ao campo com erro.');
    setTimeout(() => setFormFeedback(null), 5000);
  };

  return (
    <section className="form-column inaccessible-column" aria-label="Versão 1: Inacessível">
      {/* Top Banner Warning */}
      <div className="column-top-badge warning">
        <AlertCircle size={15} aria-hidden="true" />
        <span>Versão com Falhas Didáticas (Não recomendado)</span>
      </div>

      {/* Card Header Bar */}
      <div className="card-top-bar inacc-bar">
        <div className="card-title-group">
          <span className="status-indicator-dot red" aria-hidden="true" />
          <h2 className="card-top-title">VERSÃO 1: INACESSÍVEL (O &quot;ANTES&quot;)</h2>
        </div>

        <button
          type="button"
          className={`speech-btn inacc-speech-btn ${isSpeaking ? 'playing' : ''}`}
          onClick={isSpeaking ? onStopSpeech : onStartSpeech}
          title={isSpeaking ? 'Parar leitura de voz' : 'Simular voz do leitor de tela (NVDA/VoiceOver)'}
        >
          {isSpeaking ? (
            <>
              <Square size={14} aria-hidden="true" fill="currentColor" />
              <span>Parar Voz</span>
              <AudioWaveform color="#ef4444" isActive={true} />
            </>
          ) : (
            <>
              <Volume2 size={14} aria-hidden="true" />
              <span>Simular Voz do Leitor</span>
            </>
          )}
        </button>
      </div>

      {/* The White Form Container */}
      <div className="white-form-card inacc-card">
        {/* Contrast indicator floating badges if enabled */}
        <div className="form-inner-content">
          <h3 className="inacc-form-title">Newsletter TechInclusiva</h3>

          <div className="field-wrapper">
            <p className="inacc-form-subtitle">
              Receba novidades sobre front-end e computação. Preencha seus dados abaixo.
            </p>
            {showContrastBadges && (
              <span className="contrast-badge fail" title="WCAG 1.4.3 exige no mínimo 4.5:1">
                Contraste 1.7:1 ❌ Falha Crítica
              </span>
            )}
          </div>

          {/* Form Fields: All anti-patterns implemented faithfully */}
          <div className="inacc-form-body">
            {/* Field 1: Name without semantic label */}
            <div className="inacc-field-group">
              <div className="inacc-fake-label">
                Nome Completo *
                {showContrastBadges && (
                  <span className="contrast-badge fail">Contraste 1.9:1 ❌</span>
                )}
              </div>
              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge normal">Tab 1</span>}
                <input
                  id="inacc-nome"
                  type="text"
                  className="inacc-input"
                  placeholder="Digite seu nome..."
                  tabIndex={1}
                />
              </div>
            </div>

            {/* Field 2: Email without semantic label & faint helper */}
            <div className="inacc-field-group">
              <div className="inacc-fake-label">
                E-mail para contato *
                {showContrastBadges && (
                  <span className="contrast-badge fail">Contraste 1.9:1 ❌</span>
                )}
              </div>
              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge normal">Tab 2</span>}
                <input
                  id="inacc-email"
                  type="text"
                  className="inacc-input"
                  placeholder="nome@dominio.com"
                  tabIndex={2}
                />
              </div>
              <div className="field-wrapper">
                <span className="inacc-helper-text">
                  Nunca compartilharemos seu e-mail com terceiros.
                </span>
                {showContrastBadges && (
                  <span className="contrast-badge fail">Contraste 1.4:1 ❌ Quase Invisível</span>
                )}
              </div>
            </div>

            {/* Field 3: Optional message */}
            <div className="inacc-field-group">
              <div className="inacc-fake-label">
                Mensagem Opcional
              </div>
              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge normal">Tab 3</span>}
                <input
                  id="inacc-msg"
                  type="text"
                  className="inacc-input"
                  placeholder="Deixe uma mensagem..."
                  tabIndex={3}
                />
              </div>
            </div>

            {/* Checkbox: Fake div-based checkbox */}
            <div className="inacc-checkbox-row">
              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge skipped">🚫 Sem Foco</span>}
                {/* Notice: this is a div, not an input, or untabbable checkbox */}
                <div
                  className={`inacc-fake-checkbox-box ${fakeChecked ? 'checked' : ''}`}
                  onClick={() => setFakeChecked(!fakeChecked)}
                  role="presentation"
                >
                  {fakeChecked && '✓'}
                </div>
              </div>
              {/* Notice: clicking this text does NOT toggle the box! */}
              <span className="inacc-checkbox-text">
                Concordo com os termos e condições da plataforma.
              </span>
            </div>

            {/* Submit Button: An unaccessible DIV */}
            <div className="inacc-submit-wrapper">
              <div className="input-relative-container">
                {showTabOrder && (
                  <span className="tab-order-badge blocked">🚫 Não Focável (Ignorado pelo Tab)</span>
                )}
                {/* Anti-pattern: div button without tabindex, role or key listeners */}
                <div
                  className="inacc-fake-button"
                  onClick={handleFakeSubmit}
                  role="presentation"
                >
                  Cadastrar Newsletter
                </div>
              </div>

              <div className="inacc-button-warning">
                (Aviso: este botão não pode ser focado com a tecla Tab!)
              </div>
            </div>

            {formFeedback && (
              <div className="inacc-feedback-box">
                {formFeedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accordion Diagnostic Section */}
      <div className="diagnostic-accordion inacc-diagnostic">
        <button
          type="button"
          className="accordion-header inacc-acc-header"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          aria-expanded={isAccordionOpen}
        >
          <div className="acc-header-title">
            <AlertTriangle size={16} className="text-red-400" aria-hidden="true" />
            <span>Diagnóstico WCAG &amp; Leitor de Tela (Falhas)</span>
          </div>
          {isAccordionOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
        </button>

        {isAccordionOpen && (
          <div className="accordion-body">
            {/* Screen Reader Terminal Display */}
            <div className="terminal-speech-card inacc-terminal">
              <div className="terminal-header">
                <VolumeX size={14} aria-hidden="true" />
                <span className="terminal-title">O QUE O LEITOR DE TELA (NVDA / VOICEOVER) FALA:</span>
              </div>
              <div className="terminal-box">
                <p className="terminal-quote">
                  &ldquo;Edição em branco... Edição em branco... Caixa de seleção desmarcada.&rdquo;
                </p>
                {isSpeaking && (
                  <div className="active-speech-caption">
                    <span className="live-dot" />
                    <strong>Ao vivo: </strong>
                    <span>{INACCESSIBLE_SPEECH_SCRIPT[activeStepIndex]?.text || 'Lendo...'}</span>
                  </div>
                )}
              </div>
              <p className="terminal-explanation">
                ⚠️ Como não há tags <code>&lt;label htmlFor&gt;</code>, o leitor não consegue anunciar aos usuários com deficiência visual o que deve ser digitado em cada caixa! O botão sequer existe para o leitor.
              </p>
            </div>

            {/* List of Failure Criteria */}
            <div className="wcag-failures-list">
              <h4 className="failures-title">Principais Falhas Detectadas:</h4>
              <ul className="criteria-items">
                {WCAG_CRITERIA.map((criterion) => (
                  <li key={criterion.id} className="criterion-card fail-card">
                    <div className="criterion-badge-row">
                      <span className="criterion-code fail">{criterion.code}</span>
                      <span className="criterion-name">{criterion.title}</span>
                      <span className="criterion-level">Nível {criterion.level}</span>
                    </div>
                    <p className="criterion-desc">{criterion.inaccessibleExplanation}</p>
                    <div className="criterion-sr-quote">
                      <span className="sr-tag">Leitor de Tela:</span> &ldquo;{criterion.screenReaderInaccessible}&rdquo;
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
