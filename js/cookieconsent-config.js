import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

CookieConsent.run({
    categories: {
        analytics: {
            enabled: false
        }
    },
    guiOptions: {
        consentModal: {
            layout: 'box wide',
            position: 'top right',
            equalWeightButtons: false
        },
    },
    language: {
        default: 'en',
        autoDetect: 'document',
        translations: {
            en: {
                consentModal: {
                    description: "This website stores cookies on your computer. \
                        These cookies are used to improve your website experience and provide more personalized services to you, both on this website and through other media. \
                        To find out more about the cookies we use, see our Privacy Policy.<br><br>\
                        We won't track your information when you visit our site. But in order to comply with your preferences, \
                        we'll have to use just one tiny cookie so that you're not asked to make this choice again.",
                    acceptAllBtn: 'Accept',
                    acceptNecessaryBtn: 'Decline'
                },
            },
            pl: {
                consentModal: {
                    description: "Ta strona przechowuje pliki cookies na Twoim komputerze. \
                        Te pliki cookie służą do poprawy komfortu korzystania z witryny i zapewnienia bardziej spersonalizowanych usług, zarówno na tej stronie, jak i za pośrednictwem innych mediów. \
                        Aby dowiedzieć się więcej o plikach cookie, których używamy, zapoznaj się z naszą Polityką prywatności.<br><br>\
                        Nie będziemy śledzić Twoich informacji, gdy odwiedzasz naszą witrynę. Aby jednak dostosować się do Twoich preferencji, \
                        będziemy musieli użyć tylko jednego małego pliku cookie, abyś nie był proszony o ponowne dokonywanie tego wyboru.",
                    acceptAllBtn: 'Przyjąć',
                    acceptNecessaryBtn: 'Upadek'
                },
            }
        }
    }
});