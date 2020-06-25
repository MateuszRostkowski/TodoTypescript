import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useTitle = (title: Text) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? 'No title' : title,
    });
  }, [navigation, title]);
};
