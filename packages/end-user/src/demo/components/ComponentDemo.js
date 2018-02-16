import React from "react";
import reactElementToString from "../utils/reactElementToString";
import highlight from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import htmlFromReact from "../utils/htmlFromReact";


class ComponentDemo extends React.Component {

    _getSource = () => {
        return highlight.highlight("html", htmlFromReact(this.props.children)).value;
    }

    _getReactSource = () => {
        return highlight.highlight("html", reactElementToString(this.props.children)).value;
    }

    render = () => {
        return (
            <div className="component-demo">
                <div className="component-demo__preview">{this.props.children}</div>
                <div className="component-demo__markup">
                    <div className="component-demo__code">
                        <label className="component-demo__preview-label">React</label>
                        <pre dangerouslySetInnerHTML={{__html: this._getReactSource()}}/>
                    </div>
                    <div className="component-demo__code">
                        <label className="component-demo__preview-label">HTML</label>
                        <pre dangerouslySetInnerHTML={{__html: this._getSource()}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComponentDemo;
