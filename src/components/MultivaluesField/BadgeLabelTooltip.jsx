import React, { useRef } from 'react';
import { mergeProps } from 'react-aria';
import Clear from '@pingux/mdi-react/CloseIcon';
import { useHover } from '@react-aria/interactions';

import { Badge, Box, Icon, IconButton } from '../..';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';

const BADGE_TOOLTIP_CHAR_THRESHOLD = 25;

const BadgeLabelTooltip = ({ item, index, deleteItem, closeBadgeRefs }) => {
  const isLong = item.name.length > BADGE_TOOLTIP_CHAR_THRESHOLD;
  const { hoverProps, isHovered } = useHover({});
  const textProps = mergeProps(item.badgeProps?.textProps || {}, hoverProps);
  const badgeRef = useRef();

  return (
    <Box as="li">
      <TooltipTrigger
        direction="top"
        isDisabled={!isLong}
        isOpen={isLong && isHovered}
        targetRef={badgeRef}
      >
        <Badge
          ref={badgeRef}
          key={item.key}
          role="presentation"
          variant="selectedItemBadge"
          label={item.name}
          slots={item.slots}
          {...item.badgeProps}
          textProps={textProps}
        >
          <IconButton
            aria-label={`delete ${item.name}`}
            data-item={item.name}
            onPress={e => deleteItem(item.key, e)}
            ref={el => closeBadgeRefs.current[index] = el} // eslint-disable-line
            variant="badge.deleteButton"
            aria-describedby="selectedKeysState"
            {...item.buttonProps}
          >
            <Icon icon={Clear} size={14} title={{ name: 'Clear Icon' }} />
          </IconButton>
        </Badge>
        <Tooltip variant="variants.tooltip.badgeTooltipContainer">{item.name}</Tooltip>
      </TooltipTrigger>
    </Box>
  );
};

export default BadgeLabelTooltip;
