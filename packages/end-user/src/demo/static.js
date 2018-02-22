import htmlFromReact from "./utils/htmlFromReact";

import template from "./template.html";
import _ from "lodash";

import routes from "./routes";
import pageComponents from "./pages";

module.exports = data => {
    let pages = {};
    for (let i = 0; i < routes.length; i++) {
        pages[routes[i].filename] = _.template(template)({
            htmlWebpackPlugin: {
                options: {
                    title: routes[i].title
                }
            },
            content: htmlFromReact(pageComponents[routes[i].id], "        "),
            stylesheets: routes[i].demoCSS ? ["demo.css", "end-user.css"] : ["end-user.css"]
        })
    }

    return pages;
}
