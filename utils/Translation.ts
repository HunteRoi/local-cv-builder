import * as fs from 'fs';
import { LanguageOptions } from '../model';
import { TRANSLATION_DIR } from './Constants';

export function getContent(key: string, language: LanguageOptions) {
	const translationFile = fs.readFileSync(`${TRANSLATION_DIR}/${language}.json`).toString();

	return JSON.parse(translationFile)[key];
}
