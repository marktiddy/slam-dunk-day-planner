import React, { useState, useEffect } from "react";
import logo from "./assets/logo.gif";
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

  useEffect(() => {
    const localStoredBands = localStorage.getItem("slamDunkBands");
    const localSite = localStorage.getItem("slamDunkSite");
    if (localStoredBands) {
      if (localSite) {
        setSite(localSite);
      }
      setBands(JSON.parse(localStoredBands));
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
    <>
      {window.innerWidth > 640 && (
        <div className="absolute bg-yellow-400 text-black text-center p-4 right-0 left-0 top-0 font-extrabold uppercase">
          This site is best viewed on mobile
        </div>
      )}
      <div className="min-h-screen flex justify-start items-center bg-white p-4 flex-col">
        <img src={logo} alt="Logo" className="w-4/5" />
        <div className="rounded bg-red-600 p-4 my-4">
          <h1 className="text-white text-xl font-extrabold tracking-wider text-center">
            Slam Dunk 2021 Day Planner
          </h1>
          <p className="mt-2 text-white text-center text-sm text-center">
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
    </>
  );
};

export default App;

//Update whole thing with local storage
