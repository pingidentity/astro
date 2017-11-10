import React from "react";
import Tutorial from "../tutorials/Tutorial.jsx";
import notes from "./notes.js";
//import Markdown from "markdown-to-jsx";
import marked from "marked";


class releaseNotes extends React.Component {
    _getNotes = () => {
        return notes.map((note, i) => {
            const markdown = marked(note.file);
            //we are returning an array of JSX components. No wrapping div yay!
            return ([
                <h2 key={note.title + i + "h2"}>{note.title}</h2>,
                <div key={note.title + i} dangerouslySetInnerHTML={{ __html: markdown }} />
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
