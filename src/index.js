import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

import {
  cardTemplate,
  createCard,
  deleteCard,
  toggleLike,
} from "./scripts/card.js";

import {
  openModal,
  closeModal,
  escClose,
  overlayClose,
} from "./scripts/modal.js";

import { enableValidation, clearValidation } from "./scripts/validation.js";

import {
  getUserInfo,
  getInitialCards,
  editUserInfo,
  addNewCard,
  deleteCardFromApi,
  updateAvatar,
} from "./scripts/api.js";

// Список карточек
const placesList = document.querySelector(".places__list");

const profileAvatar = document.querySelector(".profile__image");

// Переменные для модального окна редактирования профидя
const modalEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonOpenPopupEdit = document.querySelector(".profile__edit-button");
const buttonClosePopupEdit = modalEdit.querySelector(".popup__close");
const formPopupEdit = modalEdit.querySelector("form");
const nameInput = formPopupEdit.querySelector(".popup__input_type_name");
const jobInput = formPopupEdit.querySelector(".popup__input_type_description");
const profileForm = modalEdit.querySelector(".popup__form");

// Переменные для формы добавления карточек

const modalCard = document.querySelector(".popup_type_new-card");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const buttonClosePopupNewCard = modalCard.querySelector(".popup__close");
const formAddCard = modalCard.querySelector("form");
const inputName = formAddCard.querySelector(".popup__input_type_card-name");
const inputLink = formAddCard.querySelector(".popup__input_type_url");

// Переменные для попапа с изображениями

const modalImage = document.querySelector(".popup_type_image");
const popupImage = modalImage.querySelector(".popup__image");
const popupCaptionImage = modalImage.querySelector(".popup__caption");

// Переменные для обновления аватара
const avatarEditButton = document.querySelector(".profile__image-edit-button");
const avatarPopup = document.querySelector(".popup_type_avatar-edit");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.avatar;
const buttonClosePopupAvatar = avatarPopup.querySelector(".popup__close");

// Переменные для попапа удаления карточки
const modalDelete = document.querySelector(".popup_type__card-delete");
const buttonClosePopupDelete = modalDelete.querySelector(
  ".popup__close_card-delete"
);
const buttonDeleteCard = modalDelete.querySelector(
  ".popup__button_card-delete"
);

// Настройки валидации формы
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функция открытия попапа карточки с изображением

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaptionImage.textContent = name;
  modalImage.classList.add("popup__content_image-background-open");
  openModal(modalImage);
}

// // Открытие попапа удаления
let cardToDeleteId = null;
let cardToDeleteElement = null;

function openDeletePopup(cardId, cardElement) {
  cardToDeleteId = cardId;
  cardToDeleteElement = cardElement;

  openModal(modalDelete);
}

// Обработчик кнопки подтверждения удаления
buttonDeleteCard.addEventListener("click", () => {
  if (!cardToDeleteId || !cardToDeleteElement) return;

  deleteCardFromApi(cardToDeleteId)
    .then(() => {
      deleteCard(cardToDeleteElement);
      closeModal(modalDelete);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cardToDeleteId = null;
      cardToDeleteElement = null;
    });
});

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  buttonElement.textContent = isLoading ? "Сохранение..." : defaultText;
}

// // Закрытие попапа удаления карточки
buttonClosePopupDelete.addEventListener("click", () => closeModal(modalDelete));

modalDelete.addEventListener("click", (evt) => {
  if (evt.target === modalDelete) {
    closeModal(modalDelete);
  }
});

// Вызов функции загрузки и отображения данных пользователя
let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    console.log(cards);
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.reverse().forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        toggleLike,
        handleCardClick,
        openDeletePopup,
        userId
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => console.error(err));

// Редактирование профиля

buttonOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(modalEdit);
});

buttonClosePopupEdit.addEventListener("click", () => closeModal(modalEdit));

modalEdit.addEventListener("click", (evt) => {
  if (evt.target === modalEdit) {
    closeModal(modalEdit);
  }
});

// Обработчик отправки формы редактирования профиля
formPopupEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  const newName = nameInput.value;
  const newJob = jobInput.value;

  editUserInfo(newName, newJob)
    .then((editedUser) => {
      profileTitle.textContent = editedUser.name;
      profileDescription.textContent = editedUser.about;
      closeModal(modalEdit);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
});

// Добавление новой карточки

buttonOpenPopupNewCard.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(modalCard);
});
buttonClosePopupNewCard.addEventListener("click", () => closeModal(modalCard));

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, formAddCard.querySelector(".popup__button"));

  const name = inputName.value;
  const link = inputLink.value;

  addNewCard(name, link)
    .then((newCardData) => {
      const newCardElement = createCard(
        newCardData,
        deleteCard,
        toggleLike,
        handleCardClick,
        openDeletePopup,
        userId
      );
      placesList.prepend(newCardElement);
      formAddCard.reset();
      closeModal(modalCard);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, formAddCard.querySelector(".popup__button"));
    });
});

// Попап с изображением

modalImage.addEventListener("click", (evt) => {
  if (
    evt.target === modalImage ||
    evt.target.classList.contains("popup__close")
  ) {
    modalImage.classList.remove("popup__content_image-background-open");
    modalImage.classList.add("popup__content_image-background-close");
    closeModal(modalImage);
  }
});

// Открытие попа обновления аватара
avatarEditButton.addEventListener("click", () => {
  avatarInput.value = "";
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

buttonClosePopupAvatar.addEventListener("click", () => {
  closeModal(avatarPopup);
});

// Отправка формы с обновлением аватара
avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderLoading(true, avatarForm.querySelector(".popup__button"));
  const avatarLink = avatarInput.value;

  updateAvatar(avatarLink)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, avatarForm.querySelector(".popup__button"));
    });
});

// Включение валидации всех форм
enableValidation(validationConfig);
