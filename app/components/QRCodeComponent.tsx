import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeComponent({ value, size }) {
  return (
    <Box style={styles.container}>
      <QRCode value={value} size={size} />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
