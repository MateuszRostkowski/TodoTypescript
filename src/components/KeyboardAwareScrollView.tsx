import React from 'react';
import {
  KeyboardAwareScrollView as KeyboardAware,
  KeyboardAwareProps,
} from 'react-native-keyboard-aware-scroll-view';
import { Platform, ScrollViewProps } from 'react-native';

const keyboardDismissMode =
  Platform.OS === 'android' ? 'on-drag' : 'interactive';

export const KeyboardAwareScrollView: React.FC<
  KeyboardAwareProps | ScrollViewProps
> = (props) => {
  return (
    <KeyboardAware
      contentContainerStyle={{ flexGrow: 1 }}
      enableResetScrollToCoords={false}
      enableAutomaticScroll
      keyboardShouldPersistTaps={'handled'}
      keyboardDismissMode={keyboardDismissMode}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
      {...props}
    />
  );
};
