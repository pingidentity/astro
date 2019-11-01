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
import Text from "../src/components/general/Text";
import Icon from "../src/components/general/Icon";

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

                    const getVersionLabel = (version, index) => {
                        const versionNumber = version.replace("-SNAPSHOT", "");
                        return index > 0 ? versionNumber : `${versionNumber}-SNAPSHOT`;
                    }

                    this.setState({
                        stableVersion: versionList[1].replace("-SNAPSHOT", ""),
                        versionOptions: versionList.map(
                            function (version, index) {
                                return {
                                    label: getVersionLabel(version, index),
                                    value: version
                                };
                            }
                        )
                    });
                } else {
                    // probably local
                    this.setState({
                        stableVersion: "",
                        error: true,
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

    _getStableVersionLink = () => `${this.state.stableVersion}/index.html`;

    _getDocumentationLink = () => `${this.state.stableVersion}/index.html#/?root=Documentation`;
    _getComponentsLink = () => (
        `${this.state.stableVersion}/index.html#/` +
        `?selectedSection=BasicInputs&selectedNode=Checkbox&root=Components`
    );
    _getTemplatesLink = () => (
        `${this.state.stableVersion}/index.html#/` +
        `?selectedSection=Actionstemplate&selectedNode=Actionstemplate&root=Templates`
    );

    _handleVersionSelect = ({ value }) => this._gotoDemoVersion(value);

    _versionToNumber = version => {
        const numbers = version.replace("-SNAPSHOT", "").split(".").map(string => string * 1); // parseInt didn't work
        return (numbers[0] * 1000 * 1000) + (numbers[1] * 1000) + numbers[2];
    }

    _sortVersions = versions => versions.slice().sort(
        (first, second) => ((this._versionToNumber(first) < this._versionToNumber(second)) ? 1 : -1)
    );

    _filterVersions = versions => versions.filter((version, index, list) => (
        (index <= 0) || (list[index - 1].match(/^[^\.]*\.[^\.]*/)[0] !== version.match(/^[^\.]*\.[^\.]*/)[0])
    ));

    _hasVersions = () => this.state.versionOptions.length > 0;

    render() {
        return (
            <div className="main">
                <Stack gap="LG" className="content">
                    <img src={libLogo} width="490px" height="141px" />
                    <div>
                        {!this.state.error &&
                            <Button
                                className="landing-button"
                                label={`${this.state.stableVersion} Release`}
                                type="primary"
                                href={this._getStableVersionLink()}
                                loading={!this._hasVersions()}
                            />
                        }
                        <Button
                            className="landing-button landing-button--ghost"
                            label="End-User"
                            href="end-user/"
                        />
                    </div>
                    <div>
                        {this._hasVersions() &&
                            <LinkDropDownList
                                flags={["v4"]}
                                label="All Versions"
                                className="version-dropdown"
                                options={this.state.versionOptions}
                                onClick={this._handleVersionSelect}
                            />
                        }
                        {this.state.error &&
                            <Text type="error"><Icon iconName="alert" type="inline" /> Can't Load Versions</Text>
                        }
                    </div>
                    <Stack gap="MD">
                        <div className="card">
                            <img className="card__icon" src={documentationIcon} />
                            <div className="card__description">
                                <p>
                                    Get up to speed on basic usage of the library
                                    and read release notes for the different versions.
                                </p>
                                <Link
                                    className="card__link"
                                    href={this._hasVersions() ? this._getDocumentationLink() : null}
                                    disabled={!this._hasVersions()}
                                >Documentation</Link>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card__icon" src={componentsIcon} />
                            <div className="card__description">
                                <p>Play with demos of the components, view code samples, and get API documentation.</p>
                                <Link
                                    className="card__link"
                                    href={this._hasVersions() ? this._getComponentsLink() : null}
                                    disabled={!this._hasVersions()}
                                >Components</Link>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card__icon" src={templatesIcon} />
                            <div className="card__description">
                                <p>View real examples of page layouts based on designs for product features.</p>
                                <Link
                                    className="card__link"
                                    href={this._hasVersions() ? this._getTemplatesLink() : null}
                                    disabled={!this._hasVersions()}
                                >Templates</Link>
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
