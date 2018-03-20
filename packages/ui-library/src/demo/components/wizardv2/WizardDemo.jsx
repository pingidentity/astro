import Wizard, { Step } from "ui-library/lib/components/wizard-v2/Wizard";
import TextField from "ui-library/lib/components/forms/form-text-field/";
import React from "react";


class WizardDemo extends React.Component {
    state = {
        activeStep: 0,
        completed: [],
        show: false,
        visited: [],
    };

    onNext = () => {

        if (this.state.visited.indexOf(this.state.activeStep) === -1) {
            this.setState({
                visited: [...this.state.visited, this.state.activeStep]
            });
        }
        if (this.state.completed.indexOf(this.state.activeStep) === -1) {
            this.setState({
                completed: [...this.state.completed, this.state.activeStep]
            });
        }

        this.setState({ activeStep: this.state.activeStep + 1 });
    }

    onClick = (stepIndex) => {
        this.setState({ activeStep: stepIndex });
    };

    closeWizard = () => {
        this.toggleWizard();
        this.resetDemo();
    };

    toggleWizard = () => {
        this.setState({ show: !this.state.show });
    };

    stepVisited = (stepIndex) => {
        return this.state.visited.indexOf(stepIndex) > -1;
    };

    resetDemo = () => {
        this.setState({
            activeStep: 0,
            completed: [],
            visited: [],
        });
    }

    render() {
        const Step1Content = (
            <TextField />
        );
        const headerItems = this.state.activeStep !== 0
            ? [
                { title: "first", value: "Tyler" },
                { title: "last", value: "Grove" },
                { title: "email", value: "tgrove@pingidentity.com" },
            ] : null;

        return ([
            <button key="wizard-button" onClick={this.toggleWizard}>Show Wizard</button>,
            (this.state.show &&
                <Wizard
                    key="wizard"
                    ref={component => this.wizard = component}
                    headerItems={headerItems}
                    activeStep={this.state.activeStep}
                    onNext={this.onNext}
                    onCancel={this.closeWizard}
                    onClick={this.onClick}
                    onClose={this.toggleWizard}>

                    <Step
                        title="Create User Profile"
                        menuDescription="Let's add someone to your directory."
                        description="Adding a user to the PingOne directory will create an identity within a selected
                            environment. Additionally you can add Roles, Groups and account access parameters to
                            complete the profile. Things such as password policies for this user are inherited from the
                            environment settings."
                        completed={this.stepVisited(0)}
                        onSave={this.onNext}
                        required>
                        {Step1Content}
                    </Step>
                    <Step
                        title="Required 2"
                        description="This is the second required step"
                        completed={ this.stepVisited(1) }
                        onSave={this.onNext}
                        required>
                        Second step content
                    </Step>
                    <Step
                        title="Required 3"
                        description="This is the second required step"
                        onSave={this.onNext}
                        completed={ this.stepVisited(2) }
                        required>
                        Second step content
                    </Step>

                    <Step
                        title="Optional 1"
                        description="This is the first optional step"
                        completed={ this.stepVisited(3) }>
                        First optional
                    </Step>
                    <Step title="Optional 2"
                        description="This is the second optional step"
                        completed={ this.stepVisited(4) }>
                        Second optional
                    </Step>
                    <Step
                        title="Optional 3"
                        description="This is the third optional step"
                        completed={ this.stepVisited(5) }
                        onSave={this.closeWizard}>
                        Third optional
                    </Step>
                </Wizard>
            )
        ]);
    }
}

module.exports = WizardDemo;
