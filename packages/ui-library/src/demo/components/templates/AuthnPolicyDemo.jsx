import React from "react";
import { Provider } from "react-redux";
import AuthnPolicy from "../../../templates/authn-policy";

/**
* @name AuthnPolicyDemo
* @memberof AuthnPolicy
* @desc A demo for AuthnPolicy
*/
class AuthnPolicyDemo extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <AuthnPolicy {...this.props} />
            </Provider>
        );
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
AuthnPolicyDemo.Reducer = AuthnPolicy.Reducer;

module.exports = AuthnPolicyDemo;
