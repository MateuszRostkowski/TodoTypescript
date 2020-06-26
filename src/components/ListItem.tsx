import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

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
  iconName = 'ios-arrow-forward',
  onIconPress = undefined,
  onPress = undefined,
}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      disabled={!onPress}>
      <Text>{title}</Text>
      <TouchableOpacity
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        disabled={!onIconPress}
        onPress={onIconPress}>
        <Ionicons name={iconName} size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
