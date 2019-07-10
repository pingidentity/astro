import React from "react";
import { v2 as FileUpload } from "../../../components/forms/file-upload";
import DetailsTooltip from "../../../components/tooltips/DetailsTooltip";
import Button from "../../../components/buttons/Button";
import Image, { imageSizes } from "../../../components/general/Image";
import InputRow from "../../../components/layout/InputRow";
import ButtonGroup from "../../../components/layout/ButtonGroup";
import { allFlags } from "../../../util/FlagUtils";

/**
* @name FileUploadDemo
* @memberof FileUpload
* @desc A demo for FileUpload
*/
export default class FileUploadDemo extends React.Component {
    state = {
        file3: "none",
        file1: "none",
        file2: "favicon.png (4762 bytes)",
        status3: "",
        thumb3: "src/demo/images/favicon.png",
        tooltipOpen: false,
        tooltipConfirmed: ""
    };

    static flags = ["true-default"]

    _getFile = (e) => {
        return e && e.target && e.target.files && e.target.files[0];
    };

    _onChange1 = (e) => {
        var file = this._getFile(e);

        this.setState({ file1: file ? file.name : "none" });
    };

    _onRemove1 = () => {
        this.setState({ file1: "none" });
    };

    _onChange2 = (e) => {
        var file = this._getFile(e);
        this.setState({ file2: file ? (file.name + " " + "(" + file.size + " bytes)") : "none" });
    };

    _onRemove2 = () => {
        this.setState({ file2: "none" });
        this.statelessFileUpload.resetComponent();
    };

    _onChange3 = () => {
        this.setState({
            file3: "something",
            thumb3: "src/demo/images/favicon.png",
            status3: "onChange callback triggered"
        });
    };

    _onRemove3 = () => {
        this.setState({
            file3: undefined,
            thumb3: undefined,
            status3: "onRemove callback triggered"
        });
        this.fileUploadStateless.resetComponent();
    };

    _toggleTooltip = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen,
            tooltipConfirmed: ""
        });
    };

    /*
     * Simple error handling function to log errors to the console.
     */
    _onError = (errorCode) => {
        // TODO replace with messaging when messaging ported
        console.log("Error in file upload: " + errorCode);
    };

    /*
     * Simple validating function that always returns valid.
     */
    _fileValidator = (file) => {
        if (file) {
            if (file.size > 102400) {
                return "Opps, too big for me (100Kb max)";
            }

            if (file.type !== "image/png") {
                return "Sorry, can handle only PNG.";
            }
        }
    };

    render() {
        return (
            <div>
                <InputRow>
                    <FileUpload
                        labelText="Basic File Input"
                        onError={this._onError}
                        accept=""
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                        fileName="first-one"
                    />
                </InputRow>

                <InputRow>
                    <FileUpload
                        labelText="Image File Input with a Max Size"
                        data-id="fileUpload"
                        maxFileSizeKb={4096}
                        showThumbnail={true}
                        onChange={this._onChange1}
                        onRemove={this._onRemove1}
                        onError={this._onError}
                        labelMaxFileSize="Max Size 4MB"
                        accept="image/jpeg, image/jpg, image/png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                        name="second-one"
                        defaultImage="src/demo/images/favicon.png"
                    />
                    <br /><br />
                    Selected file = {this.state.file1}
                </InputRow>

                <InputRow>
                    <FileUpload
                        ref={(component) => {
                            if (component) {
                                this.statelessFileUpload = component.refs.FileUploadStateful;
                            }
                        }}
                        labelText="File Input with Default on Page Load"
                        accept="image/png"
                        validator={this._fileValidator}
                        showThumbnail={true}
                        onChange={this._onChange2}
                        onRemove={this._onRemove2}
                        onError={this._onError}
                        defaultImage="src/demo/images/favicon.png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                    <br /><br />
                    Selected file = {this.state.file2}
                </InputRow>

                <InputRow>
                    <FileUpload
                        labelText="File Input with component as default image"
                        accept="image/png"
                        validator={this._fileValidator}
                        showThumbnail={true}
                        onChange={this._onChange2}
                        onRemove={this._onRemove2}
                        onError={this._onError}
                        defaultImage={<Image source="src/demo/images/favicon.png" size={imageSizes.FULL} />}
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                </InputRow>

                <InputRow>
                    <label className="detached">
                        File Input in a Tooltip
                    </label>
                    <DetailsTooltip
                        placement={DetailsTooltip.tooltipPlacements.TOP_RIGHT}
                        title="File Input in a Details Tooltip"
                        open={this.state.tooltipOpen}
                        onToggle={this._toggleTooltip}
                        label="Toggle Tooltip"
                        flags={allFlags}
                    >

                        <InputRow>
                            <FileUpload
                                labelText="Select a File"
                                onError={this._onError}
                                data-id="uploadedFile"
                                accept=""
                                buttonText="Choose a File"
                                stacked={true}
                                labelSelect="Choose a File"
                                labelRemove="Remove"
                            />
                        </InputRow>
                        <ButtonGroup
                            data-id="delete-confirmation"
                            onCancel={this._toggleTooltip}
                        >
                            <Button
                                label="Confirm"
                                data-id="confirm-action"
                                type="primary"
                                onClick={this._toggleTooltip}
                            />
                        </ButtonGroup>
                    </DetailsTooltip>
                </InputRow>

                <InputRow>
                    <label className="detached">
                        Stateless File Input
                    </label>
                    <div className="attention">
                        Note that it is recommended that the stateful version of this component be used since
                        it performs all of the file parsing involved when handling files in javascript. For that reason,
                        this example is not fully functional and is meant to illustrate the various hooks and
                        precautions for using this component in its stateless form. Inspection of the stateful version
                        code will more clearly show how the file handling is performed.
                    </div>
                    <FileUpload
                        data-id="statelessFileUpload"
                        ref={(component) => {
                            if (component && !this.fileUploadStateless) {
                                this.fileUploadStateless = component.refs.FileUploadStateless;
                            }
                        }}
                        stateless={true}
                        fileName={this.state.file3}
                        onChange={this._onChange3}
                        onRemove={this._onRemove3}
                        onError={this._onError}
                        showThumbnail={true}
                        thumbnailSrc={this.state.thumb3}
                        accept="image/jpeg, image/jpg, image/png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                    <br /><br />
                    Input status = {this.state.status3}

                    <div className="attention">
                        <p>
                            Also note that when using the stateless component, unexpected behavior can occur when
                            selecting a file, removing it, then adding the same file again. In some browsers the
                            onChange event will not trigger for the second file selection.
                        </p>
                        <p>
                            To circumvent this issue there is a public function named "resetComponent" in the stateless
                            file-upload component that should be called in your onRemove callback function. This will
                            properly reset/clear your file input regardless of the browser.
                        </p>
                        <p>
                            See the source code for the above demo for an example of this being used.
                        </p>
                    </div>
                </InputRow>

            </div>
        );
    }
}
