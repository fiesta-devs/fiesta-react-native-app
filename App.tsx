import React, { useState, useEffect } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import {
  BarCodeScanner,
  BarCodeScannedCallback,
  BarCodeScannerResult,
} from "expo-barcode-scanner";
import Scanner from "./components/Scanner";
import { useTailwind } from "tailwind-rn";

export default function App(): JSX.Element {
  const tailwind = useTailwind();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("Not yet scanned");

  const askForCamPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCamPermission();
  }, []);

  const handleScan: BarCodeScannedCallback = (
    scanningResult: BarCodeScannerResult
  ) => {
    setScanned(true);
    setText(scanningResult.data);
    console.log(
      "Type: " + scanningResult.type + "\nData: " + scanningResult.data
    );
  };

  return (
    <SafeAreaView style={tailwind("h-full")}>
      <View style={tailwind("flex-1 bg-white items-center justify-center")}>
        {hasPermission === null && (
          <Text style={tailwind("text-base")}>
            Requesting for camera permission
          </Text>
        )}
        {hasPermission === false && (
          <View style={tailwind("p-4")}>
            <Text style={tailwind("text-base m-2")}>No access to camera</Text>
            <Button title={"Allow Camera"} onPress={askForCamPermission} />
          </View>
        )}
        {hasPermission && (
          <>
            <Scanner
              hasPermission={hasPermission}
              scanned={scanned}
              onScan={handleScan}
            />
            <Text style={tailwind("text-base m-5")}>{text}</Text>
            {scanned && (
              <Button
                title={"Scan again?"}
                onPress={() => setScanned(false)}
                color="tomato"
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
