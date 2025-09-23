import React from 'react';
import './Card.css';

function Card({ imageUrl, title, description }) {
    return (
        <div className="card">
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <a href="#" className="card-link">더 보기</a>
            </div>
        </div>
    );
}

export default Card;