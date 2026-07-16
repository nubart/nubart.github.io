import {acceptedCategory, run} from 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js';

run({
    categories: {
        analytics: {
            enabled: false
        }
    },
    onChange: () => {
        if (!acceptedCategory('analytics')) {
            window.location.reload();
        }
    },
    guiOptions: {
        consentModal: {
            layout: 'box wide',
            position: 'bottom right',
            equalWeightButtons: false
        },
    },
    language: {
        default: 'en',
        autoDetect: 'document',
        translations: {
            en: {
                consentModal: {
                    title: "Cookie Preferences",
                    description: "We use cookies to analyze site usage and improve your experience. You can choose to accept or reject these cookies." +
                        "<br><a href=\"/privacy-policy.html\">Privacy policy</a> | <a href=\"/legal-notice.html\">Legal notice</a>",
                    acceptAllBtn: 'Accept',
                    acceptNecessaryBtn: 'Reject'
                },
            },
            bg: {
                consentModal: {
                    title: "Предпочитания за бисквитки",
                    description: "Използваме бисквитки, за да анализираме използването на сайта и да подобрим вашето изживяване. Можете да изберете да приемете или отхвърлите тези бисквитки." +
                        "<br><a href=\"/bg/deklaratsiya-poveritelnost.html\">Политика за поверителност | <a href=\"/bg/pravna-informatsiya.html\">Правна рамка</a>",
                    acceptAllBtn: 'Приемете',
                    acceptNecessaryBtn: 'Отхвърлете'
                },
            },
            de: {
                consentModal: {
                    title: "Cookie-Einstellungen",
                    description: "Wir verwenden Cookies, um die Nutzung der Website zu analysieren und Ihr Erlebnis zu verbessern. Sie können diese Cookies akzeptieren oder ablehnen." +
                        "<br><a href=\"/de/datenschutz-web.html\">Datenschutz</a> | <a href=\"/de/impressum.html\">Impressum</a>",
                    acceptAllBtn: 'Akzeptieren',
                    acceptNecessaryBtn: 'Ablehnen'
                },
            },
            es: {
                consentModal: {
                    title: "Preferencias de cookies",
                    description: "Utilizamos cookies para analizar el uso del sitio y mejorar su experiencia. Puede optar por aceptar o rechazar estas cookies." +
                        "<br><a href=\"/es/politica-privacidad.html\">Política de privacidad</a> | <a href=\"/es/aviso-legal.html\">Aviso legal</a>",
                    acceptAllBtn: 'Aceptar',
                    acceptNecessaryBtn: 'Rechazar'
                },
            },
            fr: {
                consentModal: {
                    title: "Préférences en matière de cookies",
                    description: "Nous utilisons des cookies pour analyser l'utilisation du site et améliorer votre expérience. Vous pouvez choisir d'accepter ou de refuser ces cookies." +
                        "<br><a href=\"/fr/privacy-policy.html\">Protection des données</a> | <a href=\"/fr/mentions-legales.html\">Mentions légales</a>",
                    acceptAllBtn: 'Accepter',
                    acceptNecessaryBtn: 'Rejeter'
                },
            },
            he: {
                consentModal: {
                    title: "העדפות קובצי Cookie",
                    description: "אנו משתמשים בעוגיות כדי לנתח את השימוש באתר ולשפר את החוויה שלך. אתה יכול לבחור לקבל או לדחות את העוגיות הללו." +
                        "<br><a href=\"/privacy-policy.html\">Privacy policy</a> | <a href=\"/legal-notice.html\">Legal notice</a>",
                    acceptAllBtn: 'לְקַבֵּל',
                    acceptNecessaryBtn: 'לִדחוֹת'
                },
            },
            it: {
                consentModal: {
                    title: "Preferenze sui cookie",
                    description: "Utilizziamo i cookie per analizzare l'utilizzo del sito e migliorare la tua esperienza. Puoi scegliere di accettare o rifiutare questi cookie." +
                        "<br><a href=\"/it/privacy-web.html\">Politica sulla privacy</a> | <a href=\"/it/avviso-legale.html\">Avviso legale</a>",
                    acceptAllBtn: 'Accettare',
                    acceptNecessaryBtn: 'Rifiutare'
                },
            },
            ja: {
                consentModal: {
                    title: "クッキーの設定",
                    description: "当社はサイトの使用状況を分析し、エクスペリエンスを向上させるために Cookie を使用します。これらの Cookie を受け入れるか拒否するかを選択できます。" +
                        "<br><a href=\"/ja/privacy-policy.html\">データ保護</a> | <a href=\"/ja/legal-notice.html\">法的通知</a>",
                    acceptAllBtn: '受け入れる',
                    acceptNecessaryBtn: 'リジェクト'
                },
            },
            nl: {
                consentModal: {
                    title: "Cookievoorkeuren",
                    description: "Wij gebruiken cookies om het sitegebruik te analyseren en uw ervaring te verbeteren. U kunt ervoor kiezen deze cookies te accepteren of te weigeren." +
                        "<br><a href=\"/nl/gegevensbescherming-web.html\">Gegevensbescherming</a> | <a href=\"/nl/impressum.html\">Impressum</a>",
                    acceptAllBtn: 'Accepteren',
                    acceptNecessaryBtn: 'Afwijzen'
                },
            },
            pl: {
                consentModal: {
                    title: "Preferencje dotyczące plików cookie",
                    description: "Używamy plików cookie w celu analizy sposobu korzystania z witryny i poprawy komfortu korzystania z niej. Możesz zaakceptować lub odrzucić te pliki cookie." +
                        "<br><a href=\"/pl/polityka-prywatnosci.html\">Polityka prywatności</a> | <a href=\"/pl/nota-prawna.html\">Nota prawna</a>",
                    acceptAllBtn: 'Przyjąć',
                    acceptNecessaryBtn: 'Odrzucić'
                },
            },
        }
    }
});
