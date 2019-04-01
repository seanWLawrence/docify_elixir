import { css } from '@emotion/core';
import { pipe, split, getOr } from 'lodash/fp';
import { color, space, media, font } from '@theme';
import { concat } from 'apollo-link';

let px = num => `${num}px`;
let em = num => `${num}em`;
let rem = num => `${num}rem`;
let percent = num => `${num}%`;

let stripUnit = matchedUnit => {
  let { 0: unitType, input: unitValue } = matchedUnit;

  return pipe(
    split(unitType),
    head
  )(unitValue);
};

let multiplyNum = pipe(
  stripUnit,
  multiply(multiplyBy)
);

let multiplyWithUnit = ({ 0: unitType, input: unitValue }) => {
  let { 0: unitType, input: unitValue } = matchedUnit;

  return pipe(
    multiplyNum,
    concat(
      pipe(
        split(unitType),
        tail
      )(unitValue)
    )
  )(matchedUnit);
};

let multiply = (value, multiplyBy) => {
  let matchUnitRegEx = /(rem|%|[^r]em|px)/;
  let matchedUnit = value.match(matchUnitRegEx);

  if (matchedUnit === null) {
    throw new Error('Unit type does not match "em", "rem", "%" or "px"');
  }

  return multiplyWithUnit(matchedUnit);
};

export let underlineOnHover = () => css`
  &:hover {
    transition: all ease-in 0.5s;
    color: ${theme.color.medium};
    border-bottom: ${theme.gap} solid ${theme.color.primary};
  }
`;

export let flexbox = ({
  direction,
  justify = 'flex-start',
  align = 'flex-start',
  wrap = 'no-wrap',
}) =>
  css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    flex-wrap: ${wrap};
  `;

let media = mediaType => styles => {
  switch (mediaType) {
    case 'MOBILE':
      return css`
        @media (max-width: ${px(TABLET_WIDTH - 1)}) {
          ${styles}
        }
      `;

    case 'TABLET':
      return css`
        @media (min-width: ${px(TABLET_WIDTH)}) and (max-width: ${px(
            DESKTOP_WIDTH - 1
          )}) {
          ${styles}
        }
      `;

    case 'DESKTOP':
      return css`
        @media (min-width: ${px(DESKTOP_WIDTH)}) and (max-width: ${px(
            RETINA_WIDTH - 1
          )}) {
          ${styles}
        }
      `;

    case 'RETINA':
      return css`
        @media (min-width: ${px(RETINA_WIDTH)}) {
          ${styles}
        }
      `;
  }
};

export let mobile = media('MOBILE');
export let tablet = media('TABLET');
export let desktop = media('DESKTOP');
export let retina = media('RETINA');

export let padding = gapNum =>
  css`
    ${mobile(`
      padding: ${gapNum * 0.5 * BASE_GAP};
    `)}

    ${tablet(`
      padding: ${gapNum * 0.6 * BASE_GAP};
    `)}

    ${desktop(`
      padding: ${gapNum * 0.7 * BASE_GAP};
    `)}

    ${retina(`
      padding: ${gapNum * BASE_GAP};
    `)}
  `;
