import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from "underscore";
import Button from '../Button';

/**
 * A file selection component
 */
class FileInput extends Component {
    state = {
        hovered: false,
    };

    componentDidMount() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
            this.fileComponent.addEventListener(eventName, this._preventDefaults, false);
        });

        ['dragleave', 'drop'].forEach((eventName) => {
            this.fileComponent.addEventListener(eventName, this._onExit, false);
        });

        ['dragenter', 'dragover'].forEach((eventName) => {
            this.fileComponent.addEventListener(eventName, this._onHover, false);
        });

        ['drop'].forEach((eventName) => {
            this.fileComponent.addEventListener(eventName, this._handleDrop, false);
        });
    }

    /* istanbul ignore next  */
    componentWillUnmount() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
            this.fileComponent.removeEventListener(eventName, this._preventDefaults);
        });

        ['dragleave', 'drop'].forEach((eventName) => {
            this.fileComponent.removeEventListener(eventName, this._onExit);
        });

        ['dragenter', 'dragover'].forEach((eventName) => {
            this.fileComponent.removeEventListener(eventName, this._onHover);
        });

        ['drop'].forEach((eventName) => {
            this.fileComponent.removeEventListener(eventName, this._handleDrop);
        });
    }

    _handleDrop = (e) => {
        const {
            dataTransfer: {
                files: [file = null] = [],
            } = [],
        } = e;

        this._preventDefaults(e);
        this._handleFileChange(file, e);
    }

    _handleFileChange = (file, e) => {
        // needed for when canceling out of the file dialog
        if (!file) {
            return;
        }

        this.props.onChange(file, e);
    }

    _handleInputChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        this._handleFileChange(file, e);
    }

    _handleRemove = () => {
        // check for existance of ref if page is loaded with file pre-selected
        // (value is provided - ref not set yet)
        if (this.fileInput) {
            this.fileInput.value = null;
        }
        this.props.onRemove();
    }

    _onExit = () => this.setState({ hovered: false })

    _onHover = () => this.setState({ hovered: true })

    _preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    _renderDefaultContentSelector = () => (
        <Button
            className="file-input--no-click"
            data-id="select-button"
            inline
            key="button"
            label="Select"
        />
    )

    _renderDefaultSelectedContent = () => (
        <div className="file-input__value">
            <span className="file-input__value-text" data-id="value">{this.props.value}</span>
            &nbsp;
            <Button
                className="file-input__remove-button"
                data-id="remove-button"
                inline
                label="Remove"
                onClick={this._handleRemove}
            />
        </div>
    )

    _renderContentSelector = () => (
        typeof this.props.renderContentSelector === 'function'
            ? this.props.renderContentSelector(this.props)
            : this._renderDefaultContentSelector(this.props)
    );

    _renderSelectedContent = () => (
        typeof this.props.renderSelectedContent === 'function'
            ? this.props.renderSelectedContent(this.props)
            : this._renderDefaultSelectedContent(this.props)
    );

    /* istanbul ignore next  */
    resetInput = () => {
        this.fileInput.value = '';
    }

    render() {
        const {
            accept,
            className,
            'data-id': dataId,
            value,
        } = this.props;
        const classNames = classnames('file-input', className, {
            'file-input--hovered': this.state.hovered,
        });

        return (
            <label
                className={classNames}
                data-id={dataId}
                ref={(div) => { this.fileComponent = div; }}
            >
                <input
                    accept={accept.join(',')}
                    data-id="input"
                    key="input"
                    name="input-file"
                    onChange={this._handleInputChange}
                    ref={(input) => { this.fileInput = input; }}
                    type="file"
                />
                {!value && this._renderContentSelector()}
                {value && this._renderSelectedContent()}
            </label>
        );
    }
}

FileInput.propTypes = {
    /**
     * An array of strings containing the accepted mime types or extensions
     */
    accept: PropTypes.arrayOf(PropTypes.string),
    /**
     * CSS class(es) applied to the top-level element
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the FileInput to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * The callback triggered when the file input changes value
     */
    onChange: PropTypes.func,
    /**
     * The callback triggered when the remove button is clicked
     */
    onRemove: PropTypes.func,
    /**
     * A function that renders the content shown before a file is selected
     */
    renderContentSelector: PropTypes.func,
    /**
     * A function that renders the content shown after a file is selected
     */
    renderSelectedContent: PropTypes.func,
    /**
     * The name of the selected file
     */
    value: PropTypes.string,
};

FileInput.defaultProps = {
    accept: [],
    'data-id': 'file-input',
    onChange: noop,
};

export default FileInput;