import React, { useEffect } from "react";
import { init } from "ityped";
import "./AnimationText.scss";

const AnimationText = ({ strings, options }) => {
  useEffect(() => {
    const myElement = document.querySelector("#animationText");
    init(myElement, {
      showCursor: true,
      strings: strings,
      typeSpeed: 120,
      backSpeed: 80,
      ...(options || {}),
    });
  }, []);

  return <div id="animationText"></div>;
};

export default AnimationText;
