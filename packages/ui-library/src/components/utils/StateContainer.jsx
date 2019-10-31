import React from "react";
import PropTypes from "prop-types";
import Utils from "../../util/Utils";

const mapNothing = () => ({});

const defaultGetPassedProps = props => props;
const containerGetPassedProps = props => props.passedProps;

export const createProgressiveState = stateDefs => ({
    passedProps,
    initialState,
    boundSetState,
    getPassedProps = defaultGetPassedProps,
}) => {
    const isControlled = name => passedProps[name] === undefined;

    // figure out which props will be controlled and create initial state for those
    const pState = stateDefs.reduce((state, { name, initial }) => {
        if (isControlled(name)) {
            return {
                ...state,
                [name]: initialState[name] === undefined ? initial : initialState[name],
                // the initialState prop should override the defined initial value
                // but only if this is a controlled prop
            };
        }
        return state;
    }, {});

    // make sure the keys provided in initialState are actually being controlled
    if (!Utils.isProduction()) {
        Object.keys(initialState).forEach(key => {
            if (pState[key] === undefined) {
                console.warn(
                    `Initial state provided for prop "${key}" that is not being controlled by the component`
                );
            }
        });
    }

    // generate custom callbacks with transform functions
    const makeTransformCallbacks = (name, callbacks = []) =>
        callbacks.reduce(
            (transformCallbacks, { name: cbName, transform, passTransformedValue = false, }) => ({
                ...transformCallbacks,
                [cbName]: (value, e) => {
                    // set the state with the transformed value
                    boundSetState((state, props) => {
                        const transformedValue = transform(value, state[name], getPassedProps(props));

                        if (passedProps[cbName]) {
                            passedProps[cbName](passTransformedValue ? transformedValue : value, e);
                        }

                        return { [name]: transformedValue };
                    });
                }
            }), {}
        );

    // get the callbacks for a single state definition
    const makeCallbacksFromDef = ({ name, setter, callbacks }) => {
        // add any custom callbacks
        const customTransformCallbacks = makeTransformCallbacks(name, callbacks);

        // return with setter if defined
        return setter ? {
            [setter]: (value, e) => {
                boundSetState({ [name]: value });
                // if a callback is provided, we'll still execute it
                if (passedProps[setter]) {
                    passedProps[setter](value, e);
                }
            },
            ...customTransformCallbacks
        } : customTransformCallbacks;
    };

    // create all the callbacks
    const pCallbacks = stateDefs.reduce((returnCallbacks, def) => {
        if (!isControlled(def.name)) {
            return returnCallbacks;
        }
        return { ...returnCallbacks, ...makeCallbacksFromDef(def) };
    }, {});

    return [pState, pCallbacks];
};

class StateContainer extends React.Component {
    static propTypes = {
        stateDefs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired, // name of the props
                initial: PropTypes.any.isRequired, // starting value
                setter: PropTypes.string, // name of the callback in the target component
                callbacks: PropTypes.arrayOf( // when you need something different than a simple setter
                    PropTypes.shape({
                        name: PropTypes.string,
                        // Decides whether to pass the transformed value to the callback or just the value that
                        // the base component passes.
                        passTransformedValue: PropTypes.bool,
                        transform: PropTypes.func, // this function will be applied to the value and current state
                    })
                ),
            })
        ),
        initialState: PropTypes.object,
        passedProps: PropTypes.object,
        mapToProps: PropTypes.func,
    };

    static defaultProps = {
        stateDefs: [],
        initialState: {},
        passedProps: {},
        mapToProps: mapNothing,
    };

    constructor({ stateDefs, initialState, passedProps }) {
        // the constructor has two main goals
        // 1) populate the state for any props that will be controlled
        // 2) create callback functions for those props
        super();

        const [ state, callbacks ] = createProgressiveState(stateDefs)({
            initialState, passedProps, boundSetState: this.setState.bind(this), getPassedProps: containerGetPassedProps
        });

        this.state = state;
        this.callbacks = callbacks;
    }

    render() {
        const { children, mapToProps, passedProps } = this.props;

        // alert dev if there are state/prop conflicts
        if (!Utils.isProduction()) {
            Object.keys(this.state).forEach(key => {
                if (passedProps[key] !== undefined) {
                    console.warn(
                        `The prop "${key}" is being controlled by the component because it was not initially set. ` +
                        `The newly-received value will be ignored.`
                    );
                }
            });
        }

        return children({ ...passedProps, ...this.callbacks, ...this.state, ...mapToProps(this.state, passedProps) });
    }
}

export const inStateContainer = (stateDefs, mapToProps) => WrappedComponent => ({ initialState, ...props }) => (
    <StateContainer stateDefs={stateDefs} mapToProps={mapToProps} initialState={initialState} passedProps={props}>
        {containerProps => <WrappedComponent {...containerProps} />}
    </StateContainer>
);

export const toggleTransform = (value, current) => (!current);

export default StateContainer;