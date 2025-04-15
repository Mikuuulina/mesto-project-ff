import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

console.log();

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardButtonDelete = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardButtonDelete.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardItem = createCard(card, deleteCard);
  placesList.append(cardItem);
});
