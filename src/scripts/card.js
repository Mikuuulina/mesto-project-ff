// Функция создания карточки

export const cardTemplate = document.querySelector("#card-template");

export function createCard(cardData, deleteCard, toggleLike, handleCardClick) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardButtonDelete = cardElement.querySelector(".card__delete-button");
  const cardButtonLike = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardButtonDelete.addEventListener("click", () => deleteCard(cardElement));
  cardButtonLike.addEventListener("click", () => toggleLike(cardButtonLike));
  cardImage.addEventListener("click", () =>
    handleCardClick(cardData.name, cardData.link)
  );

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// Кнопка лайка
export function toggleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}
