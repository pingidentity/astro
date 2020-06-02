import React from 'react';

import Stack from '../../src/components/Stack';
import Button, { ButtonTypes } from '../../src/components/Button';
import Container from '../../src/components/Container';
import Card, { CardTypes } from '../../src/components/Card';
import UserNav from '../../src/components/shared/UserNav';
import FloatLabelTextInput from '../../src/components/FloatLabelTextInput';
import FormLabel from '../../src/components/shared/FormLabel';
import PageSection from '../../src/components/shared/PageSection';
import Padding, { sizes as paddingSizes } from '../../src/components/shared/Padding';
import FlexRow, { spacingOptions, alignments, flexDirectionOptions, justifyOptions } from '../../src/components/shared/FlexRow';
import Modal from '../../src/components/shared/Modal';
import TextInput from '../../src/components/TextInput';
import TextBlock from '../../src/components/TextBlock';
import Toggle from '../../src/components/shared/Toggle';
import DeviceTable from '../../src/components/shared/DeviceTable';
import AccountTable from '../../src/components/AccountTable';
import SocialIcons from '../../src/components/SocialIcon';
import ImageInput from '../../src/components/ImageInput';
import FloatLabelDropdownCustom from '../../src/components/FloatLabelDropdownCustom';
import Columns, { Column, alignments as colAlignments, widths as colWidths } from '../../src/components/Columns';

import '../../src/css/styles.scss';

export default {
    title: 'Templates/Pages/Self Service',
};

export const Default = () => (
    <SelfService/>
);

class SelfService extends React.Component {
    state = {
        selectedIndex: 0,
        openModals: [],
    };

    _handleSectionChange = (index) => {
        this.setState({
            selectedIndex: index,
        });
    };

    render = () => (
        <>
            <UserNav
                logo
                tabs={[
                    'My Profile',
                    'Authentication',
                    'Change Password',
                    'Linked Accounts',
                ]}
                selectedTabIndex={this.state.selectedIndex}
                onTabChange={this._handleSectionChange}
                user={{
                    name: 'Tyler Grove',
                    imageSrc: 'https://placedog.net/50/50'
                }}
            />

            {this.state.selectedIndex === 0 ? <MyProfilePage /> : null}
            {this.state.selectedIndex === 1 ? <AuthenticationPage /> : null}
            {this.state.selectedIndex === 2 ? <ChangePasswordPage /> : null}
            {this.state.selectedIndex === 3 ? <LinkedAccountsPage /> : null}
        </>
    );
};

class MyProfilePage extends React.Component {
    state = {
        isEditToggled: false,
    };

    _toggleEdit = () => {
        this.setState({ isEditToggled: !this.state.isEditToggled });
    }

