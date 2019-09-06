import React from "react";
import ReactDOM from "react-dom";
import fetch from "isomorphic-fetch";
// isomorphic-fetch need a Promise polyfill for older browsers.
// Promise use inside of fetch, fetch should go with Promise to avoid page crashing in IE.
import "es6-promise"; // eslint-disable-lint;


// the CSS files will be compiled by a webpack plugin
// and injected into the head section of the HTML page by another plugin
import "../src/css/ui-library.scss"; // UI Library styles
import "../src/demo/css/ui-library-demo.scss"; // UI Library demo styles
import "./assets/css/landing.scss";

import LinkDropDownList from "../src/components/forms/LinkDropDownList";
import Button from "../src/components/buttons/Button";
import Stack from "../src/components/layout/Stack";
import Link from "../src/components/general/Link";
import libLogo from "./assets/images/logo-uilibrary.svg";
import pingLogo from "./assets/images/ping-logo.svg";
import documentationIcon from "./assets/images/documentation-icon.svg";
import componentsIcon from "./assets/images/components-icon.svg";
import templatesIcon from "./assets/images/templates-icon.svg";

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        fetch("versions.json?_=" + new Date().getTime())
            .then(function (resp) {
                if (resp.status >= 400) {
                    throw new Error("Could not get versions from server.");
                }

                return resp.json();
            })
            .then(function (versions) {
                if (versions && versions.length > 0) {
                    const versionList = this._filterVersions(this._sortVersions(versions));

                    this.setState({
                        stableVersion: versionList[1].replace("-SNAPSHOT", ""),
                        versionOptions: versionList.map(
                            function (version, index) {
                                return {
                                    label: index > 0 ? version.replace("-SNAPSHOT", "") : version,
                                    value: version
                                };
                            }
                        )
                    });
                } else {
                    // probably local
                    this.setState({
                        stableVersion: "",
                    });
                }
            }.bind(this));
    }

    state = {
        versionOptions: [],
        stableVersion: "",
    };

    _gotoDemoVersion = (version) => {
        window.location.href = `${version}/index.html`;
    };

    _getStableVersionLink = () => `${this.state.stableVersion}-SNAPSHOT/index.html`;

    _getDocumentationLink = () => `${this.state.stableVersion}-SNAPSHOT/index.html#/?root=Documentation`;
    _getComponentsLink = () => (
        `${this.state.stableVersion}-SNAPSHOT/index.html#/` +
        `?selectedSection=BasicInputs&selectedNode=Checkbox&root=Components`
    );
    _getTemplatesLink = () => (
        `${this.state.stableVersion}-SNAPSHOT/index.html#/` +
        `?selectedSection=Actionstemplate&selectedNode=Actionstemplate&root=Templates`
    );

    _handleVersionSelect = ({ value }) => this._gotoDemoVersion(value);

    _versionToNumber = version => {
        const numbers = version.replace("-SNAPSHOT", "").split(".").map(string => string * 1); // parseInt didn't work
        return (numbers[0] * 1000 * 1000) + (numbers[1] * 1000) + numbers[0];
    }

    _sortVersions = versions => versions.slice().sort(
        (first, second) => ((this._versionToNumber(first) < this._versionToNumber(second)) ? 1 : -1)
    );

    _filterVersions = versions => versions.filter((version, index, list) => (
        (index <= 0) || (list[index - 1].match(/^[^\.]*\.[^\.]*/)[0] !== version.match(/^[^\.]*\.[^\.]*/)[0])
    ));

    render() {
        return (
            <div className="main">
                <Stack gap="LG" className="content">
                    <img src={libLogo} width="490px" height="141px" />
                    <div>
                        <Button
                            className="landing-button"
                            label={`${this.state.stableVersion} Release`}
                            type="primary"
                            href={this._getStableVersionLink()}
                        />
                        <Button
                            className="landing-button landing-button--ghost"
                            label="End-User"
                            href="end-user/"
                        />
                        {false && // removing this until the beta demo site is in place
                            <Button
                                className="landing-button landing-button--ghost"
                                label="4.0.0 Beta"
                                href="beta/index.html"
                            />
                        }
                    </div>
                    <div>
                        <LinkDropDownList
                            flags={["v4"]}
                            label="All Versions"
                            className="version-dropdown"
                            options={this.state.versionOptions}
                            onClick={this._handleVersionSelect}
                        />
                    </div>
                    <Stack gap="MD">
                        <div className="card">
                            <img className="card__icon" src={documentationIcon} />
                            <div className="card__description">
                                <p>
                                    Get up to speed on basic usage of the library
                                    and read release notes for the different versions.
                                </p>
                                <Link className="card__link" href={this._getDocumentationLink()}>Documentation</Link>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card__icon" src={componentsIcon} />
                            <div className="card__description">
                                <p>Play with demos of the components, view code samples, and get API documentation.</p>
                                <Link className="card__link" href={this._getComponentsLink()}>Components</Link>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card__icon" src={templatesIcon} />
                            <div className="card__description">
                                <p>View real examples of page layouts based on designs for product features.</p>
                                <Link className="card__link" href={this._getTemplatesLink()}>Templates</Link>
                            </div>
                        </div>
                    </Stack>
                </Stack>
                <div className="splash" />
                <img className="ping-logo" src={pingLogo} />
            </div>);
    }
}

ReactDOM.render(<LandingPage />, document.getElementById("landing"));
