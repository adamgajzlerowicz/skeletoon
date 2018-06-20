import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18n
    .use(Backend)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',

        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true,
        },

        resources: {
            en: {
                translation: {
                    welcome: 'Welcome to Skeletoon.',
                    username: 'User name',
                    password: 'Password',
                    login: 'Login',
                    email: 'Email',
                    register: 'Register',
                    logout: 'Logout',
                    hello: 'Hello',
                },
            },

            pl: {
                translation: {
                    welcome: 'Skeletoon wita!',
                    username: 'Nazwa użytkownika',
                    password: 'Hasło',
                    login: 'Zaloguj się',
                    email: 'Email',
                    register: 'Zarejestruj się',
                    logout: 'Wyloguj się',
                    hello: 'Witaj',
                },

            },
        },
    });

i18n.changeLanguage('pl');

export default i18n;
