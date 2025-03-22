/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** Project */
export interface Project {
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Category */
  category: string;
  /** Imageurl */
  imageUrl: string;
  /** Tags */
  tags: string[];
  /** Id */
  id: number;
}

/** ProjectCreate */
export interface ProjectCreate {
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Category */
  category: string;
  /** Imageurl */
  imageUrl: string;
  /** Tags */
  tags: string[];
}

/** ProjectUpdate */
export interface ProjectUpdate {
  /** Title */
  title?: string | null;
  /** Description */
  description?: string | null;
  /** Category */
  category?: string | null;
  /** Imageurl */
  imageUrl?: string | null;
  /** Tags */
  tags?: string[] | null;
}

/** ProjectsResponse */
export interface ProjectsResponse {
  /** Projects */
  projects: Project[];
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

export type ListProjectsData = ProjectsResponse;

export type CreateProjectData = Project;

export type CreateProjectError = HTTPValidationError;

export interface GetProjectParams {
  /** Project Id */
  projectId: number;
}

export type GetProjectData = Project;

export type GetProjectError = HTTPValidationError;

export interface UpdateProjectParams {
  /** Project Id */
  projectId: number;
}

export type UpdateProjectData = Project;

export type UpdateProjectError = HTTPValidationError;

export interface DeleteProjectParams {
  /** Project Id */
  projectId: number;
}

export type DeleteProjectData = any;

export type DeleteProjectError = HTTPValidationError;

export type InitializeProjectsData = ProjectsResponse;
