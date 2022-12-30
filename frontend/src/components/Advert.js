import React, {useEffect, useState} from 'react';
import {$authHost} from "../utils/http";
import {useParams} from "react-router-dom";
import ImageGallery from "./imageGallery";
import "../css/Advert.css"

const Advert = () => {

    const { id } = useParams();

    const [advert, setAdvert] = useState(null);

    useEffect(() => {
        fetchAdvert();
    }, [])

    const fetchAdvert = async () => {
        const response = await $authHost.get(`/api/auth/${id}`);
        setAdvert(response.data);
    }

    return advert && (
        <div className="advert-page-wrapper">
            <div className="advert-gallery-title-row">
                <ImageGallery images={advert.providerImages}/>
                <div className="advert-page-info">
                    <div className="advert-page-info-container">
                        <h3 className="advert-page-title">{advert.title}</h3>
                        <div className="advert-page-number"><span>Номер: </span>{advert.id}</div>
                        <div className="advert-page-price"><span>Категория: </span>{advert.category}</div>
                        <div className="advert-page-location"><span>Номер: </span>{advert.phone}</div>
                    </div>
                </div>
            </div>
            <div className="advert-page-description-container">
                <div className="advert-page-description-title">Description</div>
                <div className="advert-page-description">{advert.description}</div>
            </div>
        </div>
    );
};

export default Advert;