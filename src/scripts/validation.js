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
  if (!input.validity.valid) {
    if (input.validity.tooShort) {
      showInputError(
        form,
        input,
        input.validationMessage,
        config
      );
    } else if (input.validity.patternMismatch) {
      showInputError(
        form,
        input,
        input.dataset.errorMessage,
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
function toggleButtonState(inputs, button, config) {
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
function setValidationListeners(form, inputs, button, config) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

// Включаем валидацию для всех форм на странице
export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputs, button, config);

    setValidationListeners(form, inputs, button, config);
  });
}

// Очищаем ошибки валидации и обновляем состояние кнопки
export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => hideInputError(form, input, config));

  toggleButtonState(inputs, button, config);
}
