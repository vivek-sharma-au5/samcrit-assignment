import React, { Fragment, useEffect, useState } from "react";
import { EmpHTTP } from "../interceptors/axios_interceptor";
import { URL } from "../interceptors/url";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.dark,
  },
}));

const AllNoteDisplay = (props) => {
  const classes = useStyles();
  const [noteData, setNoteData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const res = await EmpHTTP.get(URL.GET_ALL_NOTES);
      if (res.status) {
        setNoteData(res.data.notes);
      } else {
        setErrorMsg("Request Failed !!!");
      }
    } catch (error) {
      setErrorMsg("Request Failed !!!");
    }
  };

  const getSearchNotes = async (e) => {
    try {
      const res = await EmpHTTP.post(URL.GET_SEARCH_NOTES, {
        title: e.target.value,
      });
      if (res.status) {
        setNoteData(res.data.notes);
      } else {
        setErrorMsg("Request Failed !!!");
      }
    } catch (error) {
      setErrorMsg("Request Failed !!!");
    }
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <Link to='/'>
          <h1 style={{ marginTop: "3rem", marginLeft: "4.5rem" }}>
            <span style={{ color: "blue" }}>Dope</span>
            <span style={{ color: "crimson" }}>Note</span>
          </h1>
        </Link>
        <TextField
          id='outlined-basic'
          label='Search Notes By Title'
          name='title'
          variant='filled'
          style={{
            marginTop: "1rem",
            marginLeft: "5rem",
            marginBottom: "1rem",
            width: 400,
          }}
          onChange={getSearchNotes}
        />
        <Grid
          container
          xs={4}
          style={{ marginLeft: "34rem", color: "black", marginTop: "2px" }}
          spacing={1}>
          <Grid item xs={12}>
            <Paper
              className={classes.paper}
              style={{
                maxHeight: "500px",
                minHeight: "500px",
                overflowY: "scroll",
              }}>
              {errorMsg !== null ? (
                <Alert severity='error' style={{ width: "27.5rem" }}>
                  <AlertTitle>{errorMsg}</AlertTitle>
                </Alert>
              ) : (
                noteData.map((note, key) => (
                  <Grid item xs={12} key={key}>
                    <h3>
                      <Paper
                        className={classes.paper}
                        style={{
                          background: `url("https://besthqwallpapers.com/Uploads/27-3-2019/85029/thumb-old-paper-texture-4k-paper-background-paper-textures-old-paper.jpg")`,
                        }}>
                        <ul style={{ listStyleType: "none" }}>
                          <li>Title : {note.title}</li>
                          <li>Submitted By : {note.username}</li>
                          <li>
                            <Link
                              onClick={() => {
                                props.history.push(note.url);
                              }}>
                              {note.url}
                            </Link>
                          </li>
                        </ul>
                      </Paper>
                    </h3>
                  </Grid>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default AllNoteDisplay;
