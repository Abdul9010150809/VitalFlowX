import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "dashboard": "Dashboard",
          "shipment_wizard": "Shipment Wizard",
          "live_tracking": "Live Tracking",
          "compliance": "Compliance",
          "logout": "Sign Out",
          "welcome": "Welcome back to VitalFlowX",
          "trust_score": "Trust Score",
          "blockchain_verified": "Blockchain Verified",
          "status": "Status",
          "pickup": "Pickup",
          "delivery": "Delivery"
        }
      },
      hi: {
        translation: {
          "dashboard": "डैशबोर्ड",
          "shipment_wizard": "शिपमेंट विज़ार्ड",
          "live_tracking": "लाइव ट्रैकिंग",
          "compliance": "अनुपालन",
          "logout": "साइन आउट",
          "welcome": "VitalFlowX में आपका स्वागत है",
          "trust_score": "भरोसा स्कोर",
          "blockchain_verified": "ब्लॉकचेन सत्यापित",
          "status": "स्थिति",
          "pickup": "पिकअप",
          "delivery": "डिलीवरी"
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
