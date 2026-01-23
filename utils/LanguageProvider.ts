import { LanguageOptions } from 'model';

class LanguageProvider {
	private static instance: LanguageOptions;

	private constructor() {}

	static setInstance(language: LanguageOptions) {
		LanguageProvider.instance = language;
	}

	static getInstance(): LanguageOptions {
		return LanguageProvider.instance;
	}
}
export default LanguageProvider;
