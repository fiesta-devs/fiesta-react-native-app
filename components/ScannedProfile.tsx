import React from "react";
import { View, SafeAreaView, Image } from "react-native";
const pic = require("../assets/mockProfile.png");

export default function ScannedProfile() {
  return (
    <SafeAreaView>
        <View>
          <Image
            source={pic}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
    </SafeAreaView>
  );
}
