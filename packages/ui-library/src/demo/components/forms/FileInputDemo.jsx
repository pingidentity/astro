
import React from "react";
import FileInput from "../../../components/forms/FileInput";
import Text from "../../../components/general/Text";

/**
* @name FileInputDemo
* @memberof FileInput
* @desc A demo for FileInput
*/
class FileInputDemo extends React.Component {
    state = {
        fileStatus: "no file selected yet",
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

    _handleFileValidation = (valid) => {
        if (!valid) {
            this.setState({
                fileStatus: "invalid file type selected"
            });
        }
    }

    render() {
        return (
            <div>
                <p>
                    status: {this.state.fileStatus}
                </p>
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
                    selectedTitle="Certificate"
                />
            </div>
        );
    }
}

module.exports = FileInputDemo;
