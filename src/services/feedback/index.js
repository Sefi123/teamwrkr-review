import { baseURL } from "../../config";
import { CallPublicApi } from "../utils";

const getFeedbackSkills = async (payload) => {
  try {
    const apiOptions = {
      endpoint: `${baseURL}/SurveyServlet?query=${payload?.query}&sid=${payload?.sid}`,
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      method: "POST",
      data: {},
    };
    const apiResponse = await CallPublicApi(apiOptions);
    return apiResponse.data;
  } catch (error) {
    return error;
  }
};

const submitFeedback = async (query) => {
  try {
    const apiOptions = {
      endpoint: `${baseURL}/SurveyServlet?query=${1}&${query}`,
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      method: "POST",
      data: {},
    };
    const apiResponse = await CallPublicApi(apiOptions);
    return apiResponse?.data || apiResponse?.response;
  } catch (error) {
    return error;
  }
};

const FeedBackActions = {
  getFeedbackSkills,
  submitFeedback,
};

export default FeedBackActions;
