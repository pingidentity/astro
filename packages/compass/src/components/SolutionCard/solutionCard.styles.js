import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';


function solutionCard({ theme, isSelected }) {
    return css`
        border-width: 1px;
        border-style: solid;
        border-color: ${isSelected ? themeGet('colors.active')({ theme }) : 'transparent'};
        cursor: pointer;
        width: 100%;
        text-align: center;
        position: relative;
        margin-bottom: 50px;
        &:after {
            content: '';
            position: absolute;
            top: 100%;
            width: 100%;
            height: 50px;
            display: block;
            background-repeat: no-repeat;
            background-size: ${!isSelected && '0 0'};
            background-position: 50%;
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMHB4IiBoZWlnaHQ9IjUxcHgiIHZpZXdCb3g9IjAgMCAxMCA1MSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZyBpZD0iSnVuZS1SZWxlYXNlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJBZGQtRW52aXJvbm1lbnQtU3RlcC0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDk4LjAwMDAwMCwgLTQyNy4wMDAwMDApIj4gICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ5OC4wMDAwMDAsIDQyNy43NTAwMDApIj4gICAgICAgICAgICAgICAgPGxpbmUgeDE9IjQuNzEzODQ4MjkiIHkxPSIwIiB4Mj0iNSIgeTI9IjQ3LjI1IiBpZD0iUGF0aC00IiBzdHJva2U9IiM3RDgzODkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iMiw0Ij48L2xpbmU+ICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiM4RjhEOEQiIGN4PSI1IiBjeT0iNDUuMjUiIHI9IjUiPjwvY2lyY2xlPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
        }
    `;
}

export default solutionCard;
