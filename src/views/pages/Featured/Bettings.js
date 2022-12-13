import React from "react";
import { Typography, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BettingTable from "./BettingTable";
const useStyles = makeStyles((theme) => ({
  PostBox: {
    paddingBottom: "200px",
    marginBottom: "15px",
    padding: "10px 20px",

    "& h3": {
      color: theme.palette.text.primary,
    },
    "& p": {
      lineHeight: "27px",
      [theme.breakpoints.down("md")]: {
        lineHeight: "15px",
      },
    },
    "& .subbox": {
      marginTop: "10px",
      background: theme.palette.background.tablehead,
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
      borderRadius: "30px",
    },
    "& .subchild": {
      "& .paddingsec": {
        padding: "17px 21px 20px",
        display: "flex",
        alignItems: "center",
        "& h3": {
          fontSize: "18px",
        },
      },

      "& .baby": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  },
}));
export default function (props) {
  const classes = useStyles();
  return (
    <Paper className={classes.PostBox} elevation={2}>
      <Box>
        <Box className="subbox">
          <Box className="paddingsec">
            <Box>
              <Typography variant="h3">Bettings Rules</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box style={{ marginTop: "20px" }}>
        <Typography variant="body1">
          Unless otherwise detailed by us, your bet will be settled on the
          official result and statistics (as applicable) provided by the
          relevant governing body, association or organisation (for example the
          NBA), including any overtime. If your bet relates to aggregated
          Tournament Totals (such as for example, Total Points, Total Rebounds,
          Total Player Steals and Total Player Turnovers), your bet will be
          settled based on the official statistics provided by the relevant
          governing body, association or organization. Unless otherwise detailed
          by us, your aggregated bet will include any overtime. Your bet with
          respect to the Conference Winner (for example NBA Eastern Conference
          Title Winner) and Tournament Winner (for example NBA championship
          winners) (as applicable) will be settled following the relevant
          conference game in the play offs or NBA championship series. For the
          avoidance of doubt, the rankings in each conference at the end of the
          regular season will not count towards any bet made in relation to the
          Conference Winner or Tournament Winner (as applicable). In the event
          of a play-off game being suspended for any reason and resumed within
          24 hours of the original scheduled tip off, then your bet will stand
          and shall be settled on the official game result. If the suspended
          game does not resume within 24 hours of the original tip off, we shall
          void your bet.
        </Typography>
      </Box>
      <Box style={{ marginTop: "50px" }}>
        <BettingTable />
      </Box>
    </Paper>
  );
}
