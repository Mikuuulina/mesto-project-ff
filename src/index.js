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

// Список карточек
const placesList = document.querySelector(".places__list");

// Переменные для модального окна редактирования профидя
const modalEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonOpenPopupEdit = document.querySelector(".profile__edit-button");
const buttonClosePopupEdit = modalEdit.querySelector(".popup__close");
const formPopupEdit = modalEdit.querySelector("form");
const nameInput = formPopupEdit.querySelector(".popup__input_type_name");
const jobInput = formPopupEdit.querySelector(".popup__input_type_description");

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

// Функция открытия попапа карточки с изображением

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaptionImage.textContent = name;
  modalImage.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  openModal(modalImage);
}

// Обработчики

// Выведение карточек на страницу

initialCards.forEach((card) => {
  const cardItem = createCard(card, deleteCard, toggleLike, handleCardClick);
  placesList.append(cardItem);
});

// Редактирование профиля

buttonOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalEdit);
});

buttonClosePopupEdit.addEventListener("click", () => closeModal(modalEdit));

modalEdit.addEventListener("click", (evt) => {
  if (evt.target === modalEdit) {
    closeModal(modalEdit);
  }
});

formPopupEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalEdit);
});

// Добавление новой карточки

buttonOpenPopupNewCard.addEventListener("click", () => openModal(modalCard));
buttonClosePopupNewCard.addEventListener("click", () => closeModal(modalCard));

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = inputName.value;
  const link = inputLink.value;

  const newCard = createCard(
    { name, link },
    deleteCard,
    toggleLike,
    handleCardClick
  );
  placesList.prepend(newCard);

  formAddCard.reset();
  closeModal(modalCard);
});

// Попап с изображением

modalImage.addEventListener("click", (evt) => {
  if (
    evt.target === modalImage ||
    evt.target.classList.contains("popup__close")
  ) {
    modalImage.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    closeModal(modalImage);
  }
});
