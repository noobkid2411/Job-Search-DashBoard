// JobDescriptionComponent.jsx

import React from "react";
import "../css/popUpStyle.css";
import IconButton from "@mui/material/IconButton"; // Import IconButton and CloseIcon
import CloseIcon from "@mui/icons-material/Close";

const JobDescriptionComponent = ({ jobDescription, onClose }) => {
  return (
    <div className="job-description-container">
      <div className="popup">
        <IconButton className="close-btn" onClick={onClose}>
          <CloseIcon /> {/* Use CloseIcon for "X" icon */}
        </IconButton>
        <h3 className="popup-title">About the Job:</h3>

        <div className="popup-content">{jobDescription}</div>
      </div>
    </div>
  );
};

export default JobDescriptionComponent;
