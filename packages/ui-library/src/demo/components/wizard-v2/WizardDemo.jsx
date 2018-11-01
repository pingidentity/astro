import React from "react";
import Wizard, { Step } from "../../../components/wizard-v2/Wizard";
import TileSelector from "../../../components/buttons/TileSelector";
import FormTextField from "../../../components/forms/form-text-field";
import FormTextArea from "../../../components/forms/form-text-area";
import FileUpload from "../../../components/forms/file-upload";
import Multivalues from "../../../components/forms/Multivalues";
import Button from "../../../components/buttons/Button";
import _ from "underscore";

import DataTableScreen from "./screens/DataTableScreen";
import DragScreen from "./screens/DragScreen";

import Utils from "ui-library/lib//util/Utils";
import fixOrientation from "fix-orientation";
import readExif from "exif-js";
import InputWidths from "../../../components/forms/InputWidths";

/**
* @name WizardDemo2
* @memberof Wizard
* @desc A demo for Wizard v2
*/


class WizardDemo extends React.Component {
    state = {
        activeStep: 0,
        numSteps: 5,
        currentApp: {},
        applications: [],
        headerColumns: null,
        show: null,
        messageProps: null
    };

    _updateCurrentApp = (property, value) => {
        let app = _.clone(this.state.currentApp);
        app[property] = value;
        this.setState({ currentApp: app });
    };


    _fileReadSuccess = (file, contentUrl) => {
        var self = this;

        this._updateCurrentApp("thumbnailSrc", contentUrl);

        if (contentUrl && file.type.match(/^image\/jpe?g$/i)) {
            //try to read exif data the base64 data was passed
            readExif.getData(file, function () {
                if (this.exifdata.Orientation) {
                    //correct and display the image according to the exif orientation
                    fixOrientation(contentUrl, { image: true }, function (fixedImgContentUrl) {
                        self._updateCurrentApp("thumbnailSrc", fixedImgContentUrl);
                        //self.props.onPreviewReady(fixedImgContentUrl);
                    });
                }
            });
        }
    };

    _readFile = (file) => {
        var reader = new FileReader();

        reader.onloadend = function () { this._fileReadSuccess(file, reader.result); }.bind(this);
        reader.onerror = function () { throw new Error(); }.bind(this);
        reader.readAsDataURL(file);
    };

    _processWithHtml5Api = (file, path) => {
        this.setState({
            fileName: Utils.stripFakePath(path)
        });

        try {


            if (file.type.match("image.*")) {
                this._readFile(file);
            } else {
                this._processSimple();
            }
        } catch (err) {
            throw new Error();
        }
    };

    _processSimple = () => {
        this.setState({ errorMessage: "", thumbnailSrc: "" });
    };

    _process = (files, path) => {
        if (files && files[0]) {
            if (Utils.isHtmlFileApiSupported()) {
                this._processWithHtml5Api(files[0], path);
            } else {
                this._processSimple();
            }
        }
    };

    _onFileSelect= (e) => {
        this._process(e.target.files, e.target.value);
    };

    _updateCurrentApp = (property, value) => {
        let app = _.clone(this.state.currentApp);
        app[property] = value;
        this.setState({ currentApp: app });
    }

    hideLoader = () => {
        this.setState({
            loading: false,
        });
    }

    hideMessage = () => {
        this.setState({
            messageProps: null,
        });
    }

    showMessage = () => {
        this.setState({
            messageProps: {
                messages: [
                    {
                        text: "New Message added",
                        type: "notice",
                    }
                ]
            },
        });
    }

    onNext = () => {
        let nextState = {
            activeStep: this.state.activeStep < this.state.numSteps - 1
                ? this.state.activeStep + 1
                : this.state.numSteps - 1
        };

        if (this.state.activeStep === 1) {
            nextState.loading = true;

            setTimeout(() => {
                this.hideLoader();
                this.showMessage();
                setTimeout(this.hideMessage, 3000);
            }, 500);

        } else {
            nextState.loading = true;
            setTimeout(this.hideLoader, 500);
        }

        this.setState(nextState);
    }

    _onOpen = () => {
        this.setState({ open: true });
    }

    _onClose = () => {
        this.setState({ open: null, activeStep: 0, currentApp: {} });
    }

    _onSave = () => {
        const newApp = _.clone(this.state.currentApp);
        const apps = _.clone(this.state.applications);

        apps.push(newApp);

        this.setState({ applications: apps, open: false, activeStep: 0, currentApp: {} });
    }

    _onMenuClick = (step) => {
        this.setState({ activeStep: step });
    }

    _onTileSelect = (value) => {
        this._updateCurrentApp("selectedTile", value);
        this.onNext();
    }

    _onAppNameChange = (value) => {
        this._updateCurrentApp("appName", value);
    }

    _onAppDescChange = (value) => {
        this._updateCurrentApp("appDesc", value);
    }

