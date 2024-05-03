import React from "react";
import "./styles.css";

const JobDescriptionComponent = ({ jobDescription }) => {
  return (
    <div className="job-description-container">
      <div className="popup">
        <div className="popup-content">
          {jobDescription}
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionComponent;
