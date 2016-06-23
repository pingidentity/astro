var Page = require("./Page.js");

var HomePage = Object.create(Page, {

    /*
    * @desc this function is to return a given component path
    * @param {string} name - name of the element
    * @param {string} type - type of the element
    */
    navComponent: {
        value: function (name, type) {
            return this.format("//{type}[@data-id='{name}-label']", { type: type ? type : "*", name: name });
        }
    },

    /**
     * @desc this function is to open index page
     */
    openHomePage: {
        value: function () {
            this.open("index.html");
        }
    }

});

module.exports = HomePage;