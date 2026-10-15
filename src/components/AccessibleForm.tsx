import React, { useState, useRef } from 'react';
import { Volume2, Square, ShieldCheck, ChevronDown, ChevronUp, CheckCircle, Info, Send, Check } from 'lucide-react';
import { AudioWaveform } from './AudioWaveform';
import { WCAG_CRITERIA, ACCESSIBLE_SPEECH_SCRIPT } from '../data/wcagCriteria';

interface AccessibleFormProps {
  isSpeaking: boolean;
  activeStepIndex: number;
  onStartSpeech: () => void;
  onStopSpeech: () => void;
  showTabOrder: boolean;
  showContrastBadges: boolean;
}

export const AccessibleForm: React.FC<AccessibleFormProps> = ({
  isSpeaking,
  activeStepIndex,
  onStartSpeech,
  onStopSpeech,
  showTabOrder,
  showContrastBadges
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
    termos: false
  });
  const [formFeedback, setFormFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const nomeInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const termsInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      setFormFeedback({
        type: 'error',
        message: 'Por favor, preencha o campo Nome Completo.'
      });
      nomeInputRef.current?.focus();
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormFeedback({
        type: 'error',
        message: 'Por favor, informe um endereço de e-mail válido.'
      });
      emailInputRef.current?.focus();
      return;
    }

    if (!formData.termos) {
      setFormFeedback({
        type: 'error',
        message: 'É necessário concordar com os termos de privacidade para continuar.'
      });
      termsInputRef.current?.focus();
      return;
    }

    setFormFeedback({
      type: 'success',
      message: 'Inscrição realizada com sucesso! Mensagem confirmada com suporte total a tecnologias assistivas.'
    });

    setTimeout(() => {
      setFormFeedback(null);
    }, 6000);
  };

  return (
    <section className="form-column accessible-column" aria-label="Versão 2: Acessível (WCAG 2.1 AA)">
      {/* Top Banner Conformity */}
      <div className="column-top-badge success">
        <CheckCircle size={15} aria-hidden="true" />
        <span>Versão em Conformidade WCAG 2.1 AA (Recomendado)</span>
      </div>

      {/* Card Header Bar */}
      <div className="card-top-bar acc-bar">
        <div className="card-title-group">
          <span className="status-indicator-dot green" aria-hidden="true" />
          <h2 className="card-top-title">VERSÃO 2: ACESSÍVEL (O &quot;DEPOIS&quot; - WCAG 2.1 AA)</h2>
        </div>

        <button
          type="button"
          className={`speech-btn acc-speech-btn ${isSpeaking ? 'playing' : ''}`}
          onClick={isSpeaking ? onStopSpeech : onStartSpeech}
          title={isSpeaking ? 'Parar leitura de voz' : 'Simular voz do leitor de tela (NVDA/VoiceOver)'}
        >
          {isSpeaking ? (
            <>
              <Square size={14} aria-hidden="true" fill="currentColor" />
              <span>Parar Voz</span>
              <AudioWaveform color="#10b981" isActive={true} />
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
      <div className="white-form-card acc-card">
        <div className="form-inner-content">
          <h3 className="acc-form-title">Newsletter TechInclusiva</h3>

          <div className="field-wrapper">
            <p className="acc-form-subtitle">
              Receba novidades sobre front-end e computação acessível. Preencha seus dados abaixo.
            </p>
            {showContrastBadges && (
              <span className="contrast-badge pass" title="WCAG AAA: Contraste excelente">
                Contraste 8.4:1 ✅ Aprovado AAA
              </span>
            )}
          </div>

          {/* Accessible Form */}
          <form className="acc-form-body" onSubmit={handleSubmit} noValidate>
            {/* Live Accessible Alert Banner */}
            {formFeedback && (
              <div 
                className={`acc-feedback-box ${formFeedback.type}`}
                role="alert"
                aria-live="assertive"
              >
                {formFeedback.type === 'success' ? (
                  <Check size={18} aria-hidden="true" />
                ) : (
                  <Info size={18} aria-hidden="true" />
                )}
                <span>{formFeedback.message}</span>
              </div>
            )}

            {/* Field 1: Name with semantic label */}
            <div className="acc-field-group">
              <label htmlFor="acc-nome" className="acc-label">
                Nome Completo <span className="req-star" aria-hidden="true">*</span>
                <span className="sr-only">(campo obrigatório)</span>
                {showContrastBadges && (
                  <span className="contrast-badge pass">Contraste 9.1:1 ✅</span>
                )}
              </label>

              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge active-tab">Tab 1</span>}
                <input
                  ref={nomeInputRef}
                  id="acc-nome"
                  name="nomeCompleto"
                  type="text"
                  required
                  aria-required="true"
                  className="acc-input"
                  placeholder="Ex: Carlos Oliveira"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>
            </div>

            {/* Field 2: Email with semantic label & aria-describedby hint */}
            <div className="acc-field-group">
              <label htmlFor="acc-email" className="acc-label">
                E-mail institucional ou pessoal <span className="req-star" aria-hidden="true">*</span>
                <span className="sr-only">(campo obrigatório)</span>
                {showContrastBadges && (
                  <span className="contrast-badge pass">Contraste 9.1:1 ✅</span>
                )}
              </label>

              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge active-tab">Tab 2</span>}
                <input
                  ref={emailInputRef}
                  id="acc-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-describedby="acc-email-help"
                  className="acc-input"
                  placeholder="carlos@exemplo.com.br"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div id="acc-email-help" className="acc-helper-text">
                <Info size={14} className="helper-icon" aria-hidden="true" />
                <span>Nunca compartilharemos seu e-mail com terceiros.</span>
                {showContrastBadges && (
                  <span className="contrast-badge pass">Contraste 7.2:1 ✅</span>
                )}
              </div>
            </div>

            {/* Field 3: Optional message */}
            <div className="acc-field-group">
              <label htmlFor="acc-msg" className="acc-label">
                Mensagem ou Dúvida <span className="optional-tag">(Opcional)</span>
              </label>

              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge active-tab">Tab 3</span>}
                <input
                  id="acc-msg"
                  name="mensagem"
                  type="text"
                  className="acc-input"
                  placeholder="Escreva sua mensagem aqui..."
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                />
              </div>
            </div>

            {/* Checkbox: Native semantic checkbox with full label wrapping */}
            <div className="acc-checkbox-group">
              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge active-tab">Tab 4</span>}
                <input
                  ref={termsInputRef}
                  type="checkbox"
                  id="acc-terms"
                  name="termos"
                  required
                  aria-required="true"
                  className="acc-checkbox-input"
                  checked={formData.termos}
                  onChange={(e) => setFormData({ ...formData, termos: e.target.checked })}
                />
              </div>

              <label htmlFor="acc-terms" className="acc-checkbox-label">
                <span>
                  Concordo com os termos e condições da plataforma e declaro que li a política de privacidade. <span className="req-star" aria-hidden="true">*</span>
                </span>
                <span className="sr-only">(campo obrigatório)</span>
              </label>
            </div>

            {/* Submit Button: Native accessible button */}
            <div className="acc-submit-wrapper">
              <div className="input-relative-container">
                {showTabOrder && <span className="tab-order-badge active-tab">Tab 5</span>}
                <button
                  type="submit"
                  id="acc-submit-btn"
                  className="acc-button"
                  title="Enviar inscrição da newsletter"
                >
                  <Send size={16} aria-hidden="true" />
                  <span>Cadastrar Newsletter</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Accordion Diagnostic Section */}
      <div className="diagnostic-accordion acc-diagnostic">
        <button
          type="button"
          className="accordion-header acc-acc-header"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          aria-expanded={isAccordionOpen}
        >
          <div className="acc-header-title">
            <ShieldCheck size={16} className="text-emerald-400" aria-hidden="true" />
            <span>Diagnóstico WCAG &amp; Leitor de Tela (Boas Práticas)</span>
          </div>
          {isAccordionOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
        </button>

        {isAccordionOpen && (
          <div className="accordion-body">
            {/* Screen Reader Terminal Display */}
            <div className="terminal-speech-card acc-terminal">
              <div className="terminal-header">
                <Volume2 size={14} aria-hidden="true" />
                <span className="terminal-title">O QUE O LEITOR DE TELA (NVDA / VOICEOVER) FALA COM CLAREZA:</span>
              </div>
              <div className="terminal-box">
                <p className="terminal-quote">
                  &ldquo;Nome Completo, obrigatório, campo de edição. E-mail institucional ou pessoal, obrigatório, campo de edição. Nunca compartilharemos seu e-mail com terceiros. Mensagem ou Dúvida, opcional, campo de edição. Caixa de seleção marcada: Concordo com os termos... Botão: Cadastrar Newsletter.&rdquo;
                </p>
                {isSpeaking && (
                  <div className="active-speech-caption success">
                    <span className="live-dot green" />
                    <strong>Ao vivo: </strong>
                    <span>{ACCESSIBLE_SPEECH_SCRIPT[activeStepIndex]?.text || 'Lendo...'}</span>
                  </div>
                )}
              </div>
              <p className="terminal-explanation">
                🛡️ Graças às tags semânticas <code>&lt;label htmlFor&gt;</code>, <code>aria-describedby</code> e elementos nativos de formulário, qualquer usuário de tecnologia assistiva compreende perfeitamente cada passo!
              </p>
            </div>

            {/* List of Success Criteria */}
            <div className="wcag-success-list">
              <h4 className="successes-title">Diretrizes WCAG 2.1 AA Atendidas:</h4>
              <ul className="criteria-items">
                {WCAG_CRITERIA.map((criterion) => (
                  <li key={criterion.id} className="criterion-card pass-card">
                    <div className="criterion-badge-row">
                      <span className="criterion-code pass">{criterion.code}</span>
                      <span className="criterion-name">{criterion.title}</span>
                      <span className="criterion-level">Nível {criterion.level}</span>
                    </div>
                    <p className="criterion-desc">{criterion.accessibleExplanation}</p>
                    <div className="criterion-sr-quote">
                      <span className="sr-tag success">Leitor de Tela:</span> &ldquo;{criterion.screenReaderAccessible}&rdquo;
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
