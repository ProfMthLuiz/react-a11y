export type VisionMode = 
  | 'normal' 
  | 'protanopia' 
  | 'deuteranopia' 
  | 'tritanopia' 
  | 'achromatopsia' 
  | 'low-vision';

export interface WCAGCriterion {
  id: string;
  code: string;
  title: string;
  principle: 'Perceptível' | 'Operável' | 'Compreensível' | 'Robusto';
  level: 'A' | 'AA' | 'AAA';
  impact: 'Crítico' | 'Alto' | 'Médio';
  inaccessibleExplanation: string;
  accessibleExplanation: string;
  inaccessibleCode: string;
  accessibleCode: string;
  screenReaderInaccessible: string;
  screenReaderAccessible: string;
}

export type ActiveFormSimulation = 'inaccessible' | 'accessible' | null;

export interface SpeechStep {
  text: string;
  targetElement?: string;
  explanation: string;
}
