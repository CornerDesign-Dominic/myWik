import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/**
 * A native Modal has its own window. Measure that window instead of reusing the
 * application's insets (which can differ for page sheets and system navigation).
 * Keep OS insets outside the content gutter, so they are applied exactly once.
 */
export function ModalLayout({ children, backgroundColor, keyboardAvoiding = false, align = 'fill', padding = 0 }: {
  children: React.ReactNode;
  backgroundColor: string;
  keyboardAvoiding?: boolean;
  align?: 'fill' | 'bottom' | 'center';
  padding?: number;
}) {
  return <SafeAreaProvider style={[styles.fill, { backgroundColor }]}>
    <KeyboardAvoidingView behavior={keyboardAvoiding && Platform.OS === 'ios' ? 'padding' : undefined} style={styles.fill}>
      <SafeAreaView testID="modal-safe-area" edges={['top', 'right', 'bottom', 'left']} style={styles.fill}>
        <View testID="modal-safe-content" style={[styles.fill, { padding }, align !== 'fill' && { alignItems: 'center', justifyContent: align === 'bottom' ? 'flex-end' : 'center' }]}>
          {children}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </SafeAreaProvider>;
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
