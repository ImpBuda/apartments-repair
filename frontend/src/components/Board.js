import React from 'react';
import "../css/board.css"
import {Link} from "react-router-dom";

const Board = ({adverts}) => {

    return (adverts)?.map((advert) => {
        return (
            <Link to={`/${advert.id}`}>
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
            </Link>
        )
    });
}

export default Board;