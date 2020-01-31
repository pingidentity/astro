
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

    _handleChange2 = (file, e, { remove } ) => {
        if (file.name === "text.txt") {
            this.setState({
                selectedFile2: file.name,
                fileStatus: "file selected"
            });
        } else {
            remove();
        }
    }

    _handleRemove2 = () => {
        this.setState({
            selectedFile2: null,
            fileStatus: null,
        });
    }

    _handleFileValidation2 = (valid) => {
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

                    file status:&nbsp;
                    <br />
                    {this.state.fileStatus === null && (
                        <i>no file selected</i>
                    )}
                    {this.state.fileStatus === true && "file selected"}
                    {this.state.fileStatus === false && (
                        <strong>File type not accepted</strong>
                    )}
                    <br />
                    Passing in  "remove" as a paramater in handleChange and calling remove() will auto remove
                    file if it is invalid. Check demo docs and see _handleChange2.
                    <br />
                </p>
                <FileDrop
                    onValueChange={this._handleChange2}
                    onRemove={this._handleRemove2}
                    onValidateFile={this._handleFileValidation2}
                    fileName={this.state.selectedFile2}
                    accept={["text/csv", "image/jpeg", "image/png", ".pdf", "text/*"]}
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
