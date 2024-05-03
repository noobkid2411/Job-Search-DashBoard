import React, { useState } from 'react';

const FilterInput = ({ label, placeholder, onChange }) => (
  <div className="filter-input">
    <label htmlFor={label}>{label}</label>
    <input type="text" id={label} placeholder={placeholder} onChange={onChange} />
  </div>
);

const FilterSelect = ({ label, options, onChange }) => (
  <div className="filter-select">
    <label htmlFor={label}>{label}</label>
    <select id={label} onChange={onChange}>
      <option value="">All</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FilterCheckbox = ({ label, onChange }) => (
  <div className="filter-checkbox">
    <label>
      <input type="checkbox" onChange={onChange} />
      {label}
    </label>
  </div>
);

const Filters = () => {
  const [minExperience, setMinExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [techStack, setTechStack] = useState('');
  const [role, setRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  const handleMinExperienceChange = (event) => setMinExperience(event.target.value);
  const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleRemoteChange = (event) => setRemote(event.target.checked);
  const handleTechStackChange = (event) => setTechStack(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);
  const handleMinBasePayChange = (event) => setMinBasePay(event.target.value);

  const filters = {
    minExperience,
    companyName,
    location,
    remote,
    techStack,
    role,
    minBasePay,
  };

  // Implement logic to handle filter updates and pass them to your job listing component

  return (
    <div className="filters">
      <FilterInput
        label="Min. experience (years)"
        placeholder="e.g., 2"
        onChange={handleMinExperienceChange}
      />
      <FilterInput
        label="Company name"
        placeholder="e.g., Acme Inc."
        onChange={handleCompanyNameChange}
      />
      <FilterInput label="Location (city or remote)" placeholder="e.g., Bangalore" onChange={handleLocationChange} />
      <FilterCheckbox label="Remote" onChange={handleRemoteChange} />
      <FilterInput label="Tech stack (comma separated)" placeholder="e.g., React, Node.js" onChange={handleTechStackChange} />
      <FilterInput label="Role (e.g., Software Engineer)" placeholder="e.g., Software Engineer" onChange={handleRoleChange} />
      <FilterInput label="Min. base pay" placeholder="e.g., ₹100,000" onChange={handleMinBasePayChange} />
    </div>
  );
};

export default Filters;