    _onRedirUrlChange = (urls) => {
        this._updateCurrentApp("urls", urls);
    }

    _onAccessChange = (items) => {
        this._updateCurrentApp("access", items);
    }

    render() {
        const headerItems = this.state.activeStep > 1
            ? [
                { title: "Name", value: this.state.currentApp.appName },
                { title: "Description", value: this.state.currentApp.appDesc },
            ] : null;

        const options = [
            {
                id: "Web App",
                title: "Web App",
                iconName: "network",
                description: "Cloud-based apps that are accessed within a browser."
            },
            {
                id: "Native App",
                title: "Native App",
                iconName: "device",
                description: "Applications that are stored and run from a device or desktop."
            },
            {
                id: "Single Page App",
                title: "Single Page App",
                iconName: "apps",
                description: "Just a bit of text."
            },
            {
                id: "Non-Interactive",
                title: "Non-Interactive",
                iconName: "non-interactive",
                description: "Cloud-based apps that are accessed within a browser."
            }
        ];

        return ([
            <Button key="wizard-button" onClick={this._onOpen}>Show Wizard Example</Button>,
            (this.state.open &&
                <Wizard
                    data-id="wizard-demo"
                    key="wizard"
                    onNext={this.onNext}
                    onCancel={this._onClose}
                    onClose={this._onClose}
                    activeStep={this.state.activeStep}
                    onMenuClick={this._onMenuClick}
                    messageProps={this.state.messageProps}
                    headerItems={headerItems}>

                    <Step
                        completed={this.state.activeStep > 0}
                        title="Select App Type"
                        menuDescription="Tell us what type of application you would like to add."
                        description="Adding a new application to your environment allows your Customers controlled
                            access to it. Their are several different application technologies to choose from that
                            accommodate the majority of applications."
                        clickDisabled={true}
                        continueDisabled={!this.state.currentApp.selectedTile}
                        hideMenu={true}
                        hideButtonBar={true}
                        loading={this.state.loading}
                        required>


                        <div className="text-section-title space-bottom-md">Select an application type</div>
                        <TileSelector
                            onValueChange={this._onTileSelect}
                            selected={this.state.currentApp.selectedTile}
                            options={options}
                        />
                    </Step>
                    <Step
                        continueDisabled={!this.state.currentApp.appName}
                        completed={this.state.activeStep > 1}
                        title="Create App Profile"
                        menuDescription="Personalize your application."
                        description="Personalize your application by creating a unique profile. The description will
                            help your customers identify the purpose of the application andprovide important
                            information to misguided connections."
                        onSave={this.onNext}
                        loading={this.state.loading && "loading step 1"}
                        required>
                        <div className="input-row">
                            <FormTextField
                                width={InputWidths.MD}
                                labelText="Application Name"
                                value={this.state.currentApp.appName}
                                onValueChange={this._onAppNameChange}
                                required
                            />
                        </div>
                        <div className="input-row">
                            <FormTextArea
                                width={InputWidths.XL}
                                rows={4}
                                labelText="Description"
                                placeholder="Describe you application to your user"
                                value={this.state.currentApp.appDesc}
                                onValueChange={this._onAppDescChange}
                            />
                        </div>
                        <FileUpload
                            accept="image/jpeg, image/jpg, image/png"
                            labelText="Icon"
                            showThumbnail={true}
                            maxFileSizeKb={4096}
                            labelMaxFileSize="Max Size 1MB"
                            onChange={this._onFileSelect}
                            onRemove={this._onFileRemove}
                            labelSelect="Choose a File"
                            labelRemove="Remove"
                        />
                    </Step>
                    <Step
                        completed={this.state.activeStep > 2}
                        title="Configure"
                        description="Add a Redirect URL (optional)"
                        loading={this.state.loading}
                        required>
                        <Multivalues
                            labelText="Re-Direct URLs"
                            entries={this.state.currentApp.urls}
                            onValueChange={this._onRedirUrlChange}
                            stacked={true}
                        />
                    </Step>
                    <Step
                        completed={this.state.activeStep > 3}
                        title="Grant Access to Your Application"
                        menuDescription="Provide access to your application for customers to authenticate."
                        description='Applications are granted OAuth scopes so they can access our resources. On the
                            left is a list of OAuth scopes by resource type that can be added to the "Access Grants"
                            column on the right. After moving the desired scopes the Access Grants column you can
                            save your selections.'
                        loading={this.state.loading && "loading step 3"}
                        required>
                        <DragScreen onChange={this._onAccessChange}/>
                    </Step>
                    <Step
                        completed={this.state.activeStep > 4}
                        title="Confirm and Save"
                        description="Check all app details before publishing to your app directory."
                        onSave={this._onSave}
                        loading={this.state.loading}
                        required>
                        <DataTableScreen {...this.state.currentApp} />
                    </Step>
                </Wizard>
            )
        ]);
    }
}

module.exports = WizardDemo;
