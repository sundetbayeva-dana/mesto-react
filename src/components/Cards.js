import React from 'react';

function Cards({url, text, likeCount}) {
    return (
        <li className="card">
            <button aria-label="Кнопка удалить" className="button button_type_delete" type="button">
            </button>
            <img src={url} className="card__pic" alt="" />
            <div className="card__text">
                <h2 className="card__name">{text}</h2>
                <div className="card__like">
                    <button aria-label="Кнопка нравится" className="button button_type_like" type="button">
                    </button>
                    <p className="card__like-count">{likeCount}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Cards;