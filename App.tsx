// App.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback, BarCodeScannerResult } from 'expo-barcode-scanner';
import Scanner from './components/Scanner'; // Adjust the path as necessary

export default function App() {
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

  const handleScan: BarCodeScannedCallback = (scanningResult: BarCodeScannerResult) => {
    setScanned(true);
    setText(scanningResult.data);
    console.log('Type: ' + scanningResult.type + '\nData: ' + scanningResult.data);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null && <Text>Requesting for camera permission</Text>}
      {hasPermission === false && (
        <View>
          <Text style={{ margin: 10 }}>No access to camera</Text>
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
          <Text style={styles.mainText}>{text}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
});
