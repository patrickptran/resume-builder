import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import MultiStepper from "./components/MultiStepper";
import ShowTemplate from "./components/ShowTemplate";

function App() {
  const { activeStep } = useSelector((store) => store.stepper);

  function renderForms(activeStep) {
    switch (activeStep) {
      default:
        break;
    }
  }

  return (
    <div className="App">
      {/* final template here.*/}
      <Container label={'margin="none"'} sx={{ mt: 10, mb: 10 }}>
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
          <Grid container></Grid>
        )}
      </Container>
    </div>
  );
}

export default App;
