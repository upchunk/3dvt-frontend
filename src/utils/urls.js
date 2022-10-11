/* eslint-disable no-undef */
export const baseURL = () => `http://localhost:8000`;

export const userInfoUrl = (id) => `/api/users/${id}/`;

export const groupInfoUrl = (id) => `/api/group/${id}/`;

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

export const ReconstructionUrl = () => `/api/reconstruction/`;

export const ReconstructionObjectUrl = (id) => `/api/reconstruction/${id}/`;

export const SectionObjectUrl = (section) => `/api/landingPage/${section}/`;

export const SectionListUrl = () => `/api/landingPage/`;
