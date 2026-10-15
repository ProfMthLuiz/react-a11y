import React from 'react';
import type { VisionMode } from '../types';
import { Eye, Keyboard, Contrast, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ToolbarProps {
  visionMode: VisionMode;
  onVisionModeChange: (mode: VisionMode) => void;
  showTabOrder: boolean;
  onToggleTabOrder: () => void;
  showContrastBadges: boolean;
  onToggleContrastBadges: () => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
  onResetAll: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  visionMode,
  onVisionModeChange,
  showTabOrder,
  onToggleTabOrder,
  showContrastBadges,
  onToggleContrastBadges,
  speechRate,
  onSpeechRateChange,
  onResetAll
}) => {
  return (
    <div className="lab-toolbar" role="toolbar" aria-label="Ferramentas didáticas de simulação">
      <div className="toolbar-group">
        <label htmlFor="vision-select" className="toolbar-label">
          <Eye size={15} aria-hidden="true" />
          <span>Filtro de Visão:</span>
        </label>
        <select
          id="vision-select"
          className="toolbar-select"
          value={visionMode}
          onChange={(e) => onVisionModeChange(e.target.value as VisionMode)}
          aria-label="Simular condição visual de daltonismo ou baixa visão"
        >
          <option value="normal">👁️ Visão Normal (Padrão)</option>
          <option value="protanopia">🔴 Protanopia (Perda de Vermelho)</option>
          <option value="deuteranopia">🟢 Deuteranopia (Perda de Verde)</option>
          <option value="tritanopia">🔵 Tritanopia (Perda de Azul)</option>
          <option value="achromatopsia">⚪ Acromatopsia (Monocromático)</option>
          <option value="low-vision">🌫️ Baixa Visão / Visão Turva</option>
        </select>
        {visionMode !== 'normal' && (
          <span className="filter-active-pill" title="Filtro visual SVG ativo sobre os formulários">
            Ativo: {visionMode}
          </span>
        )}
      </div>

      <div className="toolbar-separator" aria-hidden="true" />

      <div className="toolbar-group">
        <button
          type="button"
          className={`toolbar-toggle-btn ${showTabOrder ? 'active' : ''}`}
          onClick={onToggleTabOrder}
          aria-pressed={showTabOrder}
          title="Exibir badges com a ordem e teclas de navegação do Tab"
        >
          <Keyboard size={15} aria-hidden="true" />
          <span>Ordem do Tab {showTabOrder ? 'ON' : 'OFF'}</span>
        </button>

        <button
          type="button"
          className={`toolbar-toggle-btn ${showContrastBadges ? 'active' : ''}`}
          onClick={onToggleContrastBadges}
          aria-pressed={showContrastBadges}
          title="Mostrar etiquetas flutuantes com o contraste real de cada texto"
        >
          <Contrast size={15} aria-hidden="true" />
          <span>Raio-X de Contraste {showContrastBadges ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <div className="toolbar-separator" aria-hidden="true" />

      <div className="toolbar-group speech-controls">
        <label htmlFor="speech-rate-select" className="toolbar-label">
          <SlidersHorizontal size={15} aria-hidden="true" />
          <span>Velocidade da Voz:</span>
        </label>
        <select
          id="speech-rate-select"
          className="toolbar-select small"
          value={speechRate}
          onChange={(e) => onSpeechRateChange(parseFloat(e.target.value))}
          aria-label="Velocidade da fala do leitor de tela"
        >
          <option value="0.75">0.75x (Lento)</option>
          <option value="1.0">1.0x (Normal)</option>
          <option value="1.25">1.25x (Rápido)</option>
          <option value="1.5">1.5x (Avançado)</option>
        </select>
      </div>

      <button
        type="button"
        className="toolbar-reset-btn"
        onClick={onResetAll}
        title="Redefinir todas as ferramentas para o estado padrão"
      >
        <RotateCcw size={14} aria-hidden="true" />
        <span>Restaurar Padrão</span>
      </button>
    </div>
  );
};
