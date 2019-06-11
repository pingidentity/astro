import React from "react";
import ListNav from "../../../components/layout/ListNav";
import Tutorial from "../tutorials/Tutorial.jsx";
import notes from "./notes.js";
import PageSection from "../../../components/layout/PageSection";
import marked from "marked";


class ReleaseNotes extends React.Component {

    state = {
        selectedLabel: 0
    }

    _setSelected = (id) => {
        this.setState({
            selectedLabel: id
        });
        const topRef = document.getElementById("uilib");
        const innerRef = document.getElementsByClassName("documentation")[0];
        topRef.scrollIntoView({ behavior: "smooth" });
        innerRef.scrollIntoView({ behavior: "smooth" });
    }

    _getPreppedData = notes.map(({ title, date }, index) => {
        return {
            label: title,
            releaseDate: date,
            id: index,
        };
    });

    _getNotes = (id) => {
        const { file, title, date } = notes[id];
        const dateMarkUp = date ? ` - ${date}` : "";
        const markdown = marked(file);
        return (
            <PageSection key="key" title={`${title}${dateMarkUp}`}>
                <div dangerouslySetInnerHTML={{ __html: markdown }} />
            </PageSection>
        );
    }

    render() {
        return (
            <div className="markdown">
                <Tutorial generateTOC={true}>
                    <ListNav
                        labels={this._getPreppedData}
                        onSelect={this._setSelected}
                        selectedLabel={this.state.selectedLabel}
                    >
                        {this._getNotes(this.state.selectedLabel)}
                    </ListNav>
                </Tutorial>
            </div>
        );
    }
}
module.exports = ReleaseNotes;
