import React from "react";
import FeaturesBox from "./FeaturesBox";
import fimage1 from "../images/1.svg";
import fimage2 from "../images/2.svg";
import fimage3 from "../images/3.svg";
import fimage4 from "../images/4.svg";
function Feature() {
  return (
    <div id="features">
      <h1>FEATURES</h1>
      <div className="a-container">
        <FeaturesBox
          image={fimage1}
          title="Weight Lifting"
          description="With this special programm we can make you lift more weigh"
        />
        <FeaturesBox
          image={fimage2}
          title="Specific Muscle"
          description="With this programm you can focus in specific muscle"
        />
        <FeaturesBox
          image={fimage3}
          title="Flex Your Muscle"
          description="This programm will make your muscles more flexible"
        />
        <FeaturesBox
          image={fimage4}
          title="Cardio Exercise"
          description="This special programm will surely improve your cardio resistance"
        />
      </div>
    </div>
  );
}

export default Feature;
