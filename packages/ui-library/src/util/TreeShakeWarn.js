import Utils from "./Utils";

/**
 * Used to warn users who are not actively tree shaking
 * and including the index.js file
 */
if (!Utils.isProduction) {
    console.warn("It appears you're not tree-shaking and using the new import method. " +
                "Please make sure you enable tree shaking in your build tool or you might see bloated bundles.\n" +
                "Without tree shaking you will include the entire library.");
}