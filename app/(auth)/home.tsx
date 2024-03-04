import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ArrowRightIcon,
  Box,
  Icon,
  Text,
  Input,
  InputField,
  SearchIcon,
  SafeAreaView,
  ScrollView,
} from "@gluestack-ui/themed";
import { useTabsContext } from "../context/TabsContext";

const sampleInvites = [
  {
    name: "Club Soccer Match",
    description:
      "Join us for an exciting soccer match between our club's teams. Open to all members!",
    date: "03-15-2024",
    organization: "Alpha Epsilon Pi",
    orgAcronym: "AEPi",
    school: "University of Florida",
    schoolAcronym: "UF",
    live: false,
  },
  {
    name: "Tennis Tournament",
    description:
      "Compete in our annual tennis tournament and show off your skills on the court.",
    date: "04-05-2024",
    organization: "Beta Theta Pi",
    orgAcronym: "Beta",
    school: "University of California, Berkeley",
    schoolAcronym: "UCB",
    live: false,
  },
  {
    name: "Yoga in the Park",
    description:
      "Relax and unwind with a morning yoga session in the park. Suitable for all levels.",
    date: "04-20-2024",
    organization: "Delta Tau Delta",
    orgAcronym: "DTD",
    school: "University of Texas at Austin",
    schoolAcronym: "UT",
    live: false,
  },
  {
    name: "Club BBQ",
    description:
      "Enjoy delicious food and great company at our club's annual BBQ event.",
    date: "05-10-2024",
    organization: "Sigma Chi",
    orgAcronym: "Sig Chi",
    school: "University of Michigan",
    schoolAcronym: "UMich",
    live: true,
  },
  {
    name: "Swim Meet",
    description:
      "Cheer on our swimmers as they compete in various swimming events.",
    date: "06-01-2024",
    organization: "Kappa Sigma",
    orgAcronym: "Kappa Sig",
    school: "Florida State University",
    schoolAcronym: "FSU",
    live: false,
  },
  {
    name: "Golf Outing",
    description:
      "Tee off with fellow club members at our golf outing event. All skill levels welcome.",
    date: "06-15-2024",
    organization: "Phi Delta Theta",
    orgAcronym: "Phi Delt",
    school: "University of Georgia",
    schoolAcronym: "UGA",
    live: false,
  },
  {
    name: "Charity Run",
    description:
      "Participate in a charity run to support a good cause. Choose from different distances.",
    date: "07-05-2024",
    organization: "Sigma Alpha Epsilon",
    orgAcronym: "SAE",
    school: "University of Southern California",
    schoolAcronym: "USC",
    live: false,
  },
  {
    name: "Club Picnic",
    description:
      "Join us for a fun-filled day of games, food, and relaxation at our club picnic.",
    date: "07-20-2024",
    organization: "Alpha Tau Omega",
    orgAcronym: "ATO",
    school: "University of Alabama",
    schoolAcronym: "UA",
    live: false,
  },
  {
    name: "Dance Party",
    description:
      "Dance the night away at our club's dance party event. Music, lights, and fun guaranteed!",
    date: "08-10-2024",
    organization: "Lambda Chi Alpha",
    orgAcronym: "Lambda Chi",
    school: "University of Illinois at Urbana-Champaign",
    schoolAcronym: "UIUC",
    live: false,
  },
  {
    name: "Hiking Adventure",
    description:
      "Embark on a scenic hiking adventure with fellow club members. Explore nature and enjoy breathtaking views. We can't wait to see you here please come ready to party!",
    date: "08-25-2024",
    organization: "Pi Kappa Alpha",
    orgAcronym: "Pike",
    school: "University of South Carolina",
    schoolAcronym: "USC",
    live: false,
  },
];

