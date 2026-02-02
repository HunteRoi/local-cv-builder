import * as fs from 'fs';
import * as pupeteer from 'puppeteer';
import { BuildOptions, LanguageOptions } from '../model';
import { buildHtml } from './HtmlBuilder';

export async function printHtml(language: LanguageOptions, options: BuildOptions) {
	const htmlContent: string = buildHtml(language, options);

	const browser = await pupeteer.launch({
		headless: 'new',
	});

	const fileName = process.env.fileName || 'cv';
	const htmlPath = `./results/${fileName}_${language}.html`;
	const pdfPath = `./results/${fileName}_${language}.pdf`;
	const page = await browser.newPage();

	await page.setContent(htmlContent);
	await page.setViewport({ width: 1920, height: 1080 });

	const pdfFile = await page.pdf({
		format: 'A4',
		margin: {
			top: 40,
			bottom: 40,
			left: 25,
			right: 25,
		},
	});

	await browser.close();

	const resultsDir = './results';
	if (!fs.existsSync(resultsDir)) {
		fs.mkdirSync(resultsDir, { recursive: true });
	}

	fs.writeFileSync(htmlPath, htmlContent);
	fs.writeFileSync(pdfPath, pdfFile);
}
