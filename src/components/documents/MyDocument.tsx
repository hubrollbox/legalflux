import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
  },
});

const MyDocument = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;