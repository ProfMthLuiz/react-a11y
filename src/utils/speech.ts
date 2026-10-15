import type { SpeechStep } from '../types';

export class ScreenReaderVoiceEngine {
  private isSpeaking = false;
  private currentStepIndex = 0;
  private steps: SpeechStep[] = [];
  private onStepChange?: (index: number, step: SpeechStep) => void;
  private onComplete?: () => void;
  private rate = 1.0;
  private pitch = 1.0;
  private isCancelled = false;

  constructor() {
    // Warm up voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }

  public setRate(rate: number) {
    this.rate = rate;
  }

  public setPitch(pitch: number) {
    this.pitch = pitch;
  }

  public stop() {
    this.isCancelled = true;
    this.isSpeaking = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.onComplete) {
      this.onComplete();
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getCurrentStep(): number {
    return this.currentStepIndex;
  }

  public playScript(
    steps: SpeechStep[],
    options: {
      isRobotic?: boolean;
      onStepChange: (index: number, step: SpeechStep) => void;
      onComplete: () => void;
    }
  ) {
    this.stop();
    this.isCancelled = false;
    this.isSpeaking = true;
    this.steps = steps;
    this.currentStepIndex = 0;
    this.onStepChange = options.onStepChange;
    this.onComplete = options.onComplete;

    this.speakStep(0, options.isRobotic || false);
  }

  private speakStep(index: number, isRobotic: boolean) {
    if (this.isCancelled || index >= this.steps.length) {
      this.isSpeaking = false;
      this.onComplete?.();
      return;
    }

    this.currentStepIndex = index;
    const step = this.steps[index];
    this.onStepChange?.(index, step);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Fallback for visual progression only if Web Speech not supported
      setTimeout(() => {
        if (!this.isCancelled) {
          this.speakStep(index + 1, isRobotic);
        }
      }, 2500);
      return;
    }

    // Cancel any hanging utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(step.text);
    utterance.lang = 'pt-BR';

    // Inaccessible screen reader sounds flat / monotonous
    if (isRobotic) {
      utterance.pitch = 0.8;
      utterance.rate = 1.1;
    } else {
      utterance.pitch = this.pitch;
      utterance.rate = 1.0 * this.rate;
    }

    // Pick pt-BR voice if available
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt') || v.lang.includes('BR'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    let hasEnded = false;
    const advance = () => {
      if (hasEnded) return;
      hasEnded = true;
      if (!this.isCancelled) {
        // Small delay between phrases like real screen readers
        const pauseTime = isRobotic ? 400 : 250;
        setTimeout(() => {
          this.speakStep(index + 1, isRobotic);
        }, pauseTime);
      }
    };

    utterance.onend = advance;
    utterance.onerror = (e) => {
      console.warn('Speech synthesis event error:', e);
      advance();
    };

    // Safety timeout in case utterance stalls
    setTimeout(() => {
      if (!hasEnded && this.isSpeaking) {
        advance();
      }
    }, Math.max(3000, step.text.length * 90));

    window.speechSynthesis.speak(utterance);
  }
}

export const speechEngine = new ScreenReaderVoiceEngine();
