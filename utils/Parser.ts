import * as fs from 'fs';
import {
	Certification,
	Education,
	Experience,
	Hackathon,
	Language,
	LanguageOptions,
	Profile,
	ProfileSummary,
	Project,
} from '../model';
import {
	CERTIFICATIONS_DIR,
	EDUCATIONS_DIR,
	EXPERIENCES_DIR,
	HACKATHONS_DIR,
	OPEN_SOURCE_DIR,
	LANGUAGES_DIR,
	PROFILE_DIR,
	PROFILE_PICTURE_DIR,
	SKILLS_DIR,
} from './Constants';

function parseContent<T>(
	contentDirectory: string,
	language: LanguageOptions | null,
	needsTranslation: boolean = true
): T {
	let contentPath = `${contentDirectory}`;

	if (needsTranslation && language) contentPath += `/${language}.json`;
	else contentPath += '/content.json';

	const contentFile = fs.readFileSync(contentPath).toString();

	return JSON.parse(contentFile) as T;
}

export function parseExperiences(language: LanguageOptions): Experience[] {
	return parseContent<Experience[]>(EXPERIENCES_DIR, language)
		.map((e) => {
			e.startDate = new Date(e.startDate);
			e.endDate = e.endDate ? new Date(e.endDate) : null;
			return e;
		})
		.sort((a: Experience, b: Experience) => {
			if (a.endDate === null && b.endDate === null) {
				return b.startDate.getTime() - a.startDate.getTime();
			} else if (a.endDate === null) {
				return -1;
			} else if (b.endDate === null) {
				return 1;
			} else {
				return b.endDate.getTime() - a.endDate.getTime();
			}
		});
}

export function parseLanguages(language: LanguageOptions): Language[] {
	return parseContent<Language[]>(LANGUAGES_DIR, language);
}

export function parseSkills(): string[] {
	return parseContent<string[]>(SKILLS_DIR, null, false);
}

export function parseEducations(language: LanguageOptions): Education[] {
	return parseContent<Education[]>(EDUCATIONS_DIR, language);
}

export function parseCertifications(): Certification[] {
	return parseContent<Certification[]>(CERTIFICATIONS_DIR, null, false).map((c) => {
		c.date = new Date(c.date);
		return c;
	});
}

export function parseHackathons(language: LanguageOptions): Hackathon[] {
	return parseContent<Hackathon[]>(HACKATHONS_DIR, language).map((h) => {
		h.date = new Date(h.date);
		return h;
	});
}

export function parseOpenSourceProjects(language: LanguageOptions): Project[] {
	return parseContent<Project[]>(OPEN_SOURCE_DIR, language).map((p) => {
		p.date = new Date(p.date);
		return p;
	});
}

export function parseProfile(): Profile {
	return parseContent<Profile>(PROFILE_DIR, null, false);
}

export function parseProfileSummary(language: LanguageOptions): ProfileSummary {
	return parseContent<ProfileSummary>(PROFILE_DIR, language);
}

export function parseProfilePicture(): string {
	let contentPath = `${PROFILE_PICTURE_DIR}/profile_picture.jpg`;

	return fs.readFileSync(contentPath).toString('base64');
}
