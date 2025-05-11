import { putLikeOnCard, deleteLikeFromCard } from "./api.js";

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

  cardButtonLike.addEventListener("click", () =>
    toggleLike(cardData, cardButtonLike, likeCountElement)
  );
  cardImage.addEventListener("click", () =>
    handleCardClick(cardData.name, cardData.link)
  );

  // Устанавливаем количество лайков
  likeCountElement.textContent = cardData.likes.length;

  // Проверяем, лайкал ли пользователь карточку
  const isLikedByUser = cardData.likes.some((like) => like._id === userId);
  if (isLikedByUser) {
    cardButtonLike.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  if (card && card.remove) {
    card.remove();
  }
}

// Кнопка лайка
export function toggleLike(cardData, button, likeCountElement) {
  const isLiked = button.classList.contains("card__like-button_is-active");

  if (isLiked) {
    deleteLikeFromCard(cardData._id)
      .then((updatedCardData) => {
        button.classList.remove("card__like-button_is-active");
        cardData.likes = updatedCardData.likes;
        likeCountElement.textContent = cardData.likes.length;
      })
      .catch((err) => console.error(err));
  } else {
    putLikeOnCard(cardData._id)
      .then((updatedCardData) => {
        button.classList.add("card__like-button_is-active");
        cardData.likes = updatedCardData.likes;
        likeCountElement.textContent = cardData.likes.length;
      })
      .catch((err) => console.error(err));
  }
}
