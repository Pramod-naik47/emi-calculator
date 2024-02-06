import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const EmiCalculator = () => {
  const defaultTheme = createTheme({
    typography: {
      fontFamily: [
        'Libre Baskerville',
      ].join(','),
    }
  });

  const [loanAmount, setLoanAmount] = useState(100000);
  const [rateOfIntrest, setRateOfIntrest] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalIntrest]= useState(0);
  const [totalAmount, setTotalAmount]= useState(0);


  const CalculateEmi = () => {
   //Formula to calculate emi :: P x R x (1+R)^N / [(1+R)^N-1] ::
   const tenure = loanTenure * 12;
   const intrest = rateOfIntrest/12/100;
   
   const emi = Math.round(loanAmount * intrest * Math.pow(1 + intrest, tenure) / (Math.pow( 1 + intrest, tenure) - 1));
   setEmi(emi);
   setTotalIntrest((emi * tenure) - loanAmount);
   setTotalAmount(emi * tenure);
  }

  useEffect(() => {
    CalculateEmi();
  }, [loanAmount, rateOfIntrest, loanTenure])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{ width: "70%" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid grey"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            EMI Calculator
          </Typography>
          <Box sx={{ mt: 1, width: "50%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Loan Amount</Typography>
              <TextField
                margin="normal"
                required
                size="small"
                id="loanAmount"
                name="loanAmount"
                autoFocus
                value={loanAmount}
                onChange={(e) => {setLoanAmount(e.target.value)}}
              />
            </Box>

            <Slider
              defaultValue={loanAmount}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e) => setLoanAmount(e.target.value)}
              max={100000000}
              min = {100000}
              value={loanAmount}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Rate Of Intrest (PA)</Typography>
              <TextField
                margin="normal"
                required
                name="rateOfIntrest"
                type="rateOfIntrest"
                id="rateOfIntrest"
                size="small"
                value={rateOfIntrest}
                onChange={(e) => {setRateOfIntrest(e.target.value)}}
              />
            </Box>

            <Slider
              defaultValue={10}
              aria-label="Default"
              valueLabelDisplay="auto"
              max={30}
              min = {1}
              value={rateOfIntrest}
              onChange={(e) => setRateOfIntrest(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Loan Tenure</Typography>
              <TextField
                margin="normal"
                required
                size="small"
                name="loanTenure"
                type="loanTenure"
                id="loanTenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
              />
            </Box>
            <Slider
              defaultValue={12}
              aria-label="Default"
              valueLabelDisplay="auto"
              value={loanTenure}
              max={30}
              min={1}
              onChange={(e) => setLoanTenure(e.target.value)}
            />
          </Box>
          <Card sx={{ display: "flex", width: "50%",padding : "5px", margin :"5px"}}>
            <CardContent sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Monthly EMI</Typography>
                <Typography variant="subtitle1">{new Intl.NumberFormat("en-IN").format(emi)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Principle Amount</Typography>
                <Typography variant="subtitle1">{new Intl.NumberFormat("en-IN").format(loanAmount)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Total Intrest</Typography>
                <Typography variant="subtitle1">{new Intl.NumberFormat("en-IN").format(totalInterest)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="subtitle1">{new Intl.NumberFormat("en-IN").format(totalAmount)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmiCalculator;
