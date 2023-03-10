import React, {useState}  from 'react';
import {$authHost} from "../utils/http";
import "../css/addadvert.css"
import moment from "moment";

const AddAdvert = () => {

    const [images, setImages] = useState([])
    const [advert, setAdvert] = useState({
        title:"",
        description:"",
        phone:"",
        category:"",
        createTime: Date
    })

    const OnInputChange = (e) => {
        setAdvert({...advert, [e.target.name]: e.target.value, createTime: moment(new Date()).format('DD-MM-YYYY') })
    }

    const onChange = (e) => {
        const chosenImages = Array.prototype.slice.call(e.target.files)
        setImages(chosenImages);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let formData = new FormData();
            formData.append("advert",
                new Blob([JSON.stringify(advert)], {type: 'application/json'}
                )
            );
            [...images].forEach( image => {
                formData.append("images", image)
            })
            const response = await $authHost.post("/api/auth/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            });
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div className="wrapper-form">
        <div className="container-form">
            <form className="add-advert">
                <label className="title">
                    Тема
                    <input
                        className="addData"
                        type="text"
                        name="title"
                        onChange={event => OnInputChange(event)}/>
                </label>
                <label>Ваш мобильный Номер
                    <input
                        type="number"
                        name="phone"
                        onChange={event => OnInputChange(event)} />
                </label>
                <label>Категория
                    <select className="select-css" name="category" onChange={event => OnInputChange(event)}>
                        <option>Косметический</option>
                        <option>Капитальный</option>
                    </select>
                </label>
                <label className="description"><span>Описание</span>
                    <textarea
                        className="description"
                        name="description"
                        onChange={event => OnInputChange(event)}/>
                </label>
                <label className="files"><span>Фотографии примеров</span>
                    <input
                        onChange={event => onChange(event)}
                        type="file" multiple
                        accept=".jpg,.jpeg,.png"
                    />
                </label>
                <input className="submit" onClick={(e) => handleSubmit(e)} type="submit" value="Submit"/>
            </form>
        </div>
        </div>
    );
};

export default AddAdvert;