import {
  CheckHealthData,
  CreateProjectData,
  DeleteProjectData,
  GetProjectData,
  InitializeProjectsData,
  ListProjectsData,
  ProjectCreate,
  ProjectUpdate,
  UpdateProjectData,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * No description
   * @tags dbtn/module:projects
   * @name list_projects
   * @summary List Projects
   * @request GET:/routes/projects
   */
  export namespace list_projects {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListProjectsData;
  }

  /**
   * No description
   * @tags dbtn/module:projects
   * @name create_project
   * @summary Create Project
   * @request POST:/routes/projects
   */
  export namespace create_project {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProjectCreate;
    export type RequestHeaders = {};
    export type ResponseBody = CreateProjectData;
  }

  /**
   * No description
   * @tags dbtn/module:projects
   * @name get_project
   * @summary Get Project
   * @request GET:/routes/projects/{project_id}
   */
  export namespace get_project {
    export type RequestParams = {
      /** Project Id */
      projectId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetProjectData;
  }

  /**
   * No description
   * @tags dbtn/module:projects
   * @name update_project
   * @summary Update Project
   * @request PUT:/routes/projects/{project_id}
   */
  export namespace update_project {
    export type RequestParams = {
      /** Project Id */
      projectId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ProjectUpdate;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateProjectData;
  }

  /**
   * No description
   * @tags dbtn/module:projects
   * @name delete_project
   * @summary Delete Project
   * @request DELETE:/routes/projects/{project_id}
   */
  export namespace delete_project {
    export type RequestParams = {
      /** Project Id */
      projectId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteProjectData;
  }

  /**
   * No description
   * @tags dbtn/module:projects
   * @name initialize_projects
   * @summary Initialize Projects
   * @request POST:/routes/projects/initialize
   */
  export namespace initialize_projects {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = InitializeProjectsData;
  }
}
