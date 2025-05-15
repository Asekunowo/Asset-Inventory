import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./movementstyle";
import sterling from "../../assets/sterling-logo.png";
import { movementData } from "@/utils/types";

interface data {
  data: movementData;
}

const Form = ({ data }: data) => (
  <Document>
    <Page size={"A4"} style={styles.page}>
      <Image src={sterling} style={styles.image}></Image>
      <View>
        <Text style={styles.header}>
          IT Equipment Allocation/Relocation Form
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Model/ Manufacturer: {data.type}</Text>
        <Text style={styles.title}>S/N: {data.serial_no}</Text>
        <Text style={styles.title}>Asset tag: {data.tag}</Text>
      </View>
      <View style={[styles.flex, styles.section]}>
        <View style={[styles.aside]}>
          <Text style={[styles.text]}>Move from Current Location:</Text>
          <Text style={[styles.text]}>(Branch/Unit/Floor/Room):</Text>
          <Text style={styles.dataText}>{data.from_location}</Text>
        </View>
        <View>
          <Text style={[styles.to, styles.textBold]}>TO:</Text>
          <Text style={styles.dataText}>{data.to_location}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Reason for Allocation/Relocation</Text>
        <Text style={styles.dataText}>{data.reason} </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Old Custodian (Name/Branch/Sign)</Text>
        <Text style={styles.dataText}>
          {data.custodian!.firstname + " " + data.custodian!.lastname}
        </Text>
      </View>
      <View style={styles.largesection}>
        <View style={styles.bottom}>
          <Text style={[styles.text, styles.textBold]}>
            Recipient (Name, Signature & Date) :
          </Text>
          <Text style={styles.dataText}>{data.recipient}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.text, styles.textBold]}>
            Authorized by (Name, Signature & Date)
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.text, styles.textBold]}>
            12th Floor Security (Name, Signature & Date)
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.text, styles.textBold]}>
            Security Unit (Name, Signature & Date)
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textBold, styles.center]}>
          A copy of the final approved document MUST be returned to Technology.
        </Text>
      </View>
    </Page>
  </Document>
);

export default Form;
