import _ from 'lodash';

import htmlFromReact from './utils/htmlFromReact';
import template from './template.html';
import routes from './routes';
import pageComponents from './pages';

module.exports = () => {
    const pages = {};
    for (let i = 0; i < routes.length; i += 1) {
        pages[routes[i].filename] = _.template(template)({
            htmlWebpackPlugin: {
                options: {
                    title: routes[i].title,
                },
            },
            content: htmlFromReact(pageComponents[routes[i].id], '        '),
            stylesheets: routes[i].demoCSS ? ['demo.css', 'end-user.css'] : ['end-user.css'],
        });
    }

    return pages;
};
