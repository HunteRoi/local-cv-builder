export interface Experience {
	title: string;
	startDate: Date;
	endDate?: Date | null;
	place: string;
	description?: string | null;
	tasks: string[];
	technologies: string[];
}

export default Experience;
