import React, { useEffect } from "react";
import { init } from "ityped";
import "./AnimationText.scss";

const AnimationText = ({ strings, id, options }) => {
  useEffect(() => {
    const myElement = document.querySelector(`#${id}`);
    init(myElement, {
      showCursor: true,
      strings: [...strings],
      typeSpeed: 120,
      backSpeed: 80,
      ...(options || {}),
    });
  }, [strings]);

  return <div id={id} className="animationText"></div>;
};

export default AnimationText;
