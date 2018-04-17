import React from "react";
import _ from "underscore";

export default (props) => {
    return ([
        <div className="data" key="data-1">
            <div className="page-section-title">Profile</div>
            <div className="data-group data-section">
                <div className="data-item">
                    <label><span>Application Name</span></label>
                    <span>{props.appName}</span>
                </div>
                <div className="data-item">
                    <label><span>Application Type</span></label>
                    <span>{props.selectedTile}</span>
                </div>
                <div className="data-item">
                    <label><span>Application Icon</span></label>
                    <span><img style={{ maxHeight: "50px", maxWidth: "50px" }}src={props.thumbnailSrc} /></span>
                </div>
                <div className="data-item">
                    <label><span>Application ID</span></label>
                    <span>{props.appId}</span>
                </div>
            </div>
        </div>,
        <div className="data" key="data-2">
            <div className="page-section-title">Configuration</div>
            <div className="data-group data-section">
                <div className="data-item">
                    <label><span>URLs</span></label>
                    {_.map(props.urls, (url, i) => [<div key={i}>{url}</div>])}
                </div>
            </div>
        </div>,
        <div className="data" key="data-3">
            <div className="page-section-title">Access Grants By Scopes</div>
            <div className="data-group data-section">
                {_.map(props.access, (item, i) => {
                    return (
                        <div className="data-item" key={i}>
                            <label>{item.name}</label>
                            {item.category}
                        </div>
                    );
                })}
            </div>
        </div>
    ]);
};
