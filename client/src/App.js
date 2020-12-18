import React from "react";
import FormPage from "./components/note_form";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import NoteDisplay from "./components/note_display";
import AllNoteDisplay from "./components/allNotes";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' component={FormPage} />
          <Route path='/notes' component={NoteDisplay} />
          <Route path='/allNotes' component={AllNoteDisplay} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
