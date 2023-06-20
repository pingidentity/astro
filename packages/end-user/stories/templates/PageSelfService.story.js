import React from 'react';
import PropTypes from 'prop-types';

import Stack from '../../src/components/Stack';
import Button, { ButtonTypes } from '../../src/components/Button';
import Container from '../../src/components/Container';
import Card, { CardTypes } from '../../src/components/Card';
import SelfServeNav from '../../src/components/shared/SelfServeNav';
import FloatLabelTextInput from '../../src/components/FloatLabelTextInput';
import FormLabel from '../../src/components/shared/FormLabel';
import PageSection from '../../src/components/shared/PageSection';
import Padding, { sizes as paddingSizes } from '../../src/components/shared/Padding';
import FlexRow, { spacingOptions, alignments, flexDirectionOptions, justifyOptions } from '../../src/components/shared/FlexRow';
import Modal, { BodyOverflowTypes } from '../../src/components/shared/Modal';
import TextInput from '../../src/components/TextInput';
import TextBlock from '../../src/components/TextBlock';
import Toggle from '../../src/components/shared/Toggle';
import DeviceTable from '../../src/components/shared/DeviceTable';
import AccountTable from '../../src/components/AccountTable';
import SocialIcons from '../../src/components/SocialIcon';
import ImageInput from '../../src/components/ImageInput';
import FloatLabelDropdown from '../../src/components/FloatLabelDropdown';
import Columns, { Column, alignments as colAlignments, widths as colWidths } from '../../src/components/Columns';

import '../../src/css/styles.scss';
import PhoneInput from '../../src/components/PhoneInput';
import HelpHint, { Placements } from '../../src/components/shared/HelpHint';

export default {
    title: 'Templates/Pages/Self Service',
};

export const Default = () => (
    <SelfService />
);

class SelfService extends React.Component {
    state = {
        selectedIndex: 0,
        user: {
            imageSrc: 'https://placedog.net/50/50',
            email: 'katie.addleman@compra',
            familyName: 'Kaddleman',
            givenName: 'Katherine',
            middleName: 'Anne',
            name: 'Katherine Anne Kaddleman',
            honorificPrefix: 'Dr.',
            honorificSuffix: '',
            jobTitle: '',
            nickname: '',
            primaryPhone: '(123) 456-7890',
            mobilePhone: '',
            streetAddress: '1440 S Main Street',
            streetAddress2: '',
            locality: 'San Diego',
            region: 'CA',
            postalCode: '92121',
            country: 'United States',
        },
    };

    _handleSectionChange = index => {
        this.setState({
            selectedIndex: index,
        });
    };

    _handleUserChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };

    _handleImgChange = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const { result } = e.target
            if (result) {
                this.setState({
                    user: {
                        ...this.state.user,
                        imageSrc: result
                    },
                });
            }
        };
        reader.readAsDataURL(file);
    };

    render = () => (
        <React.Fragment>
            <SelfServeNav
                logo
                navs={[
                    'My Profile',
                    'Authentication',
                    'Change Password',
                    'Linked Accounts',
                ]}
                selectedNav={this.state.selectedIndex}
                onSelectNav={this._handleSectionChange}
                user={{
                    name: this.state.user.name,
                    imageSrc: this.state.user.imageSrc,
                }}
            />

            {this.state.selectedIndex === 0 ? (
                <MyProfilePage
                    user={this.state.user}
                    handleUserChange={this._handleUserChange}
                    handleImgChange={this._handleImgChange}
                />
            ) : null}
            {this.state.selectedIndex === 1 ? <AuthenticationPage /> : null}
            {this.state.selectedIndex === 2 ? <ChangePasswordPage /> : null}
            {this.state.selectedIndex === 3 ? <LinkedAccountsPage /> : null}
        </React.Fragment>
    );
}

class MyProfilePage extends React.Component {
    state = {
        isEditToggled: false,
    };

    _toggleEdit = () => {
        this.setState({ isEditToggled: !this.state.isEditToggled });
    };

