import i18next from 'i18next';

const INCORRECT_DETAILS_ERROR = 'INCORRECT_DETAILS_ERROR';
const USERNAME_TOO_SHORT_ERROR = 'USERNAME_TOO_SHORT_ERROR';
const INCORRECT_EMAIL_ERROR = 'INCORRECT_EMAIL_ERROR';
const WEAK_PASSWORD_ERROR = 'WEAK_PASSWORD_ERROR';
const EMAIL_IN_USE_ERROR = 'EMAIL_IN_USE_ERROR';
const USERNAME_IN_USE_ERROR = 'USERNAME_IN_USE_ERROR';

const i18 = i18next.init({
    lng: 'en',
    debug: false,
    resources: {
        en: {
            translation: {
                [INCORRECT_DETAILS_ERROR]: 'Incorrect credentials.',
                [USERNAME_TOO_SHORT_ERROR]: 'Username is too short.',
                [INCORRECT_EMAIL_ERROR]: 'Email is incorrect.',
                [WEAK_PASSWORD_ERROR]: 'Password is not strong enough.',
                [EMAIL_IN_USE_ERROR]: 'Email is already taken.',
                [USERNAME_IN_USE_ERROR]: 'User name is already taken.',
            },
        },
        pl: {
            translation: {
                [INCORRECT_DETAILS_ERROR]: 'Niepoprawny login.',
                [USERNAME_TOO_SHORT_ERROR]: 'Nazwa użytkownika jest zbyt krótka.',
                [INCORRECT_EMAIL_ERROR]: 'Niepoprawny format adresu email.',
                [WEAK_PASSWORD_ERROR]: 'Hasło jest zbyt słabe.',
                [EMAIL_IN_USE_ERROR]: 'Ten adres email jest zajęty.',
                [USERNAME_IN_USE_ERROR]: 'Ta nazwa użytkownika jest zajęta.',
            },
        },
    },
});

// start synchronously
i18.changeLanguage('pl');

export {
    i18 as t,
    INCORRECT_DETAILS_ERROR,
    USERNAME_TOO_SHORT_ERROR,
    INCORRECT_EMAIL_ERROR,
    WEAK_PASSWORD_ERROR,
    EMAIL_IN_USE_ERROR,
    USERNAME_IN_USE_ERROR,
};
