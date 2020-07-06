import React from 'react';
import Markdown from './Markdown';
import notes from './notes.md';

export default {
    title: 'Components/Display/Markdown',
    parameters: { notes },
};

export const Default = () => {
    const example = "# This is Markdown  \nOnly _cool_ text goes here. You can do ~~anything~~ most things you want.  \nYou can even link to [Wikipedia](https://wikipedia.org) or something.  \nOr maybe you want to display some \`code\`, it's up to **you**!";

    return <Markdown source={example} />;
};

export const Overridden = () => {
    const example = "# This is Markdown  \nOnly _cool_ text goes here. You can do ~~anything~~ most things you want.  \nYou can even link to [Wikipedia](https://wikipedia.org) or something.  \nOr maybe you want to display some \`code\`, it's up to **you**!";

    // Will now display paragraphs, but not headings
    return <Markdown source={example} disallowedTypes={['heading']} />;
};
