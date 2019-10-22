import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../variable";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import StatusIndicator from "./StatusIndicator";
import validator from "email-validator";

const useStyles = makeStyles(theme => ({
  root: {
    color: "#eee"
  },
  welcome: {
    color: "#585353",
    fontWeight: "bolder",
    textShadow: "1px 2px #baaaaa"
  },

  button: {
    margin: theme.spacing(1)
  }
}));

const StyledTextField = withStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0),
    width: "90%",
    "& label": {
      color: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiOutlinedInput-root": {
      color: "#eee",
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#eee"
      }
    },
    "& .MuiFormHelperText-root": {
      fontSize: ".9rem"
    }
  }
}))(TextField);

function App() {
  const defaultStatus = {
    apiSuccess: null,
    errCode: null,
    errMsg: null
  };
  const [info, setInfo] = useState({});
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState(defaultStatus);
  const [isSending, setIsSending] = useState(false);

  const handleModalClose = () => {
    setIsSending(false);
  };

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    setIsSending(true);

    axios
      .post(`${baseUrl}/sendEmail`, inputs)
      .then(function(res) {
        // console.log("response received, res.data: ", res.data);
        const { success: apiSuccess, errCode, errMsg } = res.data;
        setStatus({ apiSuccess, errCode, errMsg });
      })
      .catch(function(error) {
        // console.log("axios error: ", error);
        setStatus({ ...status, errMsg: error && error.message });
      });
  };

  const validateInput = value => {
    if (!value) return true;
    return value
      .trim()
      .replace(/;$/, "")
      .replace(/^;/, "")
      .split(";")
      .map(v => v.trim())
      .every(address => validator.validate(address));
  };

  const handleChange = inputName => event => {
    const value = event.target.value;
    setInputs({ ...inputs, [inputName]: value });
  };

  useEffect(() => {
    axios.get(`${baseUrl}/data`).then(res => {
      setInfo(res.data);
    });
  }, []);

  const classes = useStyles();

  const isInvalidInputs = {
    from: !validateInput(inputs.from),
    to: !validateInput(inputs.to),
    cc: !validateInput(inputs.cc),
    bcc: !validateInput(inputs.bcc)
  };
  const isSubmitEnable =
    validateInput(inputs.from) &&
    validateInput(inputs.to) &&
    validateInput(inputs.cc) &&
    validateInput(inputs.bcc);

  const inputHelpText = "email format should like test@gmail.com";

  return (
    <>
      {isSending && (
        <StatusIndicator handleClose={handleModalClose} status={status} />
      )}
      <Box my={10} textAlign="center">
        <Box mb={10}>
          <Typography component="h1" variant="h3" className={classes.welcome}>
            {info.welcomeTitle}
          </Typography>
        </Box>
        <Container maxWidth="sm" className={classes.root}>
          <form onSubmit={handleSubmit}>
            <Box borderRadius={10} bgcolor="primary.main" p={4} boxShadow={3}>
              <Box m={1}>
                <Typography component="h2" variant="h5">
                  {info.welcomeSub}
                </Typography>
              </Box>
              <Box mt={2}>
                <p>{info.description}</p>
              </Box>
              <Box mt={5} p={5} borderRadius={10} boxShadow={3}>
                <Typography
                  component="div"
                  variant="body1"
                  className={classes.input}
                >
                  <StyledTextField
                    label="From"
                    variant="outlined"
                    placeholder="your email address"
                    onChange={handleChange("from")}
                    error={isInvalidInputs.from}
                    helperText={isInvalidInputs.from && inputHelpText}
                    required
                  >
                    {inputs.from}
                  </StyledTextField>
                  <StyledTextField
                    label="To"
                    variant="outlined"
                    placeholder="recipients, ex: a@gmail.com; b@gmail.com"
                    onChange={handleChange("to")}
                    error={isInvalidInputs.to}
                    helperText={isInvalidInputs.to && inputHelpText}
                    required
                  >
                    {inputs.to}
                  </StyledTextField>
                  <StyledTextField
                    label="Cc"
                    variant="outlined"
                    placeholder="carbon copy"
                    onChange={handleChange("cc")}
                    error={isInvalidInputs.cc}
                    helperText={isInvalidInputs.cc && inputHelpText}
                  >
                    {inputs.cc}
                  </StyledTextField>
                  <StyledTextField
                    label="Bcc"
                    variant="outlined"
                    placeholder="blind carbon copy"
                    onChange={handleChange("bcc")}
                    error={isInvalidInputs.bcc}
                    helperText={isInvalidInputs.bcc && inputHelpText}
                  >
                    {inputs.bcc}
                  </StyledTextField>
                  <StyledTextField
                    label="Subject"
                    variant="outlined"
                    placeholder="clear topic"
                    onChange={handleChange("subject")}
                    required
                  >
                    {inputs.subject}
                  </StyledTextField>
                  <StyledTextField
                    label="Body"
                    variant="outlined"
                    placeholder="content"
                    multiline={true}
                    rows="10"
                    onChange={handleChange("text")}
                    required
                  >
                    {inputs.text}
                  </StyledTextField>
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<SendIcon />}
                  disabled={!isSubmitEnable}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default App;
