import React, { useEffect } from 'react';
import api from './../utils/Api';
import icon from './../images/Vector.svg';
import Cards from './Cards';


function Main({onEditProfile, onAddPlace, onEditAvatar}) {
    const [userName, setUserName] = React.useState([]);    
    const [userDescription, setUserDescription] = React.useState([]);
    const [userAvatar, setUserAvatar] = React.useState([])    

    useEffect(() => {
        api.getUserInformation()
        .then(({name, about, avatar}) => {
            setUserName([
                ...userName,
                name
            ])
            setUserDescription([
                ...userDescription,
                about
            ])
            setUserAvatar([
                ...userAvatar,
                avatar
            ])
        })
    }, [])

    const [cards, setCards] = React.useState([])

    useEffect(() => {
        api.getCards()
        .then(cards => setCards(cards))           
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
                    {cards.map(({ link, name, likes }) => {
                        return <Cards
                            url={link}
                            text={name}
                            likeCount={likes.length}
                        />
                    })}
                </ul>                
            </section>

            


            

            {/*<div className="popup popup-profile">
                <div className="popup__overlay"></div>
                <div className="popup__content">
                    <button aria-label="Кнопка закрыть" className="button button_type_close" type="button">
                    </button>
                    <h2 className="popup__title">Редактировать профиль</h2>
                    
                    <form className="popup__form popup__form-profile" name="profile">
                        <input type="text" placeholder="Имя"
                        className="popup__form-text popup__form-text_type_name" name="name" id ="name-profile" minLength="2" maxLength="40" required />
                        <span className="name-profile-error"></span>
                        <input type="text" placeholder="Занятие"
                        className="popup__form-text popup__form-text_type_activity" name="about" id="description-profile" minLength="2" maxLength="200" required />
                        <span className="description-profile-error"></span>

                        <button className="button button_type_save" type="submit">
                        Сохранить
                        </button>
                    </form>
                </div>
            </div>*/}

            

            {/*<div className="popup popup-place">
                <div className="popup__overlay"></div>
                    <div className="popup__content">
                    <button aria-label="Кнопка закрыть" className="button button_type_close" type="button">
                    </button>
                    <h2 className="popup__title">Новое место</h2>
                    
                    <form className="popup__form popup__form-place" name="place" >
                        <input type="text" placeholder="Название"
                        className="popup__form-text popup__form-text_type_name-pic" name="name" id="name-place" required minLength="2" maxLength="30" />
                        <span className="name-place-error"></span>
                        <input type="url" placeholder="Ссылка на картинку"
                        className="popup__form-text popup__form-text_type_link" name="link" id="link-place" required />
                        <span className="link-place-error"></span>
                        <button className="button button_type_save" type="submit" name="place" >
                        Сохранить
                        </button>
                    </form>
                </div>
            </div>*/}

            

            <div className="popup popup-confirm-delete">
                <div className="popup__overlay"></div>
                <div className="popup__content">
                    <button aria-label="Кнопка закрыть" className="button button_type_close" type="button">
                    </button>
                    <h2 className="popup__title">Вы уверены?</h2>
                    <button className="button button_type_submit" type="submit" name="confirm-delete">
                        Да
                    </button>
                </div>
            </div>
            
            


            {/*<div className="popup popup-avatar-change">
                <div className="popup__overlay"></div>
                <div className="popup__content">
                    <button aria-label="Кнопка закрыть" className="button button_type_close" type="button">
                    </button>
                    <h2 className="popup__title">Обновить аватар</h2>
                    <form className="popup__form popup__form-edit-avatar-picture" name="avatar-picture">
                        <input type="url" placeholder="Ссылка на картинку"
                        className="popup__form-text popup__form-text_type_link-avatar" name="link" id="link-avatar-picture" required />
                        <span className="link-avatar-picture-error"></span>
                        <button className="button button_type_save" type="submit" name="place" >
                        Сохранить
                        </button>
                    </form>
                </div>
            </div>*/}
              
            <div className="popup popup-card">
                <div className="popup__overlay"></div>
                <div className="popup-card__content">
                    <button aria-label="Кнопка закрыть" className="button button_type_close" type="button">
                    </button>
                    <img className="popup-card__pic" alt="#" src="#" />
                    <p className="popup-card__picname"></p>
                </div>
            </div>
              
        </main>
    )
}

export default Main;