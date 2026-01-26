import { LanguageOptions } from '../model';
import { NOW_KEY } from './Constants';
import { getContent } from './Translation';


export function getDateAsString(date: Date, language: LanguageOptions) {
	return date.toLocaleDateString(language, {
		year: 'numeric',
		month: 'long'
	});
}

export function getJobDates(startDate: Date, endDate: Date, language: LanguageOptions) {
	return `${getDateAsString(startDate, language)} - ${endDate ? getDateAsString(endDate, language) : getContent(NOW_KEY, language)
		}`;
}
