import React from 'react';
import { Image, View, type ImageStyle, type StyleProp } from 'react-native';

type MascotImageProps = { style?: StyleProp<ImageStyle>; accessibilityLabel?: string };

/** Decorative beside a MeiWik label; provide a label only when shown alone. */
export function MeiWikAvatar({ size = 32, style, accessibilityLabel }: MascotImageProps & { size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}><Image source={require('../../assets/meiwik-avatar.png')} resizeMode="contain" fadeDuration={0} accessible={!!accessibilityLabel} accessibilityLabel={accessibilityLabel} accessibilityIgnoresInvertColors style={[{ width: size, height: size, borderRadius: size / 2 }, style]} /></View>;
}

/** Keep the entire character visible on both light and dark surfaces. */
export function MeiWikCharacter({ height = 126, style, accessibilityLabel }: MascotImageProps & { height?: number }) {
  return <Image source={require('../../assets/meiwik-character.png')} resizeMode="contain" fadeDuration={0} accessible={!!accessibilityLabel} accessibilityLabel={accessibilityLabel} accessibilityIgnoresInvertColors style={[{ width: height, height }, style]} />;
}
