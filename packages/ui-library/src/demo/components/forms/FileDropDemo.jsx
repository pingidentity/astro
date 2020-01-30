
import React from "react";
import FileDrop from "../../../components/forms/FileDrop";

/**
* @name FileDropDemo
* @memberof FileDrop
* @desc A demo for FileDrop
*/
class FileDropDemo extends React.Component {
    state = {
        selectedFile: null,
        fileStatus: null,
    }

    _handleChange = (file) => {
        this.setState({
            selectedFile: file.name,
        });
    }

    _handleRemove = () => {
        this.setState({
            selectedFile: null,
            fileStatus: null,
        });
    }

    _handleFileValidation = (valid) => {
        this.setState({
            fileStatus: valid,
        });
    }

    render() {
        return (
            <div>
                <p>
                    file status:&nbsp;
                    {this.state.fileStatus === null && (
                        <i>no file selected</i>
                    )}
                    {this.state.fileStatus === true && "file selected"}
                    {this.state.fileStatus === false && (
                        <strong>File type not accepted</strong>
                    )}
                </p>
                <FileDrop
                    onValueChange={this._handleChange}
                    onRemove={this._handleRemove}
                    onValidateFile={this._handleFileValidation}
                    fileName={this.state.selectedFile}
                    accept={["text/csv", "image/jpeg", "image/png", ".pdf"]}
                />
                <p>
                    disabled:&nbsp;
                    {this.state.fileStatus === null && (
                        <i>no file selected</i>
                    )}
                    {this.state.fileStatus === true && "file selected"}
                    {this.state.fileStatus === false && (
                        <strong>File type not accepted</strong>
                    )}
                </p>
                <FileDrop
                    onValueChange={this._handleChange}
                    onRemove={this._handleRemove}
                    onValidateFile={this._handleFileValidation}
                    fileName={this.state.selectedFile}
                    accept={["text/csv", "image/jpeg", "image/png", ".pdf"]}
                    disabled={true}
                />
            </div>
        );
    }
}

module.exports = FileDropDemo;
