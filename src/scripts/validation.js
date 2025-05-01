//Показываем сообщение об ошибке и добавляет стили ошибки
function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

//Убираем сообщение об ошибке и убираем стили ошибки
function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Проверяем валидность введённых данных в поле
function checkInputValidity(form, input, config) {
  const pattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (!input.validity.valid) {
    if (input.validity.tooShort) {
      showInputError(
        form,
        input,
        `Минимальное количество символов: ${input.minLength}. Длина текста сейчас: ${input.value.length}.`,
        config
      );
    } else if (input.value !== "" && !pattern.test(input.value)) {
      showInputError(
        form,
        input,
        input.dataset.errorMessage ||
          "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        config
      );
    } else {
      showInputError(form, input, input.validationMessage, config);
    }
  } else {
    hideInputError(form, input, config);
  }
}

// Функция вкл/выкл кнопки в зависимости от валидности заполненных полей формы
function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const isValid = inputs.every((input) => input.validity.valid);

  if (isValid) {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}

// Устанавливаем обработчики событий инпут для всех полей формы
function setValidationListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(form, config);
    });
  });
}

// Включаем валидацию для всех форм на странице
export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setValidationListeners(form, config);
    toggleButtonState(form, config);
  });
}

// Очищаем ошибки валидации и обновляем состояние кнопки
export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => hideInputError(form, input, config));

  toggleButtonState(form, config);
}
