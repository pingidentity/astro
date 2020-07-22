import React from 'react';
import PropTypes from 'prop-types';
import TextBlock, { overflowTypes, alignments as textAlignments } from '../TextBlock';
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from '../shared/FlexRow';
import Modal from '../shared/Modal';
import Button from '../Button';
import { noop } from "underscore";

const getAccounts = (accounts, unlinkAccount, unlinkAccountText, unlinkAccountSuccessText) => {
    return accounts.map((account) => {
        const { image, name, unlinked } = account;
        return (
            <FlexRow className="account-table__row no-mobile-break" key={name} alignment={alignments.CENTER}>
                <div className="account-table__icon">
                    {image}
                </div>
                <div className="account-table__row-info">
                    <div className="account-table__row-details">
                        <span>
                            <TextBlock
                                className="account-table__row-name"
                                alignment={textAlignments.LEFT}
                                overflow={overflowTypes.ELLIPSIS}
                                spacing="small"
                            >
                                {name}
                            </TextBlock>
                        </span>
                    </div>
                </div>
                <div className="account-table__row-unlink">
                    <div className="account-table__row-unlink--normal">
                        { unlinked ? (
                            <Button disabled inline>
                                <span className="pingicon-unlink"/> {unlinkAccountSuccessText}
                            </Button>
                        ) : (
                            <Button onClick={unlinkAccount(account)} inline>
                                {unlinkAccountText}
                            </Button>
                        )}
                    </div>
                    <div className="account-table__row-unlink--mobile">
                        { unlinked ? (
                            <Button disabled inline>
                                <span className="pingicon-unlink"/>
                            </Button>
                        ) : (
                            <Button onClick={unlinkAccount(account)} inline iconName="delete"/>
                        )}
                    </div>
                </div>
            </FlexRow>
        );
    });
};

function delayedPromise(delay) {
    return new Promise((done) => {
        setTimeout(done, delay);
    });
}

/**
 * @class AccountTable
 * @description A component for unlinking accounts.
 * @param {string} [data-id='account-table']
 *      The data-id attribute value applied to the holder element.
 * @param {array} [accounts]
 *      The list of the accounts.
 * @param {boolean} [dropdownOpen=false]
 *      The open state of the dial code dropdown.
 * @param {AccountTable~onUnlink} onUnlink
 *      When the unlink button is pressed in the modal.
 * @param {AccountTable~onRemove} onRemove
 *      Fires three seconds after the unlink callback fires.
 */
class AccountTable extends React.Component {
    state = {
        isUnlinkModalExpanded: false,
        accountToUnlink: null,
    };

    _closeUnlinkModal = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({
            isUnlinkModalExpanded: false,
            accountToUnlink: null,
        });
    };

    _onUnlinkClick = (account) => () => {
        this.props.onUnlinkClick(account);

        this.setState({
            accountToUnlink: account,
            isUnlinkModalExpanded: true,
        });
    };


    _unlinkAccount = (account) => {
        this.setState({
            accountToUnlink: null,
            isUnlinkModalExpanded: false,
        });

        Promise.all([
            Promise.resolve(this.props.onUnlink(account)),
            delayedPromise(3000)
        ]).then(() => this.props.onRemove(account)).catch(noop);
    };

    render() {
        return [
            <Modal
                data-id="unlink-modal"
                type="dialog"
                expanded={this.state.isUnlinkModalExpanded}
                onClose={this._closeUnlinkModal}
                closeOnBgClick
                key="unlink-modal"
            >
                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <h1 className="heading-text centered-text"><span className="pingicon-unlink"/></h1>
                    <h1 className="heading-text centered-text">
                        {this.props.unlinkModalTitle}
                    </h1>
                    <p className="normal-text centered-text">
                        {this.props.unlinkModalMessage}
                    </p>
                    <Button
                        label={this.props.unlinkModalConfirmText}
                        type={Button.ButtonTypes.DANGER}
                        onClick={() => this._unlinkAccount(this.state.accountToUnlink)}
                    />
                    <TextBlock size="small"><a onClick={this._closeUnlinkModal}>
                        {this.props.cancelText}
                    </a></TextBlock>
                </FlexRow>
            </Modal>,
            <FlexRow
                flexDirection={flexDirectionOptions.COLUMN}
                className="account-table no-mobile-break"
                key="accounts"
                data-id={this.props['data-id']}
            >
                {this.props.accounts.length > 0 ?
                    getAccounts(
                        this.props.accounts,
                        this._onUnlinkClick,
                        this.props.unlinkAccountText,
                        this.props.unlinkAccountSuccessText
                    ) : (
                        <p className="normal-text centered-text">
                            {this.props.noConnectedAccountsMessage}
                        </p>
                    )
                }
            </FlexRow>
        ];
    }
}

AccountTable.propTypes = {
    'data-id': PropTypes.string,
    accounts: PropTypes.array,
    onRemove: PropTypes.func,
    onUnlink: PropTypes.func,
    unlinkModalMessage: PropTypes.node.isRequired,
    unlinkModalTitle: PropTypes.node.isRequired,
    unlinkModalConfirmText: PropTypes.node.isRequired,
    onUnlinkClick: PropTypes.func,
    cancelText: PropTypes.string,
    unlinkAccountText: PropTypes.string,
    unlinkAccountSuccessText: PropTypes.string,
};

AccountTable.defaultProps = {
    'data-id': 'account-table',
    noConnectedAccountsMessage: 'No presently connected accounts.',
    accounts: [],
    onRemove: noop,
    onUnlink: noop,
    onUnlinkClick: noop,
    cancelText: 'Cancel',
    unlinkAccountText: 'Unlink Account',
    unlinkAccountSuccessText: 'Account Unlinked',
    unlinkModalConfirmText: 'Unlink'
};

export default AccountTable;
