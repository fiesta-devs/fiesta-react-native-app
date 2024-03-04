import { Box, Icon, Input, InputField, SearchIcon } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";

export default function Search({ searchQuery, setSearchQuery }) {
  return (
    <Box style={styles.queryBoxStyles}>
      <Input variant="rounded" size="md" style={styles.searchInputBoxStyles}>
        <Icon style={styles.searchIconStyles} as={SearchIcon} />
        <InputField
          style={styles.inputTextStyle}
          placeholder="Search by event, organization, school or description"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </Input>
    </Box>
  );
}

const styles = StyleSheet.create({
  queryBoxStyles: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  searchInputBoxStyles: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  searchIconStyles: {
    marginLeft: 16,
  },
  inputTextStyle: {
    fontSize: 14,
    marginLeft: -8,
  },
});
