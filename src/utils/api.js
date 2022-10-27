import axios from "axios";
import { toHeaderCase } from "js-convert-case";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../redux/runnerConfig";
import { store } from "../redux/store";
import { setAuth, setLoading } from "../redux/userConfig";
import * as url from "./urls";

let controller;

export const ErrorViewer = (error) => {
  const errorList = [];
  if (error.response) {
    errorList.push(
      `Error :  ${error.response.status}  (${error.response.statusText})`
    );
    Object.keys(error.response.data).map((each) =>
      errorList.push(toHeaderCase(each) + ": " + error.response.data[each])
    );
    400 <= error.response.status < 500
      ? store.dispatch(setErrSeverity("warning"))
      : store.dispatch(setErrSeverity("error"));
    var message = errorList.join("\n");
    if (error.response.status === 401) {
      store.dispatch(setLoading(true));
      store.dispatch(setAuth(false));
      store.dispatch(setErrMessage(error.response.data.message));
      store.dispatch(setErrCatch(true));
    } else {
      store.dispatch(setErrMessage(message));
      store.dispatch(setErrCatch(true));
    }
  }
};

export async function deleteAuthHeader() {
  delete axios.defaults.headers["Authorization"];
  delete axios.defaults.headers.common["Authorization"];
}
export async function setDefaultToken(accessToken) {
  return (axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`);
}

export async function getUserInfo(id) {
  return await axios.get(url.userInfoUrl(id)).catch((error) => {
    ErrorViewer(error);
  });
}

export async function getGroupInfo(id) {
  if (controller != undefined) {
    controller.abort();
  }
  controller = new AbortController();
  return await axios
    .get(url.groupInfoUrl(id), {
      signal: controller.signal,
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function jwtauthenticate(data) {
  return await axios
    .post(url.JWTAuthenticateUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postSegmentasi(formData) {
  return await axios
    .post(url.SegmentationUrl(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      store.dispatch(setErrSeverity("success"));
      store.dispatch(setErrMessage(res.data.message));
      store.dispatch(setErrCatch(true));
      return res.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function listSegmentasi(userid = "", groupname = "", status = "") {
  return await axios
    .get(url.SegmentationUrl(userid, groupname, status))
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getSegmentasi(id) {
  if (controller != undefined) {
    controller.abort();
  }
  controller = new AbortController();
  return await axios
    .get(url.SegmentationObjectUrl(id), {
      signal: controller.signal,
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postRekonstruksi(formData) {
  return await axios
    .post(url.ReconstructionUrl(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      store.dispatch(setErrSeverity("success"));
      store.dispatch(setErrMessage(res.data.message));
      store.dispatch(setErrCatch(true));
      return res.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function listRekonstruksi(
  userid = "",
  groupname = "",
  status = ""
) {
  return await axios
    .get(url.ReconstructionUrl(userid, groupname, status))
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getRekonstruksi(id) {
  if (controller != undefined) {
    controller.abort();
  }
  controller = new AbortController();
  return await axios
    .get(url.ReconstructionObjectUrl(id), {
      signal: controller.signal,
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function userRegister(data) {
  return await axios
    .post(url.RegisterUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function newRefreshToken(refresh) {
  const data = {
    refresh: refresh,
  };
  return await axios
    .post(url.RefreshTokenUrl(), data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function GenerateApiKey(data) {
  return await axios
    .post(url.ApiKeyUrl(), data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function LogOut(refresh) {
  const data = {
    refresh_token: refresh,
  };
  return await axios
    .post(url.LogOutUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function UserUpdate(id, data) {
  return await axios
    .patch(url.UserUpdateUrl(id), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function ChangePassword(id, data) {
  return await axios
    .patch(url.ChangePasswordUrl(id), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getSectionList() {
  return await axios
    .get(url.SectionListUrl())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getSectionData(section) {
  return await axios
    .get(url.SectionObjectUrl(section))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function updateSectionData(section, data) {
  return await axios
    .patch(url.SectionObjectUrl(section), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getResearcherList() {
  return await axios
    .get(url.ResearcherListUrl())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getResearcherData(section) {
  return await axios
    .get(url.ResearcherObjectUrl(section))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postResearcherData(data) {
  return await axios
    .post(url.ResearcherListUrl(), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function updateResearcherData(id, data) {
  return await axios
    .patch(url.ResearcherObjectUrl(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function deleteResearcherData(id) {
  return await axios
    .delete(url.ResearcherObjectUrl(id))
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getPublicationList() {
  return await axios
    .get(url.PublicationListUrl())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postPublicationData(data) {
  return await axios
    .post(url.PublicationListUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getPublicationData(section) {
  return await axios
    .get(url.PublicationObjectUrl(section))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function updatePublicationData(id, data) {
  return await axios
    .patch(url.PublicationObjectUrl(id), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function deletePublicationData(id) {
  return await axios
    .delete(url.PublicationObjectUrl(id))
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getSuggestionList() {
  return await axios
    .get(url.SuggestionListUrl())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postSuggestionData(data) {
  return await axios
    .post(url.SuggestionListUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getSuggestionData(section) {
  return await axios
    .get(url.SuggestionObjectUrl(section))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function updateSuggestionData(id, data) {
  return await axios
    .patch(url.SuggestionObjectUrl(id), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function deleteSuggestionData(id) {
  return await axios
    .delete(url.SuggestionObjectUrl(id))
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}
