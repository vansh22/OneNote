import React from "react";
import access_notes from "../images/access-notes.webp";
import customize_notes from "../images/customize-notes.png";
import design_ideas from "../images/design-ideas.webp";

function About() {
  return (
    <>
      <h2 className="about-title center mt-4">
        See why OneNote is the Editors' Choice.
      </h2>
      <div
        className="d-flex flex-wrap align-items-center justify-content-around my-4"
        style={{ height: "100%" }}
      >
        <div className="card mb-4" style={{ width: "18rem", height: "35rem" }}>
          <img
            src={access_notes}
            className="card-img-top"
            alt="..."
            style={{ width: "18rem", height: "100%" }}
          />
          <div className="card-body">
            <h5 className="card-title mt-4 mb-2">Access notes quickly</h5>
            <p className="card-text">
              • OneNote offers <b>unparalleled convenience</b> , allowing you to
              access their notes from any device, anywhere, thanks to its
              cloud-based architecture. <br /> <br /> <br /> • It is built using
              the latest technologies and libraries, such as express validator
              and jwt tokens, ensuring its <b> reliability and security </b>.
            </p>
          </div>
          <div className="hover-arrow">
            <svg width="18" height="10" fill="none">
              <path
                d="M15.358 4.019L12.313.973l.975-.975L18 4.71l-4.712 4.712-.975-.975 3.05-3.05H0V4.02h15.358z"
                fill="#141515"
              ></path>
            </svg>
          </div>
        </div>
        <div className="card mb-4" style={{ width: "18rem", height: "35rem" }}>
          <img
            src={design_ideas}
            className="card-img-top"
            alt="..."
            style={{
              width: "16rem",
              height: "33%",
              display: "block",
              margin: "auto",
            }}
          />
          <div className="card-body">
            <h5 className="card-title mb-2">Capture your ideas</h5>
            <p className="card-text">
              • Whether you're brainstorming a new project or jotting down notes
              from a meeting, OneNote provides a{" "}
              <b>streamlined and intuitive interface</b> for capturing and
              organizing your ideas. <br /> <br /> • Plus, with its{" "}
              <b>cloud-based architecture</b> , you can access your notes from
              any device, anywhere, ensuring that your{" "}
              <b>ideas are always within reach</b> .
            </p>
          </div>
        </div>
        <div className="card mb-4" style={{ width: "18rem", height: "35rem" }}>
          <img
            src={customize_notes}
            className="card-img-top"
            alt="..."
            style={{
              width: "16rem",
              height: "33%",
              display: "block",
              margin: "auto",
            }}
          />
          <div className="card-body">
            <h5 className="card-title mb-2">Customize your notes</h5>
            <p className="card-text">
              • OneNote is a feature-rich note-taking application that supports
              user <b> collaboration and sharing. </b> <br /> <br /> <br />{" "}
              <br /> • It provides you with a{" "}
              <b> digital notebook-like experience </b>, allowing you to add,
              search, edit, and delete notes with ease.
            </p>
          </div>
        </div>
      </div>
      <h2 className="about-title center my-4">
        Ready to revolutionize the way you take notes? Join OneNote today and
        experience the power of a secure, intuitive, and collaborative
        note-taking application.
      </h2>
    </>
  );
}

export default About;
