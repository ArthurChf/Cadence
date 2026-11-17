import en from '#/locales/en.json';
import fr from '#/locales/fr.json';
import { ref } from 'vue';
import { createI18n } from 'vue-i18n';

export type Locale = 'fr' | 'en';

const savedLang = ref('fr');

export const i18n = createI18n({
    legacy: false,
    locale: savedLang.value,
    fallbackLocale: 'fr',
    messages: { fr, en }
});
