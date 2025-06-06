import {acceptedCategory, run} from 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js';

run({
    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {
            enabled: false
        },
        advertising: {
            enabled: false
        }
    },
    onChange: () => {
        // Push consent updates to GTM dataLayer for Google Consent Mode V2
        if (acceptedCategory('analytics')) {
            dataLayer.push({'event': 'cc_analytics_accepted'});
        }
        if (acceptedCategory('advertising')) {
            dataLayer.push({'event': 'cc_advertising_accepted'});
        }

        // Original reload logic - you may want to remove this
        // if (!acceptedCategory('analytics')) {
        //     window.location.reload();
        // }
    },
    onAccept: () => {
        // Handle initial acceptance
        if (acceptedCategory('analytics')) {
            dataLayer.push({'event': 'cc_analytics_accepted'});
        }
        if (acceptedCategory('advertising')) {
            dataLayer.push({'event': 'cc_advertising_accepted'});
        }
    },
    guiOptions: {
        consentModal: {
            layout: 'box wide',
            position: 'bottom right',
            equalWeightButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    language: {
        default: 'en',
        autoDetect: 'document',
        translations: {
            en: {
                consentModal: {
                    title: "Cookie Preferences",
                    description: "We use cookies to analyze site usage, improve your experience, and show you personalized content. You can choose to accept or reject these cookies." +
                        "<br><a href=\"/privacy-policy.html\">Privacy policy</a> | <a href=\"/legal-notice.html\">Legal notice</a>",
                    acceptAllBtn: 'Accept All',
                    acceptNecessaryBtn: 'Accept Necessary Only',
                    showPreferencesBtn: 'Manage Preferences'
                },
                preferencesModal: {
                    title: 'Cookie Preferences',
                    acceptAllBtn: 'Accept All',
                    acceptNecessaryBtn: 'Accept Necessary Only',
                    savePreferencesBtn: 'Save Preferences',
                    sections: [
                        {
                            title: 'Necessary Cookies',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                        },
                        {
                            title: 'Analytics Cookies',
                            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
                        },
                        {
                            title: 'Advertising Cookies',
                            description: 'These cookies are used to make advertising messages more relevant to you and your interests.',
                        }
                    ]
                }
            },
            bg: {
                consentModal: {
                    title: "Предпочитания за бисквитки",
                    description: "Използваме бисквитки, за да анализираме използването на сайта, да подобрим вашето изживяване и да ви показваме персонализирано съдържание. Можете да изберете да приемете или отхвърлите тези бисквитки." +
                        "<br><a href=\"/bg/deklaratsiya-poveritelnost.html\">Политика за поверителност</a> | <a href=\"/bg/pravna-informatsiya.html\">Правна рамка</a>",
                    acceptAllBtn: 'Приемете всички',
                    acceptNecessaryBtn: 'Приемете само необходимите',
                    showPreferencesBtn: 'Управлявайте предпочитанията'
                },
                preferencesModal: {
                    title: 'Предпочитания за бисквитки',
                    acceptAllBtn: 'Приемете всички',
                    acceptNecessaryBtn: 'Приемете само необходимите',
                    savePreferencesBtn: 'Запазете предпочитанията',
                    sections: [
                        {
                            title: 'Необходими бисквитки',
                            description: 'Тези бисквитки са от съществено значение за правилното функциониране на уебсайта и не могат да бъдат деактивирани.',
                        },
                        {
                            title: 'Аналитични бисквитки',
                            description: 'Тези бисквитки ни помагат да разберем как посетителите взаимодействат с нашия уебсайт, като събират и докладват информация анонимно.',
                        },
                        {
                            title: 'Рекламни бисквитки',
                            description: 'Тези бисквитки се използват, за да направят рекламните съобщения по-подходящи за вас и вашите интереси.',
                        }
                    ]
                }
            },
            de: {
                consentModal: {
                    title: "Cookie-Einstellungen",
                    description: "Wir verwenden Cookies, um die Nutzung der Website zu analysieren, Ihr Erlebnis zu verbessern und Ihnen personalisierte Inhalte zu zeigen. Sie können diese Cookies akzeptieren oder ablehnen." +
                        "<br><a href=\"/de/datenschutz-web.html\">Datenschutz</a> | <a href=\"/de/impressum.html\">Impressum</a>",
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Nur notwendige akzeptieren',
                    showPreferencesBtn: 'Einstellungen verwalten'
                },
                preferencesModal: {
                    title: 'Cookie-Einstellungen',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Nur notwendige akzeptieren',
                    savePreferencesBtn: 'Einstellungen speichern',
                    sections: [
                        {
                            title: 'Notwendige Cookies',
                            description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich und können nicht deaktiviert werden.',
                        },
                        {
                            title: 'Analyse-Cookies',
                            description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden.',
                        },
                        {
                            title: 'Werbe-Cookies',
                            description: 'Diese Cookies werden verwendet, um Werbebotschaften für Sie und Ihre Interessen relevanter zu machen.',
                        }
                    ]
                }
            },
            es: {
                consentModal: {
                    title: "Preferencias de cookies",
                    description: "Utilizamos cookies para analizar el uso del sitio, mejorar su experiencia y mostrarle contenido personalizado. Puede optar por aceptar o rechazar estas cookies." +
                        "<br><a href=\"/es/politica-privacidad.html\">Política de privacidad</a> | <a href=\"/es/aviso-legal.html\">Aviso legal</a>",
                    acceptAllBtn: 'Aceptar todo',
                    acceptNecessaryBtn: 'Aceptar solo las necesarias',
                    showPreferencesBtn: 'Gestionar preferencias'
                },
                preferencesModal: {
                    title: 'Preferencias de cookies',
                    acceptAllBtn: 'Aceptar todo',
                    acceptNecessaryBtn: 'Aceptar solo las necesarias',
                    savePreferencesBtn: 'Guardar preferencias',
                    sections: [
                        {
                            title: 'Cookies necesarias',
                            description: 'Estas cookies son esenciales para el correcto funcionamiento del sitio web y no se pueden desactivar.',
                        },
                        {
                            title: 'Cookies de análisis',
                            description: 'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando e informando información de forma anónima.',
                        },
                        {
                            title: 'Cookies publicitarias',
                            description: 'Estas cookies se utilizan para hacer que los mensajes publicitarios sean más relevantes para usted y sus intereses.',
                        }
                    ]
                }
            },
            fr: {
                consentModal: {
                    title: "Préférences en matière de cookies",
                    description: "Nous utilisons des cookies pour analyser l'utilisation du site, améliorer votre expérience et vous montrer du contenu personnalisé. Vous pouvez choisir d'accepter ou de refuser ces cookies." +
                        "<br><a href=\"/fr/privacy-policy.html\">Protection des données</a> | <a href=\"/fr/mentions-legales.html\">Mentions légales</a>",
                    acceptAllBtn: 'Accepter tout',
                    acceptNecessaryBtn: 'Accepter seulement les nécessaires',
                    showPreferencesBtn: 'Gérer les préférences'
                },
                preferencesModal: {
                    title: 'Préférences en matière de cookies',
                    acceptAllBtn: 'Accepter tout',
                    acceptNecessaryBtn: 'Accepter seulement les nécessaires',
                    savePreferencesBtn: 'Sauvegarder les préférences',
                    sections: [
                        {
                            title: 'Cookies nécessaires',
                            description: 'Ces cookies sont essentiels au bon fonctionnement du site web et ne peuvent pas être désactivés.',
                        },
                        {
                            title: 'Cookies d\'analyse',
                            description: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en rapportant des informations de manière anonyme.',
                        },
                        {
                            title: 'Cookies publicitaires',
                            description: 'Ces cookies sont utilisés pour rendre les messages publicitaires plus pertinents pour vous et vos intérêts.',
                        }
                    ]
                }
            },
            he: {
                consentModal: {
                    title: "העדפות קובצי Cookie",
                    description: "אנו משתמשים בעוגיות כדי לנתח את השימוש באתר, לשפר את החוויה שלך ולהציג לך תוכן מותאם אישית. אתה יכול לבחור לקבל או לדחות את העוגיות הללו." +
                        "<br><a href=\"/privacy-policy.html\">Privacy policy</a> | <a href=\"/legal-notice.html\">Legal notice</a>",
                    acceptAllBtn: 'קבל הכל',
                    acceptNecessaryBtn: 'קבל רק הכרחיים',
                    showPreferencesBtn: 'נהל העדפות'
                },
                preferencesModal: {
                    title: 'העדפות קובצי Cookie',
                    acceptAllBtn: 'קבל הכל',
                    acceptNecessaryBtn: 'קבל רק הכרחיים',
                    savePreferencesBtn: 'שמור העדפות',
                    sections: [
                        {
                            title: 'עוגיות הכרחיות',
                            description: 'עוגיות אלו חיוניות לתפקוד התקין של האתר ולא ניתן להשבית אותן.',
                        },
                        {
                            title: 'עוגיות ניתוח',
                            description: 'עוגיות אלו עוזרות לנו להבין כיצד מבקרים מקיימים אינטראקציה עם האתר שלנו על ידי איסוף ודיווח מידע באופן אנונימי.',
                        },
                        {
                            title: 'עוגיות פרסום',
                            description: 'עוגיות אלו משמשות כדי להפוך הודעות פרסום לרלוונטיות יותר עבורך ולתחומי העניין שלך.',
                        }
                    ]
                }
            },
            it: {
                consentModal: {
                    title: "Preferenze sui cookie",
                    description: "Utilizziamo i cookie per analizzare l'utilizzo del sito, migliorare la tua esperienza e mostrarti contenuti personalizzati. Puoi scegliere di accettare o rifiutare questi cookie." +
                        "<br><a href=\"/it/privacy-web.html\">Politica sulla privacy</a> | <a href=\"/it/avviso-legale.html\">Avviso legale</a>",
                    acceptAllBtn: 'Accetta tutto',
                    acceptNecessaryBtn: 'Accetta solo necessari',
                    showPreferencesBtn: 'Gestisci preferenze'
                },
                preferencesModal: {
                    title: 'Preferenze sui cookie',
                    acceptAllBtn: 'Accetta tutto',
                    acceptNecessaryBtn: 'Accetta solo necessari',
                    savePreferencesBtn: 'Salva preferenze',
                    sections: [
                        {
                            title: 'Cookie necessari',
                            description: 'Questi cookie sono essenziali per il corretto funzionamento del sito web e non possono essere disabilitati.',
                        },
                        {
                            title: 'Cookie di analisi',
                            description: 'Questi cookie ci aiutano a capire come i visitatori interagiscono con il nostro sito web raccogliendo e riportando informazioni in modo anonimo.',
                        },
                        {
                            title: 'Cookie pubblicitari',
                            description: 'Questi cookie vengono utilizzati per rendere i messaggi pubblicitari più rilevanti per te e i tuoi interessi.',
                        }
                    ]
                }
            },
            ja: {
                consentModal: {
                    title: "クッキーの設定",
                    description: "当社はサイトの使用状況を分析し、エクスペリエンスを向上させ、パーソナライズされたコンテンツを表示するために Cookie を使用します。これらの Cookie を受け入れるか拒否するかを選択できます。" +
                        "<br><a href=\"/ja/privacy-policy.html\">データ保護</a> | <a href=\"/ja/legal-notice.html\">法的通知</a>",
                    acceptAllBtn: 'すべて受け入れる',
                    acceptNecessaryBtn: '必要なもののみ受け入れる',
                    showPreferencesBtn: '設定を管理'
                },
                preferencesModal: {
                    title: 'クッキーの設定',
                    acceptAllBtn: 'すべて受け入れる',
                    acceptNecessaryBtn: '必要なもののみ受け入れる',
                    savePreferencesBtn: '設定を保存',
                    sections: [
                        {
                            title: '必要なクッキー',
                            description: 'これらのクッキーは、ウェブサイトの適切な機能に不可欠であり、無効にすることはできません。',
                        },
                        {
                            title: '分析クッキー',
                            description: 'これらのクッキーは、情報を匿名で収集および報告することにより、訪問者が当社のウェブサイトとどのように相互作用するかを理解するのに役立ちます。',
                        },
                        {
                            title: '広告クッキー',
                            description: 'これらのクッキーは、広告メッセージをあなたとあなたの興味により関連性の高いものにするために使用されます。',
                        }
                    ]
                }
            },
            nl: {
                consentModal: {
                    title: "Cookievoorkeuren",
                    description: "Wij gebruiken cookies om het sitegebruik te analyseren, uw ervaring te verbeteren en u gepersonaliseerde inhoud te tonen. U kunt ervoor kiezen deze cookies te accepteren of te weigeren." +
                        "<br><a href=\"/nl/gegevensbescherming-web.html\">Gegevensbescherming</a> | <a href=\"/nl/impressum.html\">Impressum</a>",
                    acceptAllBtn: 'Alles accepteren',
                    acceptNecessaryBtn: 'Alleen noodzakelijke accepteren',
                    showPreferencesBtn: 'Voorkeuren beheren'
                },
                preferencesModal: {
                    title: 'Cookievoorkeuren',
                    acceptAllBtn: 'Alles accepteren',
                    acceptNecessaryBtn: 'Alleen noodzakelijke accepteren',
                    savePreferencesBtn: 'Voorkeuren opslaan',
                    sections: [
                        {
                            title: 'Noodzakelijke cookies',
                            description: 'Deze cookies zijn essentieel voor de goede werking van de website en kunnen niet worden uitgeschakeld.',
                        },
                        {
                            title: 'Analytische cookies',
                            description: 'Deze cookies helpen ons begrijpen hoe bezoekers omgaan met onze website door anoniem informatie te verzamelen en te rapporteren.',
                        },
                        {
                            title: 'Advertentiecookies',
                            description: 'Deze cookies worden gebruikt om advertentieboodschappen relevanter te maken voor u en uw interesses.',
                        }
                    ]
                }
            },
            pl: {
                consentModal: {
                    title: "Preferencje dotyczące plików cookie",
                    description: "Używamy plików cookie w celu analizy sposobu korzystania z witryny, poprawy komfortu korzystania z niej oraz wyświetlania spersonalizowanych treści. Możesz zaakceptować lub odrzucić te pliki cookie." +
                        "<br><a href=\"/pl/polityka-prywatnosci.html\">Polityka prywatności</a> | <a href=\"/pl/nota-prawna.html\">Nota prawna</a>",
                    acceptAllBtn: 'Zaakceptuj wszystkie',
                    acceptNecessaryBtn: 'Zaakceptuj tylko niezbędne',
                    showPreferencesBtn: 'Zarządzaj preferencjami'
                },
                preferencesModal: {
                    title: 'Preferencje dotyczące plików cookie',
                    acceptAllBtn: 'Zaakceptuj wszystkie',
                    acceptNecessaryBtn: 'Zaakceptuj tylko niezbędne',
                    savePreferencesBtn: 'Zapisz preferencje',
                    sections: [
                        {
                            title: 'Niezbędne pliki cookie',
                            description: 'Te pliki cookie są niezbędne do prawidłowego funkcjonowania strony internetowej i nie można ich wyłączyć.',
                        },
                        {
                            title: 'Pliki cookie analityczne',
                            description: 'Te pliki cookie pomagają nam zrozumieć, w jaki sposób odwiedzający korzystają z naszej strony internetowej, zbierając i raportując informacje anonimowo.',
                        },
                        {
                            title: 'Pliki cookie reklamowe',
                            description: 'Te pliki cookie są używane do tego, aby komunikaty reklamowe były bardziej odpowiednie dla Ciebie i Twoich zainteresowań.',
                        }
                    ]
                }
            }
        }
    }
});