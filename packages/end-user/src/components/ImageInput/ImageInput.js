import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FileInput from '../FileInput';
import FileUtils from '../../util/FileUtils';
import { callIfOutsideOfContainer } from '../../util/EventUtils';


/**
* @callback FileInput~onChange
*
* @param {object} fileInput
*    A reference to the file input
*/

/**
* @callback FileInput~renderSelectedContent
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
 * @class FileInput
 * @desc A file selection component
 *
 * @param {Array.<String>} [accept]
 *      An array of strings containing the accepted mime types or extensions.
 * @param {string} [className]
 *      CSS class(es) applied to the top-level element.
 * @param {string} [data-id='file-input']
 *      The data-id attribute value applied to the top-level element.
 * @param {FileInput~onChange} onChange
 *      The callback triggered when the file input changes value.
 * @param {FileInput~onRemove} onRemove
 *      The callback triggered when the remove button is clicked.
 * @param {string} [value]
 *      The name of the selected file
 */


export default class ImageInput extends Component {

    static propTypes = {
        accept: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func,
        onError: PropTypes.func,
        'data-id': PropTypes.string,
    };

    static defaultProps = {
        accept: ['image/jpeg', 'image/png'],
        onChange: () => {},
        onError: () => {},
        'data-id': 'image-input',
    };

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
            <img src='../icons/camera.svg' className='image-input__camera-icon' />
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
                <img src='../icons/camera.svg' className='image-input__camera-icon' />
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
