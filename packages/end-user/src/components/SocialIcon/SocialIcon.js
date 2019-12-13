import React from 'react';

const SocialIcons = {
    GOOGLE: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
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
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
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
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
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
    FACEBOOK: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
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
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
                <path
                    style={{ fill: '#5944B0' }}
                    d="M67,0.7v98.6l25.2-20.1V14.4L67,0.7z M55.3,77.8L35,86.6V9.3l20.3,6V77.8z M7.8,75.5l15.5-4.1V22L7.8,19.5L7.8,75.5z"/>
            </svg>
        )
    },
    SALESFORCE: ({ width = '100%', height = '100%' }) => {
        return (
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
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
            <svg x="0px" y="0px" viewBox="0 0 100 100" style={{ enableBackground: `new 0 0 ${width} ${height}`, width, height }}>
                <rect x="35.5" y="10.3" style={{ fill: '#010101' }} width="52.8" height="89.7" />
                <path style={{ fill:'#FFFFFF' }} d="M47.8,114.7c-7.7,0-15.2-1.4-22.6-4.2c-7.4-2.8-14.1-7.1-20.2-12.9L18.1,81c4.6,4,9.3,7.1,14.2,9.4
			c4.9,2.3,10.2,3.5,15.9,3.5c4.6,0,8.2-0.9,10.7-2.6c2.5-1.8,3.8-4.3,3.8-7.4v-0.3c0-1.5-0.3-2.9-0.8-4c-0.5-1.2-1.5-2.3-3-3.3
			c-1.5-1-3.6-2-6.2-3c-2.6-1-6.1-2.1-10.3-3.2c-5.1-1.3-9.7-2.8-13.9-4.4c-4.1-1.6-7.7-3.6-10.5-6c-2.9-2.4-5.1-5.4-6.7-8.9
			c-1.6-3.6-2.4-8-2.4-13.3v-0.3c0-4.9,0.9-9.2,2.6-13.2c1.7-3.9,4.1-7.3,7.2-10.1c3.1-2.9,6.8-5,11.1-6.5C34.1,5.8,38.9,5,44,5
			c7.4,0,14.2,1.2,20.4,3.5c6.2,2.3,11.9,5.7,17.1,10.1L70,36.2c-4.5-3.2-9-5.8-13.3-7.7c-4.3-1.9-8.7-2.8-13-2.8s-7.5,0.9-9.7,2.7
			c-2.2,1.8-3.2,4-3.2,6.6v0.3c0,1.7,0.3,3.2,0.9,4.5c0.6,1.3,1.8,2.4,3.4,3.4c1.6,1,3.9,2,6.7,2.9c2.8,0.9,6.4,2,10.8,3.2
			c5.1,1.4,9.6,3,13.6,4.8c4,1.8,7.4,3.9,10.1,6.4c2.7,2.5,4.8,5.4,6.2,8.8c1.4,3.3,2.1,7.4,2.1,12v0.3c0,5.3-0.9,10-2.7,14.1
			c-1.8,4.1-4.4,7.6-7.6,10.4c-3.2,2.8-7.1,4.9-11.6,6.4C58.2,114,53.3,114.7,47.8,114.7z"/>
		    <path style={{ fill:'#FFFFFF' }} d="M235.4,5h23.9l26.5,45.1L312.3,5h23.9v110.4h-21.9V42L286,87.6h-0.6l-28.1-45.1v72.9h-21.9V5z"/>
		    <path style={{ fill:'#FFFFFF' }} d="M160.8,90.3c-4,2.2-8.8,3.3-14.6,3.3c-4.3,0-8.3-0.9-11.9-2.7c-3.6-1.8-6.7-4.2-9.2-7.2
			c-2.6-3-4.6-6.6-6-10.7c-1.5-4-2.2-8.4-2.2-12.9v-0.3c0-4.6,0.7-8.8,2.2-12.9c1.4-4,3.4-7.5,6-10.6c2.6-3,5.7-5.4,9.3-7.1
			c3.6-1.7,7.5-2.6,11.7-2.6c5.1,0,9.7,1.1,13.7,3.2c1.8,0.9-0.7-0.7,1,0.5l11.5-17.7c-2.5-3.2-9.3-5.6-13.2-6.4
			c-3.9-0.8-8.2-1.2-12.9-1.2c-7.8,0-14.9,1.5-21.3,4.3c-6.4,2.9-12,6.9-16.6,11.9c-4.6,5-8.2,10.9-10.8,17.5
			c-2.6,6.7-3.9,13.8-3.9,21.4v0.3c0,7.6,1.3,14.8,3.9,21.5c2.6,6.7,6.2,12.5,10.8,17.4c4.6,4.9,10.1,8.8,16.4,11.7
			c6.3,2.8,13.2,4.3,20.6,4.3c4.9,0,9.3-0.4,13.3-1.3c3.4-0.8,6.1-1.8,8.6-3.1c1.7-0.9,3.4-1.8,5-3L160.8,90.3z"/>
		    <path style={{ fill:'#FFFFFF' }} d="M187.3,115.2c5.7,0,6.1,0,6.5,0c4.2,0.1,5.2,0.3,9-0.9c3.8-1.2,6.4-5.2,7.4-8.7c1-3.4,0.2-7.9-0.6-11.2
			c-0.4-1.4,1.6-2.3,2.1-2.8c0.9-0.8,1.1-2.6,0.7-3.4c-0.4-0.8-0.9-1.3-2.2-2.1c0,0,1-0.4,2.2-1.2c1.6-1.1,2.9-2,2.6-3.8
			c-0.2-0.9-0.9-2.3-1.8-4.4c-0.7-1.6-0.3-4.2,0.6-5.3c1.4-1.8,3.6-2.2,5-3.2c1.4-1,2.8-1.9,3.6-4.8c0.8-2.9-1.9-5.7-4.9-9.7
			c-2.5-3.5-5.3-7.1-7.3-10.4c-3.7-5.9,0.6-7.8,1.5-11.9c0.9-4.1-2.4-10.5-3.5-14.4c-1.3-4.5-2.6-7.6-6-12h-14.8V115.2z"/>
            </svg>
        )
    },
};


export default SocialIcons;
