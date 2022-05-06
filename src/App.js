import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import SiteSelector from "./SiteSelector";
import BandSelector from "./BandSelector";
import DayPlan from "./DayPlan";
import Footer from "./Footer";
import { bands as bandJson } from "./bands";

const App = () => {
  const [step, setStep] = useState(0);
  const [site, setSite] = useState();
  const [bands, setBands] = useState(bandJson);
  const [isLoading, setIsLoading] = useState(true);
  const [chosenBands, setChosenBands] = useState([]);

  useEffect(() => {
    const localStoredBands = localStorage.getItem("slamDunkBands");
    const localSite = localStorage.getItem("slamDunkSite");
    if (localStoredBands) {
      if (localSite) {
        setSite(localSite);
      }
      setBands(JSON.parse(localStoredBands));
      setChosenBands(JSON.parse(localStoredBands));
      setStep(2);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-extrabold text-red-500 text-2xl">
        Loading
      </div>
    );
  }

  return (
    <div className="bg-blue-900">
      {window.innerWidth > 640 && (
        <div className="absolute bg-yellow-400 text-black text-center p-4 right-0 left-0 top-0 font-extrabold uppercase">
          This site is best viewed on mobile
        </div>
      )}
      <div className="min-h-screen flex justify-start items-center p-4 flex-col">
        <img src={logo} alt="Logo" className="h-36 mx-auto mt-16" />
        <div className="rounded bg-white border-2 p-4 my-4">
          <h1 className="text-blue-800 text-xl font-extrabold tracking-wider text-center">
            Slam Dunk 2021 Day Planner
          </h1>
          <p className="mt-2 text-blue-800 text-sm text-center">
            This unofficial WebApp will let you choose the bands you want to see
            and show you a customised day plan for Slam Dunk including any
            clashes.
          </p>
        </div>
        {step === 0 && (
          <SiteSelector step={step} setStep={setStep} setSite={setSite} />
        )}
        {step === 1 && (
          <BandSelector
            step={step}
            setStep={setStep}
            site={site}
            bands={bands}
            setBands={setBands}
            chosenBands={chosenBands}
            setChosenBands={setChosenBands}
          />
        )}
        {step === 2 && (
          <DayPlan
            bands={bands}
            site={site}
            setStep={setStep}
            setBands={setBands}
            setSite={setSite}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;

//Update whole thing with local storage
