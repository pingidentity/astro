import React from 'react';

/**
 * With backgrounds
 */
const SocialIcons = {
    MICROSOFT: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <rect style={{ fill: '#F25022' }} width="47.37" height="47.37" />
                <rect y="52.63" style={{ fill: '#00A4EF' }} width="47.37" height="47.37" />
                <rect x="52.63" style={{ fill: '#7FBA00' }} width="47.37" height="47.37" />
                <rect x="52.63" y="52.63" style={{ fill: '#FFB900' }} width="47.37" height="47.37" />
            </svg>
        );
    },
    GOOGLE: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <g>
                    <path
                        style={{ fill: '#4285F4' }}
                        d="M92.1,50.9c0-3.5-0.3-6.1-0.9-8.8H50.9v15.9h23.7c-0.5,4-3.1,9.9-8.8,13.9l-0.1,0.5l12.8,9.9l0.9,0.1
                        C87.4,75.1,92.1,64,92.1,50.9"
                    />
                    <path
                        style={{ fill: '#34A853' }}
                        d="M50.9,93c11.6,0,21.3-3.8,28.5-10.4L65.8,72c-3.6,2.5-8.5,4.3-14.9,4.3c-11.4,0-21-7.5-24.4-17.9l-0.5,0
                        L12.7,68.8l-0.2,0.5C19.5,83.3,34.1,93,50.9,93"
                    />
                    <path
                        style={{ fill: '#FBBC05' }}
                        d="M26.4,58.5C25.5,55.8,25,52.9,25,50c0-3,0.5-5.8,1.4-8.5l0-0.6L12.9,30.5l-0.4,0.2C9.6,36.5,7.9,43.1,7.9,50
                        s1.7,13.5,4.6,19.3L26.4,58.5"
                    />
                    <path
                        style={{ fill: '#EB4335' }}
                        d="M50.9,23.6c8.1,0,13.5,3.5,16.6,6.4l12.1-11.8C72.2,11.3,62.5,7,50.9,7c-16.8,0-31.3,9.6-38.4,23.7l13.9,10.8
                        C29.9,31.1,39.5,23.6,50.9,23.6"
                    />
                </g>
            </svg>
        );
    },
    LINKEDIN: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <path
                    style={{ fill: '#0073D1' }}
                    d="M92.9,0H7.1C3.2,0,0,3.2,0,7.2v85.6c0,4,3.2,7.2,7.1,7.2h85.7c3.9,0,7.1-3.2,7.1-7.2V7.2C100,3.2,96.8,0,92.9,0
                    L92.9,0z M30.2,85.7H15.4V38h14.8L30.2,85.7L30.2,85.7z M22.8,31.5c-4.8,0-8.6-3.9-8.6-8.6s3.8-8.6,8.6-8.6c4.7,0,8.6,3.9,8.6,8.6
                    C31.4,27.6,27.6,31.5,22.8,31.5z M85.8,85.7H71V62.5c0-5.5-0.1-12.7-7.7-12.7c-7.7,0-8.9,6-8.9,12.3v23.6H39.5V38h14.2v6.5H54
                    c2-3.8,6.8-7.7,14-7.7c15,0,17.8,9.9,17.8,22.7V85.7z"/>
            </svg>
        );
    },
    TWITTER: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <path
                    style={{ fill: '#1DA1F2' }}
                    d="M89.3,0H10.7C4.8,0,0,4.8,0,10.7v78.6C0,95.2,4.8,100,10.7,100h78.6c5.9,0,10.7-4.8,10.7-10.7V10.7
                    C100,4.8,95.2,0,89.3,0z M78.4,35.4c0,0.6,0,1.3,0,1.9C78.4,56.7,63.7,79,36.8,79c-8.3,0-16-2.4-22.5-6.6c1.2,0.1,2.3,0.2,3.5,0.2
                    c6.9,0,13.1-2.3,18.2-6.2c-6.4-0.1-11.8-4.4-13.7-10.2c2.3,0.3,4.3,0.3,6.6-0.3c-6.7-1.4-11.7-7.3-11.7-14.4v-0.2
                    c1.9,1.1,4.2,1.8,6.6,1.9c-4-2.7-6.5-7.1-6.5-12.2c0,0,0,0,0,0v0c0-2.7,0.7-5.2,2-7.4c7.2,8.9,18,14.7,30.2,15.3
                    c-2.1-9.9,5.4-18,14.3-18c4.2,0,8,1.8,10.7,4.6c3.3-0.6,6.5-1.9,9.3-3.5c-1.1,3.4-3.4,6.2-6.4,8.1c2.9-0.3,5.8-1.1,8.4-2.3
                    C83.7,30.8,81.2,33.4,78.4,35.4z"
                />
            </svg>
        );
    },
    INSTAGRAM: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 500 500" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <path fill='#E33E5C' d="M474.3,500H25.7C11.5,500,0,488.5,0,474.3V25.7C0,11.5,11.5,0,25.7,0h448.7C488.5,0,500,11.5,500,25.7v448.7
	C500,488.5,488.5,500,474.3,500z"/>
                <g>
                    <path fill="#FFFFFF" d="M456.4,164.5c-1-22.1-4.6-37.2-9.7-50.4c-5.3-13.7-12.4-25.3-23.9-36.7s-23.1-18.7-36.7-23.9
		c-13.2-5.1-28.3-8.6-50.4-9.7c-22.2-1-29.2-1.3-85.5-1.3c-56.4,0-63.5,0.2-85.5,1.3c-22.1,1-37.2,4.6-50.4,9.7
		c-13.7,5.3-25.3,12.4-36.7,23.9s-18.7,23.1-23.9,36.7c-5.1,13.2-8.6,28.3-9.7,50.4c-1,22.2-1.3,29.2-1.3,85.5
		c0,56.4,0.2,63.5,1.3,85.5c1,22.1,4.6,37.2,9.7,50.4c5.3,13.7,12.4,25.3,23.9,36.7s23.1,18.7,36.7,23.9c13.2,5.1,28.3,8.6,50.4,9.7
		c22.2,1,29.2,1.3,85.5,1.3c56.4,0,63.5-0.2,85.5-1.3c22.1-1,37.2-4.6,50.4-9.7c13.7-5.3,25.3-12.4,36.7-23.9
		c11.5-11.5,18.7-23.1,23.9-36.7c5.1-13.2,8.6-28.3,9.7-50.4c1-22.2,1.3-29.2,1.3-85.5S457.4,186.5,456.4,164.5z M419.1,333.8
		c-0.9,20.2-4.3,31.3-7.2,38.6c-3.8,9.7-8.3,16.6-15.6,23.9s-14.2,11.7-23.9,15.6c-7.3,2.8-18.3,6.3-38.6,7.2
		c-21.8,1-28.4,1.3-83.8,1.3s-62-0.2-83.8-1.3c-20.2-0.9-31.3-4.3-38.6-7.2c-9.7-3.8-16.6-8.3-23.9-15.6
		c-7.3-7.3-11.7-14.2-15.6-23.9c-2.8-7.3-6.3-18.3-7.2-38.6c-1-21.8-1.3-28.4-1.3-83.8s0.2-62,1.3-83.8c0.9-20.2,4.3-31.3,7.2-38.6
		c3.8-9.7,8.3-16.6,15.6-23.9c7.3-7.3,14.2-11.7,23.9-15.6c7.3-2.8,18.3-6.3,38.6-7.2c21.8-1,28.4-1.3,83.8-1.3s62,0.2,83.8,1.3
		c20.2,0.9,31.3,4.3,38.6,7.2c9.7,3.8,16.6,8.3,23.9,15.6c7.3,7.3,11.7,14.2,15.6,23.9c2.8,7.3,6.3,18.3,7.2,38.6
		c1,21.8,1.3,28.4,1.3,83.8S420,312,419.1,333.8z"/>
                    <path fill="#FFFFFF" d="M250,143.4c-58.9,0-106.6,47.8-106.6,106.6c0,58.9,47.8,106.6,106.6,106.6S356.6,308.8,356.6,250
		C356.6,191.1,308.9,143.4,250,143.4z M250,319.2c-38.2,0-69.2-30.9-69.2-69.2s30.9-69.2,69.2-69.2s69.2,30.9,69.2,69.2
		S288.2,319.2,250,319.2z"/>
                    <circle fill="#FFFFFF" cx="360.8" cy="139.2" r="24.9" />
                    <path fill="#FFFFFF" d="M42.4,250c0,56.4,0.2,63.5,1.3,85.5c1,22.1,4.6,37.2,9.7,50.4c5.3,13.7,12.4,25.3,23.9,36.7
		s23.1,18.7,36.7,23.9c13.2,5.1,28.3,8.6,50.4,9.7c22.2,1,29.2,1.3,85.5,1.3c56.4,0,63.5-0.2,85.5-1.3c22.1-1,37.2-4.6,50.4-9.7
		c13.7-5.3,25.3-12.4,36.7-23.9c11.5-11.5,18.7-23.1,23.9-36.7c5.1-13.2,8.6-28.3,9.7-50.4c1-22.2,1.3-29.2,1.3-85.5
		c0-56.4-0.2-63.5-1.3-85.5c-1-22.1-4.6-37.2-9.7-50.4c-5.3-13.7-12.4-25.3-23.9-36.7c-11.5-11.5-23.1-18.7-36.7-23.9
		c-13.2-5.1-28.3-8.6-50.4-9.7c-22.2-1-29.2-1.3-85.5-1.3c-56.4,0-63.5,0.2-85.5,1.3c-22.1,1-37.2,4.6-50.4,9.7
		c-13.7,5.3-25.3,12.4-36.7,23.9s-18.7,23.1-23.9,36.7c-5.1,13.2-8.6,28.3-9.7,50.4C42.6,186.5,42.4,193.6,42.4,250z M79.8,250
		c0-55.4,0.2-62,1.3-83.8c0.9-20.2,4.3-31.3,7.2-38.6c3.8-9.7,8.3-16.6,15.6-23.9c7.3-7.3,14.2-11.7,23.9-15.6
		c7.3-2.8,18.3-6.3,38.6-7.2c21.8-1,28.4-1.3,83.8-1.3s62,0.2,83.8,1.3c20.2,0.9,31.3,4.3,38.6,7.2c9.7,3.8,16.6,8.3,23.9,15.6
		c7.3,7.3,11.7,14.2,15.6,23.9c2.8,7.3,6.3,18.3,7.2,38.6c1,21.8,1.3,28.4,1.3,83.8s-0.2,62-1.3,83.8c-0.9,20.2-4.3,31.3-7.2,38.6
		c-3.8,9.7-8.3,16.6-15.6,23.9c-7.3,7.3-14.2,11.7-23.9,15.6c-7.3,2.8-18.3,6.3-38.6,7.2c-21.8,1-28.4,1.3-83.8,1.3
		s-62-0.2-83.8-1.3c-20.2-0.9-31.3-4.3-38.6-7.2c-9.7-3.8-16.6-8.3-23.9-15.6c-7.3-7.3-11.7-14.2-15.6-23.9
		c-2.8-7.3-6.3-18.3-7.2-38.6C80,312,79.8,305.4,79.8,250z"/>
                </g>
            </svg>
        );
    },
    FACEBOOK: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <rect x="35.5" y="10.3" style={{ fill: '#FFFFFF' }} width="52.8" height="89.7" />
                <path
                    style={{ fill: '#1877f2' }}
                    d="M94.5,0h-89C2.5,0,0,2.5,0,5.5v89c0,3,2.5,5.5,5.5,5.5h47.9V61.3h-13V46.2h13V35.1c0-12.9,7.9-19.9,19.4-19.9
                    c5.5,0,10.3,0.4,11.6,0.6v13.5l-8,0c-6.3,0-7.5,3-7.5,7.3v9.6h14.9L82,61.3H69V100h25.5c3,0,5.5-2.5,5.5-5.5v-89
                    C100,2.5,97.5,0,94.5,0z"
                />
            </svg>
        )
    },
    MARKETO: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <path
                    style={{ fill: '#5944B0' }}
                    d="M67,0.7v98.6l25.2-20.1V14.4L67,0.7z M55.3,77.8L35,86.6V9.3l20.3,6V77.8z M7.8,75.5l15.5-4.1V22L7.8,19.5L7.8,75.5z" />
            </svg>
        )
    },
    SALESFORCE: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <g>
                    <path
                        style={{ fill: '#00A1E0' }}
                        d="M41.5,26.9c3.1-3.2,7.4-5.2,12.2-5.2c6.3,0,11.9,3.5,14.8,8.8c2.6-1.1,5.4-1.8,8.4-1.8
                        c11.4,0,20.7,9.3,20.7,20.9c0,11.5-9.3,20.9-20.7,20.9c-1.4,0-2.7-0.1-4.1-0.4c-2.6,4.6-7.5,7.8-13.2,7.8c-2.4,0-4.6-0.5-6.6-1.5
                        c-2.6,6.2-8.8,10.5-15.9,10.5c-7.4,0-13.8-4.7-16.2-11.3c-1.1,0.2-2.2,0.3-3.3,0.3c-8.9,0-16-7.2-16-16.2c0-6,3.2-11.2,8-14
                        c-1-2.3-1.5-4.8-1.5-7.4c0-10.3,8.3-18.6,18.6-18.6C32.7,19.5,38.1,22.4,41.5,26.9"/>
                    <path
                        style={{ fill: '#FFFFFF' }}
                        d="M15.4,54.4c-0.1,0.2,0,0.2,0,0.2c0.2,0.1,0.4,0.2,0.5,0.3c1,0.5,1.9,0.7,2.9,0.7c2,0,3.2-1,3.2-2.7v0
                        c0-1.6-1.4-2.1-2.7-2.5l-0.2-0.1c-1-0.3-1.8-0.6-1.8-1.2v0c0-0.5,0.5-1,1.3-1c0.8,0,1.9,0.3,2.5,0.6c0,0,0.2,0.1,0.3-0.1
                        c0-0.1,0.4-1,0.4-1.1c0-0.1,0-0.2-0.1-0.2c-0.7-0.4-1.8-0.8-2.8-0.8l-0.2,0c-1.8,0-3.1,1.1-3.1,2.6v0c0,1.6,1.4,2.2,2.7,2.6
                        l0.2,0.1c0.9,0.3,1.8,0.5,1.8,1.2v0c0,0.6-0.5,1.1-1.4,1.1c-0.3,0-1.4,0-2.5-0.7c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1,0-0.2-0.1-0.3,0.1
                        L15.4,54.4L15.4,54.4z M44.3,54.4c-0.1,0.2,0,0.2,0,0.2c0.2,0.1,0.4,0.2,0.5,0.3c1,0.5,1.9,0.7,2.9,0.7c2,0,3.2-1,3.2-2.7v0
                        c0-1.6-1.4-2.1-2.7-2.5l-0.2-0.1c-1-0.3-1.8-0.6-1.8-1.2v0c0-0.5,0.5-1,1.3-1c0.8,0,1.9,0.3,2.5,0.6c0,0,0.2,0.1,0.3-0.1
                        c0-0.1,0.4-1,0.4-1.1c0-0.1,0-0.2-0.1-0.2c-0.7-0.4-1.8-0.8-2.8-0.8l-0.2,0c-1.8,0-3.1,1.1-3.1,2.6v0c0,1.6,1.4,2.2,2.7,2.6
                        l0.2,0.1c0.9,0.3,1.8,0.5,1.8,1.2v0c0,0.6-0.5,1.1-1.4,1.1c-0.3,0-1.4,0-2.5-0.7c-0.1-0.1-0.2-0.1-0.3-0.2c0,0-0.2-0.1-0.3,0.1
                        L44.3,54.4L44.3,54.4z M64,51.1c0,1-0.2,1.7-0.5,2.2c-0.3,0.5-0.9,0.8-1.6,0.8c-0.7,0-1.3-0.3-1.6-0.8c-0.3-0.5-0.5-1.3-0.5-2.2
                        c0-1,0.2-1.7,0.5-2.2c0.3-0.5,0.9-0.8,1.6-0.8c0.7,0,1.3,0.3,1.6,0.8C63.8,49.4,64,50.1,64,51.1 M65.6,49.3c-0.2-0.5-0.4-1-0.7-1.4
                        c-0.3-0.4-0.8-0.7-1.3-1c-0.5-0.2-1.1-0.4-1.8-0.4c-0.7,0-1.3,0.1-1.8,0.4c-0.5,0.2-0.9,0.6-1.3,1c-0.3,0.4-0.6,0.9-0.7,1.4
                        c-0.2,0.5-0.2,1.1-0.2,1.8c0,0.6,0.1,1.2,0.2,1.8c0.2,0.5,0.4,1,0.7,1.4c0.3,0.4,0.8,0.7,1.3,1c0.5,0.2,1.1,0.3,1.8,0.3
                        c0.7,0,1.3-0.1,1.8-0.3c0.5-0.2,0.9-0.5,1.3-1c0.3-0.4,0.6-0.9,0.7-1.4c0.2-0.5,0.2-1.1,0.2-1.8C65.8,50.5,65.8,49.9,65.6,49.3
                        M79.1,53.8c-0.1-0.2-0.2-0.1-0.2-0.1c-0.2,0.1-0.5,0.2-0.8,0.2c-0.3,0-0.6,0.1-0.9,0.1c-0.8,0-1.4-0.2-1.9-0.7
                        c-0.5-0.5-0.7-1.2-0.7-2.2c0-0.9,0.2-1.6,0.6-2.2c0.4-0.5,1-0.8,1.8-0.8c0.7,0,1.2,0.1,1.7,0.2c0,0,0.1,0.1,0.2-0.1
                        c0.1-0.4,0.3-0.7,0.4-1.1c0-0.1-0.1-0.2-0.1-0.2c-0.2-0.1-0.7-0.2-1.1-0.3c-0.4-0.1-0.8-0.1-1.2-0.1c-0.7,0-1.3,0.1-1.8,0.4
                        c-0.5,0.2-1,0.6-1.3,1c-0.4,0.4-0.6,0.9-0.8,1.4c-0.2,0.5-0.3,1.1-0.3,1.8c0,1.4,0.4,2.5,1.1,3.3c0.7,0.8,1.8,1.2,3.2,1.2
                        c0.8,0,1.7-0.2,2.3-0.4c0,0,0.1-0.1,0.1-0.2L79.1,53.8L79.1,53.8z M82,50.2c0.1-0.5,0.2-1,0.4-1.3c0.3-0.5,0.9-0.8,1.6-0.8
                        s1.2,0.3,1.6,0.8c0.2,0.3,0.3,0.8,0.4,1.3H82L82,50.2z M87.5,49c-0.1-0.5-0.5-1.1-0.7-1.3c-0.4-0.4-0.7-0.7-1.1-0.8
                        c-0.5-0.2-1-0.3-1.6-0.3c-0.7,0-1.3,0.1-1.8,0.4c-0.5,0.2-0.9,0.6-1.3,1c-0.3,0.4-0.6,0.9-0.8,1.4c-0.2,0.5-0.2,1.1-0.2,1.8
                        c0,0.6,0.1,1.2,0.3,1.8c0.2,0.5,0.4,1,0.8,1.4c0.4,0.4,0.8,0.7,1.4,0.9c0.6,0.2,1.2,0.3,2,0.3c1.6,0,2.5-0.4,2.8-0.6
                        c0.1,0,0.1-0.1,0-0.3l-0.4-1c-0.1-0.2-0.2-0.1-0.2-0.1c-0.4,0.1-1,0.4-2.3,0.4c-0.9,0-1.5-0.3-1.9-0.7c-0.4-0.4-0.6-1-0.6-1.9
                        l5.6,0c0,0,0.1,0,0.2-0.1C87.7,51.3,87.9,50.3,87.5,49 M37.4,50.2c0.1-0.5,0.2-1,0.4-1.3c0.3-0.5,0.9-0.8,1.6-0.8
                        c0.7,0,1.2,0.3,1.6,0.8c0.2,0.3,0.3,0.8,0.4,1.3H37.4z M42.9,49c-0.1-0.5-0.5-1.1-0.7-1.3c-0.4-0.4-0.7-0.7-1.1-0.8
                        c-0.5-0.2-1-0.3-1.6-0.3c-0.7,0-1.3,0.1-1.8,0.4c-0.5,0.2-0.9,0.6-1.3,1c-0.3,0.4-0.6,0.9-0.8,1.4c-0.2,0.5-0.2,1.1-0.2,1.8
                        c0,0.6,0.1,1.2,0.3,1.8c0.2,0.5,0.4,1,0.8,1.4c0.4,0.4,0.8,0.7,1.4,0.9c0.6,0.2,1.2,0.3,2,0.3c1.6,0,2.5-0.4,2.8-0.6
                        c0.1,0,0.1-0.1,0-0.3l-0.4-1c-0.1-0.2-0.2-0.1-0.2-0.1c-0.4,0.1-1,0.4-2.3,0.4c-0.9,0-1.5-0.3-1.9-0.7c-0.4-0.4-0.6-1-0.6-1.9
                        l5.6,0c0,0,0.1,0,0.2-0.1C43.1,51.3,43.3,50.3,42.9,49 M25.4,53.8c-0.2-0.2-0.2-0.2-0.3-0.3c-0.1-0.2-0.2-0.4-0.2-0.7
                        c0-0.5,0.2-0.8,0.5-1.1c0,0,0.5-0.4,1.6-0.4c0.8,0,1.5,0.1,1.5,0.1v2.5h0c0,0-0.7,0.2-1.5,0.2C25.9,54.2,25.4,53.8,25.4,53.8
                        M27.6,49.9c-0.2,0-0.5,0-0.9,0c-0.5,0-0.9,0.1-1.4,0.2c-0.4,0.1-0.8,0.3-1.2,0.5c-0.3,0.2-0.6,0.6-0.8,0.9
                        c-0.2,0.4-0.3,0.8-0.3,1.3c0,0.5,0.1,0.9,0.3,1.3c0.2,0.4,0.4,0.6,0.7,0.9c0.3,0.2,0.7,0.4,1.1,0.5c0.4,0.1,0.9,0.2,1.5,0.2
                        c0.6,0,1.1,0,1.7-0.1c0.5-0.1,1.2-0.2,1.4-0.3c0.1,0,0.3-0.1,0.4-0.1c0.1,0,0.1-0.2,0.1-0.2l0-5.1c0-1.1-0.3-1.9-0.9-2.5
                        c-0.6-0.5-1.4-0.8-2.6-0.8c-0.4,0-1.1,0.1-1.5,0.1c0,0-1.2,0.2-1.7,0.6c0,0-0.1,0.1,0,0.2l0.4,1.1c0,0.1,0.2,0.1,0.2,0.1s0,0,0.1,0
                        c1.1-0.6,2.4-0.6,2.4-0.6c0.6,0,1.1,0.1,1.4,0.4c0.3,0.2,0.5,0.6,0.5,1.3V50C28,49.9,27.6,49.9,27.6,49.9 M72.5,47
                        c0-0.1,0-0.2-0.1-0.2c-0.1,0-0.6-0.1-0.9-0.2c-0.7,0-1.1,0.1-1.4,0.2c-0.3,0.2-0.7,0.4-0.9,0.7v-0.7c0-0.1-0.1-0.2-0.2-0.2h-1.4
                        c-0.1,0-0.2,0.1-0.2,0.2v8.3c0,0.1,0.1,0.2,0.2,0.2H69c0.1,0,0.2-0.1,0.2-0.2v-4.1c0-0.6,0.1-1.1,0.2-1.5c0.1-0.3,0.3-0.6,0.5-0.8
                        c0.2-0.2,0.4-0.3,0.7-0.4c0.3-0.1,0.5-0.1,0.7-0.1c0.3,0,0.6,0.1,0.6,0.1c0.1,0,0.2-0.1,0.2-0.2C72.2,47.9,72.4,47.2,72.5,47"/>
                    <path
                        style={{ fill: '#FFFFFF' }}
                        d="M58.8,43.2c-0.2-0.1-0.3-0.1-0.5-0.1C58,43,57.7,43,57.4,43c-1,0-1.8,0.3-2.4,0.8c-0.6,0.6-0.9,1.4-1.1,2.5
                        l-0.1,0.4h-1.3c0,0-0.2,0-0.2,0.2l-0.2,1.2c0,0.1,0,0.2,0.2,0.2h1.2l-1.2,7c-0.1,0.6-0.2,1-0.3,1.4c-0.1,0.3-0.2,0.6-0.4,0.8
                        c-0.1,0.2-0.3,0.3-0.5,0.4c-0.2,0.1-0.4,0.1-0.7,0.1c-0.1,0-0.3,0-0.4,0c-0.1,0-0.2-0.1-0.3-0.1c0,0-0.1-0.1-0.2,0.1
                        c0,0.1-0.4,1-0.4,1.1c0,0.1,0,0.2,0.1,0.2c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.5,0,1-0.1,1.4-0.2
                        c0.4-0.1,0.7-0.4,1-0.7c0.3-0.4,0.5-0.7,0.7-1.2c0.2-0.5,0.4-1.1,0.5-1.9l1.3-7.1h1.8c0,0,0.2,0,0.2-0.2l0.2-1.2
                        c0-0.1,0-0.2-0.2-0.2h-1.8c0,0,0.1-0.7,0.3-1.3c0.1-0.3,0.3-0.5,0.4-0.6c0.1-0.1,0.3-0.2,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.1
                        c0.2,0,0.3,0,0.5,0c0.2,0,0.2,0.1,0.3,0.1c0.2,0.1,0.2,0,0.2-0.1l0.4-1.2C58.9,43.3,58.8,43.2,58.8,43.2 M33.9,55.2
                        c0,0.1-0.1,0.2-0.2,0.2h-1.5c-0.1,0-0.2-0.1-0.2-0.2V43.3c0-0.1,0.1-0.2,0.2-0.2h1.5c0.1,0,0.2,0.1,0.2,0.2V55.2z"/>
                </g>
            </svg>
        );
    },
    SCIM: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <rect style={{ fill: "#000", stroke: "#000", strokeMiterlimit: 10 }} width="100" height="100" />
                <rect style={{ fill: "#010101" }} x="6.02" y="36.11" width="87.96" height="31.04" />
                <path
                    style={{ fill: "#fff" }}
                    d="M18.34,65.66A16.61,16.61,0,0,1,12.5,64.6a15.42,15.42,0,0,1-5.17-3.33L10.69,57a17,17,0,0,0,3.65,2.44,9.2,9.2,0,0,0,4.1.92,4.73
                    4.73,0,0,0,2.76-.67,2.25,2.25,0,0,0,1-1.91V57.7a2.37,2.37,0,0,0-.21-1,2.5,2.5,0,0,0-.78-.85A9.06,9.06,0,0,0,19.61,55c-.67-.24-1.56-.53-2.65-.81a33
                    33,0,0,1-3.58-1.13,9.85,9.85,0,0,1-2.73-1.56,6.35,6.35,0,0,1-1.73-2.3,8.24,8.24,0,0,1-.6-3.43v-.15A8.15,8.15,0,0,1,9,42.27a7.6,7.6,0,0,1,1.88-2.62A7.89,7.89
                    0,0,1,13.73,38a11,11,0,0,1,3.69-.6,13.82,13.82,0,0,1,5.23.92A14.79,14.79,0,0,1,27,40.85l-3,4.57a18.57,18.57,0,0,0-3.43-2,8.19,8.19,0,0,0-3.33-.74,3.91,3.91
                    0,0,0-2.51.71A2.09,2.09,0,0,0,14,45.1v.07a2.58,2.58,0,0,0,.24,1.17,2.42,2.42,0,0,0,.89.88,7.2,7.2,0,0,0,1.73.74c.75.25,1.67.5,2.77.82A23.7,23.7,0,0,1,23.08
                    50a10,10,0,0,1,2.62,1.66A5.92,5.92,0,0,1,27.29,54,8,8,0,0,1,27.82,57v.07a8.66,8.66,0,0,1-.7,3.64,7.93,7.93,0,0,1-1.95,2.69,8.53,8.53,0,0,1-3,1.63A11,11,0,0,1,18.34,65.66Z" />
                <path
                    style={{ fill: "#fff" }}
                    d="M66.69,37.42h6.16L79.68,49l6.83-11.61h6.16V65.84H87V46.94L79.75,58.69h-.14L72.39,47.08V65.84H66.76V37.42Z" />
                <path
                    style={{ fill: "#fff" }}
                    d="M47.47,59.4a7.73,7.73,0,0,1-3.75.85,7,7,0,0,1-3.08-.67,7.18,7.18,0,0,1-2.37-1.88,8.65,8.65,0,0,1-1.56-2.76,9.4,9.4,0,0,1-.57-3.33v-.07a9.52,9.52,0,0,1,.57-3.33,8.15,8.15
                    0,0,1,1.56-2.72,7.26,7.26,0,0,1,2.4-1.84,6.71,6.71,0,0,1,3-.68,7.79,7.79,0,0,1,3.54.82c.46.25-.18-.18.25.14l3-4.57A6.61,6.61,0,0,0,47,37.7a16.19,16.19,0,0,0-3.32-.32,
                    13.27,13.27,0,0,0-5.49,1.13A13,13,0,0,0,34,41.59a13.27,13.27,0,0,0-2.76,4.53,14.73,14.73,0,0,0-1,5.53v0a14.72,14.72,0,0,0,1,5.52A14.05,14.05,0,0,0,34,61.7a13.18,13.18,0
                    0,0,4.24,3,12.69,12.69,0,0,0,5.31,1.1,17.13,17.13,0,0,0,3.44-.32,11.36,11.36,0,0,0,2.23-.78,5.7,5.7,0,0,0,1.27-.78Z" />
                <path
                    style={{ fill: "#fff" }}
                    d="M54.3,65.81H56a5.2,5.2,0,0,0,2.34-.25,3.48,3.48,0,0,0,1.91-2.23,5.77,5.77,0,0,0-.18-2.91c-.11-.35.39-.6.53-.7a1,1,0,0,0,.18-.89,1.18,1.18,0,0
                    0-.57-.53s.25-.11.57-.28.74-.53.67-1A5.66,5.66,0,0,0,61,55.93a1.66,1.66,0,0,1,.14-1.38c.36-.46.92-.57,1.31-.82a1.91,1.91,0,0,0
                    .92-1.23c.22-.75-.49-1.46-1.24-2.48s-1.34-1.81-1.91-2.69c-1-1.52.18-2,.39-3.08s-.6-2.73-.88-3.72a7.86,7.86,0,0,0-1.56-3.11H54.34V65.81Z" />
            </svg>
        )
    },
    OPENID_CONNECT: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <polygon style={{ fill: "#F7921C" }} points="45.5,11.5 45.5,86.4 45.5,95.8 60.5,88.8 60.5,4.2 " />
                <polyline style={{ fill: "#BBBDBF" }} points="97.4,36.2 99.5,57.7 70.5,51.4 " />
                <path style={{ fill: "#BBBDBF" }} d="M63.1,31.9v9.5c6.3,1.1,11.9,3.2,16.4,5.9l10.6-6.6C82.9,36.3,73.6,33.2,63.1,31.9 M15.5,63.7
                    c0-10.6,11.6-19.6,27.4-22.3v-9.5C18.7,34.8,0.5,48,0.5,63.7c0,16.3,19.6,29.9,45,32.1v-9.4C28.4,84.3,15.5,74.9,15.5,63.7"/>
                <polygon style={{ fill: "#F7921C" }} points="45.5,11.5 45.5,86.4 45.5,95.8 60.5,88.8 60.5,4.2 " />
                <polyline style={{ fill: "#BBBDBF" }} points="97.4,36.2 99.5,57.7 70.5,51.4 " />
                <path style={{ fill: "#BBBDBF" }} d="M63.1,31.9v9.5c6.3,1.1,11.9,3.2,16.4,5.9l10.6-6.6C82.9,36.3,73.6,33.2,63.1,31.9 M15.5,63.7
                    c0-10.6,11.6-19.6,27.4-22.3v-9.5C18.7,34.8,0.5,48,0.5,63.7c0,16.3,19.6,29.9,45,32.1v-9.4C28.4,84.3,15.5,74.9,15.5,63.7"/>
            </svg>
        )
    },
    APPLE: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 118 118" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Apple-(1)" transform="translate(3.000000, 3.000000)" fillRule="nonzero">
                        <rect id="Rectangle" stroke="#000000" strokeWidth="5" fill="#000000" x="0" y="0" width="112" height="112" rx="3"/>
                        <g id="Apple" transform="translate(28.000000, 19.000000)" fill="#FFFFFF">
                            <g
                                id="Group"
                                transform="translate(28.000000, 42.000000) scale(-1, 1) rotate(-180.000000)
                                translate(-28.000000, -42.000000) translate(0.000000, 16.000000)"
                            >
                                <path
                                    d="M46.1102651,31.9938442 C46.1102651,40.5134026 53.1416386,44.587974 53.5117108,44.9583896 C49.4409157,50.885039
                                    43.519759,51.6258701 41.2993253,51.6258701 C36.1183133,51.9962857 30.9373012,48.6625455 28.3467952,48.6625455
                                    C25.7562892,48.6625455 21.685494,51.6258701 17.2446265,51.6258701 C11.6935422,51.6258701 6.14245783,48.2921299
                                    3.18187952,43.1063117 C-2.73927711,32.7346753 1.70159036,17.5476364 7.62274699,9.02807792 C10.5833253,4.95350649 13.9139759,0.138103896
                                    18.3548434,0.508519481 C22.7957108,0.508519481 24.276,3.10142857 29.457012,3.10142857 C34.6380241,3.10142857 36.1183133,0.508519481
                                    40.5591807,0.508519481 C45.0000482,0.508519481 47.9606265,4.58309091 50.9212048,8.65766234 C54.2518554,13.4730649 55.3620723,17.9180519
                                    55.7321446,18.2884675 C54.992,18.2884675 46.1102651,21.9926234 46.1102651,31.9938442"
                                    id="Path"
                                >
                                </path>
                            </g>
                            <path
                                d="M37.3331768,11.0673001 C39.744211,8.13588622 41.3745952,4.06101305 40.9255487,0 C37.4506197,0.138601128 33.2433995,2.3215689
                                30.7494643,5.25298276 C28.5180487,7.84482385 26.5560609,11.9889976 27.0880083,15.97378 C30.963625,16.2717724 34.9221425,13.9917839 37.3331768,11.0673001"
                                id="Path"
                            >
                            </path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    },
    AMAZON: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 118 118" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Amazon-(1)" transform="translate(3.000000, 3.000000)" fillRule="nonzero">
                        <rect id="Rectangle" stroke="#FF9A02" strokeWidth="5" fill="#FF9A02" x="0" y="0" width="112" height="112" rx="3"/>
                        <g id="Amazon" transform="translate(15.000000, 19.000000)" fill="#FFFFFF">
                            <path
                                d="M0.166,58.1497797 C0.415,57.7367841 0.83,57.7367841 1.328,58.0671806 C13.944,65.3359031 27.556,68.9702643 42.413,68.9702643 C52.29,68.9702643
                                62.001,67.1530837 71.629,63.5187225 C71.878,63.4361233 72.21,63.2709251 72.708,63.1057269 C73.206,62.9405286 73.538,62.7753304 73.704,62.6927313
                                C74.451,62.3623348 75.032,62.527533 75.447,63.1057269 C75.862,63.6839207 75.696,64.2621145 75.032,64.7577093 C74.119,65.4185022 72.957,66.1618943
                                71.546,66.9878855 C67.23,69.5484581 62.416,71.530837 57.021,72.935022 C51.709,74.339207 46.48,75 41.417,75 C33.532,75 26.145,73.595815 19.173,70.8700441
                                C12.201,68.1442731 5.893,64.2621145 0.415,59.3061674 C0.166,59.05837 0,58.8105727 0,58.5627753 C0,58.4801762 0.083,58.314978 0.166,58.1497797 Z M22.825,36.7566079
                                C22.825,33.2874449 23.655,30.3138767 25.398,27.9185022 C27.141,25.4405286 29.465,23.623348 32.453,22.3843612 C35.192,21.2279736 38.512,20.4019824 42.496,19.9063877
                                C43.824,19.7411894 46.065,19.5759912 49.136,19.3281938 L49.136,18.089207 C49.136,14.8678414 48.804,12.7202643 48.057,11.6464758 C46.978,10.1596916 45.318,9.41629956
                                43.077,9.41629956 L42.496,9.41629956 C40.836,9.5814978 39.425,10.0770925 38.18,10.9856828 C36.935,11.8942731 36.188,13.1332599 35.856,14.7026432 C35.69,15.6938326
                                35.192,16.2720264 34.362,16.4372247 L25.647,15.3634361 C24.817,15.1982379 24.402,14.7026432 24.402,14.0418502 C24.402,13.876652 24.402,13.7114537 24.485,13.5462555
                                C25.315,9.08590308 27.473,5.78193833 30.793,3.63436123 C34.113,1.48678414 38.014,0.247797357 42.496,0 L44.405,0 C50.132,0 54.614,1.48678414 57.851,4.46035242 C58.349,4.95594714
                                58.847,5.53414097 59.262,6.1123348 C59.677,6.69052863 60.009,7.18612335 60.258,7.68171806 C60.507,8.09471366 60.756,8.75550661 60.922,9.66409692 C61.088,10.4900881
                                61.254,11.0682819 61.337,11.3986784 C61.42,11.7290749 61.503,12.3898678 61.586,13.4636564 C61.669,14.5374449 61.669,15.1982379 61.669,15.3634361 L61.669,33.5352423
                                C61.669,34.8568282 61.835,36.0132159 62.25,37.0870044 C62.665,38.160793 62.997,38.904185 63.329,39.3997797 C63.661,39.8953744 64.242,40.6387665 65.072,41.7125551
                                C65.404,42.1255507 65.487,42.5385463 65.487,42.9515419 C65.487,43.3645374 65.321,43.6949339 64.906,44.0253304 C60.756,47.6596916 58.432,49.5594714 58.1,49.8898678
                                C57.519,50.3028634 56.772,50.3854626 55.942,50.0550661 C55.278,49.4768722 54.614,48.8986784 54.116,48.3204846 C53.618,47.7422907 53.203,47.3292952 52.954,47.0814978
                                C52.705,46.8337004 52.373,46.3381057 51.875,45.5947137 C51.377,44.8513216 51.045,44.3557269 50.796,44.1079295 C47.974,47.1640969 45.235,49.0638767 42.496,49.8072687
                                C40.753,50.3028634 38.678,50.5506608 36.188,50.5506608 C32.287,50.5506608 29.133,49.3942731 26.643,46.9988987 C24.153,44.6035242 22.825,41.1343612 22.825,36.7566079
                                Z M35.856,35.2698238 C35.856,37.2522026 36.354,38.8215859 37.35,39.9779736 C38.346,41.1343612 39.674,41.7125551 41.334,41.7125551 C41.5,41.7125551 41.666,41.7125551
                                41.998,41.6299559 C42.247,41.5473568 42.496,41.5473568 42.579,41.5473568 C44.654,40.969163 46.314,39.6475771 47.476,37.5 C48.057,36.5088106 48.472,35.5176211 48.721,34.3612335
                                C48.97,33.2048458 49.136,32.2962555 49.136,31.6354626 C49.136,30.9746696 49.136,29.8182819 49.136,28.1662996 L49.136,26.2665198 C46.231,26.2665198 43.99,26.4317181 42.496,26.8447137
                                C38.014,28.1662996 35.856,30.9746696 35.856,35.2698238 Z M67.562,59.3887665 C67.645,59.2235683 67.811,58.9757709 67.977,58.8105727 C69.222,57.9845815 70.467,57.4063877
                                71.629,57.0759912 C73.538,56.5803965 75.364,56.3325991 77.19,56.25 C77.688,56.1674009 78.186,56.25 78.601,56.3325991 C80.842,56.4977974 82.253,56.910793 82.668,57.4889868
                                C82.834,57.8193833 83,58.2323789 83,58.8105727 L83,59.3061674 C83,61.0407489 82.502,63.1057269 81.589,65.5011013 C80.593,67.8964758 79.265,69.7962555 77.605,71.2830396
                                C77.356,71.4482379 77.107,71.6134361 76.941,71.6134361 C76.858,71.6134361 76.775,71.6134361 76.609,71.530837 C76.277,71.3656388 76.194,71.1178414 76.36,70.7048458
                                C78.186,66.3270925 79.182,63.3535242 79.182,61.6189427 C79.182,61.0407489 79.099,60.6277533 78.85,60.3799559 C78.352,59.8017621 76.941,59.4713656 74.617,59.4713656
                                C73.787,59.4713656 72.791,59.5539648 71.629,59.6365639 C70.384,59.8017621 69.222,59.9669604 68.143,60.0495595 C67.811,60.0495595 67.645,59.9669604 67.562,59.8843612
                                C67.479,59.8017621 67.396,59.719163 67.479,59.5539648 C67.479,59.5539648 67.479,59.5539648 67.562,59.3887665 Z"
                                id="Shape"
                            >
                            </path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    },
    PAYPAL: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 452 452" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Group-16">
                        <g id="iconfinder_paypal_683969" transform="translate(100.000000, 78.000000)" fill="#008DD2">
                            <path d="M49.3655333,0.49311875 L100.241533,0.49311875 L104.962333,0.49311875 L155.554133,0.49311875 C189.646933,0.49311875 229.290267,25.5777344 217.464933,80.7421906 C207.039133,129.467984 168.073867,158.125806 121.4646,158.125806 L96.6482,158.123944 L96.6458667,158.125806 L91.1116667,158.125806 C84.4308667,158.125806 80.005,163.659759 78.9606,170.243697 L65.5276,255.130394 L12.9076667,255.130394 C6.239,255.130394 -0.288266667,249.591784 0.754733333,243.004122 L37.2130667,12.618925 C38.2551333,6.03079687 42.6814667,0.49311875 49.3655333,0.49311875 L49.3655333,0.49311875 Z M240.545333,88.8426687 C246.902267,100.141059 249.436267,115.021503 245.425733,133.727987 C235.993,177.812431 200.739133,203.741225 158.567867,203.741225 L148.5238,203.7077 L148.5224,203.709562 L142.480467,203.741225 C136.435733,203.772422 133.4668,208.716428 132.521333,214.673169 L131.875467,218.753441 L122.277067,279.409478 C121.27,285.714041 117.115733,291.081766 110.878267,291.481737 L72.5028667,291.506418 C66.4698,291.510141 60.5641333,286.496291 61.5072667,280.536291 L61.6902,279.381541 L86.2966,279.381541 L99.2316667,197.638278 L99.5835333,197.689031 L101.775933,182.375556 L121.462733,182.376953 C180.068133,182.380678 227.060533,145.529253 240.545333,88.8426687 L240.545333,88.8426687 Z" id="Shape"/>
                        </g>
                        <g id="Group-14">
                            <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="452" height="452" rx="3"/>
                            <g id="iconfinder_paypal_683969" transform="translate(100.000000, 78.000000)" fill="#008DD2">
                                <path d="M49.3655333,0.49311875 L100.241533,0.49311875 L104.962333,0.49311875 L155.554133,0.49311875 C189.646933,0.49311875 229.290267,25.5777344 217.464933,80.7421906 C207.039133,129.467984 168.073867,158.125806 121.4646,158.125806 L96.6482,158.123944 L96.6458667,158.125806 L91.1116667,158.125806 C84.4308667,158.125806 80.005,163.659759 78.9606,170.243697 L65.5276,255.130394 L12.9076667,255.130394 C6.239,255.130394 -0.288266667,249.591784 0.754733333,243.004122 L37.2130667,12.618925 C38.2551333,6.03079687 42.6814667,0.49311875 49.3655333,0.49311875 L49.3655333,0.49311875 Z M240.545333,88.8426687 C246.902267,100.141059 249.436267,115.021503 245.425733,133.727987 C235.993,177.812431 200.739133,203.741225 158.567867,203.741225 L148.5238,203.7077 L148.5224,203.709562 L142.480467,203.741225 C136.435733,203.772422 133.4668,208.716428 132.521333,214.673169 L131.875467,218.753441 L122.277067,279.409478 C121.27,285.714041 117.115733,291.081766 110.878267,291.481737 L72.5028667,291.506418 C66.4698,291.510141 60.5641333,286.496291 61.5072667,280.536291 L61.6902,279.381541 L86.2966,279.381541 L99.2316667,197.638278 L99.5835333,197.689031 L101.775933,182.375556 L121.462733,182.376953 C180.068133,182.380678 227.060533,145.529253 240.545333,88.8426687 L240.545333,88.8426687 Z" id="Shape"/>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        )
    },
    GITHUB: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 500 500" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <path fill='#1b1f23' d="M474.3,500H25.7A25.69,25.69,0,0,1,0,474.3V25.7A25.69,25.69,0,0,1,25.7,0H474.4A25.67,25.67,0,0,1,500,25.7V474.4A25.67,25.67,0,0,1,474.3,500Z" />
                <g id="Page-1">
                    <g id="iconfinder_github_2006660" data-name="iconfinder  github 2006660">
                        <path id="Path" fill="#FFFFFF" d="M318.9,456.45h-2l-2-2v-60.6c0-13.7-2-25.4-7.8-35.2,45.1-7.8,94.2-31.3,94.2-119.4a100.44,100.44,0,0,0-21.6-62.6c3.9-11.7,5.9-33.3-3.9-60.7l-5.9-5.9a19.78,19.78,0,0,0-7.8-2c-11.8,0-29.4,3.9-58.9,23.5-15.7-2-33.4-5.9-53-5.9a249,249,0,0,0-54.9,5.9c-27.5-17.6-47.1-21.5-58.9-21.5-3.9,0-5.9,2-7.8,2s-5.9,3.9-5.9,5.9c-9.8,27.4-7.8,48.9-3.9,60.7a101,101,0,0,0-21.6,62.6c0,86.1,51,109.6,94.2,119.4-2,3.9-3.9,9.8-5.9,15.7a38.66,38.66,0,0,1-17.7,3.9c-7.8,0-15.7-2-21.6-7.8l-2-2h0c-2-2-2-3.9-3.9-3.9h0l-2-2-2-2c0-2-15.7-25.4-43.2-27.4-9.8,0-17.7,3.9-19.6,9.8-3.9,9.8,7.8,17.6,13.7,21.5,0,0,11.8,5.9,19.6,27.4,3.9,13.7,21.6,39.1,62.8,39.1h13.7v27.4l-2,2h0C93.3,427.15,34.4,345,34.4,253c0-119.4,96.1-215.3,215.8-215.3S466,133.55,466,253A214.51,214.51,0,0,1,318.9,456.45Z" />
                    </g>
                </g>
            </svg>
        )
    },
    YAHOO: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 452 452" style={{ enableBackground: `new 0 0 ${width} ${height}`, maxWidth: width, height }}>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Group-15">
                        <rect id="Rectangle" fill="#5D04CA" x="0" y="0" width="452" height="452" rx="8"/>
                        <polygon id="Path-13" fill="#FFFFFF" points="61 132 134 303 108 365 171 365 268 132 204 132 165 231 126 132"/>
                        <polygon id="Path-15" fill="#FFFFFF" points="323 58 259 211 330 211 394 58"/>
                        <circle id="Oval" fill="#FFFFFF" cx="276.5" cy="265.5" r="39.5"/>
                    </g>
                </g>
            </svg>
        )
    },
};
SocialIcons.PAYPAL_SANDBOX = SocialIcons.PAYPAL;


export default SocialIcons;
