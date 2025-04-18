import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  toggleLike,
} from "./scripts/cards.js";

import {
  openModal,
  closeModal,
  escClose,
  overlayClose,
} from "./scripts/modal.js";

const placesList = document.querySelector(".places__list");

// Выведение карточки на страницу
initialCards.forEach((card) => {
  const cardItem = createCard(card, deleteCard, toggleLike, handleCardClick);
  placesList.append(cardItem);
});

// Модальное окно редактирования профиля

const modalEdit = document.querySelector(".popup_type_edit");
const editOpener = document.querySelector(".profile__edit-button");
const editCloser = modalEdit.querySelector(".popup__close");
const formElement = modalEdit.querySelector("form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

editOpener.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(modalEdit);
});

editCloser.addEventListener("click", () => closeModal(modalEdit));

modalEdit.addEventListener("click", (evt) => {
  if (evt.target === modalEdit) {
    closeModal(modalEdit);
  }
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  document.querySelector(".profile__title").textContent = nameValue;
  document.querySelector(".profile__description").textContent = jobValue;

  closeModal(modalEdit);
});

// Форма добавления карточки
const modalCard = document.querySelector(".popup_type_new-card");
const cardOpener = document.querySelector(".profile__add-button");
const cardCloser = modalCard.querySelector(".popup__close");

cardOpener.addEventListener("click", () => openModal(modalCard));
cardCloser.addEventListener("click", () => closeModal(modalCard));

const formAddCard = modalCard.querySelector("form");
const inputName = formAddCard.querySelector(".popup__input_type_card-name");
const inputLink = formAddCard.querySelector(".popup__input_type_url");

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = inputName.value;
  const link = inputLink.value;

  const newCard = createCard({ name, link }, deleteCard, toggleLike);
  placesList.prepend(newCard);

  formAddCard.reset();
  closeModal(modalCard);
});

// Открытие попапа с картинкой
const modalImage = document.querySelector(".popup_type_image");
const popupImage = modalImage.querySelector(".popup__image");
const popupCaption = modalImage.querySelector(".popup__caption");

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  modalImage.classList.add("popup_is-opened");
  modalImage.style.backgroundColor = "rgba(0, 0, 0, 0.9)";

  document.addEventListener("keydown", escCloseImage);
}

function escCloseImage(evt) {
  if (evt.key === "Escape") {
    modalImage.classList.remove("popup_is-opened");
    modalImage.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.removeEventListener("keydown", escCloseImage);
  }
}

modalImage.addEventListener("click", (evt) => {
  if (
    evt.target === modalImage ||
    evt.target.classList.contains("popup__close")
  ) {
    modalImage.classList.remove("popup_is-opened");
    modalImage.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.removeEventListener("keydown", escCloseImage);
  }
});
