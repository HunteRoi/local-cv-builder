import 'dotenv/config';
import { LanguageOptions } from 'model';
import { printHtml } from 'utils/HtmlPrinter';

const languages = ['fr' as LanguageOptions, 'en' as LanguageOptions];

for (var language of languages) {
	await printHtml(language);
}
