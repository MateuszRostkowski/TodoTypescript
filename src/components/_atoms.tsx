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
  size,
  SizeProps,
} from 'styled-system';

type BoxProps = FC &
  ColorProps &
  SpaceProps &
  FlexProps &
  BorderProps &
  PositionProps &
  LayoutProps &
  SizeProps;

const common = [space, flexbox, border, color, position, layout, size];

export const Box = styled.View<BoxProps>`
  ${common}
`;

export const Touchable = styled.TouchableOpacity<BoxProps>`
  ${common}
`;

export const Text = styled.Text<BoxProps>`
  ${common}
`;
