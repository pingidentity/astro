import React from 'react';
import PropTypes from 'prop-types';
import TextBlock, { overflowTypes, alignments as textAlignments } from '../TextBlock';
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from '../shared/FlexRow';
import Modal from '../shared/Modal';
import Button from '../Button';
import { noop } from "underscore";

const getAccounts = (accounts, unlinkAccount, unlinkAccountText, unlinkAccountSuccessText, canDelete) => {
    return accounts.map((account, index) => {
        const { image, name, unlinked, id, details = [] } = account;
        return (
            <FlexRow className="account-table__row no-mobile-break" key={id || name} alignment={alignments.CENTER}>
                <div className="account-table__icon">
                    {image}
                </div>
                <div className="account-table__row-info">
                    <div className="account-table__row-details">
                        <TextBlock
                            className="account-table__row-name"
                            alignment={textAlignments.LEFT}
                            spacing={TextBlock.margins.MD}
                            overflow={overflowTypes.ELLIPSIS}
                            key="name"
                        >
                            {name}
                        </TextBlock>
                        {details.map((detailsRow, i) => (
                            <TextBlock
                                className="account-table__row-subdetails"
                                alignment={textAlignments.LEFT}
                                spacing={TextBlock.margins.SM}
                                key={`details-${i}`}
                            >
                                {detailsRow}
                            </TextBlock>
                        ))}
                    </div>
                </div>
                {canDelete && (
                    <div className="account-table__row-unlink">
                        <div className="account-table__row-unlink--normal">
                            { unlinked ? (
                                <Button disabled inline data-id={`delete-${id || index}-button`}>
                                    {unlinkAccountSuccessText}
                                </Button>
                            ) : (
                                <Button onClick={unlinkAccount(account)} inline data-id={`delete-${id || index}-button`}>
                                    {unlinkAccountText}
                                </Button>
                            )}
                        </div>
                        <div className="account-table__row-unlink--mobile">
                            { unlinked ? (
                                <Button disabled inline iconName="delete" />
                            ) : (
                                <Button onClick={unlinkAccount(account)} inline iconName="delete"/>
                            )}
                        </div>
                    </div>
                )}
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
                        data-id={`${this.props['data-id']}-confirm-unlink`}
                    />
                    <TextBlock size="small"><a onClick={this._closeUnlinkModal} data-id={`${this.props['data-id']}-cancel-unlink`}>
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
                        this.props.unlinkAccountSuccessText,
                        this.props.canDelete
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
    unlinkAccountText: PropTypes.node,
    unlinkAccountSuccessText: PropTypes.node,
    canDelete: PropTypes.bool,
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
    unlinkModalConfirmText: 'Unlink',
    canDelete: true,
};

export default AccountTable;

AccountTable.UnlinkIcon = () => <span className="pingicon-unlink"/>;
AccountTable.UnlinkIcon.displayName = 'UnlinkIcon';
