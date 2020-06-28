import React, { FC } from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from './_atoms';

interface ListItemProps {
  title: string;
  iconName: 'md-trash' | 'ios-arrow-forward';
  onPress?: (() => void) | ((event: GestureResponderEvent) => void) | undefined;
  onIconPress?:
    | (() => void)
    | ((event: GestureResponderEvent) => void)
    | undefined;
}

export const ListItem: FC<ListItemProps> = ({
  title,
  iconName,
  onIconPress = undefined,
  onPress = undefined,
}) => {
  return (
    <Touchable
      p={10}
      bg="white"
      flexDirection="row"
      justifyContent="space-between"
      onPress={onPress}
      disabled={!onPress}>
      <Text>{title}</Text>
      {iconName && (
        <TouchableOpacity
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          disabled={!onIconPress}
          onPress={onIconPress}>
          <Ionicons name={iconName} size={20} />
        </TouchableOpacity>
      )}
    </Touchable>
  );
};
