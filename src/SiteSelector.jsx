import React from "react";

const SiteSelector = ({ step, setStep, setSite }) => {
  const makeSelection = (site) => {
    setStep(step + 1);
    setSite(site);
  };
  return (
    <div className="w-full">
      <h2 className="text-red-600 font-extrabold my-4 text-center">
        Which Slam Dunk are you attending?
      </h2>
      <div
        className="bg-blue-600 rounded p-4 w-full my-4 mb-6 text-center shadow-xl cursor-pointer transition-all hover:opacity-75"
        onClick={() => makeSelection("north")}
      >
        <p className="text-white font-extrabold uppercase text-2xl mb-1">
          Slam Dunk North
        </p>
        <p className="text-white text-xl font-light">
          Saturday 4th September 2021
        </p>
      </div>
      <div
        className="bg-red-600 rounded p-4 w-full my-4 text-center shadow-xl mb-6 cursor-pointer transition-all hover:opacity-75"
        onClick={() => makeSelection("south")}
      >
        <p className="text-white font-extrabold uppercase text-2xl mb-1">
          Slam Dunk South
        </p>
        <p className="text-white text-xl font-light">
          Sunday 5th September 2021
        </p>
      </div>
    </div>
  );
};
export default SiteSelector;
