import React from 'react';
import {
  Text,
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
  ColorValue,
} from 'react-native';
import {Colors} from '@/theme/colors';
// import { useScaling } from '@/Hooks/useScaling';

export type FontWeight =
  | '100' // Thin
  | '200' // ExtraLight
  | '300' // Light
  | '400' // Regular
  | '500' // Medium
  | '600' // SemiBold
  | '700' // Bold
  | '800' // ExtraBold
  | '900'; // Black

export type TypographyProps = TextProps & {
  size?: number;
  weight?: FontWeight;
  italic?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  color?: ColorValue;
  children?: string | Element | Element[] | React.ReactNode | React.ReactNode[];
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
  testingSuffix?: string;
};

export const Typography = ({
  size = 14,
  weight = '400',
  italic = false,
  uppercase,
  capitalize,
  children,
  color = Colors.light.Black,
  style = {},
  testingSuffix,
  ...restNativeProps
}: TypographyProps) => {
  //   const {scaleHorizontal} = useScaling();

  const getFontFamily = () => {
    // prettier-ignore
    switch (weight) {
      case '200': return `PlusJakartaSans-ExtraLight${italic ? 'Italic' : ''}`;
      case '300': return `PlusJakartaSans-Light${italic ? 'Italic' : ''}`;
      case '400': return italic ? 'PlusJakartaSans-Italic' : 'PlusJakartaSans-Regular';
      case '500': return `PlusJakartaSans-Medium${italic ? 'Italic' : ''}`;
      case '600': return `PlusJakartaSans-SemiBold${italic ? 'Italic' : ''}`;
      case '700': return `PlusJakartaSans-Bold${italic ? 'Italic' : ''}`;
      case '800': return `PlusJakartaSans-ExtraBold${italic ? 'Italic' : ''}`;
      default: return 'PlusJakartaSans-Regular';
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: size,
          lineHeight: size * 1.2 + 4,
          fontFamily: getFontFamily(),
        },
        uppercase && styles.uppercase,
        capitalize && styles.capitalize,
        !!color && {color},
        style,
      ]}
      {...restNativeProps}
      testID={testingSuffix}
      accessibilityLabel={testingSuffix}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});
