const acorn = require("acorn");
const fs = require("fs");

const getFile = path => path.substring(path.lastIndexOf("/") + 1, path.length);
const isTemplate = path => path && path.endsWith(".jsx");
const isLibraryComponent = path => path && path.includes("/components/");
const isDirectory = path => fs.lstatSync(path).isDirectory();

const statementTypes = {
    IMPORTDECL: "ImportDeclaration",
    IMPORTDEFAULT: "ImportDefaultSpecifier",
    VARDECLARATION: "VariableDeclaration",
    VARDECLARATOR: "VariableDeclarator"
};

function getRequirePath(requires, { id, init, type }) {
    if (type === statementTypes.VARDECLARATOR) {
        const {
            arguments: [
                {
                    value: requiredFile
                } = {}
            ] = [],
            callee: {
                name
            } = {}
        } = init;

        return (name === "require") && isLibraryComponent(requiredFile)
            ? [...requires, id.name]
            : requires;
    } else {
        return requires;
    }
}

function getImportsFromStatement(imports, statement) {
    const { type } = statement;
    if (type === statementTypes.IMPORTDECL) {
        const {
            source,
            specifiers
        } = statement;

        const {
            local: {
                name: importName
            } = {}
        } = specifiers.find(spec => spec.type === statementTypes.IMPORTDEFAULT) || {};

        const { value } = source;
        return isLibraryComponent(value)
            ? [...imports, importName || getFile(value)]
            : imports;
    } else if (type === statementTypes.VARDECLARATION) {
        const { declarations } = statement;
        return declarations.reduce(getRequirePath, []);
    } else {
        return imports;
    }
}

function getImports(template) {
    const lastImport = template.lastIndexOf("import");
    const lastRequire = template.lastIndexOf("require(\"");
    const endImports = template.indexOf(";", lastImport > -1 ? lastImport : lastRequire);

    try {
        const { body } = acorn.parse(template.substring(0, endImports), { sourceType: "module" });
        return body.reduce(getImportsFromStatement, []);
    } catch (error) {
        return [];
    }
}

function getComponents(path = "", components = {}) {
    if (isTemplate(path)) {
        const template = fs.readFileSync(path, "utf8");
        const imports = getImports(template);
        const templatePath = path.substring(
            path.indexOf("/templates/") + 11,
            path.length
        );

        return imports.reduce((compAcc, component) => {
            const {
                [component]: existingTemplates = []
            } = compAcc;

            return Object.assign({}, compAcc, {
                [component]: [
                    ...existingTemplates,
                    templatePath
                ]
            });
        }, components);
    } else if (isDirectory(path)) {
        return fs.readdirSync(path).reduce((compAcc, dirPath) =>
            getComponents(`${path}/${dirPath}`, compAcc), components);
    } else {
        return components;
    }
}

const templates = getComponents("./src/templates");

try {
    fs.writeFileSync("./src/demo/core/templates.json", JSON.stringify(templates));
    console.log("File written to ./src/demo/core/templates.json");
} catch (e) {
    console.log("Unable to write to file due to error: ", e);
}
