import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { LOGO } from "./teamwrkrLogo.png";
import {
  Button,
  Card,
  CardBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import FeedBackActions from "../../services/feedback";
import { getToast } from "../../services/utils";
import ActiveComponent from "./Component";
import { LOGO } from "./asset";

const FeedBack = () => {
  const [loader, setLoader] = useState(false);
  const [star, setStar] = useState([null, null, null]);
  const [countIndex, setCountIndex] = useState(0);
  const [name, setName] = useState("");
  const [cardShow, setCardShow] = useState("");
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [surveyDate, setSurveyDate] = useState("");
  const [description, setDescription] = useState("");
  const [starError, setStarError] = useState(false);
  const [exception, setException] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoader(true);
    fetchFeedbackSkills();
  }, []);

  const fetchFeedbackSkills = async () => {
    try {
      const response = await FeedBackActions.getFeedbackSkills({
        query: 2,
        sid: searchParams.get("sid"),
      });

      if (Object.keys(response)?.length) {
        setSurveyDate(response?.serveyStartDate);
        setHardSkills(
          response?.hardSkill?.map((skill) => ({ label: skill, value: 0 }))
        );
        setSoftSkills(
          response?.softSkill?.map((skill) => ({ label: skill, value: 0 }))
        );
        setName(response?.userFistName + " " + response?.userLastName);
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
      setCardShow("failed");
    }
  };

  const feedBackContent = [
    {
      title: `Tell us about your experience working with ${name} as Test Case that started on or about `,
      ratingArr: [
        {
          ratingTitle: "Overall Experience:",
          ratingStars: [1, 2, 3, 4, 5],
        },
        {
          ratingTitle: "Quality of Work:",
          ratingStars: [1, 2, 3, 4, 5],
        },
        {
          ratingTitle: "Value:",
          ratingStars: [1, 2, 3, 4, 5],
        },
      ],
    },
    {
      title: `I'd describe ${name} as having strong measurable skills in these areas. Select all that apply.`,
    },
    {
      title: `I'd say ${name} has strong social skills in these areas. Select all that apply.`,
    },
    {
      title: `Would you consider writing a testimonial about the experience and results you've had with ${
        name?.split(" ")[0]
      }'s services?`,
      description1:
        "Client testimonials play a crucial role in establishing credibility and instilling confidence in potential new clients. The testimonial need not be long - a few sentences are fine, and could include details such as:",
      description2: [
        `1. The nature of the project(s) you have worked on with ${name}.`,
        "2. Any specific results or outcomes you've observed as a result of their work.",
        `3. The aspects of ${
          name?.split(" ")[0]
        }'s services that you appreciated the most, such as quality, responsiveness, professionalism, or understanding of your business needs.`,
      ],
      description3: `Please note, ${name} may use your testimonial on their website and in other promotional materials and by submitting it here you agree to that usage.`,
    },
  ];

  const handleSkills = (e, index, skills, setSkills) => {
    const updatedSkills = [...skills];
    if (e.target.checked) {
      updatedSkills[index] = {
        ...updatedSkills[index],
        value: 1,
      };
      setSkills(updatedSkills);
    } else {
      updatedSkills[index] = {
        ...updatedSkills[index],
        value: 0,
      };
      setSkills(updatedSkills);
    }
  };

  const selectAllOption = (skills, setSkills) =>
    setSkills(skills?.map((skill) => ({ ...skill, value: 1 })));

  const handleSubmitFeedback = async () => {
    try {
      const query = `sid=${searchParams.get("sid")}&tw=202&overallscore=${
        star[0]?.value
      }&qualityScore=${star[1]?.value}&valueScore=${
        star[2]?.value
      }&skillh1name=${hardSkills[0]?.label}&skillh1score=${
        hardSkills[0]?.value
      }&skillh2name=${hardSkills[1]?.label}&skillh2score=${
        hardSkills[1]?.value
      }&skillh3name=${hardSkills[2]?.label}&skillh3score=${
        hardSkills[2]?.value
      }&skills1name=${softSkills[0]?.label}&skills1score=${
        softSkills[0]?.value
      }&skills2name=${softSkills[1]?.label}&skills2score=${
        softSkills[1]?.value
      }&skills3name=${softSkills[2]?.label}&skills3score=${
        softSkills[2]?.value
      }&surveycomments=${description}`;
      const response = await FeedBackActions.submitFeedback(query);

      if (response?.status != 500) setCardShow(response);
      else {
        console.log(response);
        setException(response?.data);
        getToast("error", "Something Went Wrong!", "top-right");
      }
    } catch (e) {
      console.log(e);
      getToast("error", "Something Went Wrong!", "top-right");
    }
  };

  return loader ? (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <Spinner className="h-16 w-16 text-[#BB86FC]" />
    </div>
  ) : (
    <div>
      <div className="header-logo">
        <img
          src={LOGO}
          alt="logo"
          width={400}
          style={{ margin: "35px auto" }}
        />
      </div>
      {cardShow != "" ? (
        <div className="flex justify-center">
          <Card className="mt-6 w-1/2 h-60  justify-center items-center">
            <CardBody>
              {cardShow == "failed" ? (
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  This survey is expired or has already been submitted. Thank
                  you.
                </Typography>
              ) : (
                <Typography>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Thank you, Your feedback has been submitted.
                  </Typography>
                  If you would like to join the Teamwrkr community click here.
                  <a
                    href="https://www.teamwrkr.com/join"
                    target="_blank"
                    className="text-[#3b82f6]"
                  >
                    (www.teamwrkr.com/join)
                  </a>
                </Typography>
              )}
            </CardBody>
          </Card>
        </div>
      ) : (
        <>
          <ActiveComponent
            countIndex={countIndex}
            feedBackContent={feedBackContent}
            surveyDate={surveyDate}
            star={star}
            setStar={setStar}
            hardSkills={hardSkills}
            setHardSkills={setHardSkills}
            handleSkills={handleSkills}
            softSkills={softSkills}
            setSoftSkills={setSoftSkills}
            description={description}
            setDescription={setDescription}
          />

          <div className="text-center my-8">
            {countIndex > 0 && (
              <Button
                onClick={() => {
                  setCountIndex(countIndex - 1);
                  setStarError(false);
                }}
                className="mr-2 text-[#6f00ff] bg-transparent hover:bg-[#c8b1dee5] bg-[#c8b1de]"
              >
                <span>Previous</span>
              </Button>
            )}
            {countIndex < 3 ? (
              <>
                <Button
                  className="!bg-[#6f00ff] hover:!bg-[#7F39FB] mr-2"
                  onClick={() => {
                    if (
                      countIndex == 0 &&
                      star.some((value) => value === null)
                    ) {
                      setStarError(true);
                      return;
                    }
                    setStarError(false);
                    setCountIndex(countIndex + 1);
                  }}
                >
                  <span>Next</span>
                </Button>
                {countIndex > 0 && (
                  <Button
                    className="!bg-[#6f00ff] hover:!bg-[#7F39FB]"
                    onClick={() => {
                      if (countIndex == 1)
                        selectAllOption(hardSkills, setHardSkills);
                      else selectAllOption(softSkills, setSoftSkills);
                    }}
                  >
                    <span>Select All</span>
                  </Button>
                )}
              </>
            ) : (
              <Button
                className="!bg-[#6f00ff] hover:!bg-[#7F39FB]"
                onClick={handleSubmitFeedback}
              >
                <span>Submit</span>
              </Button>
            )}
          </div>
          <div className="text-center">
            {feedBackContent.map((val, index) => {
              return (
                <span
                  className="w-4 h-4 m-1.5 rounded-full inline-block"
                  style={{
                    backgroundColor:
                      countIndex === index ? "#6f00ff" : "#c8b1de",
                  }}
                ></span>
              );
            })}
          </div>
          {starError && (
            <div className="m-4 text-[#FF0000]">
              Please complete your choices before continuing. Thank you.
            </div>
          )}
        </>
      )}
      {exception && (
        <div
          dangerouslySetInnerHTML={{ __html: exception }}
          className="text-white"
        />
      )}
    </div>
  );
};

export default FeedBack;
