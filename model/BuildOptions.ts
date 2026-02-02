export interface BuildOptions {
    includeHackathons: boolean;
    includeOpenSource: boolean;
    includeCertifications: boolean;
    includeEducation: boolean;
    includeSkills: boolean;
    includeLanguages: boolean;
}

export const defaultBuildOptions: BuildOptions = {
    includeHackathons: true,
    includeOpenSource: true,
    includeCertifications: true,
    includeEducation: true,
    includeSkills: true,
    includeLanguages: true,
};
