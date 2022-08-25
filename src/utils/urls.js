/* eslint-disable no-undef */
export const baseURL = () =>
  process.env.NODE_ENV === "production"
    ? "https://crawlerhub.lndata.com"
    : process.env.NODE_ENV === "staging"
    ? `https://crawlerhub-staging.lndata.com`
    : `http://localhost:8000`;

export const userInfoUrl = (id) => `/api/users/${id}/`;

export const taskHistoryUrl = (id) => `/api/historydata/?userid=${id}`;

export const postTaskUrl = () => `/api/realtime/`;

export const postTaskbasedUrl = () => `/api/taskbased/`;

export const getDataUrl = (task_id) => `/api/resultdata/${task_id}/`;

export const postLegacyUrl = () => `/api/legacy/`;

export const getLegacyUrl = (task_id) => `/api/legacy/${task_id}/`;

export const ScheduleUrl = () => `/api/schedules/`;

export const ScheduleItemsUrl = (id) => `/api/schedules/${id}/`;

export const CrontabItemsUrl = (id) => `/api/crontab/${id}/`;

export const MappingTableUrl = (id) => `/api/usertask/?user=${id}`;

export const JWTAuthenticateUrl = () => `/api/token/`;

export const RefreshTokenUrl = () => `/api/token/refresh/`;

export const ApiKeyUrl = () => `/api/apikey/`;

export const RegisterUrl = () => `/api/register/`;

export const UserUpdateUrl = (id) => `/api/update_profile/${id}/`;

export const ChangePasswordUrl = (id) => `/api/change_password/${id}/`;

export const LogOutUrl = () => `/api/logout/`;

export const LogOutAllUrl = () => `/api/logout/all/`;
