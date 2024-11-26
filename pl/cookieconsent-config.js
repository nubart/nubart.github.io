import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

CookieConsent.run({
    categories: {
        analytics: {
            enabled: false
        }
    },
    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'Cookie modal description',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                },
            }
        }
    }
});