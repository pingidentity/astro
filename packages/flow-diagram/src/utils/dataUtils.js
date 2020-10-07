const getOutletData = (id, outlets, getLinkId) => outlets.reduce(
    ([nodes, links], { name, type, next }) => {
        const key = `${id}-${type}`;
        return [
            [
                ...nodes,
                {
                    key,
                    category: type,
                    text: name,
                    // We probably just need this in whatever dictionary we construct to
                    // look up configuration, etc.
                    isOutlet: true,
                },
            ],
            [
                ...links,
                {
                    id: getLinkId({ from: id, to: key }),
                    from: id,
                    to: key,
                },
                ...next ? [{
                    id: getLinkId({ from: key, to: next }),
                    from: key,
                    to: next,
                }] : [],
            ],
        ];
    }, [[], []]);

export const stepsToFlowDiagram = (stepDefinitions, getLinkId = ({ from, to }) => `${from}_${to}`) => {
    return stepDefinitions.reduce(([nodes, links], step) => {
        const {
            stepId,
            id = stepId,
            outlets = [],
            type,
            name,
            configuration,
        } = step;

        const { error = '' } = configuration;

        const [outletNodes, outletLinks] = getOutletData(id, outlets, getLinkId);

        return [
            [
                ...nodes,
                {
                    key: id,
                    category: type,
                    name,
                    stepId,
                    configuration,
                    errorMessage: error.message ? error.message : error,
                },
                ...outletNodes,
            ],
            [
                ...links,
                ...outletLinks,
            ],
        ];
    }, [[], []]);
};

export const triggersToFlowDiagram = (triggers) => {
    return triggers.reduce(([nodes, links], { next, type = 'START' }) => {
        return [
            [
                ...nodes,
                {
                    // TODO: When we have multiple triggers, it might be possible to have
                    // several with the same type. We'll need to figure out a better ID solution
                    // at that point.
                    key: type,
                    category: type,
                    // We'll need to change this for multiple starts, but that may not matter yet.
                    loc: '0 0',
                },
            ],
            next ? [
                ...links,
                {
                    from: type,
                    to: next,
                },
            ] : links,
        ];
    }, [[], []]);
};
