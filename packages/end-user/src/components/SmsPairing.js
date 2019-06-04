import React from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonTypes } from '../components/Button';
import ButtonSet from '../components/ButtonSet';
import Card from '../components/Card';
import DropdownCustomSearchable from '../components/DropdownCustomSearchable';
import Form from '../components/Form';
import FormRow from '../components/FormRow';
import Heading from '../components/Heading';
import TextInput from '../components/TextInput';

const SmsPairing = ({ onToggle, open }) => (
    <Card className="card--auto-height">
        <Form>
            <Heading>SMS Pairing</Heading>
            <FormRow>
                <DropdownCustomSearchable
                    id="dropdownCustom1"
                    className="input--width-sm input--margin dropdown--cardwidth"
                    onToggle={onToggle}
                    open={open}
                    options={['+1 United States', '+44 United Kingdom', '+61 Australia']}
                />
                <TextInput
                    id="phonenumber"
                    className="input--width-lg"
                    placeholder="Phone number"
                />
            </FormRow>
            <ButtonSet>
                <Button label="Next" type={ButtonTypes.PRIMARY} />
                <Button label="Cancel" />
            </ButtonSet>
        </Form>
    </Card>
);

SmsPairing.propTypes = {
    onToggle: PropTypes.func,
    open: PropTypes.bool,
};

SmsPairing.defaultProps = {
    open: false,
};

export default SmsPairing;
