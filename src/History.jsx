import React from 'react';
import './History.css';
import { reportData } from './data';

const historyGroups = [
    {
        id: 'fri',
        dayLabel: '금요일',
        dateLabel: '2024.10.18',
        items: [reportData[0], reportData[1]],
    },
    {
        id: 'thu',
        dayLabel: '목요일',
        dateLabel: '2024.10.17',
        items: [reportData[2]],
    },
];

const stripHtml = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function History() {
    return (
        <div className="history-wrapper">
            <header className="history-header">
                <h1>히스토리</h1>
                <p>요일별로 저장한 뉴스 카드를 모아볼 수 있어요.</p>
            </header>

            <div className="history-content">
                {historyGroups.map((group) => (
                    <section key={group.id} className="history-section">
                        <div className="history-section-heading">
                            <h2>{group.dayLabel}</h2>
                            <span>{group.dateLabel}</span>
                        </div>
                        <div className="history-card-grid">
                            {group.items.map((item) => (
                                <article key={`${group.id}-${item.id}`} className="history-card">
                                    <div className="history-card-header">
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div className="history-card-body">
                                        <p>{stripHtml(item.summary).slice(0, 140)}{stripHtml(item.summary).length > 140 ? '…' : ''}</p>
                                    </div>
                                    <footer className="history-card-footer">
                                        <button type="button">자세히 보기</button>
                                    </footer>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default History;

