import "./css/About.scss";
import Header from "./Header";

const About = () => {
  return (
    <>
      <Header showBackButton={true} />
      <div className="about">
        <div className="notes">
          <p>This is a development playground</p>
          <p>It is built using html, css, React and vanilla javascript</p>
          <p>If you are interested in the geeky stuff, check out the source code</p>
        </div>
        <div className="links">
          <p>
            <a href="https://github.com/erezbens/wordle-clone" target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </p>
          <p>
            <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">
              The Original Wordle
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
