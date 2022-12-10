export interface CompanyGeneralItem {
  industry: string;
  startedIn: string;
  specializedPeople: number;
  completedProjects: number;
}

export type Technologies = {
  technologies: string[];
  prioritizeInMatching: boolean;
};

export type Databases = {
  databases: string[];
  prioritizeInMatching: boolean;
};

export type Tools = {
  tools: string[];
  prioritizeInMatching: boolean;
};
