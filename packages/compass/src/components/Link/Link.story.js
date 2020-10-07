import React from 'react';
import { Link, LinkProvider } from '../../.';

export default {
    title: 'Link',
    component: Link,
};

export const Default = () => (
    <Link href="/not-a-link">Click me</Link>
);

/* eslint-disable jsx-a11y/anchor-is-valid, no-console */
export const ButtonLink = () => (
    <Link onClick={() => console.log('clicked')}>I&apos;m a button because I don&apos;t have an href</Link>
);
/* eslint-enable jsx-a11y/anchor-is-valid, no-console */

const testHandler = (e) => {
    console.log(`Clicked with url: ${e.target.href}`); // eslint-disable-line no-console
    e.preventDefault();
};

export const WithProvider = () => (
    <LinkProvider onClick={testHandler}>
        <Link href="/here">Here</Link><br />
        <Link href="/there">There</Link><br />
        <Link href="/everywhere">Everywhere</Link>
    </LinkProvider>
);
