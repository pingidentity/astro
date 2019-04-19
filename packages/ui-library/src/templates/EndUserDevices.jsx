import React from "react";

import UserNav from "ui-library/lib/components/end-user/UserNav";
import DeviceTable from "ui-library/lib/components/end-user/DeviceTable";
import CardModal from "ui-library/lib/components/end-user/CardModal";
import DeviceIcon from "ui-library/lib/components/end-user/DeviceIcon";

import PageHeader from "ui-library/lib/components/general/PageHeader";
import TileSelector from "ui-library/lib/components/buttons/TileSelector";


/**
* @name EndUserDevices
* @desc This is a template to demonstrate how to build a End User Devices
*/
class PairingModalContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                title: "Select Method",
                content: this._select,
            }
        };
    }

    _sms = () => (
        <p>
            End user components go here
        </p>
    )

    _email = () => (
        <p>
            End user components go here
        </p>
    )

    _select = () => {
        const onSelect = (id) => {
            const modal = id ==="sms"
                ? { title: "SMS Pairing", content: this._sms }
                : { title: "Email Pairing", content: this._email };
            this.setState({ modal });
        };
        return (
            <div>
                <p>
                Select the authentication method you want to pair with your account.
                </p>
                <TileSelector
                    onValueChange={onSelect}
                    type="stacked"
                    options={[
                        {
                            id: "sms",
                            icon: <DeviceIcon icon="sms" title="SMS"/>,
                            description: "Receive text messages with your security code.",
                        },
                        {
                            id: "email",
                            icon: <DeviceIcon icon="email" title="email"/>,
                            description: "Receive an email with your security code.",
                        },
                    ]}
                />
            </div>


        );
    }
    render () {
        const { title, content } = this.state.modal;
        const { onClose } = this.props;

        return (
            <CardModal
                expanded
                closeOnBgClick
                title={title}
                onClose={onClose}
            >
                {content()}
            </CardModal>
        );
    }
}

class AuthPage extends React.Component {
    state = { modalOpen: false };

    _toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    _closeModal = () => {
        this.setState({ modalOpen: false });
    }
    render () {
        const { modalOpen } = this.state;
        return (
            <div>
                <PageHeader title="Methods" />
                <button className="add" onClick={this._toggleModal}>Add Method</button>
                <DeviceTable
                    devices={
                        [
                            {
                                name: "CMaxwell@pingidentity.com",
                                type: "Email",
                            },
                            {
                                name: "951345279578",
                                type: "SMS",
                            },
                        ]
                    }
                />
                {
                    modalOpen && <PairingModalContainer onClose={this._closeModal} />
                }

            </div>
        );
    }
}

const ChangePasswordPage = () => {
    return (
        <div>
            <PageHeader title="Change Password" />
            <div>
                End user components go here
            </div>
        </div>
    );
};

export default class extends React.Component {
    state = { selectedTabIndex: 0 };

    _changeTab = (tab) => {
        this.setState({ selectedTabIndex: tab });
    }

    _signOut = () => {
        console.log("signed out");
    }

    render () {
        const { selectedTabIndex } = this.state;
        return (
            <div>
                <UserNav
                    logo
                    tabs={[
                        "Authentication",
                        "Change Password"
                    ]}
                    selectedTabIndex={selectedTabIndex}
                    onTabChange={this._changeTab}
                    onSignOut={this._signOut}
                    user={{
                        name: "Tyler Grove",
                        imageSrc: "src/demo/images/jordan.jpg"
                    }}
                />
                {
                    selectedTabIndex === 0
                        ? <AuthPage />
                        : <ChangePasswordPage />
                }
            </div>
        );
    }
}
