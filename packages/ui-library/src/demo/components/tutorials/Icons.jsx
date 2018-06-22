import React, { Component } from "react";
import Tutorial from "./Tutorial";
import Markup from "../../core/Markup";
import Layout from "../../../components/general/ColumnLayout";


var ICONS = [
    "account",
    "admin-account",
    "alert",
    "approve",
    "apps",
    "as",
    "badge",
    "bar-chart",
    "bar-line-chart",
    "beaker",
    "books",
    "browser",
    "cabinet",
    "calendar",
    "certificate",
    "check",
    "chat",
    "circle",
    "circle-o",
    "clear",
    "clipboard",
    "close",
    "close-arrow",
    "code",
    "cog",
    "cog-filled",
    "collapse",
    "delete",
    "desktop",
    "details",
    "device",
    "directory",
    "directory-hollow",
    "download",
    "dropdown-arrow",
    "earth",
    "edit",
    "error-triangle",
    "expand",
    "expand-arrow",
    "file",
    "filter",
    "fingerprint",
    "globe",
    "grip",
    "group",
    "help",
    "help-rounded",
    "idp",
    "image",
    "info",
    "key",
    "left",
    "link",
    "lock",
    "lock-large",
    "lockout",
    "menu",
    "minus",
    "minus-rounded",
    "network",
    "next",
    "nodes",
    "non-interactive",
    "notepad",
    "on-off",
    "org-chart",
    "overview",
    "pin",
    "plus",
    "plus-rounded",
    "previous",
    "progress-2-1",
    "progress-2-2",
    "progress-3-1",
    "progress-3-2",
    "progress-3-3",
    "progress-4-1",
    "progress-4-2",
    "progress-4-3",
    "progress-4-4",
    "progress-5-1",
    "progress-5-2",
    "progress-5-3",
    "progress-5-4",
    "progress-5-5",
    "progress-6-1",
    "progress-6-2",
    "progress-6-3",
    "progress-6-4",
    "progress-6-5",
    "progress-6-6",
    "puzzle",
    "radar",
    "resend",
    "right",
    "search",
    "server",
    "settings",
    "shield",
    "slider",
    "sort-asc",
    "sort-desc",
    "sort-none",
    "sp",
    "spin-down",
    "spin-up",
    "spinner",
    "success",
    "support",
    "tag",
    "terminal",
    "thumb",
    "undo",
    "user",
    "users",
    "view",
    "view-hidden",
    "walkthrough",
    "wand",
    "welcome",
];

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
