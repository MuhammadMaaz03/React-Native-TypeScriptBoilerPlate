import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import R from '@components/utils/R';
import {FormScrollContainerPropsType} from '@components/constants/types';

function FormScrollContainer(props: FormScrollContainerPropsType) {
  const {
    contentContainerStyles,
    containerStyles,
    children,
    keyboardShouldPersistTaps = 'always',
    paddingBottom = 80,
    extraScrollHeight = 0,
  } = props;

  return (
    <KeyboardAwareScrollView
      style={[R.styles.container, styles.mainLayout, containerStyles]}
      showsVerticalScrollIndicator={false}
      extraScrollHeight={extraScrollHeight}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      contentContainerStyle={[
        styles.contentContainer,
        contentContainerStyles,
        {paddingBottom: R.unit.scale(paddingBottom)},
      ]}>
      {children}
    </KeyboardAwareScrollView>
  );
}
export default FormScrollContainer;

const styles = StyleSheet.create({
  mainLayout: {
    height: R.unit.height(1),
    width: R.unit.width(1),
  },
  contentContainer: {
    flexGrow: 1,
  },
});
