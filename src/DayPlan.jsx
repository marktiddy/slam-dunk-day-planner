import moment from "moment";
import React, { useEffect } from "react";
import { stagecols } from "./bands";
import html2canvas from "html2canvas";
import { bands as defaultBands } from "./bands";

const DayPlan = ({ bands, setBands, setSite, site, setStep }) => {
  //Needs to order bands by time
  //Show clashes
  //Allow option to start again
  //Allow option to save as image
  const minutesOfDate = (time) => {
    const splitTime = time.split(":");
    const minutes = parseInt(splitTime[0] * 60) + parseInt(splitTime[1]);
    return minutes;
  };

  const sortedBands = bands.sort(
    (a, b) => minutesOfDate(a.start) - minutesOfDate(b.start)
  );

  useEffect(() => {
    localStorage.setItem("slamDunkBands", JSON.stringify(sortedBands));
    localStorage.setItem("slamDunkSite", site);
  }, [sortedBands, site]);

  const createDownload = () => {
    html2canvas(document.getElementById("dayplan")).then((canvas) => {
      const image = canvas
        .toDataURL()
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.href = image;
      a.download = "dayplan.png";
      a.click();
    });
  };

  const reset = () => {
    localStorage.removeItem("slamDunkBands");
    localStorage.removeItem("slamDunkSite");
    setBands(defaultBands);
    setSite();
    setStep(0);
  };

  const changeSelection = () => {
    //localStorage.removeItem("slamDunkBands");
    //localStorage.removeItem("slamDunkSite");
    setBands(defaultBands);
    setStep(1);
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-white font-extrabold my-2 text-center capitalize">
        Here's your day plan for Slam Dunk {site}
      </h2>
      <p className="text-xs text-center text-white">
        Your personalised plan has saved to your browser so it'll be here when
        you revisit. Don't forget to bookmark this site or add it to your
        homescreen
      </p>
      <p
        onClick={() => createDownload()}
        className="bg-red-800 text-white rounded m-auto py-1 px-2 text-xs inline-block font-extrabold text-center mt-2 cursor-pointer transition-all hover:opacity-75"
      >
        Save Day Plan
      </p>
      <p
        onClick={() => changeSelection()}
        className="bg-blue-600 text-white rounded m-auto py-1 px-2 text-xs inline-block font-extrabold text-center mt-2 cursor-pointer ml-2 transition-all hover:opacity-75"
      >
        Change Selection
      </p>
      <p
        onClick={() => reset()}
        className="bg-yellow-400 text-black rounded m-auto py-1 px-2 text-xs inline-block font-extrabold text-center mt-2 ml-2 cursor-pointer transition-all hover:opacity-75"
      >
        Start Over
      </p>
      <div
        id="dayplan"
        className="p-1 grid grid-cols-1 md:grid-cols-2 gap-1 mt-2"
      >
        {sortedBands.map((b, i) => {
          let bandName = b.name;
          if (bandName === "Special Guest Headliner") {
            bandName = "Boston Manor";
          } else if (bandName === "Days N Daze") {
            bandName = "Buster Shuffle";
          }
          return (
            <div
              className={`${
                stagecols.background[b.stage]
              } rounded w-full my-2 text-center shadow-xl`}
              key={i}
            >
              <p
                className={`${
                  stagecols.text[b.stage]
                } font-extrabold uppercase text-xl mb-1 px-2 pt-2`}
              >
                {bandName}
              </p>
              <p
                className={`${stagecols.text[b.stage]} text-lg font-light px-2`}
              >
                {b.stage}
              </p>
              <p
                className={`${
                  stagecols.text[b.stage]
                } font-extrabold uppercase text-sm mb-1 px-2 pb-2`}
              >
                Starts: {b.start} (
                {moment("08/04/2021 " + b.start, "MM/DD/YYYY HH:mm").format(
                  "h:mm a"
                )}
                ) <br />
                Ends: {b.end} (
                {moment("08/04/2021 " + b.end, "MM/DD/YYYY HH:mm").format(
                  "h:mm a"
                )}
                )
              </p>
              {i < bands.length - 1 &&
                minutesOfDate(b.end) > minutesOfDate(bands[i + 1].start) && (
                  <div className="w-full bg-yellow-400 text-black p-2 text-xs font-extrabold">
                    CLASH ALERT
                    <br />
                    The end of this set is after your next band starts
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DayPlan;
