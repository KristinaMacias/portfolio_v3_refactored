import React from "react";
import "./App.css";
import Section from "./components/Section";
import hiFive from "./assets/hifive.svg";
import gameboy from "./assets/gameboy.svg";
import ruler from "./assets/ruler.svg";
import testimonials from "../src/data/testimonials.json";
import CodeChart from "./modules/stats/CodeChart";

function App() {
  return (
    <div className="app">
      {/* Code Statistics */}
      <Section>
        <div className="text">
          <h2>Code Challenge Statistics</h2>
          <CodeChart />
        </div>
        <div className="section-image">
          <img src={ruler} alt="Ruler Character" />
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="section-image">
          <img src={hiFive} alt="two coffee cup characters giving a hifive" />
        </div>
        <div className="text">
          <h2>...Say What?!</h2>
          {testimonials.content.map((testimonial) => (
            <blockquote key={testimonial.id}>
              <p>{testimonial.highlight}</p>
              <cite>{testimonial.name}</cite>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* About Me */}
      <Section>
        <div className="text">
          <h2>About Me</h2>
          <p>
            Hi, I'm Kristina. I'm a full stack developer with a degree in
            Geography from California State University, Long Beach. My career
            has spanned GIS, project management, and software development. I'm
            passionate about creating innovative and efficient solutions that
            bridge the gap between technology and user needs..
          </p>
        </div>
        <div className="section-image">
          <img src={gameboy} alt="a gameboy character saying hi" />
        </div>
      </Section>
    </div>
  );
}

export default App;
