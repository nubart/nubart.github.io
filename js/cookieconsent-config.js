import { run } from 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js';

run({
    categories: {
        analytics: {
            enabled: false
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
                    description: "We use cookies to analyze site usage and improve your experience. You can choose to accept or reject these cookies.",
                    acceptAllBtn: 'Accept',
                    acceptNecessaryBtn: 'Reject'
                },
            },
            bg: {
                consentModal: {
                    title: "Предпочитания за бисквитки",
                    description: "Използваме бисквитки, за да анализираме използването на сайта и да подобрим вашето изживяване. Можете да изберете да приемете или отхвърлите тези бисквитки.",
                    acceptAllBtn: 'Приемете',
                    acceptNecessaryBtn: 'Отхвърлете'
                },
            },
            ca: {
                consentModal: {
                    title: "Preferències de cookies",
                    description: "Utilitzem cookies per analitzar l'ús del lloc i millorar la vostra experiència. Podeu triar acceptar o rebutjar aquestes cookies.",
                    acceptAllBtn: 'Acceptar',
                    acceptNecessaryBtn: 'Rebutja'
                },
            },
            de: {
                consentModal: {
                    title: "Cookie-Einstellungen",
                    description: "Wir verwenden Cookies, um die Nutzung der Website zu analysieren und Ihr Erlebnis zu verbessern. Sie können diese Cookies akzeptieren oder ablehnen.",
                    acceptAllBtn: 'Akzeptieren',
                    acceptNecessaryBtn: 'Ablehnen'
                },
            },
            es: {
                consentModal: {
                    title: "Preferencias de cookies",
                    description: "Utilizamos cookies para analizar el uso del sitio y mejorar su experiencia. Puede optar por aceptar o rechazar estas cookies.",
                    acceptAllBtn: 'Aceptar',
                    acceptNecessaryBtn: 'Rechazar'
                },
            },
            fr: {
                consentModal: {
                    title: "Préférences en matière de cookies",
                    description: "Nous utilisons des cookies pour analyser l'utilisation du site et améliorer votre expérience. Vous pouvez choisir d'accepter ou de refuser ces cookies.",
                    acceptAllBtn: 'Accepter',
                    acceptNecessaryBtn: 'Rejeter'
                },
            },
            he: {
                consentModal: {
                    title: "העדפות קובצי Cookie",
                    description: "אנו משתמשים בעוגיות כדי לנתח את השימוש באתר ולשפר את החוויה שלך. אתה יכול לבחור לקבל או לדחות את העוגיות הללו.",
                    acceptAllBtn: 'לְקַבֵּל',
                    acceptNecessaryBtn: 'לִדחוֹת'
                },
            },
            it: {
                consentModal: {
                    title: "Preferenze sui cookie",
                    description: "Utilizziamo i cookie per analizzare l'utilizzo del sito e migliorare la tua esperienza. Puoi scegliere di accettare o rifiutare questi cookie.",
                    acceptAllBtn: 'Accettare',
                    acceptNecessaryBtn: 'Rifiutare'
                },
            },
            ja: {
                consentModal: {
                    title: "クッキーの設定",
                    description: "当社はサイトの使用状況を分析し、エクスペリエンスを向上させるために Cookie を使用します。これらの Cookie を受け入れるか拒否するかを選択できます。",
                    acceptAllBtn: '受け入れる',
                    acceptNecessaryBtn: 'リジェクト'
                },
            },
            nl: {
                consentModal: {
                    title: "Cookievoorkeuren",
                    description: "Wij gebruiken cookies om het sitegebruik te analyseren en uw ervaring te verbeteren. U kunt ervoor kiezen deze cookies te accepteren of te weigeren.",
                    acceptAllBtn: 'Accepteren',
                    acceptNecessaryBtn: 'Afwijzen'
                },
            },
            pl: {
                consentModal: {
                    title: "Preferencje dotyczące plików cookie",
                    description: "Używamy plików cookie w celu analizy sposobu korzystania z witryny i poprawy komfortu korzystania z niej. Możesz zaakceptować lub odrzucić te pliki cookie.",
                    acceptAllBtn: 'Przyjąć',
                    acceptNecessaryBtn: 'Odrzucić'
                },
            },
        }
    }
});