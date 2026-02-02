import 'dotenv/config';
import { BuildOptions, defaultBuildOptions, LanguageOptions, languageOptions } from 'model';
import { printHtml } from 'utils/HtmlPrinter';

const isLanguageOption = (param: string): param is LanguageOptions => Object.values(languageOptions).includes(param as LanguageOptions);

function parseArgs(args: string[]): { languages: LanguageOptions[], invalidLanguages: string[], options: BuildOptions } {
	const languages: LanguageOptions[] = [];
	const invalidLanguages: string[] = [];
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
Usage: npx tsx ./builder.ts [languages...] [options...]

Languages:
  en-US, fr-BE, etc.      Specify which language(s) to generate CVs for

Options:
  --no-hackathons         Exclude hackathons section
  --no-open-source        Exclude open-source projects section
  --no-certifications     Exclude certifications section
  --no-education          Exclude education section
  --no-skills             Exclude skills section
  --no-languages          Exclude languages section
  --help                  Show this help message

Examples:
  npx tsx ./builder.ts en-US
  npx tsx ./builder.ts en-US fr-BE --no-hackathons
  npx tsx ./builder.ts en-US --no-open-source --no-certifications
				`);
				process.exit(0);
			default:
				// Check if it looks like a language code (contains a hyphen, e.g., "fr-FR")
				if (arg.includes('-') && !arg.startsWith('--')) {
					invalidLanguages.push(arg);
				}
				break;
		}
	}

	return { languages, invalidLanguages, options };
}

const { languages, invalidLanguages, options } = parseArgs(process.argv.slice(2));

// Warn about invalid languages
for (const invalid of invalidLanguages) {
	console.warn(`\x1b[33m⚠ Warning: Language "${invalid}" is not supported. Supported languages: ${languageOptions.join(', ')}\x1b[0m`);
}

// Error if no valid languages to process
if (languages.length === 0) {
	console.error(`\x1b[31m✖ Error: No valid languages specified. Supported languages: ${languageOptions.join(', ')}\x1b[0m`);
	process.exit(1);
}

// Process valid languages
for (var language of languages) {
	await printHtml(language, options);
	console.log(`\x1b[32m✔ Generated CV for ${language}\x1b[0m`);
}
