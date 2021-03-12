import React from 'react';
import PropTypes from 'prop-types';
import Xarrow from 'react-xarrows';

export default function Connections({ links, panels }) {
    const checkInView = (panel, elem) => {
        const container = document.getElementById(panel);
        const element = document.getElementById(elem);


        if (element && container && container.contains(element)) {
            const containerHeader = container.firstElementChild;
            const headerPosition = containerHeader.getBoundingClientRect();
            const elementPosition = element.getBoundingClientRect();
            const containerPosition = container.getBoundingClientRect();

            if (elementPosition.top >= 0 && elementPosition.top >= headerPosition.bottom && elementPosition.bottom <= containerPosition.bottom) {
                return true;
            }
        }
        return false;
    };

    const getLinks = () => {
        let visibleToLinks = [];
        let visibleFromLinks = [];

        panels.forEach((panel) => {
            links.forEach((link) => {
                if (checkInView(panel, link.from)) {
                    visibleFromLinks.push(link);
                }

                if (checkInView(panel, link.to)) {
                    visibleToLinks.push(link);
                }
            });
        });

        const visibleLinks = visibleFromLinks.filter(link => visibleToLinks.includes(link));
        return visibleLinks;
    };

    return (
        getLinks().map(link => (
            <Xarrow
                start={link.from}
                end={link.to}
                color="#FF8324"
                headSize={0}
                strokeWidth={1}
            />
        ))
    );
}

Connections.propTypes = {
    links: PropTypes.array,
    panels: PropTypes.array,
};
