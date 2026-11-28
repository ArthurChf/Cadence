import en from '#/locales/en.json';
import fr from '#/locales/fr.json';
import enValidation from '#shared/locales/en/validation.json';
import frValidation from '#shared/locales/fr/validation.json';
import { ref } from 'vue';
import { createI18n } from 'vue-i18n';

export type Locale = 'fr' | 'en';

const savedLang = ref('fr');

export const i18n = createI18n({
    legacy: false,
    locale: savedLang.value,
    fallbackLocale: 'fr',
    messages: {
        // Validation messages live in the shared workspace, so schemas can reference their keys.
        fr: { ...fr, validation: frValidation },
        en: { ...en, validation: enValidation }
    }
});
