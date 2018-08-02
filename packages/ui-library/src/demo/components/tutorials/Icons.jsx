import React, { Component } from "react";
import Tutorial from "./Tutorial";
import Markup from "../../core/Markup";
import Layout from "../../../components/general/ColumnLayout";
import ICOMOON_ICONS from "../../../css/icons/selection.json";

const CUSTOM_ICONS = ["check"]; //css mapping to other icons in icons.scss
const ICONS = ICOMOON_ICONS.icons.map((icon) => icon.properties.name).concat(CUSTOM_ICONS).sort();

var ICON_COLUMNS = 5;


class Icons extends Component {

    _renderIconColumn = (col) => {
        var iconsPerCol = Math.ceil(ICONS.length / ICON_COLUMNS);

        return ICONS.slice(iconsPerCol*(col-1), iconsPerCol*col).map(function (item, i) {
            return <div key={i}><span className={"inline-icon icon-" + item}></span> {item}</div>;
        }.bind(this));
    };

    _renderIconColumns = () => {
        var content = [];

        for (var i=1; i<=ICON_COLUMNS; i+=1) {
            content.push(<Layout.Column key={i}>{this._renderIconColumn(i)}</Layout.Column>);
        }

        return content;
    };

    render () {
        return (
            <Tutorial>
                <p>
                    There are a variety of icons already in the library which may be used. They're contained in
                    an "icon font". This means that they are vector-based and may be resized and styled using
                    the same CSS rules as text.
                </p>
                <p>
                    The class name to show an icon is always "icon-" + the name of the icon.
                </p>
                <Layout.Row className="icons">{this._renderIconColumns()}</Layout.Row>
                <br />
                <p>
                    It's not always required, but when displaying an icon with text, it's good practice to
                    also add the "inline-icon" class so that the icon aligns properly with the text as shown
                    below.
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<span className="inline-icon icon-thumb"></span> icon-thumb'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
            </Tutorial>
        );
    }
}

module.exports = Icons;
