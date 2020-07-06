import React from 'react';
import { render, screen } from '@testing-library/react';

import Markdown from './Markdown';

const example = "# This is Markdown  \nOnly _cool_ text goes here. You can do ~~anything~~ most things you want.  \nYou can even link to [Wikipedia](https://wikipedia.org) or something.  \nOr maybe you want to display some \`code\`, it's up to **you**!";
const defaultProps = {
    source: example,
};
const renderComponent = props => render(<Markdown {...defaultProps} {...props} />);

test('it renders Markdown with default settings', () => {
    renderComponent();
    const heading = screen.queryByRole('heading');
    const link = screen.queryByRole('link');
    
    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('rel', 'nofollow noreferrer noopener');
    expect(link).toHaveAttribute('target', '_blank');
    expect(document.querySelectorAll('p')).toHaveLength(0);
});

test('it renders Markdown with given settings', () => {
    // Override the 'paragraph' default and disallow 'link' types
    renderComponent({ disallowedTypes: ['link'] });
    const link = screen.queryByRole('link');
    
    expect(link).not.toBeInTheDocument();
    expect(document.querySelectorAll('p')).not.toHaveLength(0);
});

test('it renders without Markdown when hasMarkdown is false', () => {
    const { container } = renderComponent({ hasMarkdown: false });
    const heading = screen.queryByRole('heading');
    const link = screen.queryByRole('link');
    
    expect(heading).not.toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(container.textContent).toEqual(example);
});

test('it renders null when no source is passed in and hasMarkdown is false', () => {
    const { container } = renderComponent({ hasMarkdown: false, source: undefined });
    expect(container.firstChild).toBeNull();
});
