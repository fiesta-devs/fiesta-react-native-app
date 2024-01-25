// Scanner.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback, BarCodeScannerResult } from 'expo-barcode-scanner';

// Define a type for the props
type ScannerProps = {
  hasPermission: boolean | null;
  scanned: boolean;
  onScan: BarCodeScannedCallback;
};

function Scanner({ hasPermission, scanned, onScan }: ScannerProps) {  
  if (hasPermission === null || hasPermission === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onScan}
          style={{ height: 400, width: 400 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeBox: {
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },
});

export default Scanner;
