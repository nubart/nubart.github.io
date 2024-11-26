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
                    title: "This website stores cookies on your computer. These cookies are used to improve your website experience and provide more personalized services to you, both on this website and through other media. " +
                        "To find out more about the cookies we use, see our Privacy Policy.",
                    description: "We won't track your information when you visit our site. But in order to comply with your preferences, we'll have to use just one tiny cookie so that you're not asked to make this choice again.",
                    acceptAllBtn: 'Accept',
                    acceptNecessaryBtn: 'Decline'
                },
            }
        }
    }
});