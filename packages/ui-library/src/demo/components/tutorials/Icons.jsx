import React, { Component } from "react";
import Tutorial from "./Tutorial";
import Layout from "../../../components/general/ColumnLayout";
import ICOMOON_ICONS from "../../../css/icons/selection.json";
import FormSearchBox from "../../../components/forms/FormSearchBox";
import InputRow from "../../../components/layout/InputRow";

const CUSTOM_ICONS = ["check"]; //css mapping to other icons in icons.scss
const ICONS = ICOMOON_ICONS.icons.map((icon) => icon.properties.name).concat(CUSTOM_ICONS).sort();

var ICON_COLUMNS = 5;

const iconKeywords =
{
    workerapp: [
        "robot",
    ],
    speedometer: [
        "overview",
    ],
    globe: [
        "earth",
    ],
    pencil: [
        "edit",
    ],
    graph: [
        "bar-chart",
        "bar-line-chart"
    ]
};



class Icons extends Component {
   
    getIconSearchTerms = (icons) => {
        const iconList = icons.reduce(
            (acc, value) => ({ ...acc, [value]: [value] }),
            iconKeywords
        );
        return iconList;
    };

    iconSearchTerms = this.getIconSearchTerms(ICONS);

    state = {
        results: ICONS,
    };

    _renderIconColumn = (col) => {
        var iconsPerCol = Math.ceil(ICONS.length / ICON_COLUMNS);
        return this.state.results.slice(iconsPerCol*(col-1), iconsPerCol*col).map((item) => {
            return <div key={item}><span className={"inline-icon icon-" + item}></span> {item}</div>;
        });
    };

    _renderIconColumns = () => {
        var content = [];
        for (var i=1; i<=ICON_COLUMNS; i+=1) {
            content.push(<Layout.Column key={i}>{this._renderIconColumn(i)}</Layout.Column>);
        }
        return content;
    };
 
    _checkForMatch = searchTerms => query => {
        const {
            startsWith,
            contains
        } = Object.keys(searchTerms).reduce(({ startsWith: startsAcc, contains: containsAcc }, key) => {
            const keyIndex = query ? key.indexOf(query.toLowerCase()) : 0;
            if (keyIndex === 0 || !query) {
                const { [key]: idResults } = searchTerms;
                idResults.map((result) => startsAcc.add(result));
                return {
                    startsWith: startsAcc,
                    contains: containsAcc
                };
                    
            } else if (keyIndex > 0) {
                const { [key]: idResults } = searchTerms;
                idResults.forEach(result => containsAcc.add(result));
                return {
                    startsWith: startsAcc,
                    contains: containsAcc
                };
            } else {
                return {
                    startsWith: startsAcc,
                    contains: containsAcc
                };
            }
        }, { startsWith: new Set(), contains: new Set() });
        this.setState({
            results: [
                ...Array.from(startsWith).sort(),
                ...Array.from(contains).sort()
            ]
        });
    };

    _noSearchTerms = (results) => {
        return results.length < 1 ? "Sorry, no icons match this search." : null ;
    }

    render () {
        return (
            <div>
                <Tutorial>
                    <p>
                    There are a variety of icons already in the library which may be used. They're contained in
                    an icon font. This means that they are vector-based and may be resized and styled using
                    the same CSS rules as text.
                    </p>
                    <InputRow>
                        <FormSearchBox
                            onValueChange={this._checkForMatch(this.iconSearchTerms)}
                            name="search-box"
                        />
                    </InputRow>
                    {this._noSearchTerms(this.state.results)}
                    <Layout.Row className="icons">{this._renderIconColumns()}</Layout.Row>
                </Tutorial>
            </div>
        );
    }
}

module.exports = Icons;
