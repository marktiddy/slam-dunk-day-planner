import React, { useState } from "react";
import { bgcols } from "./bands";

const BandSelector = ({ site, bands, step, setStep, setBands }) => {
  const [chosenBands, setChosenBands] = useState([]);
  const [error, setError] = useState(false);
  let siteBands;

  if (site === "north") {
    siteBands = bands[0].north;
  } else {
    siteBands = bands[1].south;
  }

  const chooseBand = (band) => {
    if (chosenBands) {
      //Check if band is already there
      if (chosenBands.filter((e) => e.name == band.name).length > 0) {
        //Need to remove
        const newBandSelection = chosenBands.filter((e) => {
          return e.name !== band.name && e;
        });
        if (newBandSelection.length > 0) {
          setChosenBands(newBandSelection);
        } else {
          setChosenBands([]);
        }
      } else {
        //Add band
        setChosenBands([...chosenBands, band]);
      }
    } else {
      setChosenBands([band]);
    }
  };
  const finishSelection = () => {
    if (chosenBands.length < 1) {
      setError(true);
    } else {
      setError(false);
      setBands(chosenBands);
      setStep(step + 1);
    }
  };

  return (
    <>
      <div className="w-full">
        <h2 className="text-red-600 font-extrabold my-4 text-center capitalize">
          Choose which bands you want to see at Slam Dunk {site}
        </h2>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
        {siteBands.map((band, index) => {
          return (
            <div
              className={`${
                chosenBands.filter((e) => e.name == band.name).length > 0
                  ? bgcols[index]
                  : "bg-gray-600"
              } rounded p-4 w-full my-2 text-center shadow-xl flex justify-center items-center flex-col cursor-pointer transition-all hover:opacity-75`}
              key={index}
              onClick={() => chooseBand(band)}
            >
              <p className="text-white font-extrabold uppercase text-xl mb-1 break-words">
                {band.name}
              </p>
              <p className="text-white text-lg font-light">{band.stage}</p>
            </div>
          );
        })}
      </div>
      {error && (
        <div className="w-full">
          <p className="rounded border-4 border-red-600 shadow-xl my-4 p-4 font-extrabold text-red-600 text-center uppercase">
            Looks like you haven't chosen any bands! Pick some bands...there's
            an awesome line-up
          </p>
        </div>
      )}
      <div className="w-full">
        <p
          className="rounded bg-red-600 shadow-xl my-4 p-4 font-extrabold text-white text-center uppercase cursor-pointer transition-all hover:opacity-75"
          onClick={() => finishSelection()}
        >
          Finished? <br />
          Click here to create your custom plan
        </p>
      </div>
    </>
  );
};
export default BandSelector;
