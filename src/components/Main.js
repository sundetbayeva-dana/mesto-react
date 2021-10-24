import React, { useEffect } from 'react';
import api from './../utils/Api';
import icon from './../images/Vector.svg';
import Card from './Card';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = React.useState('');    
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('')

    useEffect(() => {
        api.getUserInformation()
        .then(({name, about, avatar}) => {
            setUserName(name)
            setUserDescription(about)
            setUserAvatar(avatar)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    const [cards, setCards] = React.useState([])

    useEffect(() => {
        api.getCards()
        .then(cards => setCards(cards))
        .catch((err) => {
            console.log(err)
        })       
    }, [])

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={icon} alt="Изменить аватар пользователя" className="profile__icon-edit" />                
                    <img src={userAvatar} alt="Аватарка пользователя" className="profile__avatar" onClick={onEditAvatar} />
                    
                    
                </div>
                <div className="profile__info">
                    <div className="profile__info-name-cont">
                        <h1 className="profile__info-name">{userName}</h1>
                        <button aria-label="Кнопка изменить профиль" className="button button_type_edit" type="button" onClick={onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__info-activity">{userDescription}</p>
                </div>
                <button aria-label="Кнопка добавить" className="button button_type_add" type="button" onClick={onAddPlace}>
                </button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map(({ link, name, likes, _id }) => {
                        return (
                            <Card
                            key={_id}
                            url={link}
                            text={name}
                            likeCount={likes.length}
                            onCardClick={onCardClick}                            
                            />
                        )                   
                    })}
                </ul>                
            </section>

        </main>
    )
}

export default Main;