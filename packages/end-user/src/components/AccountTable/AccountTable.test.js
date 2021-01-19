import React from 'react';
import { mount } from 'enzyme';
import AccountTable from './AccountTable';
import SocialLogos from '../../util/SocialLogo';
import HelpHint, {Placements} from "../shared/HelpHint";
import Button from "../Button";

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'account-table',
};
const getComponent = props => mount(<AccountTable {...defaultProps} {...props} />);

describe('AccountTable', () => {
    it('renders the AccountTable in the default state', () => {
        const wrapper = getComponent();
        const accountTable = wrapper.find('[data-id="account-table"]');

        expect(accountTable.exists()).toEqual(true);
    });

    it('populates the accounts', () => {
        const wrapper = getComponent({
            accounts: [
                {
                    name: "Google",
                    image: <SocialLogos.GOOGLE width={40} height={40} />,
                },
                {
                    name: "Facebook",
                    image: <SocialLogos.FACEBOOK width={40} height={40} />,
                    details: [
                        "_details_",
                        "_another details_"
                    ]
                },
            ]
        });

        expect(wrapper.find('.account-table > .account-table__row').length).toEqual(2);
        expect(
            wrapper
                .find('.account-table .account-table__row-details > .account-table__row-subdetails')
                .map(block => block.text())
        ).toEqual(["_details_", "_another details_"]);
    });
    it('renders custom element if prop renderUnlinked is function', () => {

        const wrapper = getComponent({
              renderUnlinked: () => (
                <HelpHint
                  placement={Placements.TOP}
                  hintText="This is your current session. It can not be deleted"
                >
                    <Button className="a-real-button" disabled inline>Cannot be Signed Off</Button>
                </HelpHint>),
              unlinkAccountSuccessText: "Cannot be Signed Off",
              accounts: [
                  {
                      name: "Google",
                      unlinked: true,
                      image: <SocialLogos.GOOGLE width={40} height={40} />,
                  },
                  {
                      name: "Facebook",
                      image: <SocialLogos.FACEBOOK width={40} height={40} />,
                  },
              ]
        }
        )
        const component = wrapper.find('button.a-real-button');
        expect(component.exists()).toEqual(true);
    })
});