    render() {
        const {
            isEditToggled,
        } = this.state;

        return (
            <Container>
                {isEditToggled ? (
                    <div>
                        <PageSection title="Personal Settings">
                            <FlexRow
                                spacing={spacingOptions.MD}
                                flexDirection={flexDirectionOptions.COLUMN}
                            >
                                <FlexRow
                                    spacing={spacingOptions.MD}
                                    alignment={alignments.CENTER}
                                    flexDirection={flexDirectionOptions.ROW}
                                    justify={justifyOptions.SPACEBETWEEN}
                                >
                                    <Column width={colWidths.TWO} alignment={colAlignments.CENTER}>
                                        <ImageInput
                                            value="https://images-na.ssl-images-amazon.com/images/I/61qxTCzXx0L._SX425_.jpg"
                                        />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput label="First Name" />
                                    </Column>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelTextInput label="Middle Name" />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput label="Last Name" />
                                    </Column>
                                </FlexRow>
                            </FlexRow>
                        </PageSection>

                        <PageSection title="Contact">
                            <FlexRow
                                spacing={spacingOptions.MD}
                                flexDirection={flexDirectionOptions.COLUMN}
                            >
                                <Columns>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput label="Primary Number" />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput label="Mobile Number" />
                                    </Column>
                                    <Column width={colWidths.FOUR} />
                                </Columns>
                                <Columns>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput label="Email Address" />
                                    </Column>
                                    <Column width={colWidths.FOUR} />
                                    <Column width={colWidths.FOUR} />
                                </Columns>
                            </FlexRow>
                        </PageSection>

                        <PageSection title="Location">
                            <FlexRow
                                spacing={spacingOptions.MD}
                                flexDirection={flexDirectionOptions.COLUMN}
                            >
                                <Columns>
                                    <Column width={colWidths.EIGHT}>
                                        <FloatLabelTextInput label="Street Address" />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput label="Apt. / Suite" />
                                    </Column>
                                </Columns>
                                <Columns>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelDropdownCustom
                                            id="countryDropdown"
                                            label="Country"
                                            options={['Canada', 'United States']}
                                            value="United States"
                                        />
                                    </Column>
                                    <Column width={colWidths.SIX}>
                                        <FloatLabelTextInput label="City" />
                                    </Column>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelDropdownCustom
                                            id="stateDropdown"
                                            label="State"
                                            options={['NE', 'IA']}
                                            value="NE"
                                        />
                                    </Column>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelTextInput label="Zip Code" />
                                    </Column>
                                </Columns>
                            </FlexRow>
                        </PageSection>

                        <PageSection title="Company">
                            <FlexRow
                                spacing={spacingOptions.MD}
                                flexDirection={flexDirectionOptions.COLUMN}
                            >
                                <Columns>
                                    <Column width={colWidths.EIGHT}>
                                        <FloatLabelTextInput label="Job Title" />
                                    </Column>
                                    <Column width={colWidths.FOUR} />
                                </Columns>
                            </FlexRow>
                        </PageSection>

                        <FlexRow>
                            <Column width={colWidths.TWELVE} alignment={colAlignments.RIGHT}>
                                <Button inline className="button--inline-alt" onClick={this._toggleEdit}>View Profile</Button>
                            </Column>
                        </FlexRow>
                    </div>
                ) : (
                    <div>
                        <Padding bottom={paddingSizes.LG}>
                            <Columns>
                                <Column width={colWidths.EIGHT}>
                                    <FlexRow
                                        spacing={spacingOptions.LG}
                                        alignment={alignments.CENTER}
                                    >
                                        <img
                                            src="https://placedog.net/150/150"
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                        <div>
                                            <FormLabel className="mobileCenter">kaddleman</FormLabel>
                                            <h1 className="heading-text centered-text">Dr. Katherine Anne Addleman</h1>
                                        </div>
                                    </FlexRow>
                                </Column>
                                <Column width={colWidths.FOUR} alignment={colAlignments.RIGHT}>
                                    <Button inline className="button--inline-alt" onClick={this._toggleEdit}>Edit Profile</Button>
                                </Column>
                            </Columns>
                        </Padding>

                        <PageSection title="Contact">
                            <FlexRow
                                spacing={spacingOptions.LG}
                                flexDirection={flexDirectionOptions.COLUMN}
                            >
                                <Columns>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Phone</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">(123) 456-7890</TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Email</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">katie.addleman@compra</TextBlock>
                                    </Column>
                                    <Column width={colWidths.SIX} />
                                </Columns>
                            </FlexRow>
                        </PageSection>

                        <PageSection title="Location">
                            <FlexRow
                                spacing={spacingOptions.LG}
                                flexDirection={flexDirectionOptions.COLUMN}
                            >
                                <Columns>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Street Address</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">1440 S Main Street</TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>City</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">San Diego</TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>State</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">CA</TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE} />
                                </Columns>
                                <Columns>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Zip Code</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">92121</TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Country</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">United States</TextBlock>
                                    </Column>
                                    <Column width={colWidths.SIX} />
                                </Columns>
                            </FlexRow>
                        </PageSection>
                    </div>
                )}
            </Container>
        );
    }
};

