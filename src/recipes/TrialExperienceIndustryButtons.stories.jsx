import React from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { useModalState } from '../hooks';
import {
  Box,
  Button,
  Icon,
  IconButton,
  Modal,
  OverlayProvider,
  Text,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.ts';

export default {
  title: 'Recipes/Trial Experience Buttons',
};

const sx = {
  contentProps: {
    maxWidth: '757px',
    width: '100%',
    px: '40px',
    pb: '35px',
    overflowY: 'scroll',
  },
  buttonLabelStyle: {
    whiteSpace: 'normal',
    color: 'text.primary',
    fontWeight: 1,
    fontSize: 'lg',
    lineHeight: 'normal',
    mb: '31px',
    maxHeight: '115px',
    overflow: 'hidden',
  },
  buttonStyle: {
    width: '146px',
    height: '146px',
    backgroundColor: 'accent.99',
    borderColor: 'accent.90',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px',
    justifyContent: 'center',
    py: 0,
    '&:hover': {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderColor: 'accent.90',
    },
    '&.is-pressed > div > svg > span': {
      color: 'white',
    },
    '&.is-pressed > div > span': {
      color: 'white',
    },
  },
  gridContainerStyle: {
    display:
      'grid !important',
    'gridTemplateColumns': 'repeat(auto-fit, minmax(0, 146px))',
    gap: 'md',
    maxWidth: '862px',
    'boxSizing': 'border-box',
    'justifyContent': 'center',
    overflow: 'hidden',
    padding: '5px',
  },
  headingTextStyle: {
    fontWeight: '3',
    fontSize: '30px',
    lineHeight: 'normal',
    textAlign: 'center',
    color: 'text.primary',
    marginBottom: 'sm',
    marginTop: 'sm',
    height: '42px',
  },
  iconStyle: {
    mb: 'sm',
    mt: '25px',
  },
  subheadingTextStyle: {
    fontWeight: '0',
    fontSize: 'lg',
    lineHeight: '115%',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'text.primary',
    marginBottom: '35px',
    maxWidth: '491px',
    height: '37px',
  },
};

const retailSVG = props => (
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="retail-icon-title" {...props}>
    <title id="retail-icon-title">Retail Icon</title>
    <path fillRule="evenodd" clipRule="evenodd" d="M250 29.5L217 29.5V20.5L250 20.5V29.5Z" fill="#B3282D" />
    <path fillRule="evenodd" clipRule="evenodd" d="M45.5 235H16V226H45.5V235Z" fill="#051727" />
    <path fillRule="evenodd" clipRule="evenodd" d="M18 208.5H0V217.5H18V208.5ZM28 217.5L38 217.5V208.5H28V217.5Z" fill="#B3282D" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M84.7388 202.788C84.7388 197.424 89.0869 193.076 94.4506 193.076C99.8143 193.076
     104.162 197.424 104.162 202.788C104.162 208.151 99.8143 212.499 94.4506 212.499C89.0869 212.499 84.7388 208.151 84.7388 202.788ZM94.4506
      184.076C84.1164 184.076 75.7388 192.453 75.7388 202.788C75.7388 213.122 84.1164 221.499 94.4506 221.499C104.785 221.499 113.162 213.122
       113.162 202.788C113.162 192.453 104.785 184.076 94.4506 184.076ZM170.137 202.788C170.137 197.424 174.485 193.076 179.849 193.076C185.213
        193.076 189.561 197.424 189.561 202.788C189.561 208.151 185.213 212.499 179.849 212.499C174.485 212.499 170.137 208.151 170.137 202.788ZM179.849
         184.076C169.515 184.076 161.137 192.453 161.137 202.788C161.137 213.122 169.515 221.499 179.849 221.499C190.183 221.499 198.561 213.122 198.561
          202.788C198.561 192.453 190.183 184.076 179.849 184.076Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.0807 37.501H20V28.501H54.9464L60.9742 50.5H181.336V59.5H168.385L163.173 95.3345H197.176L207.518
     59.5H196.517V50.5H219.482L204.274 103.2V104.334H203.946L192.636 143.528H86.4641L94.1287 171.501H188.083V180.501H87.263L48.0807 37.501ZM154.078 95.3345L159.29
      59.5H112.029L117.241 95.3345H154.078ZM152.769 104.334L148.377 134.528H122.941L118.55 104.334H152.769ZM157.472 134.528L161.864 104.334H194.579L185.866 134.528H157.472ZM63.4402
       59.5H102.934L108.146 95.3345H73.2589L63.4402 59.5ZM75.7249 104.334H109.455L113.847 134.528H83.9981L75.7249 104.334Z"
      fill="#051727"
    />
  </svg>
);

const financialSVG = props => (
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="financial-icon-title" {...props}>
    <title id="financial-icon-title">Fincancial Icon</title>

    <g clipPath="url(#clip0_2_553)">

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M245 23L213.804 23L213.804 14L245 14L245 23Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.9999 223.5L7.99951 223.5L7.99951 214.5L26.9999 214.5L26.9999 223.5Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 240.5L-6.99382e-07 240.5L0 231.5L27 231.5L27 240.5Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47 240.5L37 240.5L37 231.5L47 231.5L47 240.5Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M250 41L240 41L240 32L250 32L250 41Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M229.402 41L199.543 41L199.543 32L229.402 32L229.402 41Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.0352 93.5521H200.965V76.2343L126.645 38.0988L51.0352 76.2747V93.5521ZM42.0352 70.7368L126.678
      28L209.965 70.7368V102.552H193.271V179.259H210.946V213H166.47V204H201.946V188.259H49.666V204H142.082V213H40.666V179.259H58.3135V102.552H42.0352V70.7368ZM82.8729
      179.259H67.3135V102.552H82.8729V179.259ZM91.8729 179.259V102.552H109.013V179.259H91.8729ZM118.013 179.259H133.572V102.552H118.013V179.259ZM142.572
      102.552V179.259H159.712V102.552H142.572ZM168.712 102.552V179.259H184.271V102.552H168.712Z"
        fill="#051727"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M124.314 48.6641H129.153V53.11C132.496 53.5501 135.696 54.8085 138.46 56.7942L134.638 61.8105C132.968 60.6493 131.108 59.8061 129.153 59.3129V65.6104C135.753 67.2169 139.46 69.4234 139.46 74.634C139.46 80.1015 135.3 83.383 129.153 83.9499V87.3285H124.314V83.896C120.198 83.4282 116.27 81.8343 112.975 79.2636L117.314 74.5537C119.356 76.2221 121.761 77.361 124.314 77.8924V71.1556C118.202 69.619 114.33 67.8642 114.33 62.1653V62.0689C114.33 57.0415 118.372 53.577 124.314 53.0183V48.6641ZM124.314 58.9784C122.552 59.3393 121.637 60.3059 121.637 61.4718V61.5526C121.637 62.8656 122.255 63.5947 124.314 64.3195V58.9784ZM129.153 72.4627V78.0722C131.048 77.7108 132.154 76.7521 132.154 75.3764V75.2795C132.154 74.1205 131.562 73.3112 129.153 72.4627Z" fill="#B3282D" />
    </g>
    <defs>
      <clipPath id="clip0_2_553">
        <rect width="250" height="250" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const healthcareSVG = props => (
  <svg width="250" height="251" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="healthcare-icon-title" {...props}>
    <title id="healthcare-icon-title">Healthcare Icon</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41.2134 66.3089C49.3291 54.7665 62.549 46.0127 82.331 46.0127C100.299 46.0127 112.888 54.659 120.845 63.0991C124.11 66.5616 126.625 70.0159
      128.457 72.8855C130.441 70.0142 133.139 66.5313 136.556 63.0391C144.697 54.7174 157.27 46.0127 174.197 46.0127C193.992 46.0127 207.213 54.7502
      215.327 66.2895C223.292 77.6163 226.214 91.4262 226.214 101.898C226.214 106.567 225.348 112.655 223.303 119.78L214.652 117.298C216.524 110.776
      217.214 105.539 217.214 101.898C217.214 92.83 214.632 80.9471 207.965 71.4662C201.448 62.1978 190.911 55.0127 174.197 55.0127C160.58 55.0127
      150.182 61.9814 142.989 69.3331C139.408 72.9928 136.708 76.6658 134.906 79.4235C134.007 80.7984 133.339 81.9349 132.902 82.7136C132.684 83.1027
      132.524 83.4015 132.423 83.595C132.372 83.6918 132.336 83.7621 132.315 83.8041L132.295 83.8434L132.294 83.8457L132.292 83.8502L127.939
      92.7126L124.111 83.6129L124.11 83.6105L124.108 83.6041L124.094 83.573C124.077 83.5338 124.047 83.4663 124.004 83.3725C123.919 83.1848 123.782
      82.8922 123.593 82.5095C123.213 81.7436 122.625 80.6213 121.816 79.2616C120.194 76.5341 117.714 72.8976 114.297 69.2731C107.477 62.0398 97.1042
      55.0127 82.331 55.0127C65.6378 55.0127 55.0994 62.2073 48.5757 71.4855C41.9031 80.9753 39.3145 92.8596 39.3145 101.898C39.3145 105.912 39.8271
      110.177 42.1291 117.57L33.536 120.246C31.0188 112.162 30.3145 106.987 30.3145 101.898C30.3145 91.4482 33.2465 77.6396 41.2134 66.3089ZM125.78
      228.311C82.0038 199.465 58.2953 171.053 45.0069 146.688L52.9082 142.379C65.1567 164.837 87.14 191.584 128.255 219.15C167.72 192.671 190.528
      165.701 203.142 143.719L210.948 148.198C197.299 171.983 172.77 200.616 130.731 228.311L128.256 229.942L125.78 228.311Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M94.1555 84.8643L128.687 162.417L148.107 127.782H235.958V136.782H153.379L127.762 182.468L92.9288
      104.235L73.5569 136.162H11.98V127.162H68.4906L94.1555 84.8643Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M248.708 42.7827H223.208V33.7827H248.708V42.7827Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41.2524 223.283H15.7524V214.283H41.2524V223.283Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M62.96 223.283H51.2524V214.283H62.96V223.283Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.7075 241.283H0V232.283H25.7075V241.283Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M235.958 22.7827H210.458V13.7827H235.958V22.7827Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M202.458 22.7827L191.708 22.7827L191.708 13.7827L202.458 13.7827L202.458 22.7827Z"
      fill="#051727"
    />
  </svg>
);

const otherSVG = props => (
  <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="other-icon-title" {...props}>
    <title id="other-icon-title">Other Icon</title>
    <circle cx="11.5" cy="23.5" r="3.5" stroke="#051727" stroke-width="2" />
    <circle cx="23.5" cy="23.5" r="3.5" stroke="#051727" stroke-width="2" />
    <circle cx="35.5" cy="23.5" r="3.5" stroke="#051727" stroke-width="2" />
    <circle cx="23.5" cy="23.5" r="22.5" stroke="#B3282D" stroke-width="2" />
  </svg>

);

const buttons = [
  { name: 'Retail', icon: retailSVG },
  { name: 'Financial Services', icon: financialSVG },
  { name: 'Healthcare', icon: healthcareSVG },
  { name: 'Other', icon: otherSVG },
];

export const Default = () => {
  const state = useModalState();
  return (
    <OverlayProvider>
      <Modal
        isOpen
        onClose={state.close}
        contentProps={sx.contentProps}
      >
        <Box contentProps>
          <IconButton
            aria-label="Close modal window"
            data-id="icon-button__close-modal-window"
            variant="modalCloseButton"
            onPress={state.close}
          >
            <Icon icon={CloseIcon} size="sm" sx={{ path: { fill: 'neutral.40' } }} title={{ name: 'Close Icon' }} />
          </IconButton>
          <Text sx={sx.headingTextStyle}>
            Tailor your experiences
          </Text>
          <Text sx={sx.subheadingTextStyle}>
            Tailor your identity experiences for your industry. If you don`t see
            your industry, choose &quot;Other&quot;.
          </Text>
          <Box
            isRow
            sx={sx.gridContainerStyle}
          >
            {buttons.map(button => (
              <Button sx={sx.buttonStyle} key={button.name}>
                <Box alignItems="center">
                  <Icon icon={button.icon} sx={sx.iconStyle} size={58} />
                  <Text sx={sx.buttonLabelStyle}>
                    {button.name}
                  </Text>
                </Box>
              </Button>
            ))}
          </Box>
        </Box>
      </Modal>
    </OverlayProvider>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.trialExperienceButtons.default,
  },
};