    render() {
        const {
            isEditToggled,
        } = this.state;

        const { user, handleUserChange, handleImgChange } = this.props;

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
                                    <Column
                                        width={colWidths.TWO}
                                        alignment={colAlignments.CENTER}
                                    >
                                        <ImageInput
                                            value={user.imageSrc}
                                            onChange={handleImgChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput
                                            label="First Name"
                                            name="givenName"
                                            value={user.givenName}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelTextInput
                                            label="Middle Name"
                                            name="middleName"
                                            value={user.middleName}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput
                                            label="Last Name"
                                            name="familyName"
                                            value={user.familyName}
                                            onChange={handleUserChange}
                                        />
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
                                        <FloatLabelTextInput
                                            label="Primary Number"
                                            name="primaryPhone"
                                            value={user.primaryPhone}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput
                                            label="Mobile Number"
                                            name="mobilePhone"
                                            value={user.mobilePhone}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.FOUR} />
                                </Columns>
                                <Columns>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput
                                            label="Email Address"
                                            name="email"
                                            value={user.email}
                                            onChange={handleUserChange}
                                        />
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
                                        <FloatLabelTextInput
                                            label="Street Address"
                                            name="streetAddress"
                                            value={user.streetAddress}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.FOUR}>
                                        <FloatLabelTextInput
                                            label="Apt. / Suite"
                                            name="streetAddress2"
                                            value={user.streetAddress2}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                </Columns>
                                <Columns>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelDropdown
                                            id="countryDropdown"
                                            label="Country"
                                            options={["Canada", "United States"]}
                                            name="country"
                                            value={user.country}
                                            onChange={(value) => handleUserChange({ target: { name: 'country', value } })}
                                        />
                                    </Column>
                                    <Column width={colWidths.SIX}>
                                        <FloatLabelTextInput
                                            label="City"
                                            name="locality"
                                            value={user.locality}
                                            onChange={handleUserChange}
                                        />
                                    </Column>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelDropdown
                                            id="stateDropdown"
                                            label="State"
                                            name="region"
                                            options={["NE", "IA", "CA"]}
                                            value={user.region}
                                            onChange={(value) => handleUserChange({ target: { name: 'region', value } })}
                                        />
                                    </Column>
                                    <Column width={colWidths.TWO}>
                                        <FloatLabelTextInput
                                            label="Zip Code"
                                            name="postalCode"
                                            value={user.postalCode}
                                            onChange={handleUserChange}
                                        />
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
                                        <FloatLabelTextInput
                                            label="Job Title"
                                            name="jobTitle"
                                            value={user.jobTitle}
                                            onChange={handleUserChange}
                                        />
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
                                            src={user.imageSrc}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                        <div>
                                            <FormLabel className="mobileCenter">{user.familyName}</FormLabel>
                                            <h1 className="heading-text centered-text">
                                                {user.honorificPrefix} {user.givenName} {user.middleName} {user.familyName} {user.honorificSuffix}
                                            </h1>
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
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.primaryPhone}
                                        </TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Email</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.email}
                                        </TextBlock>
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
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.streetAddress}
                                            <br />
                                            {user.streetAddress2}
                                        </TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>City</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.locality}
                                        </TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>State</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.region}
                                        </TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE} />
                                </Columns>
                                <Columns>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Zip Code</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.postalCode}
                                        </TextBlock>
                                    </Column>
                                    <Column width={colWidths.THREE}>
                                        <FormLabel>Country</FormLabel>
                                        <TextBlock className="text-block--full-width text-block--left">
                                            {user.country}
                                        </TextBlock>
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
}

MyProfilePage.propTypes = {
    handleImgChange: PropTypes.func,
    handleUserChange: PropTypes.func,
    user: PropTypes.shape({
        imageSrc: PropTypes.string,
        email: PropTypes.string,
        familyName: PropTypes.string,
        givenName: PropTypes.string,
        middleName: PropTypes.string,
        name: PropTypes.string,
        jobTitle: PropTypes.string,
        honorificSuffix: PropTypes.string,
        honorificPrefix: PropTypes.string,
        nickname: PropTypes.string,
        primaryPhone: PropTypes.string,
        streetAddress: PropTypes.string,
        streetAddress2: PropTypes.string,
        locality: PropTypes.string,
        region: PropTypes.string,
        postalCode: PropTypes.string,
        country: PropTypes.string,
    }),
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
    };

    render = () => (
        <Container maxWidth="400px">
            {!this.state.dataIsVisible ? (
                <React.Fragment>
                    <h1 className="heading-text centered-text">Authentication Methods</h1>
                    <p className="normal-text centered-text">
                        To set up multi-factor authentication, you need to add an authentication method.
                    </p>
                    <Button label="Add Method" type={ButtonTypes.PRIMARY} onClick={() => this._openModal(1)()} />
                </React.Fragment>
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
                                    stateless
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
                                            name: 'CMaxwell@pingidentity.com',
                                            type: 'Email',
                                        },
                                        {
                                            name: '951345279578',
                                            type: 'SMS',
                                        },
                                        {
                                            type: 'totp',
                                            typeLabel: 'Authenticator App',
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
                overflow={BodyOverflowTypes.VISIBLE}
            >

                <FlexRow
                    alignment={alignments.CENTER}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.SM}
                >
                    <h1 className="heading-text centered-text">SMS Pairing</h1>
                    <p className="normal-text centered-text">
                        Enter the mobile number you would like to receive authentication codes with.
                    </p>
                    <TextInput width="100%" />
                    <Button
                        label="Next"
                        type={ButtonTypes.PRIMARY}
                        onClick={() => { this._closeModal(1)(); this._openModal(2)(); }}
                    />
                    <TextBlock size="small">
                        <a href="#" onClick={() => this._closeModal(1)()}>Cancel</a>
                    </TextBlock>
                    <PhoneInput />
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
                onClose={this._closeModal(2)}
            >

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
                onClose={this._closeModal(3)}
            >

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
                    <Button
                        label="Next"
                        type={ButtonTypes.PRIMARY}
                        onClick={() => { this._closeModal(3)(); this._openModal(4)(); }}
                    />
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
                    <TextBlock size="small">
                        <a href="#">Resend passcode</a>
                    </TextBlock>
                    <Button
                        label="Save"
                        type={ButtonTypes.PRIMARY}
                        onClick={() => { this._closeModal(4)(); this._showData(); }}
                    />
                    <TextBlock size="small">
                        <a href="#" onClick={() => this._closeModal(4)()}>Cancel</a>
                    </TextBlock>
                </FlexRow>
            </Modal>
        </Container>
    );
}

