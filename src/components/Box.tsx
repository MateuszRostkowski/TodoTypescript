import React, { FC } from 'react';
import { View } from 'react-native';

export const Box: FC = ({ children, ...rest }) => {
  return <View {...rest}>{children}</View>;
};
