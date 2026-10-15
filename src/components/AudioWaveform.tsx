import React from 'react';

interface AudioWaveformProps {
  color?: string;
  isActive?: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  color = '#ef4444', 
  isActive = true 
}) => {
  if (!isActive) return null;

  return (
    <div 
      className="audio-waveform" 
      aria-hidden="true"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', height: '18px' }}
    >
      {[0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.7].map((heightScale, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-block',
            width: '3px',
            backgroundColor: color,
            borderRadius: '2px',
            animation: `waveformAnim 0.8s ease-in-out infinite alternate`,
            animationDelay: `${idx * 0.12}s`,
            height: `${heightScale * 14}px`
          }}
        />
      ))}
    </div>
  );
};
