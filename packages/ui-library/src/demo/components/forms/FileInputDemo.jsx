
import React from "react";
import FileInput, { errorTypes } from "../../../components/forms/FileInput";
import Text from "../../../components/general/Text";
import FormCheckbox from "../../../components/forms/FormCheckbox";
import InputRow from "../../../components/layout/InputRow";
import FlexRow, { spacingOptions } from "../../../components/layout/FlexRow";
import StatusIndicator, { Types } from "../../../components/general/StatusIndicator";
/**
* @name FileInputDemo
* @memberof FileInput
* @desc A demo for FileInput
*/
class FileInputDemo extends React.Component {
    state = {
        fileStatus: "no file selected yet",
        loading: false,
    }

    _handleChange = (file) => {
        this.setState({
            selectedFile: file.name,
            fileStatus: "file selected"
        });
    }

    _handleRemove = () => {
        this.setState({
            selectedFile: null,
            fileStatus: "file removed",
        });
    }

    _handleChange1 = (file) => {
        this.setState({
            selectedFile1: file.name,
        });
    }

    _handleRemove1 = () => {
        this.setState({
            selectedFile1: null,
        });
    }

    _handleFileValidation1 = (valid) => {
        if (!valid) {
            this.setState({
                fileStatus: "invalid file type selected"
            });
        }
    }

    _handleChange2 = (file) => {
        this.setState({
            selectedFile2: file.name,
        });
    }

    _handleRemove2 = () => {
        this.setState({
            selectedFile2: null,
        });
    }

    _handleFileValidation = (valid) => {
        if (!valid) {
            this.setState({
                fileStatus: "invalid file type selected"
            });
        }
    }

    _toggleLoading = () => {
        this.setState({ loading: !this.state.loading });
    }

    render() {
        return (
            <div>
                <p>
                    status: {this.state.fileStatus}
                </p>
                <InputRow>
                    <FileInput
                        accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                        fileName={this.state.selectedFile}
                        onValidateFile={this._handleFileValidation}
                        onValueChange={this._handleChange}
                        onRemove={this._handleRemove}
                        status={ this.state.loading ? { type: "loading", label: "Loading..." } :null }
                        selectedTitle="Certificate"
                    />
                </InputRow>


                <p>
                    With error state
                </p>
                <InputRow>
                    <FileInput
                        accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                        fileName={this.state.selectedFile1}
                        fileData={(
                            <span>
                                Valid <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                            </span>
                        )}
                        onValidateFile={this._handleFileValidation1}
                        onValueChange={this._handleChange1}
                        onRemove={this._handleRemove1}
                        status={ this.state.loading ? { type: "loading", label: "Loading..." } :null }
                        selectedTitle="Certificate"
                        error={errorTypes.ERROR}
                    />
                </InputRow>

                <p>
                    required state button
                </p>
                <InputRow>
                    <FileInput
                        accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                        fileName={this.state.selectedFile1}
                        fileData={(
                            <span>
                                Valid <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                            </span>
                        )}
                        onValidateFile={this._handleFileValidation1}
                        onValueChange={this._handleChange1}
                        onRemove={this._handleRemove1}
                        status={ this.state.loading ? { type: "loading", label: "Loading..." } :null }
                        selectedTitle="Certificate"
                        error={errorTypes.WARNING}
                        required
                    />
                </InputRow>


                <p>
                    file input with icon added to file and no border
                </p>
                <InputRow>
                    <FileInput
                        accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                        fileName={this.state.selectedFile2 &&
                        <FlexRow spacing={spacingOptions.SM}>
                            <span>{this.state.selectedFile2}</span>
                            <StatusIndicator type={Types.SUCCESS} />
                        </FlexRow>}
                        fileData={(
                            <span>
                                Valid <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                            </span>
                        )}
                        noBorder
                        onValidateFile={this._handleFileValidation}
                        onValueChange={this._handleChange2}
                        onRemove={this._handleRemove2}
                        status={ this.state.loading ? { type: "loading", label: "Loading..." } :null }
                        selectedTitle="Certificate"
                    />
                </InputRow>
                <InputRow>
                    <FormCheckbox
                        label="Loading state"
                        onChange={this._toggleLoading}
                        flags={["p-stateful"]}
                        checked={this.state.loading}
                    />
                </InputRow>
            </div>
        );
    }
}

module.exports = FileInputDemo;
