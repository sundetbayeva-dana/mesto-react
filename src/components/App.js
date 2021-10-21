import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Cards from './Cards';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen]= React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }
  
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
    }

    return (
          
        <div className="App">
            <div className="page">
                <div className="page__container">
                    <Header />
                    <div className="page__content">
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onClose={closeAllPopups}
                    />
                    <Footer />

                    <PopupWithForm name="avatar-change" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>                     
                        <input type="url" placeholder="Ссылка на картинку" className="popup__form-text" name="link" id="link-avatar-picture" required />
                        <span className="link-avatar-picture-error"></span>
                    </PopupWithForm>

                    <PopupWithForm name="profile" title="Редактировать профиль"  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                        
                        <input type="url" placeholder="Имя" className="popup__form-text" name="name" id="name-profile" required />
                        <span className="name-profile-error popup__form-text-error_active"></span>
                        <input type="url" placeholder="Занятие" className="popup__form-text" name="about" id="description-profile" required />
                        <span className="description-profile-error popup__form-text-error_active"></span>       
                    </PopupWithForm>

                    <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                        
                        <input type="url" placeholder="Название" className="popup__form-text" name="name" id="name-place" required />
                        <span className="name-place-error"></span>
                        <input type="url" placeholder="Ссылка на картинку" className="popup__form-text" name="link" id="link-place" required />
                        <span className="link-place-error"></span>
                    </PopupWithForm>

                    </div>
                    
                </div>

            </div>
            
        </div>
    );
}

export default App;