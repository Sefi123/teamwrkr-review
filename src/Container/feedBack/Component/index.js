import React from "react";

const ActiveComponent = (props) => {
  let {
    countIndex,
    feedBackContent,
    surveyDate,
    star,
    setStar,
    hardSkills,
    setHardSkills,
    handleSkills,
    softSkills,
    setSoftSkills,
    description,
    setDescription,
  } = props;

  const handleComponent = () => {
    switch (countIndex) {
      case 0:
        return (
          <div className="step1">
            <p className="text-center text-white">
              {feedBackContent[countIndex].title + surveyDate}.
            </p>
            {feedBackContent[countIndex]?.ratingArr.map((val, index) => {
              return (
                <div className="rating-stars mt-5" key={index}>
                  <ul className="max-w-2xl m-auto">
                    <li className="flex mb-5">
                      <div className="rating-text text-white flex-1">
                        {val.ratingTitle}
                      </div>
                      <div className="rating-content flex gap-2.5 justify-end text-white flex-1 text-end text-2xl">
                        {val?.ratingStars.map((ratValue, starIndex) => {
                          return (
                            <span
                              onClick={(e) => {
                                let Arr = star;
                                Arr[index] = {
                                  label: val.ratingTitle,
                                  value: ratValue,
                                };
                                setStar([...Arr]);
                              }}
                              key={starIndex}
                            >
                              <svg
                                className={
                                  starIndex < star[index]?.value
                                    ? "w-4 h-4 text-yellow-300"
                                    : "w-4 h-4 text-gray-300 "
                                }
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            </span>
                          );
                        })}
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        );
      case 1:
        return (
          <div className="step1">
            <p className="text-center text-white">
              {feedBackContent[countIndex].title}
            </p>
            {hardSkills?.length != 0 &&
              hardSkills?.map((val, index) => {
                return (
                  <div className="rating-stars mt-5" key={index}>
                    <ul className="max-w-2xl m-auto">
                      <li className="flex mb-5">
                        <div className="rating-text text-white flex-1">
                          {val?.label}
                        </div>
                        {/* Checkboxes of measureable skills */}
                        <div className="rating-text text-end text-white flex-1">
                          <input
                            onClick={(e) => {
                              handleSkills(e, index, hardSkills, setHardSkills);
                            }}
                            id="default-checkbox"
                            type="checkbox"
                            checked={val?.value}
                            value=""
                            class="w-6 h-6 text-[#6f00ff]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#6f00ff]-500 dark:focus:ring-[#6f00ff]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
        );
      case 2:
        return (
          <div className="step1">
            <p className="text-center text-white">
              {feedBackContent[countIndex].title}
            </p>
            {softSkills?.length != 0 &&
              softSkills?.map((val, index) => {
                return (
                  <div className="rating-stars mt-5" key={index}>
                    <ul className="max-w-2xl m-auto">
                      <li className="flex mb-5">
                        <div className="rating-text text-white flex-1">
                          {val.label}
                        </div>
                        {countIndex > 0 && (
                          <div className="rating-text text-end text-white flex-1">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                              onClick={(e) => {
                                handleSkills(
                                  e,
                                  index,
                                  softSkills,
                                  setSoftSkills
                                );
                              }}
                              checked={val?.value}
                              class="w-6 h-6 text-[#6f00ff]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#6f00ff]-500 dark:focus:ring-[#6f00ff]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </div>
                        )}
                        {countIndex < 1 && (
                          <div className="rating-content flex gap-2.5 justify-end text-white flex-1 text-end text-2xl">
                            {val.ratingStars.map((ratValue, starIndex) => {
                              return (
                                <span
                                  onClick={(e) => {
                                    let Arr = star;
                                    Arr[index] = {
                                      label: val.ratingTitle,
                                      value: ratValue,
                                    };
                                    setStar([...Arr]);
                                  }}
                                  key={starIndex}
                                >
                                  <svg
                                    className={
                                      starIndex < star[index]?.value
                                        ? "w-4 h-4 text-yellow-300"
                                        : "w-4 h-4 text-gray-300 "
                                    }
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                  >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                  </svg>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
        );
      case 3:
        return (
          <div className="step1">
            <p className="text-center text-white">
              {feedBackContent[countIndex].title}
            </p>
            <div className="my-8">
              <ul className="max-w-3xl m-auto text-white">
                <li className="text-center mb-5">
                  <p>{feedBackContent[countIndex].description1}</p>
                </li>
                <li className=" mb-5">
                  {feedBackContent[countIndex].description2.map((text) => {
                    return <p className="max-w-xl m-auto">{text}</p>;
                  })}
                </li>
                <li className="text-center mb-5">
                  <p>{feedBackContent[countIndex].description3}</p>
                </li>
                <li>
                  <textarea
                    id="message"
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add testimonial here (1,024 char. max.)"
                    maxLength={1024}
                  ></textarea>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return;
    }
  };
  return handleComponent();
};

export default ActiveComponent;
