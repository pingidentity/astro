import React from "react";

const Branding = props => (
    <style dangerouslySetInnerHTML={{__html: `
        .brand-background {
            ${props.backgroundImage ? `background: center / cover no-repeat url(${props.backgroundImage});` : ''}
            ${props.backgroundColor ? `background-color: ${props.backgroundColor};` : ''}
        }
        ${props.primaryColorHighlight && `
            .brand-primary-text:hover {
                color: ${props.primaryColorHighlight};
            }
            .brand-primary-bg:hover {
                background: ${props.primaryColorHighlight};
            }
        `}
        ${props.primaryColor && `
            .brand-primary-text {
                color: ${props.primaryColor};
            }
            .brand-primary-bg {
                background: ${props.primaryColor};
            }
            .brand-primary-bg:active {
                background: ${props.primaryColor};
            }
        `}
        ${props.footerColor && `
            .brand-footer-color {
                color: ${props.footerColor};
            }
        `}
    `}}/>
);

export default Branding;
