import R from '@components/utils/R';
import React, {useRef, useState, useEffect} from 'react';
import {View, Pressable, TextInput, StyleSheet} from 'react-native';
import Text from './Text';
import {OTPPropsType} from '@components/constants/types';

const OTPInput = (props: OTPPropsType) => {
  const {
    code,
    setCode,
    maximumLength,
    setIsPinReady,
    inputStyles,
    textVariant = 'h1',
  } = props;

  const boxArray = new Array(maximumLength).fill(0);
  // ?? WHENEVER YOU DECALRE ARRAY WITH NEW ARRAY SYNTAX IT WILL USE TYPE OF ANY PREDEFINE TYPE IS ANY
  const inputRef: any = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    setIsPinReady(code.length === maximumLength);
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  const boxDigit = (_: any, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;
    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        key={index}
        style={[
          isInputBoxFocused && isValueFocused
            ? styles.splitBoxesFocused
            : styles.splitBoxes,
          inputStyles,
        ]}>
        <Text
          color={R.color.primaryColor1}
          variant={textVariant}
          align={'center'}
          font={'PoppinsMedium'}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.otpInputContainer}>
      <Pressable onPress={handleOnPress} style={styles.splitOTPBoxesContainer}>
        {boxArray.map(boxDigit)}
      </Pressable>

      <TextInput
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        keyboardType={'number-pad'}
        ref={inputRef}
        style={styles.textInputHidden}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  otpInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputHidden: {
    position: 'absolute',
    opacity: 0,
  },
  splitOTPBoxesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingRight: R.unit.scale(10),
    paddingVertical: R.unit.scale(50),
  },
  splitBoxes: {
    borderColor: R.color.gray4,
    borderBottomWidth: R.unit.scale(2),
    borderRadius: R.unit.scale(5),
    padding: R.unit.scale(12),
    paddingBottom: R.unit.scale(5),
    minWidth: R.unit.scale(50),
  },
  splitBoxesFocused: {
    borderColor: R.color.primaryColor1,
    borderBottomWidth: R.unit.scale(2),
    borderRadius: R.unit.scale(5),
    padding: R.unit.scale(12),
    paddingBottom: R.unit.scale(5),
    minWidth: R.unit.scale(50),
  },
});
