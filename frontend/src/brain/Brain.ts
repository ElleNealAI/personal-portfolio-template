import {
  CheckHealthData,
  CreateProjectData,
  CreateProjectError,
  DeleteProjectData,
  DeleteProjectError,
  DeleteProjectParams,
  GetProjectData,
  GetProjectError,
  GetProjectParams,
  InitializeProjectsData,
  ListProjectsData,
  ProjectCreate,
  ProjectUpdate,
  UpdateProjectData,
  UpdateProjectError,
  UpdateProjectParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:projects
   * @name list_projects
   * @summary List Projects
   * @request GET:/routes/projects
   */
  list_projects = (params: RequestParams = {}) =>
    this.request<ListProjectsData, any>({
      path: `/routes/projects`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:projects
   * @name create_project
   * @summary Create Project
   * @request POST:/routes/projects
   */
  create_project = (data: ProjectCreate, params: RequestParams = {}) =>
    this.request<CreateProjectData, CreateProjectError>({
      path: `/routes/projects`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:projects
   * @name get_project
   * @summary Get Project
   * @request GET:/routes/projects/{project_id}
   */
  get_project = ({ projectId, ...query }: GetProjectParams, params: RequestParams = {}) =>
    this.request<GetProjectData, GetProjectError>({
      path: `/routes/projects/${projectId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:projects
   * @name update_project
   * @summary Update Project
   * @request PUT:/routes/projects/{project_id}
   */
  update_project = ({ projectId, ...query }: UpdateProjectParams, data: ProjectUpdate, params: RequestParams = {}) =>
    this.request<UpdateProjectData, UpdateProjectError>({
      path: `/routes/projects/${projectId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:projects
   * @name delete_project
   * @summary Delete Project
   * @request DELETE:/routes/projects/{project_id}
   */
  delete_project = ({ projectId, ...query }: DeleteProjectParams, params: RequestParams = {}) =>
    this.request<DeleteProjectData, DeleteProjectError>({
      path: `/routes/projects/${projectId}`,
      method: "DELETE",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:projects
   * @name initialize_projects
   * @summary Initialize Projects
   * @request POST:/routes/projects/initialize
   */
  initialize_projects = (params: RequestParams = {}) =>
    this.request<InitializeProjectsData, any>({
      path: `/routes/projects/initialize`,
      method: "POST",
      ...params,
    });
}
