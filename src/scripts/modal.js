// Функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
  popup.addEventListener("mousedown", overlayClose);
}

// Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup__content_image-background-open");
  document.removeEventListener("keydown", escClose);
  popup.removeEventListener("mousedown", overlayClose);
}

// Обработка закрытия по ESC
export function escClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function overlayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}
