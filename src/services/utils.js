import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

async function CallApi(apiOptions) {
  let apiResponse = {};
  const userObj = getUser();
  if (!moment().isAfter(userObj?.expiration)) {
    const config = {
      method: apiOptions?.method,
      url: apiOptions?.endpoint,
      headers: apiOptions?.headers,
      data: apiOptions?.data,
      params: apiOptions?.params,
      responseType: apiOptions?.responseType,
    };

    await axios(config)
      .then((result) => {
        apiResponse = result;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          LogOut();
        }
        apiResponse = error;
      });
  } else {
    getToast("error", "Your Session has been expired!", "top-right");
    setTimeout(() => {
      LogOut();
    }, 3000);
  }

  return apiResponse;
}

async function CallPublicApi(apiOptions) {
  let apiResponse = {};

  const config = {
    method: apiOptions?.method,
    url: apiOptions?.endpoint,
    headers: apiOptions?.headers,
    data: apiOptions?.data,
    params: apiOptions?.params,
    responseType: apiOptions?.responseType,
  };

  await axios(config)
    .then((result) => {
      apiResponse = result;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        LogOut();
      }
      apiResponse = error;
    });

  return apiResponse;
}

const getToast = (type, text, position) =>
  type !== ""
    ? toast[type](text, {
        position,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    : toast(text, {
        position,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

const LogOut = () => {
  try {
    setUser();
    setProfiles([]);
    const location = window.location;
    window.location.href = location.origin + "/tw4";
  } catch (error) {
    // console.log("Logout -> error", error);
  }
};

const setProfiles = (userData) => {
  try {
    localStorage.setItem("Profiles", JSON.stringify(userData));
  } catch (error) {
    // console.log("Profiles -> error", error);
  }
};

const getProfiles = () => {
  let loggedIn_User = null;
  try {
    loggedIn_User =
      localStorage.getItem("Profiles") != null
        ? JSON.parse(localStorage.getItem("Profiles"))
        : null;
  } catch (error) {
    // console.log("Profiles -> error", error);
    loggedIn_User = null;
  }
  return loggedIn_User;
};

const setUser = (userData) => {
  try {
    localStorage.setItem("User", JSON.stringify(userData));
    // loggedIn_User =
    //   localStorage.getItem("User") != null
    //     ? JSON.parse(localStorage.getItem("User"))
    //     : null;
  } catch (error) {
    // console.log("User -> error", error);
  }
};

const getUser = () => {
  let loggedIn_User = null;
  try {
    loggedIn_User =
      localStorage.getItem("User") != null
        ? JSON.parse(localStorage.getItem("User"))
        : null;
  } catch (error) {
    // console.log("User -> error", error);
    loggedIn_User = null;
  }
  return loggedIn_User;
};

export const checkAuthentication = (user, navigate) =>
  !user?.success && navigate("/tw4/auth");

// const logoutUser = () => {
//   setUser();
//   const location = window.location;
//   window.location.href = location.origin;
// };

export {
  CallApi,
  CallPublicApi,
  getToast,
  LogOut,
  setUser,
  getUser,
  setProfiles,
  getProfiles,
};
