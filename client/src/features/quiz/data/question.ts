import { QuizQuestion } from "../types";
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // === Système d'exploitation ===
  {
    id: 1,
    question: "Utilisez-vous Windows comme système principal ?",
    advice: "Linux (Ubuntu, Fedora, Mint) offre une alternative libre, gratuite et respectueuse de votre vie privée.",
  },
  {
    id: 2,
    question: "Utilisez-vous macOS comme système principal ?",
    advice: "Linux peut fonctionner sur Mac et vous libère de l'écosystème fermé d'Apple.",
  },
  
  // === Navigateur ===
  {
    id: 3,
    question: "Chrome est-il votre navigateur principal ?",
    advice: "Firefox ou Brave offrent une navigation privée sans pistage publicitaire de Google.",
  },
  {
    id: 4,
    question: "Utilisez-vous Microsoft Edge régulièrement ?",
    advice: "Edge collecte vos données de navigation. Firefox est une alternative indépendante.",
  },
  {
    id: 5,
    question: "Êtes-vous connecté à votre compte Google dans votre navigateur ?",
    advice: "La synchronisation Google lie toute votre activité web à votre profil. Utilisez Firefox Sync.",
  },

  // === Moteur de recherche ===
  {
    id: 6,
    question: "Google est-il votre moteur de recherche par défaut ?",
    advice: "DuckDuckGo, Qwant ou Startpage ne traquent pas vos recherches.",
  },
  {
    id: 7,
    question: "Utilisez-vous Bing pour vos recherches ?",
    advice: "Bing collecte aussi vos données. Essayez Qwant, un moteur français respectueux.",
  },

  // === Email ===
  {
    id: 8,
    question: "Votre email principal est-il une adresse Gmail ?",
    advice: "ProtonMail ou Tutanota offrent un chiffrement de bout en bout gratuit.",
  },
  {
    id: 9,
    question: "Utilisez-vous Outlook/Hotmail comme email principal ?",
    advice: "Les emails Microsoft sont analysés. ProtonMail est une alternative sécurisée.",
  },
  {
    id: 10,
    question: "Utilisez-vous Yahoo Mail ?",
    advice: "Yahoo a subi plusieurs fuites de données massives. Migrez vers ProtonMail.",
  },

  // === Stockage cloud ===
  {
    id: 11,
    question: "Stockez-vous vos fichiers sur Google Drive ?",
    advice: "Nextcloud vous permet d'héberger votre propre cloud ou d'utiliser un hébergeur éthique.",
  },
  {
    id: 12,
    question: "Utilisez-vous iCloud pour vos fichiers ?",
    advice: "Vos données sont sur les serveurs Apple. Un NAS personnel ou Nextcloud vous rend souverain.",
  },
  {
    id: 13,
    question: "OneDrive est-il votre stockage cloud principal ?",
    advice: "Microsoft analyse vos fichiers. Nextcloud ou Syncthing sont des alternatives libres.",
  },
  {
    id: 14,
    question: "Utilisez-vous Dropbox ?",
    advice: "Dropbox a accès à vos fichiers. Syncthing synchronise en P2P sans serveur central.",
  },

  // === Réseaux sociaux ===
  {
    id: 15,
    question: "Avez-vous un compte Facebook actif ?",
    advice: "Facebook collecte massivement vos données. Mastodon est un réseau social décentralisé.",
  },
  {
    id: 16,
    question: "Utilisez-vous Instagram régulièrement ?",
    advice: "Instagram (Meta) exploite vos photos. PixelFed est une alternative libre.",
  },
  {
    id: 17,
    question: "Avez-vous un compte X (Twitter) actif ?",
    advice: "Mastodon offre une alternative décentralisée sans algorithme de manipulation.",
  },
  {
    id: 18,
    question: "Utilisez-vous WhatsApp comme messagerie principale ?",
    advice: "Signal offre le même confort avec un chiffrement véritablement sécurisé.",
  },
  {
    id: 19,
    question: "Utilisez-vous TikTok ?",
    advice: "TikTok collecte énormément de données. PeerTube propose des vidéos libres.",
  },
  {
    id: 20,
    question: "LinkedIn est-il votre réseau professionnel principal ?",
    advice: "LinkedIn (Microsoft) analyse vos relations. Un site personnel est plus souverain.",
  },

  // === Streaming ===
  {
    id: 21,
    question: "Regardez-vous principalement YouTube ?",
    advice: "Invidious ou FreeTube permettent de regarder YouTube sans pistage Google.",
  },
  {
    id: 22,
    question: "Utilisez-vous Netflix comme plateforme principale ?",
    advice: "Les médiathèques et PeerTube offrent du contenu libre et légal.",
  },
  {
    id: 23,
    question: "Écoutez-vous Spotify régulièrement ?",
    advice: "Funkwhale ou des fichiers locaux vous libèrent des algorithmes de recommandation.",
  },
  {
    id: 24,
    question: "Amazon Prime Video est-il votre service de streaming ?",
    advice: "Amazon collecte vos habitudes. Les médiathèques proposent du streaming légal.",
  },

  // === Achats en ligne ===
  {
    id: 25,
    question: "Amazon est-il votre site d'achat principal ?",
    advice: "Privilégiez les commerces locaux ou des plateformes éthiques comme Label Emmaüs.",
  },

  // === Assistants vocaux et objets connectés ===
  {
    id: 26,
    question: "Utilisez-vous un assistant vocal (Alexa, Google Home, Siri) ?",
    advice: "Ces assistants écoutent en permanence. Mycroft est une alternative open source.",
  },
  {
    id: 27,
    question: "Avez-vous des objets connectés Google/Amazon chez vous ?",
    advice: "Home Assistant permet de gérer sa domotique localement sans cloud.",
  },

  // === Outils de travail ===
  {
    id: 28,
    question: "Utilisez-vous Microsoft Office (Word, Excel, PowerPoint) ?",
    advice: "LibreOffice est une suite bureautique complète, gratuite et compatible.",
  },
  {
    id: 29,
    question: "Google Docs est-il votre outil de rédaction principal ?",
    advice: "CryptPad ou Etherpad offrent la collaboration en ligne sans pistage.",
  },
  {
    id: 30,
    question: "Utilisez-vous Google Meet ou Zoom pour vos visios ?",
    advice: "Jitsi Meet est gratuit, sans compte, et respecte votre vie privée.",
  },
  {
    id: 31,
    question: "Slack ou Teams est-il votre outil de communication pro ?",
    advice: "Mattermost ou Element (Matrix) sont des alternatives auto-hébergeables.",
  },
  {
    id: 32,
    question: "Utilisez-vous Notion pour vos notes ?",
    advice: "Obsidian ou Logseq stockent vos notes localement en fichiers Markdown.",
  },

  // === Téléphone ===
  {
    id: 33,
    question: "Votre smartphone fonctionne-t-il sous Android Google ?",
    advice: "LineageOS ou /e/OS offrent Android sans les services Google.",
  },
  {
    id: 34,
    question: "Utilisez-vous un iPhone comme téléphone principal ?",
    advice: "Les iPhones sont très fermés. Un Android dégooglisé offre plus de liberté.",
  },
  {
    id: 35,
    question: "Le Google Play Store est-il votre source d'applications ?",
    advice: "F-Droid propose des applications libres et open source pour Android.",
  },

  // === Navigation et cartographie ===
  {
    id: 36,
    question: "Google Maps est-il votre application de navigation ?",
    advice: "OpenStreetMap et OsmAnd offrent une cartographie libre et hors-ligne.",
  },
  {
    id: 37,
    question: "Utilisez-vous Waze pour la navigation ?",
    advice: "Waze appartient à Google. Organic Maps est une alternative respectueuse.",
  },

  // === Photos ===
  {
    id: 38,
    question: "Google Photos stocke-t-il vos souvenirs ?",
    advice: "Photoprism ou Immich permettent d'héberger vos photos chez vous.",
  },
  {
    id: 39,
    question: "Vos photos sont-elles sur iCloud ?",
    advice: "Un NAS personnel ou Nextcloud vous rend propriétaire de vos souvenirs.",
  },

  // === Sécurité ===
  {
    id: 40,
    question: "Utilisez-vous le gestionnaire de mots de passe Google/Apple ?",
    advice: "Bitwarden ou KeePassXC sont des gestionnaires open source et sécurisés.",
  },
];