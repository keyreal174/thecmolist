import React, { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import NextIcon from "../../login/icons/arrow-circle-right.svg";
import PrevIcon from "../../login/icons/arrow-circle-left.svg";
import InviteButton from "../base/InviteButton/InviteButton";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const func_chunks = (arr, chunk_num) => {
  const features = arr.reduce((all, one, i) => {
    const ch = Math.floor(i / chunk_num);
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);

  return features || [];
};

const Slider = ({ featuredStacks }) => {
  const [features, setFeatures] = useState([]);
  const [breakpoint, setBreakpoint] = useState(0);
  const NextButton = <img src={NextIcon} className="" />;
  const PrevButton = <img src={PrevIcon} className="" />;

  const size = useWindowSize();

  useEffect(() => {
    if (size.width >= 1400 && breakpoint !== 1) {
      const temp = func_chunks(featuredStacks, 3);
      setFeatures(temp);
      setBreakpoint(1);
    } else if (size.width < 1400 && size.width >= 1200 && breakpoint !== 2) {
      const temp = func_chunks(featuredStacks, 2);
      setFeatures(temp);
      setBreakpoint(2);
    } else if (size.width < 1200 && size.width >= 768 && breakpoint !== 3) {
      const temp = func_chunks(featuredStacks, 1);
      setFeatures(temp);
      setBreakpoint(3);
    }
  }, [size.width]);

  return (
    <Carousel
      nextIcon={NextButton}
      prevIcon={PrevButton}
      className="w-100"
      interval={null}
      indicators={false}
    >
      {features.map((stack, i) => (
        <Carousel.Item key={i}>
          <div className="d-flex">
            {stack.map((feature, index) => (
              <Feature
                key={i + "-" + index}
                image={feature.image}
                name={feature.name}
                role={feature.role}
                link={feature.link}
              />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const Feature = ({ image, name, role, link }) => {
  const goViewStack = () => {
    window.location.href = link;
  };

  return (
    <div className=" featured-stacks-item px-1">
      <CustomCard className="mb-2">
        <div className="user-img">
          <img className="element-center" src={image} alt="avatar" />
        </div>
        <div className="user-name text-center">
          <span>{name}</span>
        </div>
        <div className="user-role text-center">
          <span>{role}</span>
        </div>
        <div className="text-center mb-2">
          <Button
            className="btn btn-success view-stack-btn"
            onClick={goViewStack}
          >
            View Stack
          </Button>
        </div>
      </CustomCard>
    </div>
  );
};

const FeaturedStacks = ({ featuredStacks }) => {
  return featuredStacks && featuredStacks.length > 0 ? (
    <CustomCard heading="Featured marketing stacks">
      <div className="d-flex featured-stacks">
        <Slider featuredStacks={featuredStacks} />
      </div>
      <div className="d-flex cta-message">
        <p className="text-center mr-3">
          Invite two other trusted marketing leaders to be able to view{" "}
          <b>
            <span>all vendors</span> shared by your peers
          </b>
        </p>
        <InviteButton />
      </div>
    </CustomCard>
  ) : (
    <div />
  );
};

export default FeaturedStacks;
