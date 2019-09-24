var babelJest = require('babel-jest');

module.exports = {
    process: function(src, filename) {
        return babelJest.process(src, filename)
                .replace(/require\(\'[^\']+\.less\'\);/gm, '')
                .replace(/require\(\'[^\']+\.css\'\);/gm, '')
                .replace(/require\(\'[^\']+\.png\'\);?/gm, '\'\'')
            ;
    }
};
