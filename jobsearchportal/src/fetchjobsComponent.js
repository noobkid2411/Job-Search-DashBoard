import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import JobDescription from "./jobDescriptionComponent";
import Filters from "./filters";

import './styles.css';


const FetchJobsComponent = () => {
  // State to store the fetched jobs data
  const [jobs, setJobs] = useState([]);
  const [jobDescripton, setJobDescription] = useState();
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  

  // Fetches jobs data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Configure the fetch request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 12, // Limit the number of jobs fetched to 10
          offset: (page - 1) * 12, // Calculate the offset based on the current page  // Start fetching from the beginning (offset 0)
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        // Fetch data from the API endpoint
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );

        // Check for successful response
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        // Parse the response as text
        const data = await response.json();
        console.log("Fetched Jobs Data:", data.jdList); // Log fetched data for debugging

        // Update the jobs state with the fetched data
        setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
      } catch (error) {
        console.error("Error fetching jobs data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [page]); // Empty dependency array ensures fetching only once on mount

  // Log the jobs data whenever it changes (for debugging purposes)
  useEffect(() => {
    console.log("Jobs data:", jobs);
  }, [jobs]);


//For handling infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <div className="containernew">
      {/* Display fetched jobs data as cards */}
      <Filters/>
      <div className="jobs-container">
        {jobs?.map((job) => (
          <div className="job-card" key={job.jdUid}>
            <div className="job-listing">
             <div className="job-image">
              {job.logoUrl && (
                <img src={job.logoUrl} alt={job.company} className="job-logo" />
              )}
            </div>
            <div className="job-details">
              <p className="job-company">{job.companyName}</p>
              <Typography variant="h6" lineHeight={0.25}>
                {job.jobRole}
              </Typography>
              <p>{job.location}</p>
            </div>
            </div>
            <p>
              Expected Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}
            </p>
            <Typography variant="h6" component="h2" textAlign="left" >About The Company:</Typography>
            <div
              className="job-description"
              dangerouslySetInnerHTML={ {
                __html:job.jobDetailsFromCompany.slice(0, 200) + "...",
              }}
            />
           <IconButton
            className="expand"
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >

          <>
            
            <Typography variant="caption" onClick={()=>{setJobDescription(job.jobDetailsFromCompany)}}>View Details</Typography>
          </>
        
          </IconButton>
          <p>Minimum Experience:</p>
          <p>{job.minExp} years</p>
            <a href={job.applyUrl} className="apply-button">
            <span role="img" aria-label="thunder emoji">⚡️</span>Easy Apply
            </a>
          </div>
        ))}
      </div>
      {expanded && (
        
            
        <JobDescription jobDescription={jobDescripton}/>

      ) }
          </div>
  );
};

export default FetchJobsComponent;
