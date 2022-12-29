import React from 'react';
import "../css/board.css"

const Board = ({adverts}) => {

    return (adverts)?.map((advert) => {
        return (
            <div className="card">
                <div className="header-card">
                    <img
                        src={`data:${advert.advertImage.type};base64,${advert.advertImage.imageData}`}
                        alt={advert.title}
                    />
                </div>
                <div className="description-card">
                    <span>{advert.title}</span>
                </div>
            </div>
        )
    });
}

export default Board;