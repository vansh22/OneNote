import React from "react";
import Notes from "./Notes";

function Home({showAlert}) {
  return (
    <div className="container">
      <Notes showAlert={showAlert}/>
    </div>
  );
}

export default Home;
