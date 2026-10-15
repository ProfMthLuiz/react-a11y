import React, { useState } from 'react';
import { X, BookOpen, CheckSquare, Eye, Layers, HelpCircle } from 'lucide-react';

interface WCAGCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WCAGCheatSheetModal: React.FC<WCAGCheatSheetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pour' | 'contrast' | 'checklist'>('pour');

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="modal-header-title">
            <BookOpen size={20} className="text-emerald-400" aria-hidden="true" />
            <h2 id="guide-modal-title">Guia Rápido de Acessibilidade Web (WCAG 2.1 AA)</h2>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Fechar guia WCAG"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {/* Modal Navigation */}
        <div className="guide-tabs">
          <button
            type="button"
            className={`guide-tab ${activeTab === 'pour' ? 'active' : ''}`}
            onClick={() => setActiveTab('pour')}
          >
            <Layers size={16} aria-hidden="true" />
            <span>Os 4 Princípios P.O.U.R</span>
          </button>
          <button
            type="button"
            className={`guide-tab ${activeTab === 'contrast' ? 'active' : ''}`}
            onClick={() => setActiveTab('contrast')}
          >
            <Eye size={16} aria-hidden="true" />
            <span>Tabela de Contraste de Cores</span>
          </button>
          <button
            type="button"
            className={`guide-tab ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <CheckSquare size={16} aria-hidden="true" />
            <span>Checklist para Alunos</span>
          </button>
        </div>

        {/* Content based on tab */}
        <div className="guide-content-area">
          {activeTab === 'pour' && (
            <div className="pour-grid">
              <div className="pour-card p-card">
                <div className="pour-badge">P</div>
                <h3>1. Perceptível (Perceivable)</h3>
                <p>A informação não pode ser invisível para nenhum sentido humano.</p>
                <ul>
                  <li>Forneça texto alternativo para imagens (<code>alt</code>).</li>
                  <li>Garanta contraste mínimo de 4.5:1 para textos.</li>
                  <li>Não confie apenas na cor para transmitir significados.</li>
                </ul>
              </div>

              <div className="pour-card o-card">
                <div className="pour-badge">O</div>
                <h3>2. Operável (Operable)</h3>
                <p>Os controles devem ser operáveis por qualquer método de entrada.</p>
                <ul>
                  <li>Todas as funcionalidades acessíveis por teclado (Tab/Enter/Espaço).</li>
                  <li>Indicador visual de foco (<code>:focus-visible</code>) sempre visível.</li>
                  <li>Alvos de toque com tamanho mínimo de 44x44px.</li>
                </ul>
              </div>

              <div className="pour-card u-card">
                <div className="pour-badge">U</div>
                <h3>3. Compreensível (Understandable)</h3>
                <p>A interface e as informações devem ser previsíveis e claras.</p>
                <ul>
                  <li>Defina o idioma da página (<code>&lt;html lang=&quot;pt-BR&quot;&gt;</code>).</li>
                  <li>Rótulos e instruções descritivas antes dos campos.</li>
                  <li>Mensagens de erro claras com sugestões de correção.</li>
                </ul>
              </div>

              <div className="pour-card r-card">
                <div className="pour-badge">R</div>
                <h3>4. Robusto (Robust)</h3>
                <p>Compatível com diferentes agentes de usuário e tecnologias assistivas.</p>
                <ul>
                  <li>HTML semântico e estruturado de forma válida.</li>
                  <li>Associação de nome, função e valor (WAI-ARIA).</li>
                  <li>Atualizações dinâmicas avisadas com <code>aria-live</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'contrast' && (
            <div className="contrast-guide-section">
              <div className="contrast-table-wrapper">
                <table className="contrast-table">
                  <thead>
                    <tr>
                      <th scope="col">Elemento Visual</th>
                      <th scope="col">Nível AA (Obrigatório)</th>
                      <th scope="col">Nível AAA (Excelência)</th>
                      <th scope="col">Situação na Versão 1</th>
                      <th scope="col">Situação na Versão 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Texto Normal (&lt; 18pt / 24px)</th>
                      <td><strong>4.5 : 1</strong></td>
                      <td>7.0 : 1</td>
                      <td><span className="table-badge fail">1.7 : 1 (FALHA)</span></td>
                      <td><span className="table-badge pass">8.4 : 1 (APROVADO)</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Texto Grande (≥ 18pt ou 14pt bold)</th>
                      <td><strong>3.0 : 1</strong></td>
                      <td>4.5 : 1</td>
                      <td><span className="table-badge warn">2.8 : 1 (FALHA)</span></td>
                      <td><span className="table-badge pass">10.2 : 1 (APROVADO)</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Componentes de UI e Bordas Ativas</th>
                      <td><strong>3.0 : 1</strong></td>
                      <td>3.0 : 1</td>
                      <td><span className="table-badge fail">1.2 : 1 (FALHA)</span></td>
                      <td><span className="table-badge pass">3.8 : 1 (APROVADO)</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Botão de Ação Primária</th>
                      <td><strong>4.5 : 1</strong></td>
                      <td>7.0 : 1</td>
                      <td><span className="table-badge fail">1.4 : 1 (FALHA)</span></td>
                      <td><span className="table-badge pass">5.6 : 1 (APROVADO)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="contrast-callout">
                <HelpCircle size={20} aria-hidden="true" />
                <p>
                  <strong>Por que o contraste é essencial?</strong> Estima-se que mais de 300 milhões de pessoas no mundo tenham algum tipo de daltonismo ou perda gradual de acuidade visual decorrente do envelhecimento ou iluminação solar direta em telas de celular.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="checklist-section">
              <h3 className="checklist-title">Checklist Prático para seus Projetos Front-End:</h3>
              <div className="checklist-items">
                <div className="check-item">
                  <span className="check-number">1</span>
                  <div>
                    <strong>Nunca use &lt;div&gt; para criar botões clicáveis:</strong>
                    <p>Use sempre a tag nativa <code>&lt;button type=&quot;button|submit&quot;&gt;</code> para obter foco de teclado e suporte gratuito a leitor de tela.</p>
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-number">2</span>
                  <div>
                    <strong>Nunca remova o outline sem substituto:</strong>
                    <p>Evite <code>outline: none</code>. Prefira <code>:focus-visible</code> com cores vivas e <code>outline-offset</code>.</p>
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-number">3</span>
                  <div>
                    <strong>Vincule todo campo com seu &lt;label&gt;:</strong>
                    <p>Use o atributo <code>for</code> (ou <code>htmlFor</code> no React) com o mesmo <code>id</code> do input correspondente.</p>
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-number">4</span>
                  <div>
                    <strong>Placeholder não é substituto de rótulo:</strong>
                    <p>O placeholder desaparece assim que o usuário digita a primeira letra e possui baixo contraste por padrão.</p>
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-number">5</span>
                  <div>
                    <strong>Dicas e erros com aria-describedby:</strong>
                    <p>Vincule mensagens de instrução ou erro aos campos usando <code>aria-describedby=&quot;id-da-dica&quot;</code>.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="modal-footer">
          <button type="button" className="modal-btn-confirm" onClick={onClose}>
            Fechar Guia
          </button>
        </footer>
      </div>
    </div>
  );
};
