import React from 'react';
import oIcon from './assets/o-icon.png';
import xIcon from './assets/x-icon.png';
import './TestCard.css';

function TestCard({ summary, ox, index, total, selected, isCorrect, onAnswer }) {
  const explanation = ox?.explanation;

  // Strip leading instruction like "다음 진술이 맞으면 O, 틀리면 X를 선택하세요." and preceding breaks
  const sanitizeSummary = (html) => {
    if (!html) return '';
    const marker = '<br/><br/>';
    const idx = html.indexOf(marker);
    if (idx !== -1) {
      return html.slice(idx + marker.length).trim();
    }
    // Fallback: try <br> variations
    const marker2 = '<br><br>';
    const idx2 = html.indexOf(marker2);
    if (idx2 !== -1) {
      return html.slice(idx2 + marker2.length).trim();
    }
    return html.trim();
  };

  const cleaned = sanitizeSummary(summary);

  return (
    <div className="test-card">
      <div className="test-card-content">
        <div className="test-card-question-line">
          <span className="test-card-number-inline">{index + 1}.</span>
          <span className="test-card-question-inline" dangerouslySetInnerHTML={{ __html: cleaned }} />
        </div>
        <div className="test-card-answer">
          <div className="test-card-actions">
            <button
              className={`ox-btn o-btn ${selected === true ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              onClick={() => onAnswer && onAnswer(true)}
              disabled={selected !== null}
            >
              <img src={oIcon} alt="O" className="ox-img" />
            </button>
            <button
              className={`ox-btn x-btn ${selected === false ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              onClick={() => onAnswer && onAnswer(false)}
              disabled={selected !== null}
            >
              <img src={xIcon} alt="X" className="ox-img" />
            </button>
          </div>
          <div className="test-card-feedback-slot">
            {selected !== null && (
              <div className={`test-card-feedback ${isCorrect ? 'ok' : 'no'}`}>
                {isCorrect ? '정답!' : '오답!'} {explanation ? `- ${explanation}` : ''}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="test-card-progress">{index + 1} / {total}</div>
    </div>
  );
}

export default TestCard;
