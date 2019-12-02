import React from "react";
import ReactDOM from "react-dom";

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

import { fetchVersions } from "./fetchVersions";

class LandingPage extends React.Component {

    state = {
        endUser: {},
        uiLibrary: {}
    }

    componentDidMount() {
        const setVersions = product => fetchVersions(
            versions => {
                this.setState({
                    [product]: {
                        versions,
                        error: !versions
                    }
                });
            },
            error => {
                this.setState({
                    [product]: {
                        error
                    }
                });
            }
        );

        setVersions("endUser")("./end-user/");
        setVersions("uiLibrary")("./");
    }

    _getDemoLink = (value) => {
        return `${value}/`;
    }

    _getVersionLink = (version) => {
        return this._getDemoLink(version.value);
    }

    _getDocumentationLink = (version) => `${this._getVersionLink(version)}#/?root=Documentation`;

    _getComponentsLink = (version) => (
        `${this._getVersionLink(version)}#/` +
        `?selectedSection=BasicInputs&selectedNode=Checkbox&root=Components`
    );
    _getTemplatesLink = (version) => (
        `${this._getVersionLink(version)}#/` +
        `?selectedSection=Actionstemplate&selectedNode=Actionstemplate&root=Templates`
    );

    _handleVersionSelect = ({ value }) => {
        window.location.href = this._getDemoLink(value);
    }

    render() {
        const { uiLibrary, endUser } = this.state;

        const libStable = uiLibrary.versions && uiLibrary.versions[1];
        const libSnapshot = uiLibrary.versions && uiLibrary.versions[0];

        return (
            <div className="main">
                <Stack gap="LG" className="content">
                    <img src={libLogo} width="490px" height="141px" />
                    <div>
                        {!uiLibrary.error &&
                            <Button
                                className="landing-button"
                                label={libStable ? `${libStable.label} Release` : `x.x.x Release`}
                                type="primary"
                                href={libStable && this._getVersionLink(libStable)}
                                loading={!libStable}
                            />
                        }

                        {!endUser.error &&
                            <Button
                                className="landing-button landing-button--ghost"
                                label={endUser.versions ? `End User ${endUser.versions[0].label}` : "End User x.x.x"}
                                href={endUser.versions && `end-user/${endUser.versions[0].value}/`}
                                loading={!endUser.versions}
                            />
                        }
                    </div>
                    <div>
                        {!uiLibrary.error &&
                            <Button
                                label={libSnapshot ? `${libSnapshot.label} Snapshot` : "x.x.x Snapshot"}
                                href={uiLibrary.versions && this._getVersionLink(libSnapshot)}
                                loading={!libSnapshot}
                                type={"link"}
                            />
                        }

                        {uiLibrary.versions && uiLibrary.versions.length > 2 &&
                            [<span className="space-right-sm">|</span>,
                                <LinkDropDownList
                                    flags={["v4"]}
                                    label="Older Versions"
                                    className="version-dropdown"
                                    options={uiLibrary.versions.slice(2)}
                                    onClick={this._handleVersionSelect}
                                />]
                        }
                        {uiLibrary.error &&
                            <Text type="error">
                                <Icon iconName="alert" type="inline" />
                                Can't Load UI Library Versions
                            </Text>
                        }
                        {endUser.error &&
                            <Text type="error">
                                <Icon iconName="alert" type="inline" />
                                Can't Load End User Versions
                            </Text>
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
                                    href={libStable ? this._getDocumentationLink(libStable) : null}
                                    disabled={!libStable}
                                >Documentation</Link>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card__icon" src={componentsIcon} />
                            <div className="card__description">
                                <p>Play with demos of the components, view code samples, and get API documentation.</p>
                                <Link
                                    className="card__link"
                                    href={libStable ? this._getComponentsLink(libStable) : null}
                                    disabled={!libStable}
                                >Components</Link>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card__icon" src={templatesIcon} />
                            <div className="card__description">
                                <p>View real examples of page layouts based on designs for product features.</p>
                                <Link
                                    className="card__link"
                                    href={libStable ? this._getTemplatesLink(libStable) : null}
                                    disabled={!libStable}
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
