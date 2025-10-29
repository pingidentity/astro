import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { compiler } from 'markdown-to-jsx';

import { ResponseMarkdownContextValue } from '../../../../types/response';

import MarkdownContainer from './MarkdownContainer';
import MarkdownListWrapper from './MarkdownListWrapper';
import MarkdownTextWrapper from './MarkdownTextWrapper';

export const ResponseMarkdownContext = createContext<ResponseMarkdownContextValue>({
  stateIndex: -1,
});

export const countChildren = _children => {
  let count = 0;
  for (let i = 0; i < _children.length; i += 1) {
    if (typeof (_children[i]) !== 'string') {
      count += 1;
    }
  }
  return count;
};


const ResponseMarkdown = componentProps => {
  const [index, setIndex] = useState(-1);
  const {
    parentIndex,
    setAnimationIndex,
    shouldStartAnimation,
    delay,
    str,
  } = componentProps;

  useEffect(() => {
    if (shouldStartAnimation) {
      setIndex(0);
    }
  }, [shouldStartAnimation]);

  const commonProps = {
    setAnimationIndex: setIndex,
    delay,
    parentIndex: index,
    stateIndex: index,
  };

  const markdown = compiler(str, { wrapper: MarkdownContainer,
    forceWrapper: true,
    overrides: {
      h1: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
        },
      },
      h2: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
        },
      },
      h3: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
        },
      },
      h4: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
        },
      },
      h5: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
        },
      },
      h6: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
        },
      },
      p: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
          as: 'p',
        },
      },
      li: {
        component: MarkdownTextWrapper,
        props: {
          setAnimationIndex: setIndex,
          delay,
          as: 'li',
        },
      },
      ul: {
        component: MarkdownListWrapper,
        props: {
          setAnimationIndex: setIndex,
          delay,
          stateIndex: index,
          as: 'ul',
        },
      },
      strong: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
          as: 'strong',
        },
      },
      em: {
        component: MarkdownTextWrapper,
        props: {
          ...commonProps,
          as: 'em',
        },
      },
      i: {
        component: MarkdownTextWrapper,
        props: {
          setAnimationIndex: setIndex,
          delay,
          stateIndex: index,
          as: 'i',
        },
      },
      ol: {
        component: MarkdownListWrapper,
        props: {
          setAnimationIndex: setIndex,
          delay,
          stateIndex: index,
          as: 'ol',
        },
      },
    } });

  const childrenCount = countChildren(markdown.props.children);

  useEffect(() => {
    if (index === childrenCount) {
      setAnimationIndex(parentIndex + 1);
    }
  }, [index, markdown.props.children.length]);

  const setAnimationCallback = useCallback(val => {
    setIndex(val);
  }, [index, setIndex]);

  const contextValues = useMemo(() => {
    return {
      setAnimationIndex: setAnimationCallback, stateIndex: index, delay,
    };
  }, [setAnimationCallback, index, delay]);

  return (
    <ResponseMarkdownContext.Provider
      value={contextValues}
    >
      {markdown}
    </ResponseMarkdownContext.Provider>
  );
};

export default ResponseMarkdown;
