/* eslint-disable no-undef */
export const baseURL = () => process.env.MODE != 'server' ? `http://localhost:8000` : 'https://api.3dvtusg.com';

export const userListUrl = () => `/api/users/`;

export const userObjectUrl = (id) => `/api/users/${id}/`;

export const groupListUrl = () => `/api/group//`;

export const groupObjectUrl = (id) => `/api/group/${id}/`;

export const JWTAuthenticateUrl = () => `/api/token/`;

export const RefreshTokenUrl = () => `/api/token/refresh/`;

export const ApiKeyUrl = () => `/api/apikey/`;

export const RegisterUrl = () => `/api/register/`;

export const UserUpdateUrl = (id) => `/api/update_profile/${id}/`;

export const ChangePasswordUrl = (id) => `/api/change_password/${id}/`;

export const LogOutUrl = () => `/api/logout/`;

export const LogOutAllUrl = () => `/api/logout/all/`;

export const SegmentationUrl = (userid, groupname, status) =>
  `/api/segmentation/?user=${userid}&groupname=${groupname}&status=${status}`;

export const SegmentationObjectUrl = (id) => `/api/segmentation/${id}/`;

export const ReconstructionUrl = (userid, groupname, status) =>
  `/api/reconstruction/?user=${userid}&groupname=${groupname}&status=${status}`;

export const ReconstructionObjectUrl = (id) => `/api/reconstruction/${id}/`;

export const SectionListUrl = () => `/api/landingPage/`;

export const SectionObjectUrl = (section) => `/api/landingPage/${section}/`;

export const ResearcherListUrl = () => `/api/researcher/`;

export const ResearcherObjectUrl = (id) => `/api/researcher/${id}/`;

export const PublicationListUrl = () => `/api/publication/`;

export const PublicationObjectUrl = (id) => `/api/publication/${id}/`;

export const SuggestionListUrl = () => `/api/suggestions/`;

export const SuggestionObjectUrl = (id) => `/api/suggestions/${id}/`;
