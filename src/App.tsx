import React, { useState, useEffect } from 'react';
import type { VisionMode, ActiveFormSimulation } from './types';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { InaccessibleForm } from './components/InaccessibleForm';
import { AccessibleForm } from './components/AccessibleForm';
import { CodeComparisonModal } from './components/CodeComparisonModal';
import { WCAGCheatSheetModal } from './components/WCAGCheatSheetModal';
import { KeyboardHud } from './components/KeyboardHud';
import { speechEngine } from './utils/speech';
import { INACCESSIBLE_SPEECH_SCRIPT, ACCESSIBLE_SPEECH_SCRIPT } from './data/wcagCriteria';
import './App.css';

export const App: React.FC = () => {
  const [visionMode, setVisionMode] = useState<VisionMode>('normal');
  const [showTabOrder, setShowTabOrder] = useState<boolean>(false);
  const [showContrastBadges, setShowContrastBadges] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  const [activeSpeechForm, setActiveSpeechForm] = useState<ActiveFormSimulation>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  useEffect(() => {
    speechEngine.setRate(speechRate);
  }, [speechRate]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      speechEngine.stop();
    };
  }, []);

  const handleStartInaccessibleSpeech = () => {
    setActiveSpeechForm('inaccessible');
    setActiveStepIndex(0);

    speechEngine.playScript(INACCESSIBLE_SPEECH_SCRIPT, {
      isRobotic: true,
      onStepChange: (index) => {
        setActiveStepIndex(index);
      },
      onComplete: () => {
        setActiveSpeechForm(null);
      }
    });
  };

  const handleStartAccessibleSpeech = () => {
    setActiveSpeechForm('accessible');
    setActiveStepIndex(0);

    speechEngine.playScript(ACCESSIBLE_SPEECH_SCRIPT, {
      isRobotic: false,
      onStepChange: (index) => {
        setActiveStepIndex(index);
      },
      onComplete: () => {
        setActiveSpeechForm(null);
      }
    });
  };

  const handleStopSpeech = () => {
    speechEngine.stop();
    setActiveSpeechForm(null);
  };

  const handleResetAll = () => {
    handleStopSpeech();
    setVisionMode('normal');
    setShowTabOrder(false);
    setShowContrastBadges(false);
    setSpeechRate(1.0);
  };

  // Determine filter style for SVG simulation
  const filterStyle: React.CSSProperties = visionMode !== 'normal' 
    ? { filter: `url(#${visionMode})` } 
    : {};

  return (
    <div className="app-root">
      {/* Real-time Keyboard HUD when user presses Tab/Enter/Space */}
      <KeyboardHud enabled={showTabOrder} />

      <div className="app-shell">
        <Header
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          onOpenGuideModal={() => setIsGuideModalOpen(true)}
        />

        <Toolbar
          visionMode={visionMode}
          onVisionModeChange={setVisionMode}
          showTabOrder={showTabOrder}
          onToggleTabOrder={() => setShowTabOrder(!showTabOrder)}
          showContrastBadges={showContrastBadges}
          onToggleContrastBadges={() => setShowContrastBadges(!showContrastBadges)}
          speechRate={speechRate}
          onSpeechRateChange={setSpeechRate}
          onResetAll={handleResetAll}
        />

        {/* Vision Filter Active Notification Banner */}
        {visionMode !== 'normal' && (
          <div className="vision-banner" role="status">
            <span>
              👓 <strong>Simulação de Visão Ativa:</strong> {visionMode.toUpperCase()}. Note como os elementos de baixo contraste da Versão 1 ficam quase completamente ilegíveis!
            </span>
            <button type="button" onClick={() => setVisionMode('normal')} className="banner-close-btn">
              Desativar Filtro
            </button>
          </div>
        )}

        {/* Main Side-by-Side Comparison Area */}
        <main 
          id="main-comparison-content" 
          className="comparison-grid-container"
          style={filterStyle}
        >
          {/* Left Column: Versão 1 (Inacessível) */}
          <InaccessibleForm
            isSpeaking={activeSpeechForm === 'inaccessible'}
            activeStepIndex={activeStepIndex}
            onStartSpeech={handleStartInaccessibleSpeech}
            onStopSpeech={handleStopSpeech}
            showTabOrder={showTabOrder}
            showContrastBadges={showContrastBadges}
          />

          {/* Right Column: Versão 2 (Acessível) */}
          <AccessibleForm
            isSpeaking={activeSpeechForm === 'accessible'}
            activeStepIndex={activeStepIndex}
            onStartSpeech={handleStartAccessibleSpeech}
            onStopSpeech={handleStopSpeech}
            showTabOrder={showTabOrder}
            showContrastBadges={showContrastBadges}
          />
        </main>

        {/* Footer with pedagogical credits and WCAG summary */}
        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-text">
              <strong>Laboratório de Acessibilidade Web (A11y)</strong> &bull; Desenvolvido para aulas práticas de Front-end, Engenharia de Software e Design Inclusivo.
            </p>
            <p className="footer-subtext">
              Baseado nas diretrizes <strong>W3C / WAI WCAG 2.1</strong> (Níveis A e AA) e na Lei Brasileira de Inclusão (LBI nº 13.146/2015, Art. 63).
            </p>
          </div>
        </footer>
      </div>

      {/* Interactive Modals */}
      <CodeComparisonModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      <WCAGCheatSheetModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
};

export default App;
