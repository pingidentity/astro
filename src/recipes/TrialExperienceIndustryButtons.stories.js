import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';

import useModalState from '../hooks/useModalState';
import {
  Box,
  Button,
  HelpHint,
  Icon,
  IconButton,
  Modal,
  OverlayProvider,
  Text,
} from '../index';

export default {
  title: 'Recipes/Trial Experience Buttons',
};

const sx = {
  contentProps: {
    maxWidth: '880px',
    width: '100%',
    px: '40px',
    pb: '45px',
    overflowY: 'scroll',
  },
  buttonLabelStyle: {
    whiteSpace: 'normal',
    color: 'text.primary',
    fontWeight: 1,
    fontSize: 'lg',
    lineHeight: '21px',
    mb: '37px',
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
    gap: '13px',
    maxWidth: '862px',
    'boxSizing': 'border-box',
    'justifyContent': 'center',
    overflow: 'hidden',
    padding: '5px',
  },
  headingTextStyle: {
    fontWeight: '3',
    fontSize: '30px',
    lineHeight: '37px',
    textAlign: 'center',
    color: 'text.primary',
    marginBottom: 'sm',
    marginTop: 'md',
  },
  iconStyle: {
    mb: 'sm',
    mt: '25px',
  },
  InfoLinkBox: {
    justifyContent: 'center',
    pt: '30px',
  },
  subheadingTextStyle: {
    fontWeight: '0',
    fontSize: 'lg',
    lineHeight: '20px',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'text.primary',
    marginBottom: 'xl',
    maxWidth: '357px',
  },
};

const retailSVG = props => (
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
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

const airlineSVG = props => (
  <svg width="251" height="251" viewBox="0 0 251 251" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1363_5255)">

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.5664 137.361H142.583V128.361H51.5664V137.361ZM182.178 137.361H203.775V128.361H182.178V137.361Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M144.381 56.3706H100.976L116.177 104.896L124.766 102.206L113.227 65.3706H138.728L158.069
        105.504L166.177 101.597L144.381 56.3706ZM50.1374 77.4535H14.1562V163.586H100.417V154.586H23.1562V86.4535H44.7675L62.2509
        118.849H194.005C209.161 118.849 218.187 125.841 223.636 134.275C227.987 141.008 230.067 148.718 230.817 154.586H170.351V163.586H240.216L240.156 159.027C240.062
        151.889 237.937 139.823 231.195 129.39C224.295 118.712 212.58 109.849 194.005 109.849H67.6208L50.1374 77.4535ZM133.42 203.695L169.668 137.596L161.777 133.268L128.091
        194.695H106.763L122.147 150.805L113.654 147.827L94.0713 203.695H133.42Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.906253 211.195L30.9063 211.195L30.9062 220.195L0.906252 220.195L0.906253 211.195Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M207.156 22.1953L250.656 22.1953L250.656 31.1953L207.156 31.1953L207.156 22.1953Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M177.066 42.6953H212.746V51.6953L177.066 51.6953V42.6953Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M222.246 42.6953H237.246V51.6953H222.246V42.6953Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.1172 194.695L51.5664 194.695L51.5664 203.695L24.1172 203.695L24.1172 194.695Z"
        fill="#B3282D"
      />
    </g>
    <defs>
      <clipPath id="clip0_1363_5255">
        <rect width="250" height="250" fill="white" transform="translate(0.90625 0.282715)" />
      </clipPath>
    </defs>
  </svg>
);

