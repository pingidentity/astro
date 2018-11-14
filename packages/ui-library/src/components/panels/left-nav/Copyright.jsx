var PropTypes = require("prop-types");
var React = require("react");

/**
 * @class Copyright
 *
 * @desc Renders the copyright block
 *
 * @param {boolean} [pingoneLogo=false]
 *     Determines whether to show the PingOne Logo
 * @param {boolean} [updated=false]
 *     Determines whether to show the default Ping Logo
 * @param {string} [logoSrc]
 *     An optional URL or object (containing the URL, height (px), and width (px)) that can be provided to override the
 *     default logo
 * @param {function} [renderFooterContent]
 *     Optional render prop
 */
class Copyright extends React.Component {
    static propTypes = {
        pingoneLogo: PropTypes.bool,
        logoSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        updated: PropTypes.bool
    };

    static defaultProps = {
        pingoneLogo: false,
        updated: false
    };

    componentWillMount() {
        this._year = new Date().getFullYear();
        this._defaultChildren = [
            this._getLogo(),
            `Copyright © 2003-${this._year}`,
            <br />,
            "Ping Identity Corporation",
            <br />,
            "All rights reserved"
        ];
    }

    _getLogo = () => {

        if (this.props.logoSrc) {
            const style = typeof this.props.logoSrc === "object" ? {
                height: this.props.logoSrc.height,
                width: this.props.logoSrc.width,
            } : null;
            const attributes = {
                src: typeof this.props.logoSrc === "object" ? this.props.logoSrc.url : this.props.logoSrc
            };

            return (
                <div className="logo-container" data-id="logo-container">
                    <img {...attributes} style={style} className="ping-application" />
                </div>
            );
        }
        else if (this.props.pingoneLogo) {
            /*eslint-disable max-len*/
            return (
                <div className="logo-container" data-id="logo-container">
                    <svg className="pingone-logo" viewBox="0 0 300 80" >
                        <path d="M177.5,5.4C194.2,5.4,204,18,204,34.8c0,17.2-9.7,29.4-26.5,29.4C160.7,64.2,151,52,151,34.8
                            C151,18,160.8,5.4,177.5,5.4z M177.5,57c12.7,0,18.1-10.9,18.1-22.2c0-11.5-6-22.3-18.1-22.2c-12.1-0.1-18.1,10.7-18.1,22.2
                            C159.3,46.1,164.8,57,177.5,57z M208.2,21.7h7.2v6.6h0.2c2.2-4.7,7.6-7.6,13.2-7.6c10.4,0,15.1,6.7,15.1,17.8v24.6h-7.4V41.7
                            c0-9.7-2-14.4-8.5-14.8c-8.4,0-12.2,7-12.2,17.1v19.2h-7.4V21.7z M280.9,61.5c-2.8,1.1-6.1,2.7-12.7,2.7c-14.3,0-20.8-8.9-20.8-22.4
                            c0-12.3,7.5-21,18.8-21c13.4,0,17.7,10.1,17.7,23.4h-28.7c0,8.2,6.2,13.8,13.3,13.8c4.9,0,10.6-2.6,12.4-4.1V61.5z M276.1,38.5
                            c0-6.3-3.6-11.5-10-11.5c-7.3,0-10.3,6.2-10.8,11.5H276.1z M15.7,3.5c10.1,0,13.2,1,16.6,2.9c5.6,3.1,8.6,8.6,8.6,15.5
                            c0,7.9-3.8,14.2-10.3,17.3c-2.7,1.3-5.3,2-11.9,2H12v22H0V3.5H15.7z M12,31.4h6.3c4.9,0,6.4-0.6,8-3.1c1-1.6,1.5-3.4,1.5-6.2
                            c0-5.6-3-8.9-8.1-8.9H12V31.4z M57.8,7.1c0,4-3.2,7.1-7.1,7.1c-3.9,0-7-3.2-7-7.1c0-3.9,3.3-7.1,7.2-7.1C54.7,0,57.8,3.2,57.8,7.1z
                            M56.4,18.2v45H44.9V20L56.4,18.2z M71.9,18.1c1,1.8,1.6,3.7,1.6,5.5c1.7-1.2,3.2-2.2,5.1-3.3c2.3-1.2,5.3-1.9,7.9-1.9
                            c4.9,0,9.2,2.6,10.6,6.3c0.6,1.6,0.9,3.5,0.9,6.3v32.1H86.6V34.6c0-5-0.9-6.4-3.9-6.4c-2.3,0-5.3,1.5-8,3.9v31.1H63.3V31.3
                            c0-3.8-0.5-7.4-1.5-10.3L71.9,18.1z M148.1,24c-2.5,2.3-4.9,3.3-8.1,3.3c-1.1,0-2.3-0.2-3-0.2c1.7,2,2.6,4.3,2.6,7.2
                            c0,7.5-6.9,13.1-16.2,13.1c-0.5,0-0.9,0-1.7-0.1c-2.9,1.4-4.5,2.4-4.5,3.6c0,0.6,0.7,1,1.9,1l6.2,0.1c6.7,0.1,10.2,1.1,13.3,3.9
                            c2.6,2.4,3.8,5.4,3.8,9.4c0,3.7-1.1,6.5-3.5,9.1c-3.9,4.1-10.5,5.7-17.3,5.7c-6.3,0-12.7-1-16.6-4.7c-2.4-2.2-3.6-4.8-3.6-7.8
                            c0-2.4,0.6-3.6,1-4.5h10.6c-0.4,1-0.5,1.6-0.5,2.8c0,3.5,2.9,5.4,8.2,5.4c2.9,0,5.4-0.3,7.2-1.4c1.7-1,2.8-2.7,2.8-4.5
                            c0-4-3.5-5.2-8.1-5.2l-4.9-0.1c-5.1-0.1-8.5-0.5-10.6-1.4c-2.1-0.8-3.3-2.8-3.3-5.7c0-2.8,0.9-5.5,8.1-7.4
                            c-6.4-1.6-9.4-5.7-9.4-12.2c0-9,7.3-14.8,18.5-14.8c2.5,0,4.7,0.3,7.9,1.1c2.4,0.6,3.9,1,5.4,1c3.2,0,6.4-1.4,9.1-3.8L148.1,24z
                            M113.9,33.4c0,4.5,2.8,6.3,6.8,6.3c4.5,0,7-2.2,7-6.3c0-4.1-2.6-6.5-7-6.5C116.4,26.9,113.9,29.3,113.9,33.4z M298.1,17.4
                            c0,3.9-3.1,7-7.1,7c-4,0-7.1-3.1-7.1-7c0-3.8,3.2-6.9,7.1-6.9C295.1,10.5,298.1,13.6,298.1,17.4z M285.7,17.4c0,3.1,2.3,5.5,5.4,5.5
                            c3,0,5.3-2.4,5.3-5.5c0-3.1-2.2-5.5-5.3-5.5C288,11.9,285.7,14.4,285.7,17.4z M290,21h-1.6v-6.9c0.6-0.1,1.5-0.2,2.6-0.2
                            c1.3,0,1.9,0.2,2.4,0.5c0.4,0.3,0.7,0.8,0.7,1.5c0,0.8-0.6,1.3-1.4,1.6v0.1c0.7,0.3,1.1,0.8,1.3,1.7c0.2,1.1,0.3,1.5,0.5,1.7h-1.7
                            c-0.2-0.3-0.3-0.9-0.5-1.7c-0.1-0.8-0.5-1.1-1.4-1.1H290V21z M290,17.1h0.8c0.9,0,1.6-0.3,1.6-1c0-0.6-0.5-1.1-1.5-1.1
                            c-0.4,0-0.7,0-0.9,0.1V17.1z" />
                    </svg>
                </div>);
            /*eslint-enable max-len*/
        }
        else if (this.props.updated) {
            return (
                <div className="logo-container" data-id="logo-container">
                    <div className="logo" data-id="copyright-logo" />
                </div>
            );
        }
        else {
            return "";
        }
    };

    render() {
        const { renderFooterContent } = this.props;
        return (
            <div className="copyright" data-id="copyright">
                {renderFooterContent ? renderFooterContent(this._defaultChildren) : this._defaultChildren}
            </div>
        );
    }
}

module.exports = Copyright;
