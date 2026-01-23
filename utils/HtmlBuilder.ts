import * as fs from 'fs';
import {
	Certification,
	Education,
	Experience,
	Hackathon,
	Language,
	LanguageOptions,
} from '../model';
import { BASE_HTML_DIR, DRIVING_LICENSE_KEY, TITLE_KEY, WON_KEY } from './Constants';
import { getDateAsString, getJobDates } from './Dates';
import {
	parseCertifications,
	parseEducations,
	parseExperiences,
	parseHackathons,
	parseLanguages,
	parseProfilePicture,
	parseSkills,
} from './Parser';
import { getContent } from './Translation';

function buildExperiences(experiences: Experience[], language: LanguageOptions) {
	let experienceContent = '';

	for (let [index, experience] of experiences.entries()) {
		experienceContent += `
            <div>
                <div class="whitespace-pre-wrap text-black text-[16px] leading-6">${
					experience.title
				}</div>
                <div class="font-[700] text-[12px] main-color">${experience.place}</div>
                <div class="flex items-center">
                    <span class="material-symbols-outlined text-[#65696d] text-[12px] mr-1">
                        calendar_month
                    </span>
                    <span class="text-[9px]">${getJobDates(
						experience.startDate,
						experience.endDate,
						language
					)}</span>
                </div>
                <div class="text-[10px]">
                    <p>${experience.description !== null ? experience.description + '.' : ''}</p>
                    ${
						experience.tasks == null
							? ''
							: experience.tasks.map((t) => `<li>${t}</li>`).join('')
					}
                </div>
            </div>
            ${index != experiences.length - 1 ? '<div class="separator my-1"></div>' : ''}
            `;
	}

	return experienceContent;
}

function buildLanguages(languages: Language[]) {
	let languageContent = '';

	for (let language of languages) {
		languageContent += `
			<div>
				<div class="flex justify-between">
					<span class="font-[700] text-[12px]">${language.name}</span>
					<span class="text-[10px]">${language.level}</span>
				</div>
			</div>
			`;
	}

	return languageContent;
}

function buildSkills(skills: string[]) {
	let skillContent = '';

	for (let skill of skills) {
		skillContent += `
			<span class="skill">${skill}</span>
			`;
	}

	return skillContent;
}

function buildEducations(educations: Education[]) {
	let educationContent = '';

	for (let [index, education] of educations.entries()) {
		educationContent += `
			<div>
				<div class="whitespace-pre-wrap text-black text-[16px] leading-6">${education.degree}</div>
				<div class="font-[700] text-[12px] main-color">${education.school}</div>
				<div class="grid grid-cols-2 self-center">
					<div class="flex items-center">
						<span class="material-symbols-outlined text-[#65696d] text-[16px] mr-1">
							calendar_month
						</span>
						<span class="text-[9px]">${education.year}</span>
					</div> 
					<div class="flex items-center">
						<span class="material-symbols-outlined text-[#65696d] text-[16px] mr-1">
							location_on
						</span>
						<span class="text-[9px]">${education.place}</span>
					</div>
				</div>
			</div>
			${index != educations.length - 1 ? '<div class="separator my-1"></div>' : ''}
			`;
	}

	return educationContent;
}

function buildCertifications(certifications: Certification[], language: LanguageOptions) {
	let certificationContent = '';

	for (let certification of certifications) {
		certificationContent += `
			<div>
				<div class="font-[700] text-[12px] main-color">${certification.title}</div>
				<div class="text-[10px]">${getDateAsString(certification.date, language)}</div>
			</div>
			`;
	}

	return certificationContent;
}

function buildHackathons(hackathons: Hackathon[], language: LanguageOptions) {
	let hackathonContent = '';

	for (let [index, hackathon] of hackathons.entries()) {
		hackathonContent += `
			<div>
				<div class="whitespace-pre-wrap text-black text-[16px] leading-6">${hackathon.project}</div>
				<div class="font-[700] text-[12px] main-color">${hackathon.place}</div>
				<div class="flex items-center">
					<span class="material-symbols-outlined text-[#65696d] text-[12px] mr-1">
						calendar_month
					</span>
					<span class="text-[9px]">${getDateAsString(hackathon.date, language)}</span>
				</div>
				<div class="text-[10px]">
					<p>${hackathon.description}</p>
					<p>${hackathon.price !== null ? getContent(WON_KEY, language) + ' : ' + hackathon.price : ''}</p>
				</div>
			</div>
			${index != hackathons.length - 1 ? '<div class="separator my-1"></div>' : ''}
			`;
	}

	return hackathonContent;
}

export function buildHtml(language: LanguageOptions) {
	let baseHtml: string = fs.readFileSync(BASE_HTML_DIR).toString();

	baseHtml = baseHtml.replace(
		'{{Experiences}}',
		buildExperiences(parseExperiences(language), language)
	);

	baseHtml = baseHtml.replace('{{Languages}}', buildLanguages(parseLanguages(language)));

	baseHtml = baseHtml.replace('{{Skills}}', buildSkills(parseSkills()));

	baseHtml = baseHtml.replace('{{Educations}}', buildEducations(parseEducations(language)));

	baseHtml = baseHtml.replace(
		'{{Certifications}}',
		buildCertifications(parseCertifications(), language)
	);

	baseHtml = baseHtml.replace(
		'{{Hackathons}}',
		buildHackathons(parseHackathons(language), language)
	);

	baseHtml = baseHtml.replace('{{Title}}', getContent(TITLE_KEY, language));

	baseHtml = baseHtml.replace('{{DrivingLicense}}', getContent(DRIVING_LICENSE_KEY, language));

	baseHtml = baseHtml.replace('{{ProfilePicture}}', parseProfilePicture());

	return baseHtml;
}
