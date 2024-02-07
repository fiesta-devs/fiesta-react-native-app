import React from "react";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { Box } from "native-base";

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
    <Box alignItems="center" justifyContent="center">
      <Box
        bg="tomato"
        alignItems="center"
        justifyContent="center"
        height="300px"
        width="300px"
        overflow="hidden"
        borderRadius="lg"
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onScan}
          style={{ height: 300, width: 300 }}
        />
      </Box>
    </Box>
  );
}

export default Scanner;
