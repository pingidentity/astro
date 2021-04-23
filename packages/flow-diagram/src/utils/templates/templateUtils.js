/* istanbul ignore file */
import ReactDOMServer from 'react-dom/server';

import * as go from 'gojs';

const $ = go.GraphObject.make;

export function encodeSvg(svgString) {
    return svgString.replace('<svg', (svgString.indexOf('xmlns') > -1 ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
        .replace(/'/g, '\'')
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\s+/g, ' ');
}

export const svgComponentToBase64 = component => `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(component))}`;

const textBlock =
    $(go.Part,
        $(go.TextBlock, { font: 'normal normal 600 13px Helvetica', alignment: go.Spot.Left, editable: false, overflow: go.TextBlock.OverflowClip, maxSize: new go.Size(180, NaN) }));

const stepIdBlock =
    $(go.Part,
        $(go.TextBlock, { font: 'normal normal normal 12px Helvetica', alignment: go.Spot.Left, editable: false, overflow: go.TextBlock.OverflowClip, maxSize: new go.Size(180, NaN) }));

const paletteBlock =
    $(go.Part,
        $(go.TextBlock,
            { font: 'normal normal normal 14px Helvetica', margin: new go.Margin(0, 0, 0, 13), alignment: go.Spot.Left, overflow: go.TextBlock.OverflowClip, maxSize: new go.Size(190, NaN) }));

export const getSize = (s, element) => {
    textBlock.elt(0).text = s.text;
    textBlock.ensureBounds();
    const textBlockNaturalBounds = textBlock.elt(0).naturalBounds;
    const textBlockWidth = textBlockNaturalBounds.width;
    const textBlockHeight = textBlockNaturalBounds.height;

    stepIdBlock.elt(0).text = s.stepId;
    stepIdBlock.ensureBounds();
    const stepIdBlockNaturalBounds = stepIdBlock.elt(0).naturalBounds;
    const stepIdBlockWidth = stepIdBlockNaturalBounds.width;
    const stepIdBlockHeight = stepIdBlockNaturalBounds.height;

    paletteBlock.elt(0).text = s.text;
    paletteBlock.ensureBounds();
    const paletteBlockNaturalBounds = paletteBlock.elt(0).naturalBounds;
    const paletteBlockHeight = paletteBlockNaturalBounds.height;

    const width = textBlockWidth > stepIdBlockWidth ? textBlockWidth : stepIdBlockWidth;
    const height = textBlockHeight + stepIdBlockHeight;

    switch (element) {
        case 'innerBorder':
            return new go.Size(width < 181 ? width + 70 : 250, height + 26);
        case 'errorContainer':
            return new go.Size(width < 181 ? width + 69 : 250, height + 127);
        case 'shape':
            return new go.Size(60, height + 27);
        case 'transparentContainer':
            return new go.Size(width < 181 ? width + 88 : 269, height + 27);
        case 'bottomNode':
            return new go.Margin(height + 24, 0, 0, 0);
        case 'paletteContainer':
            return new go.Size(250, paletteBlockHeight + 21);
        default:
            return new go.Size(width < 181 ? width + 69 : 250, height + 27);
    }
};
