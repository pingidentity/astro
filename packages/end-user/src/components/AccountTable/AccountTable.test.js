import React from 'react';
import { mount } from 'enzyme';
import AccountTable from './AccountTable';
import SocialLogos from '../../util/SocialLogo';

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
});
