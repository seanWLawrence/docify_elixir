import { css, SerializedStyles } from '@emotion/core';
import theme, { TABLET_WIDTH, DESKTOP_WIDTH, RETINA_WIDTH } from 'utils/theme';

export let px = (num: number): string => `${num}px`;
export let em = (num: number): string => `${num}em`;
export let rem = (num: number): string => `${num}rem`;
export let percent = (num: number): string => `${num}%`;

export let underlineOnHover = () => css`
  &:hover {
    transition: all ease-in 0.5s;
    color: ${theme.color.medium};
    border-bottom: ${theme.gap} solid ${theme.color.primary};
  }
`;

type FlexboxAlignment =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-around'
  | 'space-between';

interface Flexbox {
  direction?: 'row' | 'column';
  justify?: FlexboxAlignment;
  align?: FlexboxAlignment;
  wrap?: 'no-wrap' | 'wrap';
}
export let flexbox = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start',
  wrap = 'no-wrap',
}: Flexbox): SerializedStyles =>
  css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    flex-wrap: ${wrap};
  `;

type MediaType = 'MOBILE' | 'TABLET' | 'DESKTOP' | 'RETINA';

let media = (mediaType: MediaType) => (styles: string) => {
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
