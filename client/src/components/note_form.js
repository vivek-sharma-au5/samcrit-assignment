import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/notes.css";
import { EmpHTTP } from "../interceptors/axios_interceptor";
import { URL } from "../interceptors/url";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "27rem",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "27rem",
  },
}));

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "link",
    "bulletedList",
    "numberedList",
    "insertTable",
    "blockQuote",
    "underline",
  ],
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
};

const FormPage = (props) => {
  const [formData, setFormData] = useState({});
  const [notes, setNotes] = useState(null);
  const [noteUrl, setNoteUrl] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      title: formData.title,
      notes: notes,
      url: "/notes/" + nanoid(8),
    };
    try {
      const res = await EmpHTTP.post(URL.SAVE_NOTES, data);
      if (res.status) {
        setNoteUrl(res.data.notes.url);
      } else {
        setErrorMsg("Request Failed !!!");
      }
    } catch (error) {
      setErrorMsg("Request Failed !!!");
    }
  };

  return (
    <Fragment>
      <Link to='/'>
        <h1 style={{ marginTop: "3rem", marginLeft: "4.5rem" }}>
          <span style={{ color: "blue" }}>Dope</span>
          <span style={{ color: "crimson" }}>Note</span>
        </h1>
      </Link>
      <div>
        {noteUrl ? (
          <Alert
            severity='success'
            style={{ width: "27rem", marginLeft: "35rem" }}>
            <AlertTitle>Note Created Successfully</AlertTitle>
            Click this link to see your notes -{" "}
            <strong>
              <Link
                onClick={() => {
                  props.history.push(noteUrl);
                }}>
                {noteUrl}
              </Link>
            </strong>
          </Alert>
        ) : errorMsg !== null ? (
          <Alert
            severity='error'
            style={{ width: "27rem", marginLeft: "35rem" }}>
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert>
        ) : null}
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        style={{ margin: "0rem 35rem" }}
        onSubmit={handleSubmit}>
        <div>
          <TextField
            id='outlined-basic'
            label='Author'
            name='username'
            variant='filled'
            fullWidth
            onChange={handleInput}
          />
        </div>
        <div>
          <TextField
            id='outlined-basic'
            label='Title'
            name='title'
            variant='filled'
            fullWidth
            onChange={handleInput}
          />
        </div>
        <div>
          <h2>Write your notes below</h2>
          <CKEditor
            editor={ClassicEditor}
            name='editor'
            config={editorConfiguration}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNotes(data);
            }}
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          disabled={
            formData.username === "" || formData.title === "" || notes === null
          }>
          Save Note
        </Button>
        <Link to='/allNotes'>
          <h4 style={{ marginLeft: "4.5rem", marginTop: "1rem" }}>
            To Search Notes
          </h4>
        </Link>
      </form>
    </Fragment>
  );
};

export default FormPage;
