import React from 'react';
import PropTypes from 'prop-types';
import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import reactElementToString from '../utils/reactElementToString';
import htmlFromReact from '../utils/htmlFromReact';

class ComponentDemo extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    _getSource = () => highlight.highlight('html', htmlFromReact(this.props.children)).value;

    _getReactSource = () =>
        highlight.highlight('html', reactElementToString(this.props.children)).value;

    /* eslint-disable react/no-danger */
    render = () => (
        <div className="component-demo">
            <div className="component-demo__preview">{this.props.children}</div>
            <div className="component-demo__markup">
                <div className="component-demo__code">
                    <span className="component-demo__preview-label">React</span>
                    <pre
                        dangerouslySetInnerHTML={{
                            __html: this._getReactSource(),
                        }}
                    />
                </div>
                <div className="component-demo__code">
                    <span className="component-demo__preview-label">HTML</span>
                    <pre
                        dangerouslySetInnerHTML={{
                            __html: this._getSource(),
                        }}
                    />
                </div>
            </div>
        </div>
    );
    /* eslint-enable react/no-danger */
}

export default ComponentDemo;
