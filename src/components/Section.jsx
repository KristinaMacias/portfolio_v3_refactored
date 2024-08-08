import React from "react";

const Section = ({ reverse, children }) => {
  return (
    // set class name to reverse if reverse is true else set it no-reverse

    <section className="section">
      {children}
    </section>
  );
};

export default Section;
