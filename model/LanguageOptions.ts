export const languageOptions = ['fr-BE', 'en-US'] as const;

export type LanguageOptions = typeof languageOptions[number];
