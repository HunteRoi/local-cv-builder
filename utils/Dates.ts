import { LanguageOptions } from '../model';
import { NOW_KEY, monthsEn, monthsFr } from './Constants';
import { getContent } from './Translation';

export function getMonthsByLanguage(language: LanguageOptions) {
	return language === 'fr' ? monthsFr : monthsEn;
}

export function getDateAsString(date: Date, language: LanguageOptions) {
	return `${getMonthsByLanguage(language)[date.getMonth()]} ${date.getFullYear()}`;
}

export function getJobDates(startDate: Date, endDate: Date, language: LanguageOptions) {
	return `${getDateAsString(startDate, language)} - ${
		endDate ? getDateAsString(endDate, language) : getContent(NOW_KEY, language)
	}`;
}