const ChangePasswordPage = () => (
    <Container maxWidth="400px">
        <h1 className="heading-text centered-text">Change Password</h1>
        <p className="normal-text centered-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
        </p>
        <Card>
            <Stack>
                <FloatLabelTextInput label="Current Password" id="currentPassword" />
                <FloatLabelTextInput label="New Password" id="newPassword" />
                <FloatLabelTextInput label="Confirm New Password" id="confirmNewPassword" />
                <Button label="Save" type={ButtonTypes.PRIMARY} />
            </Stack>
        </Card>
    </Container>
);

class AuthenticationPage extends React.Component {
    state = {
        isExpanded1: false,
        isExpanded2: false,
        multifactorAuth: true,
        dataIsVisible: false,
    };

    _openModal = modal => () => this.setState({ [`isExpanded${modal}`]: true });

    _closeModal = modal => () => this.setState({ [`isExpanded${modal}`]: false });

    _toggleValue = val => () => this.setState({ [val]: !this.state[val] });

    _showData = () => {
        this.setState({ dataIsVisible: true });
    }

    render = () => (
        <Container maxWidth="400px">
            {!this.state.dataIsVisible ? (
                <>
                    <h1 className="heading-text centered-text">Authentication Methods</h1>
                    <p className="normal-text centered-text">
                        To set up multi-factor authentication, you need to add an authentication method.
                    </p>
                    <Button label="Add Method" type={ButtonTypes.PRIMARY} onClick={() => this._openModal(1)()} />
                </>
            ) : (
                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <h1 className="heading-text centered-text">Authentication</h1>
                    <Card type={CardTypes.SLIM}>
                        <FlexRow
                            alignment={alignments.CENTER}
                            flexDirection={flexDirectionOptions.ROW}
                            spacing={spacingOptions.SM}
                        >
                            <div>
                                <TextBlock size="small">Multifactor Authentication</TextBlock>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <Toggle
                                    data-id="user-toggle1"
                                    className="row-status-toggle"
                                    stateless={true}
                                    toggled={this.state.multifactorAuth}
                                    onToggle={() => this._toggleValue('multifactorAuth')()}
                                    name="the-toggle"
                                />
                            </div>
                        </FlexRow>
                    </Card>

                    <h2 className="heading-text centered-text">Your Authentication Methods</h2>

                    <Card type={CardTypes.SLIM}>
                        <FlexRow
                            alignment={alignments.CENTER}
                            flexDirection={flexDirectionOptions.COLUMN}
                            spacing={spacingOptions.SM}
                        >
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
                        </FlexRow>
                    </Card>
                    <TextBlock><a href="#" onClick={() => this._openModal(1)()}>+ Add Method</a></TextBlock>
                </FlexRow>
            )}

            <Modal
                data-id="default-example"
                modalTitle="Dialog Modal"
                type="dialog"
                expanded={this.state.isExpanded1}
                onOpen={this._openModal(1)}
                onClose={this._closeModal(1)}
            >

                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.SM}
                >
                    <h1 className="heading-text centered-text">SMS Pairing</h1>
                    <p className="normal-text centered-text">
                        Enter the mobile number you would like to recieve authentication codes with.
                    </p>
                    <TextInput width="100%" />
                    <Button label="Next" type={ButtonTypes.PRIMARY} onClick={() => { this._closeModal(1)(); this._openModal(2)(); }} />
                    <TextBlock size="small"><a href="#" onClick={() => this._closeModal(1)()}>Cancel</a></TextBlock>
                </FlexRow>
            </Modal>

