import "./css/About.scss";

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <div className="notes">
        <span>This is a remake of Wordle using html, css and javascript</span>
        <span></span>
        <span></span>
      </div>
      <div className="links">
        <a href="https://www.nytimes.com/games/wordle/index.html">The original Wordle</a>
      </div>
    </div>
  );
};

export default About;
