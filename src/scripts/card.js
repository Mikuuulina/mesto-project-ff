// Функция создания карточки

export const cardTemplate = document.querySelector("#card-template");

export function createCard(
  cardData,
  deleteCard,
  toggleLike,
  handleCardClick,
  openDeletePopup,
  userId
) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardButtonDelete = cardElement.querySelector(".card__delete-button");
  const cardButtonLike = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardData.element = cardElement;

  // Показываем кнопку удаления только если карточка создана пользователем
  if (cardData.owner._id === userId) {
    cardButtonDelete.style.display = "block";
    cardButtonDelete.addEventListener("click", () => openDeletePopup(cardData));
  } else {
    cardButtonDelete.style.display = "none";
  }

  cardButtonDelete.addEventListener("click", () => deleteCard(cardElement));
  cardButtonLike.addEventListener("click", () => toggleLike(cardButtonLike));
  likeCountElement.textContent = cardData.likes.length;
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
