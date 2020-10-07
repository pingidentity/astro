export const missingDependencyMessage = (dependency, name, component) => {
    if (!dependency) {
        console.error(`Missing dependency: ${name}. To use ${component}, add ${name} to your project.`); // eslint-disable-line no-console
    }
};