            <Modal
                data-id="default-example"
                modalTitle="Dialog Modal"
                type="dialog"
                expanded={this.state.isExpanded2}
                onclose={this._openModal(2)}
                onClose={this._closeModal(2)}>

                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <h1 className="heading-text centered-text">SMS Pairing</h1>
                    <p className="normal-text centered-text">
                        Enter the passcode you recieved to complete SMS pairing.
                    </p>
                    <TextInput width="150px" />
                    <TextBlock size="small"><a href="#">Resend passcode</a></TextBlock>
                    <Button label="Next" type={ButtonTypes.PRIMARY} onClick={() => { this._closeModal(2)(); this._openModal(3)(); }} />
                    <TextBlock size="small"><a href="#" onClick={() => this._closeModal(2)()}>Cancel</a></TextBlock>
                </FlexRow>
            </Modal>

            <Modal
                data-id="default-example"
                modalTitle="Dialog Modal"
                type="dialog"
                expanded={this.state.isExpanded3}
                onclose={this._openModal(3)}
                onClose={this._closeModal(3)}>

                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <h1 className="heading-text centered-text">Email Pairing</h1>
                    <p className="normal-text centered-text">
                        Enter the email address you would like to recieve authentication codes with.
                    </p>
                    <TextInput width="100%" />
                    <Button label="Next" type={ButtonTypes.PRIMARY} onClick={() => { this._closeModal(3)(); this._openModal(4)(); }} />
                </FlexRow>
            </Modal>

            <Modal
                data-id="default-example"
                modalTitle="Dialog Modal"
                type="dialog"
                expanded={this.state.isExpanded4}
                onclose={this._openModal(4)}
                onClose={this._closeModal(4)}
            >
                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <h1 className="heading-text centered-text">Email Pairing</h1>
                    <p className="normal-text centered-text">
                        Enter the passcode you recieved to complete email pairing.
                    </p>
                    <TextInput width="150px" />
                    <TextBlock size="small"><a href="#">Resend passcode</a></TextBlock>
                    <Button label="Save" type={ButtonTypes.PRIMARY} onClick={() => { this._closeModal(4)(); this._showData(); }} />
                    <TextBlock size="small"><a href="#" onClick={() => this._closeModal(4)()}>Cancel</a></TextBlock>
                </FlexRow>
            </Modal>
        </Container>
    );
};

class LinkedAccountsPage extends React.Component {
    state = {
        accounts: [
            {
                name: "Google",
                image: <SocialIcons.GOOGLE width={40} height={40} />,
            },
            {
                name: "Facebook",
                image: <SocialIcons.FACEBOOK width={40} height={40} />,
            },
        ],
        accountToUnlink: ''
    }
    render() {
        return (
            <Container maxWidth="400px">
                <h2 className="heading-text centered-text">Linked Accounts</h2>
                <p className="normal-text centered-text">
                    Text explaining that this is. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                </p>
                <Card type={CardTypes.SLIM}>
                    <FlexRow
                        alignment={alignments.CENTER}
                        flexDirection={flexDirectionOptions.COLUMN}
                        spacing={spacingOptions.SM}
                    >
                        <AccountTable
                            onUnlink={({ name: accountName }) => {
                                this.setState((prevState) => prevState.accounts.map((account) => {
                                    if (account.name === accountName) {
                                        account.unlinked = true;
                                    }
                                    return account;
                                }));
                            }}
                            onRemove={({ name: accountName }) => {
                                this.setState((prevState) => {
                                    return {
                                        accounts: prevState.accounts.filter(({ name }) => name !== accountName)
                                    };
                                });
                            }}
                            onUnlinkClick={({ name }) => {
                                this.setState({ accountToUnlink: name });
                            }}
                            accounts={this.state.accounts}
                            unlinkModalMessage={`Are you sure you want to unlink your ${this.state.accountToUnlink} account? Unlinking this account will not allow you to access PingOne with your ${this.state.accountToUnlink} credentials.`}
                            unlinkModalTitle={`Unlink Linked Account: ${this.state.accountToUnlink}`}
                        />
                    </FlexRow>
                </Card>
            </Container>
        );
    }
}
