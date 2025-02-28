const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imageElement = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
const imageCloseButton = imagePopup.querySelector('.popup__close');


const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');


// Функция открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция закрытия поп-апа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

profileEditButton.addEventListener('click', openProfilePopup);

profileCloseButton.addEventListener('click', () => {
    closeModal(profilePopup);
});

// Отправка формы
function handleProfileFormSubmit(evt) {
    // Отменить стандартную отправку формы
    evt.preventDefault();

    // Получить значения полей формы
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выбрать элементы, куда должны быть вставлены значения полей
    const profileNameElement = document.querySelector('.profile__title');
    const profileJobElement = document.querySelector('.profile__description');

    // Вставить новые значения
    profileNameElement.textContent = nameValue;
    profileJobElement.textContent = jobValue;

    // Закрыть поп-ап
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


function openCardPopup() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup);
}

cardAddButton.addEventListener('click', openCardPopup);

cardCloseButton.addEventListener('click', () => {
    closeModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    // Отменить стандартную отправку формы
    evt.preventDefault();

    // Получить значения полей формы
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;

    // Создать новую карточку
    const newCard = createCard({ name: cardName, link: cardLink });

    // Добавить новую карточку в начало контейнера
    const placesList = document.querySelector('.places__list');
    placesList.prepend(newCard);

    // Закрыть поп-ап
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

function createCard(cardData) {
    // Получаем темплейт
    const cardTemplate = document.querySelector('#card-template');
    // Клонируем темплейт
    const cardElement = cardTemplate.content.cloneNode(true);

    // Находим элементы внутри карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    // Заполняем карточку данными
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Добавляем слушатели на элементы карточки
    cardLikeButton.addEventListener('click', () => {
        // Логика лайка карточки
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    cardDeleteButton.addEventListener('click', (evt) => {
        // Находим родительскую карточку
        const cardToRemove = evt.target.closest('.card');
        // Удаляем карточку
        cardToRemove.remove();
    });

    cardImage.addEventListener('click', () => {
        // Заполняем атрибуты поп-апа с картинкой
        imageElement.src = cardData.link;
        imageElement.alt = cardData.name;
        imageCaption.textContent = cardData.name;

        // Открываем поп-ап
        openModal(imagePopup);
    });

    // Возвращаем готовую карточку
    return cardElement;
}

// Обработчик события клика на кнопку закрытия поп-апа с картинкой
imageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

// Добавляем модификатор для плавного открытия и закрытия поп-апов
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

// Вывести карточки на страницу
// Получаем список, куда будут добавлены карточки
const placesList = document.querySelector('.places__list');

// Функция добавления карточек на страницу
function addCardsToPage(cards) {
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        placesList.appendChild(cardElement);
    });
}

// Добавляем карточки на страницу
addCardsToPage(initialCards);

