import React, { Component } from "react";
import Tutorial from "./Tutorial";
import Color from "color";
import _ from "underscore";

const COLORS = [
    {
        name: "black",
        value: "#000",
    },
    {
        name: "white",
        value: "#fff",
    },
    {
        name: "active-blue",
        value: "#2996cc",
    },
    {
        name: "active-blue-inactive",
        value: "#a9d5eb",
    },
    {
        name: "blue-grey",
        value: "#9ba9b8",
        deprecatedValue: "#9bacb4",
    },
    {
        name: "chilly",
        value: "#dae2e7",
        deprecatedValue: "#e3eaed",
    },
    {
        name: "cinder-block",
        value: "#e4e5e5",
    },
    {
        name: "critical-red",
        value: "#ed3a03",
    },
    {
        name: "dolphin",
        value: "#d8dbdc",
    },
    {
        name: "elephant",
        value: "#93999f",
        deprecatedValue: "#929aa1",
    },
    {
        name: "elderly",
        value: "#f4f7f9",
    },
    {
        name: "grass",
        value: "#3cb66e",
    },
    {
        name: "manatee",
        value: "#b1b5b8",
    },
    {
        name: "midnight",
        value: "#4b637c",
    },
    {
        name: "rabbit-fur",
        value: "#c5cfd7",
        deprecatedValue: "#d1d3d4",
    },
    {
        name: "required-yellow",
        value: "#f2bb1a",
    },
    {
        name: "rhino",
        value: "#9da2a8",
        deprecatedValue: "#9ea5a8",
    },
    {
        name: "slate",
        value: "#3d454d",
    },
    {
        name: "sonic",
        value: "#f0f6f7",
    },
    {
        name: "stone",
        value: "#c2c3c4",
    },
    {
        name: "stratus",
        value: "#afb4b8",
        deprecatedValue: "#bcbdbf",
    },
    {
        name: "success",
        value: "#4aba78",
    },
    {
        name: "success-green-inactive",
        value: "#b1e2c5",
    },
    {
        name: "timberwolf",
        value: "#e8ebed",
    },
    {
        name: "verde",
        value: "#76cc99",
    },
    {
        name: "walrus",
        value: "#575f67",
    },
    {
        name: "warning-text",
        value: "#96702c",
    },
    {
        name: "warning-yellow",
        value: "#ffd057",
    },
    {
        name: "warning-icon-yellow",
        value: "#eeb91c",
    },
];
const deprecatedIcons = ["stone", "cinder-block", "manatee", "dolphin"];

class Colors extends Component {
    render () {
        return (
            <Tutorial>
                <p>
                    Deprecated colors are crossed out. Some colors have been updated
                    with slightly different values. Their former values are shown
                    crossed out.
                </p>
                {
                    _.map(_.sortBy(COLORS, color => Color(color.value).luminosity()),
                        (sorted, index) => {
                            return (
                                <div key={index} style={{
                                    display: "inline-block",
                                    width: "80px",
                                    margin: "20px",
                                    textAlign: "center",
                                    verticalAlign: "top",
                                }}>
                                    <div style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "50%",
                                        backgroundColor: sorted.value,
                                        marginBottom: "15px",
                                    }}
                                    />
                                <strong style={{
                                    textDecoration: deprecatedIcons.indexOf(sorted.name) !== -1
                                    ? "line-through" : "none",
                                    opacity: deprecatedIcons.indexOf(sorted.name) !== -1
                                    ? "0.5" : "1",
                                }}>
                                    {sorted.name}
                                </strong>
                                <div style={{
                                    textDecoration: deprecatedIcons.indexOf(sorted.name) !== -1
                                    ? "line-through" : "none",
                                    opacity: deprecatedIcons.indexOf(sorted.name) !== -1 ? "0.5" : "1",
                                }}>
                                    {sorted.value}
                                </div>

                                {sorted.deprecatedValue &&
                                    <div style={{
                                        textDecoration: "line-through",
                                        opacity: "0.5",
                                    }}>
                                        {sorted.deprecatedValue}
                                    </div>
                                }

                                </div>
                            );
                        })
                }
            </Tutorial>
        );
    }
}

module.exports = Colors;