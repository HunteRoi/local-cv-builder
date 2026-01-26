export interface Company {
	name: string;
	place: string;
}

export interface Experience {
	title: string;
	company: Company;
	customer?: Company;
	startDate: Date;
	endDate?: Date | null;
	description?: string | null;
	tasks: string[];
	technologies: string[];
	tools: string[];
	methodologies: string[];
	links: string[];
}

export default Experience;
