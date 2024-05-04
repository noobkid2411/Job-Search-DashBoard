import './App.css';
import ConnectedFetchJobsComponent from './fetchjobsComponent';
import { connectToRedux, ReduxProvider, updateFilter } from "./redux";

function App() {
  return (
    <div className="container">
      <ReduxProvider>
      <h1 className="header">Job Portal</h1>
      <div class="MuiBox-root css-jiivg1"><div class="MuiBox-root css-0"><p class="MuiTypography-root MuiTypography-body1 css-1i8efa4">👋 User</p></div><div class="MuiBox-root css-0"></div></div>
      <div class="MuiBox-root css-1q44eny"><div class="MuiBox-root css-17qnvss"><p class="MuiTypography-root MuiTypography-body1 css-bkh8p3">Hi,Creating a user friendly job search portal, through which you can easily track jobs and their details. </p></div></div>
      
      <h2 className="subheading">Search Jobs</h2>
      <ConnectedFetchJobsComponent/>
      </ReduxProvider>
    </div>
  );
}

export default App;
