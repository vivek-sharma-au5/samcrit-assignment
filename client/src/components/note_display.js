import React, { Fragment, useEffect, useState } from "react";
import { EmpHTTP } from "../interceptors/axios_interceptor";
import { URL } from "../interceptors/url";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
}));

const NoteDisplay = (props) => {
  const classes = useStyles();
  const [noteData, setNoteData] = useState([]);
  useEffect(() => {
    getNotes(props.location.pathname);
  }, []);

  const getNotes = async (url) => {
    try {
      const res = await EmpHTTP.post(URL.GET_NOTES, { url: url });
      if (res.status) {
        setNoteData(res.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {noteData !== null ? (
        <div className={classes.root}>
          <Link to='/'>
            <h1 style={{ marginTop: "3rem", marginLeft: "4.5rem" }}>
              <span style={{ color: "blue" }}>Dope</span>
              <span style={{ color: "crimson" }}>Note</span>
            </h1>
          </Link>
          <Grid
            container
            xs={4}
            style={{ marginLeft: "34rem", color: "black", marginTop: "1px" }}
            spacing={1}>
            <Grid item xs={12}>
              <h2>
                <Paper className={classes.paper}>{noteData.title}</Paper>
              </h2>
            </Grid>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{
                  maxHeight: "420px",
                  minHeight: "420px",
                  overflowY: "scroll",
                }}>
                {ReactHtmlParser(noteData.notes)}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <h3>
                <Paper className={classes.paper}>
                  Submitted By : {noteData.username}{" "}
                </Paper>
              </h3>
            </Grid>
          </Grid>
        </div>
      ) : (
        props.history.push("/home")
      )}
      <Link to='/allNotes'>
        <h4 style={{ marginLeft: "4.5rem", marginTop: "0rem" }}>
          To Search Notes
        </h4>
      </Link>
    </Fragment>
  );
};

export default NoteDisplay;
