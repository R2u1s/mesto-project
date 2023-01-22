export const enableValidation = (inputParams) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputParams.errorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputParams.inputErrorClass);
    errorElement.classList.remove(inputParams.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
      inputElement.setCustomValidity("");
      }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
      }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inputParams.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inputParams.inactiveButtonClass);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputParams.inputSelector));
    const buttonElement = formElement.querySelector(inputParams.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidationPopup = (form) => {
    const formList = Array.from(form.querySelectorAll(inputParams.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    
      const fieldsetList = Array.from(formElement.querySelectorAll(inputParams.formSet));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
    });
  };

const enableValidationAllPopups = () => {
  document.querySelectorAll(inputParams.allPopups).forEach((popupElement) => {
    enableValidationPopup(popupElement);
  });
}

enableValidationAllPopups();

return function initializeValidation(popupElement){ 
    const inputList = Array.from(popupElement.querySelectorAll(inputParams.inputSelector));
    const buttonElement = popupElement.querySelector(inputParams.submitButtonSelector);

    inputList.forEach((inputElement) => {
      if (inputElement.value !== '') {
        
        checkInputValidity(popupElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      } else {
        hideInputError(popupElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      }
    });
}  
}
  

