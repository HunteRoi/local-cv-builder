import * as fs from 'fs';
import {
	BuildOptions,
	Certification,
	Education,
	Experience,
	Hackathon,
	Language,
	LanguageOptions,
	Profile,
	Project,
} from '../model';
import { BASE_HTML_DIR, DRIVING_LICENSE_KEY, TITLE_KEY, WON_KEY } from './Constants';
import { getDateAsString, getJobDates } from './Dates';
import {
	parseCertifications,
	parseEducations,
	parseExperiences,
	parseHackathons,
	parseOpenSourceProjects,
	parseLanguages,
	parseProfile,
	parseProfilePicture,
	parseSkills,
} from './Parser';
import { getContent } from './Translation';

function buildExperiences(experiences: Experience[], language: LanguageOptions) {
	let experienceContent = '';

	for (let [index, experience] of experiences.entries()) {
		experienceContent += `
			<div>
				<div class="whitespace-pre-wrap text-[var(--primary)] text-[16px] leading-6">${experience.title}</div>
				<div class="font-[700] text-[12px] text-black">${experience.company.name} (${experience.company.place})</div>
				${experience.customer ? `<div class="font-[600] text-[11px] text-gray-600">Customer: ${experience.customer.name} (${experience.customer.place})</div>` : ''}
				<div class="flex items-center">
					<span class="material-symbols-outlined text-[#65696d] text-[12px] mr-1">calendar_month</span>
					<span class="text-[9px]">${getJobDates(experience.startDate, experience.endDate, language)}</span>
				</div>
				<div class="text-[10px]">
					${experience.description ? `<p>${experience.description}.</p>` : ''}
					${experience.tasks && experience.tasks.length > 0 ? `<ul class="list-disc ml-4">${experience.tasks.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}
					${experience.technologies && experience.technologies.length > 0 ? `<div class="mt-1"><span class="font-bold">Technologies:</span> ${experience.technologies.join(', ')}</div>` : ''}
					${experience.tools && experience.tools.length > 0 ? `<div><span class="font-bold">Tools:</span> ${experience.tools.join(', ')}</div>` : ''}
					${experience.methodologies && experience.methodologies.length > 0 ? `<div><span class="font-bold">Methodologies:</span> ${experience.methodologies.join(', ')}</div>` : ''}
					${experience.links && experience.links.length > 0 ? `<div><span class="font-bold">Links:</span> ${experience.links.map(link => `<a class='underline text-blue-700 hover:text-blue-900' href='${link}'>${link}</a>`).join(', ')}</div>` : ''}
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
				<div class="font-[700] text-[12px] text-black">${education.school}</div>
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
				<div class="whitespace-pre-wrap text-[var(--primary)] text-[16px] leading-6">${hackathon.project}</div>
				<div class="font-[700] text-[12px] text-black">${hackathon.place}</div>
				<div class="flex items-center">
					<span class="material-symbols-outlined text-[#65696d] text-[12px] mr-1">calendar_month</span>
					<span class="text-[9px]">${getDateAsString(hackathon.date, language)}</span>
				</div>
				<div class="text-[10px]">
					${hackathon.description ? `<p>${hackathon.description}</p>` : ''}
					${hackathon.price ? `<p>${getContent(WON_KEY, language)}: ${hackathon.price}</p>` : ''}
					${hackathon.links && hackathon.links.length > 0 ? `<div class="mt-1"><span class="font-bold">Links:</span> ${hackathon.links.map(link => `<a class='underline text-blue-700 hover:text-blue-900' href='${link}'>${link}</a>`).join(', ')}</div>` : ''}
				</div>
			</div>
			${index != hackathons.length - 1 ? '<div class="separator my-1"></div>' : ''}
		`;
	}
	return hackathonContent;
}

function buildOpenSourceProjects(projects: Project[], language: LanguageOptions) {
	let projectContent = '';

	for (let [index, project] of projects.entries()) {
		projectContent += `
			<div>
				<div class="whitespace-pre-wrap text-[var(--primary)] text-[16px] leading-6">${project.project}</div>
				<div class="flex items-center">
					<span class="material-symbols-outlined text-[#65696d] text-[12px] mr-1">calendar_month</span>
					<span class="text-[9px]">${getDateAsString(project.date, language)}</span>
				</div>
				<div class="text-[10px]">
					${project.description ? `<p>${project.description}</p>` : ''}
					${project.links && project.links.length > 0 ? `<div class="mt-1"><span class="font-bold">Links:</span> ${project.links.map(link => `<a class='underline text-blue-700 hover:text-blue-900' href='${link}'>${link}</a>`).join(', ')}</div>` : ''}
				</div>
			</div>
			${index != projects.length - 1 ? '<div class="separator my-1"></div>' : ''}
		`;
	}
	return projectContent;
}

function buildSummary(summary: string[]) {
	return summary
		.map(paragraph => `<p class="mb-3 leading-relaxed text-[13.5px] text-[var(--text)]">${paragraph}</p>`)
		.join('\n');
}

function buildDriverLicenseSection(hasDriverLicense: boolean, language: LanguageOptions) {
	if (!hasDriverLicense) return '';
	return `
		<div class="flex items-center col-span-2">
			<span class="material-symbols-outlined main-color text-[12px] mr-1">
				id_card
			</span>
			<span id="drivingLicense" class="text-[10px] font-[700]">${getContent(DRIVING_LICENSE_KEY, language)}</span>
		</div>
	`;
}

function buildSection(title: string, id: string, content: string, additionalClasses: string = '') {
	if (!content || content.trim() === '') return '';
	return `
		<div class="mb-6${additionalClasses ? ' ' + additionalClasses : ''}">
			<div${id === 'language' ? ' id="language_title"' : ''} class="section mb-2">${title}</div>
			<div id="${id}">${content}</div>
		</div>
	`;
}

export function buildHtml(language: LanguageOptions, options: BuildOptions) {
	let baseHtml: string = fs.readFileSync(BASE_HTML_DIR).toString();
	const profile: Profile = parseProfile();

	// Profile information
	baseHtml = baseHtml.replace('{{FullName}}', `${profile.firstName} ${profile.lastName}`);
	baseHtml = baseHtml.replace('{{Email}}', profile.email);
	baseHtml = baseHtml.replace('{{Phone}}', profile.phone);
	baseHtml = baseHtml.replace('{{City}}', profile.city);
	baseHtml = baseHtml.replace('{{DriverLicenseSection}}', buildDriverLicenseSection(profile.hasDriverLicense, language));
	baseHtml = baseHtml.replace('{{Summary}}', buildSummary(profile.summary));
	baseHtml = baseHtml.replace('{{Title}}', getContent(TITLE_KEY, language));
	baseHtml = baseHtml.replace('{{ProfilePicture}}', parseProfilePicture());

	// Experiences (always included)
	baseHtml = baseHtml.replace(
		'{{Experiences}}',
		buildExperiences(parseExperiences(language), language)
	);

	// Optional sections with empty check
	if (options.includeHackathons) {
		const hackathons = parseHackathons(language);
		const hackathonContent = hackathons.length > 0 ? buildHackathons(hackathons, language) : '';
		baseHtml = baseHtml.replace('{{HackathonsSection}}', buildSection('HACKATHONS', 'hackathon', hackathonContent, 'break-after-void'));
	} else {
		baseHtml = baseHtml.replace('{{HackathonsSection}}', '');
	}

	if (options.includeOpenSource) {
		const projects = parseOpenSourceProjects(language);
		const projectContent = projects.length > 0 ? buildOpenSourceProjects(projects, language) : '';
		baseHtml = baseHtml.replace('{{OpenSourceSection}}', buildSection('OPEN-SOURCE PROJECTS', 'project', projectContent, 'break-after-void'));
	} else {
		baseHtml = baseHtml.replace('{{OpenSourceSection}}', '');
	}

	if (options.includeCertifications) {
		const certifications = parseCertifications();
		const certificationContent = certifications.length > 0 ? buildCertifications(certifications, language) : '';
		baseHtml = baseHtml.replace('{{CertificationsSection}}', buildSection('CERTIFICATIONS', 'certification', certificationContent));
	} else {
		baseHtml = baseHtml.replace('{{CertificationsSection}}', '');
	}

	if (options.includeSkills) {
		const skills = parseSkills();
		const skillContent = skills.length > 0 ? buildSkills(skills) : '';
		baseHtml = baseHtml.replace('{{SkillsSection}}', buildSection('SKILLS', 'skill', skillContent));
	} else {
		baseHtml = baseHtml.replace('{{SkillsSection}}', '');
	}

	if (options.includeEducation) {
		const educations = parseEducations(language);
		const educationContent = educations.length > 0 ? buildEducations(educations) : '';
		baseHtml = baseHtml.replace('{{EducationsSection}}', buildSection('EDUCATION', 'education', educationContent));
	} else {
		baseHtml = baseHtml.replace('{{EducationsSection}}', '');
	}

	if (options.includeLanguages) {
		const languages = parseLanguages(language);
		const languageContent = languages.length > 0 ? buildLanguages(languages) : '';
		baseHtml = baseHtml.replace('{{LanguagesSection}}', buildSection('LANGUAGES', 'language', languageContent));
	} else {
		baseHtml = baseHtml.replace('{{LanguagesSection}}', '');
	}

	return baseHtml;
}
