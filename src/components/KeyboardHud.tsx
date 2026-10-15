import React, { useEffect, useState } from 'react';
import { Keyboard, AlertCircle } from 'lucide-react';

interface KeyboardHudProps {
  enabled: boolean;
}

export const KeyboardHud: React.FC<KeyboardHudProps> = ({ enabled }) => {
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const [focusedElementInfo, setFocusedElementInfo] = useState<string>('Nenhum elemento focado');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Tab', 'Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        const keyName = e.key === ' ' ? 'Barra de Espaço' : e.key;
        setLastKeyPressed(e.shiftKey ? `Shift + ${keyName}` : keyName);

        // Check active element after slight delay to let browser move focus
        setTimeout(() => {
          const active = document.activeElement;
          if (active && active !== document.body) {
            const tagName = active.tagName.toLowerCase();
            const id = active.id ? `#${active.id}` : '';
            const type = (active as HTMLInputElement).type ? `[type="${(active as HTMLInputElement).type}"]` : '';
            setFocusedElementInfo(`<${tagName}${id}${type}>`);

            // Warn if user tabbed through the inaccessible form
            if (active.id === 'inacc-msg' && e.key === 'Tab' && !e.shiftKey) {
              setWarningMessage('🚨 Atenção! O botão "Cadastrar" da Versão 1 foi IGNORADO pelo Tab porque é uma <div> sem tabindex!');
              setTimeout(() => setWarningMessage(null), 4500);
            }
          } else {
            setFocusedElementInfo('Nenhum controle interativo');
          }
        }, 30);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside className="keyboard-hud-overlay" role="status" aria-live="polite">
      <div className="hud-content">
        <div className="hud-pill">
          <Keyboard size={16} aria-hidden="true" />
          <span>Última Tecla:</span>
          <strong>{lastKeyPressed || 'Pressione Tab no teclado'}</strong>
        </div>

        <div className="hud-pill info">
          <span>Elemento Focado:</span>
          <code>{focusedElementInfo}</code>
        </div>
      </div>

      {warningMessage && (
        <div className="hud-warning-toast" role="alert">
          <AlertCircle size={16} aria-hidden="true" />
          <span>{warningMessage}</span>
        </div>
      )}
    </aside>
  );
};
