import { renderToString } from 'react-dom/server';
import beautify from 'js-beautify';

const removeReactAttributes = html => html.replace(/\s?data-reactroot="[^"]*"/, '');

const beautifyOpts = {
    unformatted: ['code', 'pre', 'em', 'strong'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 4,
    sep: '\n',
    wrap_line_length: 60,
};

const htmlFromReact = (react, linePrefix = '') => {
    const html = beautify.html(removeReactAttributes(renderToString(react)), beautifyOpts);
    return html.replace(/\n/, `\n${linePrefix}`);
};
export default htmlFromReact;
