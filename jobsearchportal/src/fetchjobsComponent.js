import React, { useEffect, useState } from "react";
import './styles.css';

const FetchJobsComponent = () => {
  // State to store the fetched jobs data
  const [jobs, setJobs] = useState([]);

  // Fetches jobs data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Configure the fetch request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 10, // Limit the number of jobs fetched to 10
          offset: 0,  // Start fetching from the beginning (offset 0)
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
        setJobs(data.jdList);
      } catch (error) {
        console.error("Error fetching jobs data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures fetching only once on mount

  // Log the jobs data whenever it changes (for debugging purposes)
  useEffect(() => {
    console.log("Jobs data:", jobs);
  }, [jobs]);

  return (
    <div className="containernew">
      
    {/* Display fetched jobs data as cards */}
    {jobs?.length > 0 && ( // Check if jobs exist before rendering
      <div className="jobs-container">
        {jobs?.map((job) => (
         <div className="job-card" key={job.jdUid}> {/* Use jdUid as unique key */}
         <h2>{job.jobRole}</h2> {/* Display job role */}
         <p>
           {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}
         </p> {/* Display salary range and currency */}
         <p>{job.location}</p> {/* Display location */}
         <p>Experience: {job.minExp} - {job.maxExp} years</p> {/* Display experience range */}
         <div dangerouslySetInnerHTML={{ __html: job.jobDetailsFromCompany }} /> {/* Display job details safely */}
         {/* Add more details as needed */}
       </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default FetchJobsComponent;
