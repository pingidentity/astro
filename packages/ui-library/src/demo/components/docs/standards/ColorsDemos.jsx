import React from "react";
import _ from "underscore";
import FlexRow from "ui-library/lib/components/layout/FlexRow";

export const semantics = [
    {
        name: "active-blue",
        value: "#2996cc",
    },
    {
        name: "success green",
        value: "#4aba78",
    },
    {
        name: "warning-yellow",
        value: "#eeb91c",
    },
    {
        name: "critical-red",
        value: "#a31300",
    },
    {
        name: "warning-text",
        value: "#96702c",
    },
];

export const neutrals = [
    "#575f67",
    "#686f77",
    "#798087",
    "#8b9197",
    "#9da2a8",
    "#afb4b8",
    "#c2c6ca",
    "#d5d8db",
    "#e8ebed",
    "#f8f8f8",
];

export const strongs = [
    "#3d454d",
    "#515960",
    "#676e75",
    "#7d8389",
    "#93999f",
    "#abb0b4",
    "#c3c7cb",
    "#dbdfe2",
    "#f4f7f9",
];

export const accents = [
    "#5f748b",
    "#4b637c",
    "#738599",
    "#8797a8",
    "#9ba9b8",
    "#b0bcc7",
    "#c5cfd7",
    "#dae2e7",
    "#f0f6f7",
];

export const ColorScale = ({ name, colors }) => (
    <div>
        <strong>{name}</strong>
        <div>
            {colors.map(color => (
                <div key={color} style={{
                    display: "inline-block",
                    width: "80px",
                    textAlign: "center",
                }}>
                    <div style={{
                        height: "80px",
                        background: color,
                    }}/>
                    {color}
                </div>
            ))}
        </div>
    </div>
);

export const ColorSwatches = ({ colors }) => (
    <FlexRow spacing="md">
        {
            _.map(colors, (color, index) => {
                return (
                    <div key={index} style={{
                        display: "inline-block",
                        width: "120px",
                        textAlign: "center",
                        verticalAlign: "top",
                    }}>
                        <div style={{
                            display: "inline-block",
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            backgroundColor: color.value,
                            marginBottom: "15px",
                        }}
                        /><br />
                        <strong>
                            {color.name}
                        </strong>
                        <div>
                            {color.value}
                        </div>
                    </div>
                );
            })
        }
    </FlexRow>
);