export default function Home() {
  //const { invites } = useTabsContext();
  const [searchQuery, setSearchQuery] = useState("");

  const invites = sampleInvites
    .filter(
      (invite) =>
        invite.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.orgAcronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.schoolAcronym
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invite.school.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.live && !b.live) return -1;
      if (!a.live && b.live) return 1;
      if (searchQuery === "") {
        //move this logic to backend asap
        //return (once we pull the data in the order we want it to show by default)
        return Date.parse(a.date) - Date.parse(b.date);
      }
      if (a.name.toLowerCase().includes(searchQuery.toLowerCase())) return -1;
      if (b.name.toLowerCase().includes(searchQuery.toLowerCase())) return 1;
      if (a.orgAcronym.toLowerCase().includes(searchQuery.toLowerCase()))
        return -1;
      if (b.orgAcronym.toLowerCase().includes(searchQuery.toLowerCase()))
        return 1;
      if (a.organization.toLowerCase().includes(searchQuery.toLowerCase()))
        return -1;
      if (b.organization.toLowerCase().includes(searchQuery.toLowerCase()))
        return 1;
      if (a.schoolAcronym.toLowerCase().includes(searchQuery.toLowerCase()))
        return -1;
      if (b.schoolAcronym.toLowerCase().includes(searchQuery.toLowerCase()))
        return 1;
      if (a.school.toLowerCase().includes(searchQuery.toLowerCase())) return -1;
      if (b.school.toLowerCase().includes(searchQuery.toLowerCase())) return 1;
      return 0;
    });

  if (invites?.length > 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
        <Box style={styles.pageTitleBox}>
          <Text style={styles.pageTitle}>
            Fiesta • Johns Hopkins University
          </Text>
        </Box>
        {/*<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />*/}
        <ScrollView style={styles.scrollView}>
          {invites.map((invite, index) => {
            return (
              <Box
                key={index}
                style={invite.live ? styles.liveEventCard : styles.eventCard}
              >
                <Text style={styles.eventDate}>{invite.date}</Text>
                <Icon style={styles.arrowIconStyles} as={ArrowRightIcon} />
                <Box style={styles.eventTitleBox}>
                  <Text
                    style={
                      invite.live ? styles.liveEventTitle : styles.eventTitle
                    }
                  >
                    🎉 {invite.orgAcronym} • {invite.schoolAcronym}
                  </Text>
                </Box>
                <Box
                  style={{
                    height: 1,
                    backgroundColor: "#eeeeee",
                    marginVertical: 5,
                  }}
                />
                <Box style={styles.eventDescriptionBox}>
                  <Text style={styles.eventEventTitle}>{invite.name}</Text>
                  <Text
                    style={styles.eventDescription}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {invite.description}
                  </Text>
                </Box>
                <Box
                  style={{
                    height: 1,
                    backgroundColor: "#eeeeee",
                    marginTop: 5,
                  }}
                />
                <Box style={styles.footerBox}>
                  <Text style={styles.footer}>View More</Text>
                </Box>
              </Box>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
        <Box style={styles.pageTitleBox}>
          <Text style={styles.pageTitle}>
            Fiesta • Johns Hopkins University
          </Text>
        </Box>
        {/*<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />*/}
        <Box style={styles.centeredBox}>
          <Text>{"No invites :("}</Text>
        </Box>
      </SafeAreaView>
    );
  }
}

function Search({ searchQuery, setSearchQuery }) {
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
  scrollView: {
    backgroundColor: "#eeeeee",
  },
  pageTitleBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
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
  eventCard: {
    padding: 16,
    margin: 16,
    marginTop: 0,
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  liveEventCard: {
    padding: 16,
    margin: 16,
    marginTop: 0,
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 20,
    justifyContent: "center",
    borderColor: "#FF025Bcc",
    borderWidth: 2,
  },
  eventTitleBox: {
    padding: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF025Bcc",
  },
  liveEventTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF025Bcc",
  },
  eventDate: {
    fontSize: 14,
    color: "#999999",
    position: "absolute",
    right: 24,
    top: 24,
  },
  eventDescriptionBox: {
    padding: 8,
  },
  eventEventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 8,
  },
  eventDescription: {
    fontSize: 16,
    color: "#999999",
    overflow: "hidden",
    paddingVertical: 8,
    fontWeight: "400",
  },
  footerBox: {
    padding: 8,
  },
  footer: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },
  arrowIconStyles: {
    bottom: 24,
    right: 24,
    position: "absolute",
  },
  centeredBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
