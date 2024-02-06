"use client"
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import { useState, useEffect } from "react"

//Font.register( {family: "Inter", src: "/assets/font.otf"})

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,

    //  fontFamily: "Inter"
  },
})

const PDF = () => {
  // Define styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    duration: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: "center",
    },
    question: {
      fontSize: 12,
      marginBottom: 5,
    },
  })
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Sample Exam Paper</Text>
          <Text style={styles.duration}>Duration: 2 hours</Text>
        </View>
        <View>
          <Text style={styles.question}>
            1. Explain the concept of React components. (10 marks)
          </Text>
          <Text style={styles.question}>
            2. What is JSX in React? Provide an example. (8 marks)
          </Text>
          <Text style={styles.question}>
            3. Discuss the importance of state management in React applications.
            (12 marks)
          </Text>
          <Text style={styles.question}>
            4. Explain the difference between props and state in React. (6
            marks)
          </Text>
          <Text style={styles.question}>
            5. Describe the component nnnnnnnnnn lifecycle methods in React. (10
            marks)
          </Text>
        </View>
      </Page>
    </Document>
  )
}
const PDFView = () => {
  const [client, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <PDF />
    </PDFViewer>
  )
}

export default PDFView
