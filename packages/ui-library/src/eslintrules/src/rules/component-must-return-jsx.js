const ERROR = "Render must return a top-level div";

const isValidReturnType = (statement = {}) => {
    const { type } = statement || {};
    switch (type) {
        case "BlockStatement":
            const returnVals = statement.body.map(isValidReturnType);
            if (returnVals.some(val => val)) {
                return true;
            } else {
                return false;
            }
        case "ConditionalExpression":
        case "IfStatement":
            const {
                consequent,
                alternate
            } = statement;
            const consType = isValidReturnType(consequent);
            const altType = isValidReturnType(alternate);

            // Check if either side of if statement returns something invalid.
            // Case statements aren't handled because we don't typically use them
            // in renders.
            if (consType === false) {
                return false;
            } else if (altType === false) {
                return false;
            } else {
                return true;
            }
        case "CallExpression":
            const { callee } = statement;
            return isValidReturnType(callee);
        case "ArrowFunctionExpression":
        case "FunctionExpression":
            const { body } = statement;
            return isValidReturnType(body);
        case "MemberExpression":
            const {
                property: { name }
            } = statement;

            // createElement and children will both probably be valid JSX.
            // This rule currently does not check if private class methods return JSX, however.
            if (name === "createElement" || name === "children" || name.startsWith("_")) {
                return true;
            } else {
                return false;
            }
        case "JSXElement":
        case "Identifier":
            return true;
        case "ReturnStatement":
            const { argument } = statement;
            return isValidReturnType(argument);
        case "Literal":
            if (statement.raw === "null") {
                return true;
            } else {
                return false;
            }
        // Some other cases aren't handled here, like class methods and external
        // methods being called. These could get past the linter rule.
        default:
            return type;
    }
};

const importsReact = (context, node) => {
    const [{ body }, ] = context.getAncestors(node);
    return body.some(
        ({ source, type }) => type === "ImportDeclaration" && source.value === "react"
    ) || body.some(({ declarations, type }) => type === "VariableDeclaration" &&
        declarations.some(({ id }) => id.name === "React")
    );
};

module.exports = {
    meta: {
        docs: {
            description: "ESLint rule only allow components to render with top-level divs for React 15 compatibility",
            category: "Fill me in",
            recommended: false
        },
        schema: [
            // fill in your schema
        ]
    },
    create: (context) => {
        return {
            ReturnStatement(node) {
                const ancestors = context.getAncestors(node);
                if (!importsReact(context, node)) {
                    return;
                }

                const capital = /^[A-Z]/;

                // Check if this return happens in a top-level component
                const [component, hasParentVars] = ancestors.reduce(([ comp, hasParent= false], ancestor) => {
                    const { id, type } = ancestor;
                    return [
                        comp || (id && capital.test(id.name) && ancestor),
                        hasParent || (id && !capital.test(id.name) &&
                            (type === "VariableDeclarator" || type === "FunctionDeclaration") ||
                                      type === "AssignmentExpression")
                    ];
                }, []);

                if (component && !hasParentVars) {
                    const methodDef = ancestors.find(({ type }) => type === "MethodDefinition");

                    // Handle classes, SFCs defined as function Component(){} and as const Component = () => {}
                    if (methodDef && methodDef.key.name === "render" && !isValidReturnType(node)) {
                        context.report(node, ERROR);
                    } else if (component.type === "FunctionDeclaration" && !isValidReturnType(component.body)) {
                        context.report(node, ERROR);
                    } else if (component.type === "VariableDeclarator" &&
                            !isValidReturnType(component.init.body || component.init)) {
                        context.report(node, ERROR);
                    }
                }
            }
        };
    }
};
