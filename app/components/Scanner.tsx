import React from "react";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { Box } from "@gluestack-ui/themed";

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
        h={300}
        w={300}
        overflow="hidden"
        borderRadius="$lg"
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
