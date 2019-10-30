import React from "react";
import PropTypes from "prop-types";

export const deviceTypes = {
    SMS: "sms",
    EMAIL: "email",
    MOBILE: "mobile"
};

const getIcon = (icon) => {
    switch (icon) {
        case "sms":
            return (
                /*eslint-disable*/
                <svg width="30" height="30" viewBox="0 0 1147 1024">
                    <path d="M573.44 0c-316.703 0-573.44 201.728-573.44 450.56 0 153.641 98.038 289.157 247.48 370.483-9.667 58.163-42.291 128.901-124.6 202.957 0 0 214.774-0.102 333.271-132.383 37.868 6.185 77.087 9.503 117.289 9.503 316.703 0 573.44-201.728 573.44-450.56s-256.737-450.56-573.44-450.56zM573.44 860.16c-46.244 0-90.87-4.997-133.612-13.517-80.282 111.944-226.058 131.277-226.058 131.277 53.924-62.894 70.595-128.737 72.376-182.845-147.354-72.847-245.187-199.782-245.187-344.515 0-226.222 238.408-409.6 532.48-409.6s532.48 183.378 532.48 409.6-238.408 409.6-532.48 409.6z"></path>
                </svg>
                /*eslint-enable*/
            );
        case "email":
            return (
                /*eslint-disable*/
                <svg width="30" height="30" viewBox="0 0 28.4 20.85" >
                    <path d="M26.54,0.36H1.84c-0.83,0-1.5,0.67-1.5,1.5v17.1c0,0.83,0.67,1.5,1.5,1.5h24.7c0.83,0,1.5-0.67,1.5-1.5V1.86
                        C28.04,1.03,27.37,0.36,26.54,0.36z M27.04,1.86v17.1c0,0.11-0.04,0.2-0.1,0.28l-7.99-8.67l8.03-8.95
                        C27.01,1.7,27.04,1.78,27.04,1.86z M1.34,18.96V1.86c0-0.06,0.01-0.11,0.03-0.16l7.96,8.87L1.35,19
                        C1.35,18.99,1.34,18.98,1.34,18.96z M14.81,13.69c-0.37,0.37-0.96,0.37-1.31,0.02L2.41,1.36h23.47L14.81,13.69z M10.01,11.32
                        l2.77,3.08c0.38,0.38,0.87,0.56,1.36,0.56c0.5,0,1.01-0.19,1.4-0.58l2.74-3.05l7.51,8.14H2.29L10.01,11.32z"/>
                </svg>
                /*eslint-enable*/
            );
        case "mobile":
            return (
                <svg
                    className="device-icon__icon--mobile"
                    width="27px" height="27px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="mobile" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group" transform="translate(4.000000, 0.000000)">
                            <rect
                                id="Rectangle"
                                x="0.5" y="0.5"
                                width="15"
                                height="23"
                                rx="1.6"
                            />
                            <path d="M6.65,21 C6.65,20.2545224 7.25414218,19.65 8,19.65 C8.74521255,19.65
                            9.35,20.2547876 9.35,21 C9.35,21.7452127 8.74521266,22.35 8,22.35 C7.25414206,22.35
                            6.65,21.7454779 6.65,21 Z M7.35,21 C7.35,21.3589771 7.64083996,21.65 8,21.65
                            C8.35861334,21.65 8.65,21.3586133 8.65,21 C8.65,20.6413869 8.35861318,20.35 8,20.35
                            C7.64084012,20.35 7.35,20.6410231 7.35,21 Z"
                            fillRule="nonzero" />
                            <path d="M6,3.85 L10,3.85 C10.1932997,3.85 10.35,3.69329966 10.35,3.5
                            C10.35,3.30670034 10.1932997,3.15 10,3.15 L6,3.15 C5.80670034,3.15 5.65,3.30670034
                            5.65,3.5 C5.65,3.69329966 5.80670034,3.85 6,3.85 Z"
                            fillRule="nonzero"
                            />
                        </g>
                    </g>
                </svg>
            );
        default:
            return null;
    }
};

const DeviceIcon = ({ icon, title }) => {
    return (
        <div className="device-icon">
            {getIcon(icon)}
            <div className="device-icon__title">{title}</div>
        </div>
    );
};

DeviceIcon.propTypes = {
    icon: PropTypes.oneOf(Object.values(deviceTypes)),
    title: PropTypes.string,
};

export default DeviceIcon;