const educationSVG = props => (
  <svg width="251" height="251" viewBox="0 0 251 251" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1363_5233)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M211.33 15.7827L232.33 15.7827L232.33 24.7827L211.33 24.7827L211.33 15.7827Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240.33 15.7827L250.33 15.7827V24.7827H240.33V15.7827Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.330081 214.413L30.3301 214.413L30.3301 223.413L0.33008 223.413L0.330081 214.413Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.4316 197.913L57.1309 197.913L57.1309 206.913L45.4316 206.913L45.4316 197.913Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1309 197.913L37.6309 197.913L37.6309 206.913L17.1309 206.913L17.1309 197.913Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.1892 59.2397C80.547 69.1575 94.8044 76.8825 116.197 76.7853L77.8365 45.7084L83.5018 38.7153L122.298 70.1451C119.871 58.7127
        114.63 47.3224 105.96 38.8401C95.3726 28.4824 79.1581 21.9549 55.1272 25.6396C56.6632 35.761 61.4064 48.8714 71.1892 59.2397ZM49.3208
        17.5169C78.0709 11.9279 98.6559 19.1039 112.254 32.4067C121.839 41.7835 127.66 53.9178 130.583 66.0008C134.355 57.6079 140.083 49.6143
        148.058 43.7951C160.531 34.694 177.837 31.3993 200.015 39.1466L203.788 40.4648L202.924 44.3676C200.819 53.8775 194.654 67.2152 182.802
        76.6124C171.299 85.7324 154.859 90.7994 132.751 85.6709V107.572H123.751V85.4715C95.9764 87.6193 76.9699 78.4807 64.6431 65.4161C51.7816
        51.7849 46.582 34.3048 45.6918 22.2661L45.397 18.2797L49.3208 17.5169ZM142.431 78.267C158.017 80.1634 169.258 75.8646 177.21
        69.5601C185.561 62.9389 190.62 53.8287 193.054 46.3615C175.314 41.1823 162.433 44.4471 153.363 51.0654C146.739 55.8982 141.85
        62.7384 138.614 70.0866L169.527 52.6138L173.956 60.4488L142.431 78.267Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M157.131 108.828H148.887V130.354L192.983 215.228C197.998 224.88 190.994 236.413 180.116 236.413H76.3872C65.5096 236.413 58.5052
        224.88 63.5202 215.228L107.616 130.354V108.828H99.3722V99.8276H157.131V108.828ZM116.616 108.828H139.887V132.553L145.074
        142.536H132.22V151.536H149.75L155.999 163.565L132.26 163.35L132.179 172.35L160.698 172.608L167.941 186.549L88.5625 186.549L116.616
        132.553V108.828ZM83.8866 195.549L71.5066 219.377C69.6043 223.038 72.2612 227.413 76.3872 227.413H180.116C184.242 227.413 186.899
        223.038 184.997 219.377L172.617 195.549L83.8866 195.549Z"
        fill="#051727"
      />
    </g>
    <defs>
      <clipPath id="clip0_1363_5233">
        <rect width="250" height="250" fill="white" transform="translate(0.330078 0.282715)" />
      </clipPath>
    </defs>
  </svg>
);

