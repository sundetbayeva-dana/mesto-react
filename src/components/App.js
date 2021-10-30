import React, {useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from './../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]= React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({})

    const [currentUser, setCurrentUser] = React.useState({})
    useEffect(() => {
        api.getUserInformation()
        .then(currentUser => setCurrentUser(currentUser))
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

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
  
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({})
    }

    function handleCardClick({url, text}) {
        setSelectedCard({url, text})
    }

    function handleUpdateUser(userInfo) { 
        api.setUserInfo(userInfo)
        .then(currentUser => setCurrentUser(currentUser))
        .then(() => {
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        }) 
        
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
        .then(currentUser => setCurrentUser(currentUser))
        .then(() => {
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    function handleCardLike({likes, cardId}) {
        const isLiked = likes.some(i => i._id === currentUser._id);

        if (!isLiked) {    
            api.setLikeOnCard(cardId)
            .then((likedCard) => {
                setCards((state) => state.map((c) => c._id === cardId ? likedCard :c))
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            api.removeLikeOnCard(cardId)
            .then((dislikedCard) => {
                setCards((state) => state.map((c) => c._id === cardId ? dislikedCard :c))
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    function handleCardDelete({cardId}) {
        api.deleteCard(cardId)
        .then(() => {
            setCards((state) => state.filter((d) => d._id !== cardId ?? d))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleAddPlaceSubmit({text, link}) {
        api.addCards(text, link)
        .then((newCard) => setCards([newCard, ...cards]))
        .then(() => {
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    return (
          
        <div className="App">
            <div className="page">
                <div className="page__container">
                    <CurrentUserContext.Provider value={currentUser}>
                        <Header />
                        <div className="page__content">
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onClose={closeAllPopups}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                            <Footer />

                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} >
                            </EditProfilePopup>

                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} ></AddPlacePopup>                          


                            <PopupWithForm name="delete" title="Вы уверены?" isOpen={''} onClose={closeAllPopups} buttonText="Да">                            
                            </PopupWithForm>

                            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                        </div>

                    </CurrentUserContext.Provider>
                    
                    
                </div>

            </div>
            
        </div>
    );
}

export default App;