class LinkedAccountsPage extends React.Component {
    state = {
        accounts: [
            {
                name: 'Google',
                image: <SocialIcons.GOOGLE width={40} height={40} />,
            },
            {
                name: 'Facebook',
                image: <SocialIcons.FACEBOOK width={40} height={40} />,
                details: [
                    'Some',
                    'Details',
                    'Below',
                ],
            },
            {
                name: 'Amazon',
                image: <SocialIcons.AMAZON width={40} height={40} />,
                details: [
                    <b>Never used</b>,
                ],
            },
        ],
        sessions: [
            {
                name: 'Chrome 77.25',
                image: <SocialIcons.GOOGLE width={40} height={40} />,
                details: [
                    'Aus, TX',
                    '2020-01-01 20:05 CST',
                ],
                unlinked: true,
            },
            {
                name: 'Internet Explorer',
                image: <div style={{ width: 40, height: 40 }} />,
                details: [
                    'MacOs',
                ],
            },
            {
                name: <i>Unknown</i>,
                image: <div style={{ width: 40, height: 40 }} />,
            },
        ],
        accountToUnlink: '',
    };
    render() {
        return (
            <Container maxWidth="400px">
                <h2 className="heading-text centered-text">Linked Accounts</h2>
                <Card type={CardTypes.SLIM}>
                    <FlexRow
                        alignment={alignments.CENTER}
                        flexDirection={flexDirectionOptions.COLUMN}
                        spacing={spacingOptions.SM}
                    >
                        <AccountTable
                            onUnlink={({ name: accountName }) => {
                                this.setState(prevState => prevState.accounts.map(account => {
                                    if (account.name === accountName) {
                                        account.unlinked = true;
                                    }
                                    return account;
                                }));
                            }}
                            onRemove={({ name: accountName }) => {
                                this.setState(prevState => ({
                                    accounts: prevState.accounts.filter(({ name }) => name !== accountName),
                                }));
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
                <h2 className="heading-text centered-text">Sessions</h2>
                <Card type={CardTypes.SLIM}>
                    <FlexRow
                        alignment={alignments.CENTER}
                        flexDirection={flexDirectionOptions.COLUMN}
                        spacing={spacingOptions.SM}
                    >
                        <AccountTable
                            onUnlink={({ name: nameToDelete }) => {
                                this.setState(({ sessions }) => ({
                                    sessions: sessions.filter(({ name }) => name !== nameToDelete),
                                }));
                            }}
                            accounts={this.state.sessions}
                            unlinkModalMessage="Are you sure you want to sign off this session?"
                            unlinkModalTitle="Sign Off Session"
                            unlinkModalConfirmText="Sign Off"
                            cancelText="Don't Sign Off"
                            unlinkAccountText="Sign Off"
                            showUnlinkIcon={false}
                            unlinkAccountSuccessText="Cannot be Signed Off"
                            renderUnlinked={() => (
                                <HelpHint
                                    placement={Placements.TOP}
                                    hintText="This is your current session. It can not be deleted"
                                >
                                    <Button
                                        data-id="delete-disabled-button"
                                        disabled
                                        inline
                                    >
                                        Cannot be Signed Off
                                    </Button>
                                </HelpHint>)}
                        />
                    </FlexRow>
                </Card>
            </Container>
        );
    }
}
