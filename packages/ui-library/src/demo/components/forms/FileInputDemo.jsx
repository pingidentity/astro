
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
                        fileData={(
                            <span>
                                Valid <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                            </span>
                        )}
                        onValidateFile={this._handleFileValidation}
                        onValueChange={this._handleChange}
                        onRemove={this._handleRemove}
                        status={ this.state.loading ? { type: "loading", label: "Loading..." } :null }
                        selectedTitle="Certificate"
                        error={errorTypes.WARNING}
                    />
                </InputRow>

                <p>
                    file input with icon added to file
                </p>
                <InputRow>
                    <FileInput
                        accept={["text/csv", "image/jpeg", "image/png", "pdf"]}
                        fileName={this.state.selectedFile2 &&
                        <FlexRow spacing={spacingOptions.SM}>
                            <span>{this.state.selectedFile2}</span>
                            <StatusIndicator type={Types.SUCCESS} />
                        </FlexRow>}
                        iconRight="success-round"
                        fileData={(
                            <span>
                                Valid <Text inline type="value">04-15</Text> to <Text inline type="value">09-17</Text>
                            </span>
                        )}
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
