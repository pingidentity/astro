module.exports = async function (page, scenario) {
    await page.evaluateOnNewDocument(() => {
        // never provide timezone for mocket time; otherwise it will be affected by local timezone so tests may fail depending on current environment's location
        const referenceTime = '2019-05-20 10:20:30.000';
        const oldDate = Date;
        Date = function(...args) {
            if (args.length) {
                return new oldDate(...args);
            } else {
                return new oldDate(referenceTime);
            }
        }
        Date.now = function() {
            return new oldDate(referenceTime).valueOf();
        }
        Date.prototype = oldDate.prototype;
    })
};
