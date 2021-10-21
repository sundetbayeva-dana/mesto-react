import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup-card">
            <div className="popup__overlay"></div>
            <div className="popup-card__content">
                <button aria-label="Кнопка закрыть" className="button button_type_close" type="button">
                </button>
                <img className="popup-card__pic" alt="#" src="#" />
                <p className="popup-card__picname"></p>
            </div>
        </div>
    )
}

export default ImagePopup;