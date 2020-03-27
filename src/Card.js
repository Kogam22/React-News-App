import React from 'react';
import './Card.css';

function Card(props) {
    return (
        <div className="Card">
            <div className="Card-Content">
                <div className="Card-Image-Wrapper">
                    <img className="Card-Image" src={props.data.urlToImage} alt=""/>
                </div>
                <div className="Card-Text-Section">
                    <a className="Card-Title" href={props.data.url}> {props.data.title} </a>
                    <p className="Card-Description">{props.data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;