import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { noop } from "underscore";
import FileInput from '../FileInput';
import FileUtils from '../../util/FileUtils';
import { callIfOutsideOfContainer } from '../../util/EventUtils';

/**
 * An image selection component
 */
class ImageInput extends Component {
    state = {
        showMenu: false,
        value: this.props.value,
    };

    componentDidMount() {
        window.addEventListener("click", this._handleGlobalClick);
    }

    /* istanbul ignore next  */
    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
    }

    _fileReadSuccess = (e) => {
        this.setState({
            value: e.target.result,
        });
    };

    _handleChange = () => {
        this.setState({
            showMenu: false,
        });
    }

    _handleOnChange = (file, e) => {
        this._process(file);
        this.props.onChange(file, e);
    }

    /* istanbul ignore next  */
    _handleGlobalClick = (e) => {
        if (this.state.showMenu) {
            callIfOutsideOfContainer(
                ReactDOM.findDOMNode(this.fileInput),
                this._toggleMenu,
                e
            );
        }
    };

    _handleRemove = (e) => {
        e.preventDefault();
        this.fileInput.resetInput();
        this.setState({
            showMenu: false,
            value: null,
        });
    }

    _process = (file) => {
        if (FileUtils.isHtmlFileApiSupported()) {
            this._processWithHtml5Api(file);
        } else {
            this.props.onError('File cannot be parsed');
        }
    };

    _processWithHtml5Api = (file) => {
        try {
            if (file.type.match('image.*')) {
                this._readFile(file);
            }
        } catch (err) {
            /* istanbul ignore next  */
            this.props.onError(err);
        }
    };

    /* istanbul ignore next  */
    _readFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            this._fileReadSuccess(e);
        };
        reader.onerror = () => {
            this.props.onError('File cannot be read');
        };
        reader.readAsDataURL(file);
    };

    _renderContentSelector = () => (
        <div key='image-input__selector' className='image-input__selector'>
            <span className='pingicon-camera image-input__camera-icon'></span>
            <div className='image-input__text'>
                Add Photo
            </div>
        </div>
    );

    _renderSelectedContent = () => (
        <div className='image-input__container'>
            <div className='image-input__selected'>
                <div
                    aria-label='selected image'
                    className='image-input__selected-thumbnail'
                    role='img'
                    style={{ backgroundImage: `url(${this.state.value})` }}
                />
                <span className='pingicon-camera image-input__camera-icon'></span>
                <div className='image-input__text'>
                    Change
                </div>

            </div>
            <div data-id='edit-button' className="image-input__edit-btn" onClick={this._toggleMenu} />
            {this.state.showMenu && (
                <div className="image-input__edit-menu" data-id='edit-menu'>
                    <div className="image-input__edit-menu-item" data-id='change-button' onClick={this._handleChange}>Change</div>
                    <div className="image-input__edit-menu-item" data-id='delete-button' onClick={this._handleRemove}>Delete</div>
                </div>
            )}
        </div>
    );

    _toggleMenu = (e) => {
        e.preventDefault();
        this.setState(({ showMenu }) => ({
            showMenu: !showMenu,
        }));
    }

    render() {
        return (
            <FileInput
                {...this.props}
                className='image-input'
                onChange={this._handleOnChange}
                ref={(fi) => { this.fileInput = fi; }}
                renderContentSelector={this._renderContentSelector}
                renderSelectedContent={this._renderSelectedContent}
                value={this.state.value}
            />
        );
    }
}

ImageInput.propTypes = {
    /**
     * Types of images to accept
     */
    accept: PropTypes.arrayOf(PropTypes.string),
    /**
     * Sets a data-id property on the ImageInput to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Called once the image in the Input changes
     */
    onChange: PropTypes.func,
    /**
     * Called if there is an error with the selection
     */
    onError: PropTypes.func,
    /**
     * The value of the selected image
     */
    value: PropTypes.value,
};

ImageInput.defaultProps = {
    accept: ['image/jpeg', 'image/png'],
    onChange: noop,
    onError: noop,
    'data-id': 'image-input',
};

export default ImageInput;