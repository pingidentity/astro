// "use strict";
//
// var React = require("react");
// var ReactDOM = require("react-dom");
// var Picker = require("react-color-picker");
// var FormLabel = require("../forms/FormLabel.jsx");
// var css = require("classnames");
//
// var If = require("./If.jsx");
// var callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer;
//
// /**
//  * @class ColorPicker
//  *
//  * @desc  A color picker that supports common rgb values for text, background, etc.
//  * @param {string} [id] - Set the data-id on the top level html element
//  * @param {string} [className] - Append classname to the top level html element
//  * @param {string} color - A hexcode of chosen color
//  * @param {function} onChange - A callback executed when a color is chosen
//  * @param {bool} [disabled] - A property to disable the component (false by default)
//  * @param {string} [labelText] - A label to render over the color picker
//  * @param {string} [hintText] - If a label is provided, a hint text may also be optionally provided
//  *
//  * @example
//  *   <ColorPicker
//  *       id="my-color-picker"
//  *       onClick={this._onBgPickerClick}
//  *       onChange={this._onBgColorChange}
//  *       pickerHidden={this.state.bgPickerHidden}
//  *       color={this.props.data.enrollmentBgColor} />
//  */
// var ColorPicker = React.createClass({
//
//     _handleGlobalClick: function (e) {
//         if (this.state.visible) {
//             callIfOutsideOfContainer(ReactDOM.findDOMNode(this.refs.swatch), this._onPickerToggle, e);
//         }
//     },
//
//     _handleGlobalKeyDown: function (e) {
//         if (e.keyCode === 27 && this.state.visible) {
//             this._onPickerToggle();
//         }
//     },
//
//
//     _onChange: function (color) {
//         var self = this;
//
//         this.setState({visible: !this.state.visible}, function () {
//             self.props.onChange(color);
//         });
//     },
//
//     _onDrag: function (color) {
//         this.props.onChange(color);
//     },
//
//     _onPickerToggle: function () {
//         if (!this.props.disabled) {
//             this.setState({visible: !this.state.visible});
//         }
//     },
//
//     _onColorInputChange: function (e) {
//         this.props.onChange(e.target.value);
//     },
//
//     componentDidMount: function () {
//         window.addEventListener("click", this._handleGlobalClick);
//         window.addEventListener("keydown", this._handleGlobalKeyDown);
//
//         var swatch = ReactDOM.findDOMNode(this.refs.swatch);
//
//         /* eslint-disable react/no-did-mount-set-state */
//         this.setState({
//             pickerTop: swatch.offsetHeight,
//             pickerLeft: 0,
//             pickerDimensions: swatch.offsetWidth + 40 //size of container div + hue spectrum bar width
//         });
//         /* eslint-enable react/no-did-mount-set-state */
//     },
//
//     getInitialState: function () {
//         return {
//             visible: false,
//             pickerTop: 28,
//             pickerLeft: 0,
//             pickerDimensions: 0
//         };
//     },
//
//     componentWillUnmount: function () {
//         window.removeEventListener("click", this._handleGlobalClick);
//         window.removeEventListener("keydown", this._handleGlobalKeyDown);
//     },
//
//     render: function () {
//         var styles = css(
//             "colorpicker-container",
//             {hidden: !this.state.visible}
//         );
//
//         return (
//             /* eslint-disable max-len */
//             <div>
//                 <div>
//                     <FormLabel value={this.props.labelText} hint={this.props.hintText} />
//                 </div>
//
//                 <div className={"input-color-picker inline " + (this.props.className || "")}
//                         data-id={this.props.id}
//                         ref="manager">
//                     <span ref="swatch"
//                             className="colors colors-theme-default colors-swatch-position-left colors-swatch-left colors-position-default"
//                             onClick={this._onPickerToggle}>
//                         <span className="colors-swatch">
//                             <span style={{backgroundColor: this.props.color}}></span>
//                         </span>
//                         <input ref="input"
//                                 type="text"
//                                 className="colors-input btn-fg-color"
//                                 disabled={this.props.disabled}
//                                 onChange={this._onColorInputChange}
//                                 value={this.props.color}
//                                 maxLength="7" />
//                     </span>
//
//                     <If test={this.state.visible && !this.props.disabled}>
//                             <span className={styles} style={{
//                                 top: this.state.pickerTop,
//                                 left: this.state.pickerLeft,
//                                 width: this.state.pickerDimensions,
//                                 height: this.state.pickerDimensions
//                             }}>
//
//                             <Picker ref="picker"
//                                     value={this.props.color}
//                                     onChange={this._onChange}
//                                     onDrag={this._onDrag}
//                                     saturationWidth={this.state.pickerDimensions-40}
//                                     saturationHeight={this.state.pickerDimensions-40}/>
//                             </span>
//                     </If>
//                 </div>
//             </div>
//             /* eslint-enable max-len */
//         );
//     }
// });
//
// module.exports = ColorPicker;
