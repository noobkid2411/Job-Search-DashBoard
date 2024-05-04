import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import JobDescription from "./jobDescriptionComponent";
import { connectToRedux, ReduxProvider, updateFilter } from "./redux";

import './css/styles.css';


const FetchJobsComponent = ({filters,updateFilter}) => {
  // State to store the fetched jobs data
  const [jobs, setJobs] = useState([]);
  const [jobDescripton, setJobDescription] = useState();
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [filteredJobs,setFilteredJobs] =useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  
console.log(filters)
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

   const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const filterValue = type === "checkbox" ? checked : value;
    updateFilter({ [name]: filterValue });}

    useEffect(() => {
      // Filter jobs based on the filters state
      const filtered = jobs.filter((job) => {
        if (filters?.minExperience && job.minExp < filters.minExperience) {
          return false;
        }
        if (filters?.companyName && !job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) {
          return false;
        }
        if (filters?.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        if (filters?.remote && !job.location.toLowerCase().includes("remote")) {
          return false;
        }
        if (filters?.techStack && !job.techStack.toLowerCase().includes(filters.techStack.toLowerCase())) {
          return false;
        }
        if (filters?.role && !job.jobRole.toLowerCase().includes(filters.role.toLowerCase())) {
          return false;
        }
        if (filters?.minBasePay && job.minJdSalary < filters.minBasePay) {
          return false;
        }
        return true;
      });
      setFilteredJobs(prevFilteredJobs => {
        const newFilteredJobs = [];
        newFilteredJobs.push(...filtered); // Push the filtered items into the copy
        return newFilteredJobs; // Set the state with the copy containing both previous and new filtered items
      });
    }, [filters, jobs]);
    




  useEffect(() => {
    console.log("Jobs:", jobs);
    console.log("Filtered Jobs:", filteredJobs);
  }, [filteredJobs]);



  return (
    <div className="containernew">
      {/* Display fetched jobs data as cards */}
    
      <div className="filters">
      <div className="filter-input">
      <input
        type="text"
        name="minExperience"
        placeholder="Min Experience"
        onChange={handleFilterChange}
      />
      </div>
      <div className="filter-input">
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        onChange={handleFilterChange}
      />
      </div>
      <div className="filter-input">
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleFilterChange}
      />
      </div>
      <div className="filter-input">
      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack"
        onChange={handleFilterChange}
      />
      </div>
      <div className="filter-input">
      <input
        type="text"
        name="role"
        placeholder="Role"
        onChange={handleFilterChange}
      />
      </div>
      <div className="filter-input">
      <input
        type="text"
        name="minBasePay"
        placeholder="Min Base Pay"
        onChange={handleFilterChange}
      />
      </div>
      <div className="filter-checkbox">
      <input
        type="checkbox"
        name="remote"
        onChange={handleFilterChange}
      />
      <label htmlFor="remote">Remote</label>
      {/* Add other filter inputs */}
    </div>
    </div>
    <div className="jobs-container">
   
      {filteredJobs.map((job) => (
          <div className="job-card">
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
                __html:job?.jobDetailsFromCompany.slice(0, 200) + (job?.jobDetailsFromCompany.length > 200 ? "..." : "")
              }}
            />
           <IconButton
            className="expand"
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >

          <>
            
            <Typography variant="caption" onClick={()=>{setJobDescription(job.jobDetailsFromCompany);setIsPopupOpen(true)}}>View Details</Typography>
          </>
        
          </IconButton>
          {job.minExp &&(
            <div>
          <p>Minimum Experience:</p>
          <p>{job?.minExp} years</p></div>)}
          {!job.minExp &&(
            <div>
          <p>Minimum Experience:</p>
          <p>Not Specified⚠️</p></div>)}
          <div className="apply-div">
            <a href={job.applyUrl} className="apply-button">
            <span role="img" aria-label="thunder emoji">⚡️</span>Easy Apply
            </a>
            </div>
          </div>
        ))}
     
      {isPopupOpen &&(
        <JobDescription jobDescription={jobDescripton}  onClose={togglePopup}/>

      ) }
          </div>
          </div>
  );
};


const ConnectedFetchJobsComponent = connectToRedux(FetchJobsComponent);
export default ConnectedFetchJobsComponent