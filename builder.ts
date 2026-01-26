import 'dotenv/config';
import { LanguageOptions, languageOptions } from 'model';
import { printHtml } from 'utils/HtmlPrinter';

const isLanguageOption = (param: string): param is LanguageOptions => Object.values(languageOptions).includes(param as LanguageOptions);

const languages: LanguageOptions[] = process.argv.slice(2).filter(isLanguageOption);
for (var language of languages) {
	await printHtml(language);
}
