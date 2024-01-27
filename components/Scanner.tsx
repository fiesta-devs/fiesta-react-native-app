import React from "react";
import { View, SafeAreaView } from "react-native";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { useTailwind } from "tailwind-rn";

type ScannerProps = {
  hasPermission: boolean | null;
  scanned: boolean;
  onScan: BarCodeScannedCallback;
};

function Scanner({ hasPermission, scanned, onScan }: ScannerProps) {
  const tailwind = useTailwind();

  if (hasPermission === null || hasPermission === false) {
    return null;
  }

  return (
    <SafeAreaView style={tailwind("h-full")}>
      <View style={tailwind("flex-1 items-center justify-center")}>
        <View
          style={tailwind(
            "bg-tomato items-center justify-center h-75 w-75 overflow-hidden rounded-lg"
          )}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : onScan}
            style={{ height: 300, width: 300 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Scanner;
