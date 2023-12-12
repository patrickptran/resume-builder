// Task 2: Add imports here
import Grid from "@mui/material/Grid";
import MultiStepper from "./components/MultiStepper";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

// Task 4: Add import here
import ShowTemplate from "./components/ShowTemplate";

// Task 6: Add employee info import here
import EmployeeInfo from "./components/EmployeeInfo";

// Task 9: Add employee work import here
import EmployeeExperience from "./components/EmployeeExperience";

// Task 11: Add employee education import here
import EmployeeEducation from "./components/EmployeeEducation";

// Task 13: Add employee skills import here
import EmployeeSkills from "./components/EmployeeSkills";
// Task 15: Add employee interests import here
import EmployeeInterests from "./components/EmployeeInterests";

// Task 16: Add import here
import Resume from "./components/Resume";

function App() {
  // Task 2: retreive steps here
  const { activeStep } = useSelector((store) => store.stepper);

  // function to render all the froms
  function renderForms(activeStep) {
    switch (activeStep) {
      // Task 6: Add employee info case here
      case 0:
        return <EmployeeInfo />;

      // Task 9: Add employee work case here
      case 1:
        return <EmployeeExperience />;

      // Task 11: Add employee education case here
      case 2:
        return <EmployeeEducation />;

      // Task 13: Add employee skills case here
      case 3:
        return <EmployeeSkills />;

      // Task 15: Add employee interests case here
      case 4:
        return <EmployeeInterests />;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          fontWeight: "blod",
          color: "#4951F5",
        }}
      >
        Resume Builder
      </p>
      {/* Task 2+4+15: add template here.*/}

      <Container label={'margin="nine"'} sx={{ mt: 10, mb: 10 }}>
        <MultiStepper sx={{ mt: 6 }} />
        {activeStep < 5 ? (
          <Grid container>
            <Grid item md={8} lg={8} sm={12}>
              {renderForms(activeStep)}
            </Grid>
            <Grid item md={4} lg={4} sm={12} xs={12}>
              <ShowTemplate />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Resume />
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default App;