const financialSVG = props => (
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>

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

const governmentSVG = props => (
  <svg width="251" height="250" viewBox="0 0 251 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_2_568)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M225.239 46.5376L189.043 46.5376L189.043 37.5376L225.239 37.5376L225.239 46.5376Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M203.911 64.5376L232.504 64.5376V55.5376L203.911 55.5376V64.5376ZM240.602 64.5376L250.602 64.5376V55.5376L240.602 55.5376V64.5376Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.602 223.5L8.60156 223.5L8.60156 214.5L27.602 214.5L27.602 223.5Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.5 240.5L0.60205 240.5L0.602051 231.5L35.5 231.5L35.5 240.5Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120.118 16.3896H168.618V48.8896H129.118V63.1853H120.118V16.3896ZM129.118 39.8896H159.618V25.3896H129.118V39.8896Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.0898 120.157C66.8957 92.6788 93.3575 71.5005 125.681 71.5005C158.001 71.5005 184.47 92.6813 190.272 120.157H61.0898ZM51.9181
        120.157C57.8459 87.1848 88.8747 62.5005 125.681 62.5005C162.49 62.5005 193.511 87.1823
        199.443 120.157H205.767V129.157H193.081V196.5H209.79V223.5H109.518V214.5H200.79V205.5H50.4141V214.5H85.4175V223.5H41.4141V196.5H58.1237V129.157H45.4386V120.157H51.9181ZM91.6832
        129.157H108.823V196.5H91.6832V129.157ZM117.823 196.5V129.157H133.382V196.5H117.823ZM142.382 196.5V129.157H159.522V196.5H142.382ZM82.6832
        129.157H67.1237V196.5H82.6832V129.157ZM168.522 196.5V129.157H184.081V196.5H168.522Z"
        fill="#051727"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_568">
        <rect width="250" height="250" fill="white" transform="translate(0.602051)" />
      </clipPath>
    </defs>
  </svg>
);

const healthcareSVG = props => (
  <svg width="250" height="251" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
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

const hotelSVG = props => (
  <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_212_10020)">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.15229 52.8122H0.0922852V50.7242H4.15229V52.8122Z" fill="#B3282D" />
      <path fillRule="evenodd" clipRule="evenodd" d="M58.0922 6.41222L50.7842 6.41222L50.7842 4.32422L58.0922 4.32422L58.0922 6.41222Z" fill="#B3282D" />
      <path fillRule="evenodd" clipRule="evenodd" d="M52.5244 10.0372L47.1304 10.0372L47.1304 7.94922L52.5244 7.94922L52.5244 10.0372Z" fill="#051727" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.09634 56.2052H4.15234V54.1172H8.09634V56.2052Z" fill="#051727" />
      <path fillRule="evenodd" clipRule="evenodd" d="M44.8166 10.0372H42.4966V7.94922H44.8166V10.0372Z" fill="#051727" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7145 19.6297H19.9455V22.8607H16.7145V19.6297ZM14.6265
       24.9487V17.5417H22.0335V24.9487H14.6265ZM16.7145 30.3755H19.9455V33.6065H16.7145V30.3755ZM14.6265 35.6945V28.2875H22.0335V35.6945H14.6265ZM19.9455
        41.0379H16.7145V44.2689H19.9455V41.0379ZM14.6265 38.9499V46.3569H22.0335V38.9499H14.6265ZM25.7295 30.3755H28.9605V33.6065H25.7295V30.3755ZM23.6415
         35.6945V28.2875H31.0485V35.6945H23.6415ZM28.9605 19.6297H25.7295V22.8607H28.9605V19.6297ZM23.6415 17.5417V24.9487H31.0485V17.5417H23.6415ZM25.7295
          41.0379H28.9605V44.2689H25.7295V41.0379ZM23.6415 46.3569V38.9499H31.0485V46.3569H23.6415Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7031 7.83325H30.8477V12.2143H35.5276V22.3697L49.3208
       24.5177V51.7612H35.5276V51.7683H10.0237V12.2143H14.7031V7.83325ZM35.5276 49.4412H47.0008V26.5044L35.5276 24.7177V49.4412ZM28.5277
        10.1533V12.2143H17.0231V10.1533H28.5277ZM33.4396 14.3023H12.1117V49.6803H33.4396V14.3023ZM40.0431 33.0868H37.4663V30.7668H40.0431V33.0868ZM42.24
         33.0868H44.8168V30.7668H42.24V33.0868ZM40.0431 38.6673H37.4663V36.3473H40.0431V38.6673ZM42.24 38.6673H44.8168V36.3473H42.24V38.6673ZM40.0431
          44.4504H37.4663V42.1304H40.0431V44.4504ZM42.24 44.4504H44.8168V42.1304H42.24V44.4504Z"
        fill="#051727"
      />
    </g>
    <defs>
      <clipPath id="clip0_212_10020">
        <rect width="58" height="58" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const manufacturingSVG = props => (
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M59 45.5H21V36.5H59V45.5Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 65.5H20V56.5H0V65.5Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40 65.5H30V56.5H40V65.5Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M230 239H250V230H230V239Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M172.978 39.772C172.978 31.6136 179.592 25 187.75 25C195.908 25 202.522 31.6136 202.522 39.772C202.522 47.9303 195.908 54.544 187.75
      54.544C179.592 54.544 172.978 47.9303 172.978 39.772ZM164.159 42.7171L115.744 62.5269C119.635 67.023 122.122 72.7676 122.523 79.0789L169.046
      54.4461C166.443 51.1328 164.702 47.1107 164.159 42.7171ZM176.467 60.7009L121.054 90.0401C119.281 95.1847 116.054 99.6524 111.865
      102.952V139.963H129.966V166.638H179.034V175.638L33.291 175.638L33.291 219.499L205.019 219.499V175.638H195.64V166.638H214.019V228.499L24.291
      228.499L24.291 166.638H56.6733V139.963H75.246V101.309C69.8216 96.1902 66.436 88.9343 66.436 80.8876C66.436 65.3838 79.0043 52.8154 94.5081
      52.8154C99.2731 52.8154 103.761 54.0026 107.692 56.0974L165.073 32.6188C168.109 22.9854 177.114 16 187.75 16C200.879 16 211.522 26.6431
      211.522 39.772C211.522 43.6407 210.598 47.2936 208.958 50.5219L215.427 74.7733L200.285 82.3517L185.465 63.4356C182.233 63.1275 179.19 62.1722
      176.467 60.7009ZM195.869 62.1214L202.834 71.0117L204.841 70.0073L201.876 58.8933C200.056 60.2406 198.036 61.3341 195.869 62.1214ZM102.865
      139.963H84.246V107.025C87.4247 108.274 90.8863 108.96 94.5081 108.96C97.4183 108.96 100.225 108.517 102.865 107.695V139.963ZM94.5081
      61.8154C83.9749 61.8154 75.436 70.3543 75.436 80.8876C75.436 91.4208 83.9749 99.9597 94.5081 99.9597C105.041 99.9597 113.58 91.4208
      113.58 80.8876C113.58 70.3543 105.041 61.8154 94.5081 61.8154ZM65.6733 148.963V165.677H120.966V148.963H65.6733Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M72.5419 190.053C68.4829 190.053 65.1924 193.343 65.1924 197.402C65.1924 201.461 68.4829 204.752 72.5419 204.752C76.6009 204.752 79.8914
      201.461 79.8914 197.402C79.8914 193.343 76.6009 190.053 72.5419 190.053ZM56.1924 197.402C56.1924 188.373 63.5123 181.053 72.5419 181.053C81.5715
      181.053 88.8914 188.373 88.8914 197.402C88.8914 206.432 81.5715 213.752 72.5419 213.752C63.5123 213.752 56.1924 206.432 56.1924 197.402ZM120.226
      190.053C116.166 190.053 112.876 193.343 112.876 197.402C112.876 201.461 116.166 204.752 120.226 204.752C124.285 204.752 127.575 201.461 127.575
      197.402C127.575 193.343 124.285 190.053 120.226 190.053ZM103.876 197.402C103.876 188.373 111.196 181.053 120.226 181.053C129.255 181.053 136.575
      188.373 136.575 197.402C136.575 206.432 129.255 213.752 120.226 213.752C111.196 213.752 103.876 206.432 103.876 197.402ZM160.56 197.402C160.56
      193.343 163.851 190.053 167.91 190.053C171.969 190.053 175.259 193.343 175.259 197.402C175.259 201.461 171.969 204.752 167.91 204.752C163.851
      204.752 160.56 201.461 160.56 197.402ZM167.91 181.053C158.88 181.053 151.56 188.373 151.56 197.402C151.56 206.432 158.88 213.752 167.91
      213.752C176.939 213.752 184.259 206.432 184.259 197.402C184.259 188.373 176.939 181.053 167.91 181.053Z"
      fill="#B3282D"
    />
    <path
      d="M191.396 45.252C194.546 43.1276 195.377 38.8522 193.252 35.7027C191.128 32.5532 186.853 31.7221 183.703 33.8465C180.553 35.9709 179.722
      40.2463 181.847 43.3958C183.971 46.5453 188.247 47.3764 191.396 45.252Z"
      fill="#B3282D"
    />
    <path
      d="M99.2311 86.3417C102.812 83.9263 103.757 79.0651 101.342 75.4841C98.9262 71.903 94.0651 70.9581 90.484 73.3736C86.903 75.789 85.9581
      80.6501 88.3735 84.2312C90.789 87.8123 95.6501 88.7572 99.2311 86.3417Z"
      fill="#B3282D"
    />
  </svg>
);

const pharmancySVG = props => (
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M240 20.5L205 20.5L205 11.5L240 11.5L240 20.5Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 238.5L27 238.5V229.5L0 229.5V238.5ZM37 238.5L47 238.5V229.5H37V238.5Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M250 36.5L240 36.5L240 27.5L250 27.5L250 36.5Z"
      fill="#B3282D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M45.5 31.5H86.2829V40.5H54.5V214.5H198.5V40.5H168.029V31.5H207.5V223.5H45.5V31.5Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M59.5 44.5H85.6535V53.5H68.5V198.5H184.5V179.771H193.5V207.5H59.5V44.5ZM168.823 44.5H193.5V159.983H184.5V53.5H168.823V44.5Z"
      fill="#051727"
    />
    <path
      d="M127 39C129.761 39 132 36.7614 132 34C132 31.2386 129.761 29 127 29C124.239 29 122 31.2386 122 34C122 36.7614 124.239 39 127 39Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M107.651 16.5H146.851V28.5313H163.5V54.5H90.5V28.5313H107.651V16.5ZM116.651 25.5V37.5313H99.5V45.5H154.5V37.5313H137.851V25.5H116.651Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M146.851 16.5H107.651V28.5313H90.5V54.5H163.5V28.5313H146.851V16.5ZM116.651 37.5313V25.5H137.851V37.5313H154.5V45.5H99.5V37.5313H116.651ZM127
      39C129.761 39 132 36.7614 132 34C132 31.2386 129.761 29 127 29C124.239 29 122 31.2386 122 34C122 36.7614 124.239 39 127 39ZM86.2829
      31.5H45.5V223.5H207.5V31.5H168.029V40.5H198.5V214.5H54.5V40.5H86.2829V31.5ZM85.6535 44.5H59.5V207.5H193.5V179.771H184.5V198.5H68.5V53.5H85.6535V44.5ZM193.5
      44.5H168.823V53.5H184.5V159.983H193.5V44.5Z"
      fill="#051727"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M108.041 84.0513H144.946V106.554H167.449V143.446H144.946V165.949H108.041V143.446H85.5513V106.554H108.041V84.0513ZM117.041
      93.0513V115.554H94.5513V134.446H117.041V156.949H135.946V134.446H158.449V115.554H135.946V93.0513H117.041Z"
      fill="#B3282D"
    />
  </svg>
);

const realtySVG = props => (
  <svg width="250" height="251" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_6_8180)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.375 111.182H169.875V120.182H101.375V111.182Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.375 165.182H169.875V174.182H101.375V165.182Z"
        fill="#051727"
      />
      <path
        d="M87.125 115.682C87.125 120.238 83.4313 123.932 78.875 123.932C74.3187 123.932 70.625 120.238 70.625 115.682C70.625 111.125 74.3187
        107.432 78.875 107.432C83.4313 107.432 87.125 111.125 87.125 115.682Z"
        fill="#051727"
      />
      <path
        d="M87.125 169.682C87.125 174.238 83.4313 177.932 78.875 177.932C74.3187 177.932 70.625 174.238 70.625 169.682C70.625
        165.125 74.3187 161.432 78.875 161.432C83.4313 161.432 87.125 165.125 87.125 169.682Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M186.375 100.182H61.625V130.182H186.375V100.182ZM52.625 91.1816V139.182H195.375V91.1816H52.625Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M186.375 154.182H61.625V184.182H186.375V154.182ZM52.625 145.182V193.182H195.375V145.182H52.625Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M123.619 21.6985L162.211 45.2414V27.9713H199.28V65.9798L235.883 89.1284L231.073 96.7349L219 89.1V216.7H198.986V207.7H210V83.4082L190.28
        70.9367V36.9713H171.211V61.2745L123.495 32.1649L38.0001 81.5633V207.7H179.852V216.7H29.0001V86.7635L16.7736 93.8279L12.271 86.0352L123.619
        21.6985Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 21.4316H35.5V30.4316H9.5V21.4316Z"
        fill="#051727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.75 39.4316H47V48.4316H18.75V39.4316Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 39.4316L9.5 39.4316L9.5 48.4316L-7.86805e-07 48.4316L0 39.4316Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M223.228 225.932H245.728V234.932H223.228V225.932Z"
        fill="#B3282D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M204.25 239.932H234.478V248.932H204.25V239.932Z"
        fill="#051727"
      />
    </g>
    <defs>
      <clipPath id="clip0_6_8180">
        <rect width="250" height="250" fill="white" transform="translate(0 0.180664)" />
      </clipPath>
    </defs>
  </svg>
);

const buttons = [
  { name: 'Retail', icon: retailSVG },
  { name: 'Financial Services', icon: financialSVG },
  { name: 'Manufacturing', icon: manufacturingSVG },
  { name: 'Healthcare', icon: healthcareSVG },
  { name: 'Education', icon: educationSVG },
  { name: 'Government', icon: governmentSVG },
  { name: 'Realty', icon: realtySVG },
  { name: 'Pharmacy', icon: pharmancySVG },
  { name: 'Airline', icon: airlineSVG },
  { name: 'Hotels', icon: hotelSVG },
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
            <Icon icon={CloseIcon} size="sm" />
          </IconButton>
          <Text sx={sx.headingTextStyle}>
            Choose Your Industry
          </Text>
          <Text sx={sx.subheadingTextStyle}>
            To further customize your experience, choose an industry that most resembles your own.
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
          <Box isRow sx={sx.InfoLinkBox}>
            <Button variant="link">Skip</Button>
            <HelpHint>
              Info skipping
            </HelpHint>
          </Box>
        </Box>
      </Modal>
    </OverlayProvider>
  );
};
