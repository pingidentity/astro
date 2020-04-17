
const StyleDictionary  = require('style-dictionary');

const SCSSTransforms = require('style-dictionary/lib/common/transformGroups').scss;
const transforms = require('style-dictionary/lib/common/transforms');
const formats = require('style-dictionary/lib/common/formats');

const version = require('./package.json').version;

const TOKEN_PATH = `./build/`;


StyleDictionary.registerFormat({
  name: 'json/array',
  formatter: (dictionary) => {
    const nestedJson = JSON.parse(formats['json/nested'](dictionary));
    const arrayJSON = Object.keys(nestedJson).map(key => ({name: key, ...nestedJson[key]}));
    return JSON.stringify(arrayJSON, null, 2);
  }
});

// This transform adds quotes around image assets for scss
StyleDictionary.registerTransform({
  name: 'scss/image',
  type: 'value',
  matcher: function(prop) {
    //console.log(prop.attributes);
    return prop.attributes.type === 'image';

  },
  transformer: function(prop) {
    //console.log(prop);
    const { value } = prop;
    return value !== "" ? `'${value}'` : value;
  }
});

//overriding default color/css because of custom format
StyleDictionary.registerTransform({
  name: 'color/css',
  type: 'attribute',
  matcher: (prop) =>  prop.attributes.type === 'color',
  transformer: transforms['color/css'].transformer,
})

// This transform adds quotes around image assets for scss
StyleDictionary.registerTransform({
  name: 'version-css',
  type: 'value',
  matcher: (prop) => {
    return prop.value.includes('PACKAGE_VERSION');
  },
  transformer: function(prop) {
    //console.log(prop)
    const { value } = prop;
    const newProp = value.replace('PACKAGE_VERSION', version);
    console.log(newProp)
    return newProp;
  }
});

StyleDictionary.registerTransformGroup({
  name: 'scss',
  transforms: [...SCSSTransforms, 'scss/image', 'version-css'],
});

const StyleDictionaryExtended = StyleDictionary.extend( {
    source: ["themes/**/*theme.json"],
    platforms: {
      json: {
        transforms: ['version-css'],
        buildPath: `${TOKEN_PATH}/cdn/${version}/`,
        files: [{
          destination: "themes.json",
          format: "json/array"
        }]
      },
      scss: {
          transformGroup: "scss",
          buildPath: `${TOKEN_PATH}/css/`,
          files: [{
            mapName: "themes",
            destination: "_variables.scss",
            format: "scss/map-deep",
            filter: (token) => {
                return token.attributes.type !== "meta"
            }
          }]
        },
    }

});

StyleDictionaryExtended.buildAllPlatforms();

