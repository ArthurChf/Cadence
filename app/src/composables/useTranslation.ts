import type { Locale } from '#/i18n';
import { i18n } from '#/i18n';
import { useI18n } from 'vue-i18n';

export function useTranslation() {
    const { locale } = useI18n({ useScope: 'global' });
    return { t: i18n.global.t, locale };
}

function isValidLocale(lang: string): lang is Locale {
    return (i18n.global.availableLocales as string[]).includes(lang);
}

export function changeLanguage(lang: string) {
    const savedLang = lang;

    if (isValidLocale(lang)) {
        i18n.global.locale.value = lang;
    }
}
