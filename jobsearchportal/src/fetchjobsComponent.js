import React, { useEffect, useState } from "react";

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
        const data = await response.text();
        console.log("Fetched Jobs Data:", data); // Log fetched data for debugging

        // Update the jobs state with the fetched data
        setJobs(data);
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
    <div>
      <h1>Testing if data is fetched</h1>
      {/* Display the fetched jobs data here (implementation omitted for brevity) */}
    </div>
  );
};

export default FetchJobsComponent;
