import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HourglassEmptyRoundedIcon from "@material-ui/icons/HourglassEmptyRounded";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 800,
    maxWidth: "75vw",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(-360deg)" }
  },
  icon: {
    fontSize: "3rem",
    animation: "$spin 2s linear infinite"
  }
}));

export default function StatusIndicator({ handleClose, status }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { apiSuccess, errCode, errMsg } = status;
  return (
    <div>
      <Modal
        aria-labelledby="sendEmailStatus-modal-title"
        aria-describedby="sendEmailStatus-modal-description"
        open={true}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Box textAlign="center">
            {apiSuccess === null ? (
              <>
                <HourglassEmptyRoundedIcon className={classes.icon} />
                <Typography
                  component="h1"
                  variant="h4"
                  id="sendEmailStatus-modal-title"
                >
                  Sending...
                </Typography>
              </>
            ) : (
              <>
                {apiSuccess ? (
                  <Typography
                    component="h1"
                    variant="h4"
                    id="sendEmailStatus-modal-title"
                  >
                    Email queued!
                  </Typography>
                ) : (
                  <>
                    <Typography
                      component="h1"
                      variant="h4"
                      id="sendEmailStatus-modal-title"
                    >
                      Error code: {errCode}
                    </Typography>
                    <Box textAlign="left">
                      <p id="sendEmailStatus-modal-description">
                        {JSON.stringify(errMsg)}
                      </p>
                    </Box>
                  </>
                )}
                <Box mt={3}>
                  <button onClick={handleClose}>Close</button>
                </Box>
              </>
            )}
          </Box>
        </div>
      </Modal>
    </div>
  );
}

StatusIndicator.propTypes = {
  handleClose: PropTypes.func,
  status: PropTypes.object
};
