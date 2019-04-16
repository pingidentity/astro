import { Step } from "./../panels/PageWizard";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";

cannonballChangeWarning({
    message: "The Wizard-V2 component's name has been changed to PageWizard. " +
        "To use this component, import it from lib/components/panels/PageWizard.Step."
});

export default Step;