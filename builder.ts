import 'dotenv/config';
import { BuildOptions, defaultBuildOptions, LanguageOptions, languageOptions } from 'model';
import { printHtml } from 'utils/HtmlPrinter';

const isLanguageOption = (param: string): param is LanguageOptions => Object.values(languageOptions).includes(param as LanguageOptions);

function parseArgs(args: string[]): { languages: LanguageOptions[], options: BuildOptions } {
	const languages: LanguageOptions[] = [];
	const options: BuildOptions = { ...defaultBuildOptions };

	for (const arg of args) {
		if (isLanguageOption(arg)) {
			languages.push(arg);
			continue;
		}

		// Handle opt-in/opt-out flags
		switch (arg) {
			case '--no-hackathons':
				options.includeHackathons = false;
				break;
			case '--no-open-source':
				options.includeOpenSource = false;
				break;
			case '--no-certifications':
				options.includeCertifications = false;
				break;
			case '--no-education':
				options.includeEducation = false;
				break;
			case '--no-skills':
				options.includeSkills = false;
				break;
			case '--no-languages':
				options.includeLanguages = false;
				break;
			case '--help':
				console.log(`
Usage: npx ts-node builder.ts [languages...] [options...]

Languages:
  en-US, fr-FR, etc.      Specify which language(s) to generate CVs for

Options:
  --no-hackathons         Exclude hackathons section
  --no-open-source        Exclude open-source projects section
  --no-certifications     Exclude certifications section
  --no-education          Exclude education section
  --no-skills             Exclude skills section
  --no-languages          Exclude languages section
  --help                  Show this help message

Examples:
  npx ts-node builder.ts en-US
  npx ts-node builder.ts en-US fr-FR --no-hackathons
  npx ts-node builder.ts en-US --no-open-source --no-certifications
				`);
				process.exit(0);
		}
	}

	return { languages, options };
}

const { languages, options } = parseArgs(process.argv.slice(2));

for (var language of languages) {
	await printHtml(language, options);
}
