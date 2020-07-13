import styled from 'styled-components/native';
import { FC } from 'react';

import {
  space,
  SpaceProps,
  flexbox,
  FlexProps,
  border,
  BorderProps,
  color,
  ColorProps,
  position,
  PositionProps,
  layout,
  LayoutProps,
  AlignItemsProps,
  justifyContent,
  width,
  WidthProps,
  size,
  SizeProps,
} from 'styled-system';

type BoxProps = FC &
  WidthProps &
  AlignItemsProps &
  ColorProps &
  SpaceProps &
  FlexProps &
  BorderProps &
  PositionProps &
  LayoutProps &
  SizeProps;

const common = [
  space,
  flexbox,
  border,
  color,
  position,
  layout,
  size,
  width,
  justifyContent,
];

export const Box = styled.View<BoxProps>`
  ${common}
`;

export const Touchable = styled.TouchableOpacity<BoxProps>`
  ${common}
`;

export const Text = styled.Text<BoxProps>`
  ${common}
`;
