import React from "react";
import Tutorial from "../tutorials/Tutorial.jsx";
import notes from "./notes.js";
import Markdown from "markdown-to-jsx";


class releaseNotes extends React.Component {
    _getNotes = () => {
        return notes.map((note, i) => {
            //we are returning an array of JSX components. No wrapping div yay!
            return ([
                <h2 key={note.title + i + "h2"}>{note.title}</h2>,
                <Markdown key={note.title + i}>
                    {note.file}
                </Markdown>
            ]);
        });
    }

    render() {
        const notesMarkup = this._getNotes();
        return (
            <div className="markdown">
                <Tutorial generateTOC={true}>
                    {notesMarkup}
                </Tutorial>
            </div>
        );
    }
}
module.exports = releaseNotes;
