import { Project } from "./Project";

export interface Hackathon extends Project {
	place: string;
	price?: string | null;
}
