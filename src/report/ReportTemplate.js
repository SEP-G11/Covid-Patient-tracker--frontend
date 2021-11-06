import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import moment from "moment";

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 40
const COLN_WIDTH = (100 - COL1_WIDTH) / 3
//const COL2_WIDTH = (100 - COL1_WIDTH) / 2
const styles = StyleSheet.create({
    body: {
        padding: 10
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol1Header: {
        width: COL1_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeader: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol2Header: {
        width: "50%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol3Header: {
        width: "33.33%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol1: {
        width: COL1_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol2: {
        width: "50%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol3: {
        width: "33.33%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    },
    image: {
        height: 40,
        width: 40,

    },
    header: {
        marginBottom: 20,
        display: 'block',
        marginLeft: '27%',
        marginRight: 'auto',
        fontSize: 30
    },
    topV:{
        flexDirection: 'row'
    },
    dates: {
        textAlign: 'center'
    },
    tableLabelText: {
        fontSize: 15
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

export const ReportTemplate = ({districtData,countryData,countryDataFromDate,testsData,facilitiesData,date}) => (

    <Document>
        <Page style={styles.body}>
            <View style={styles.topV}>
                <Image source={'/national_emblem.png'}/>
                <Text style={styles.header}>MOH Report</Text>

            </View>
            <Text style={styles.dates}>From {moment(date).format("DD/MM/YYYY")} to {moment().format("DD/MM/YYYY")}</Text>
            <Text> </Text>
            <Text> </Text>
            <Text style={styles.tableLabelText}>Overall Country Data</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1Header}>
                        <Text style={styles.tableCellHeader}>Cases</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Active</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Recovered</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Deaths</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableCell}>{countryData.cases}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{countryData.active}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{countryData.recovered}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{countryData.deaths}</Text>
                    </View>
                </View>
            </View>
            <Text> </Text>
            <Text style={styles.tableLabelText}>Country Data from {moment(date).format("DD/MM/YYYY")} onwards</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol3Header}>
                        <Text style={styles.tableCellHeader}>Cases</Text>
                    </View>
                    <View style={styles.tableCol3Header}>
                        <Text style={styles.tableCellHeader}>Recovered</Text>
                    </View>
                    <View style={styles.tableCol3Header}>
                        <Text style={styles.tableCellHeader}>Deaths</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableCell}>{countryDataFromDate.cases}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableCell}>{countryDataFromDate.recovered}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableCell}>{countryDataFromDate.deaths}</Text>
                    </View>
                </View>
            </View>
            <Text> </Text>
            <Text style={styles.tableLabelText}>Overall District Data</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>District</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Cases</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Active</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Recovered</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Deaths</Text>
                    </View>
                </View>
                {Object.keys(districtData).map((el,idx)=> {
                    return(
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{districtData[el].cases}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{districtData[el].active}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{districtData[el].recovered}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{districtData[el].deaths}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <Text> </Text>
            <Text style={styles.tableLabelText}>Tests Data from {moment(date).format("DD/MM/YYYY")} onwards</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol2Header}>
                        <Text style={styles.tableCellHeader}>PCR</Text>
                    </View>
                    <View style={styles.tableCol2Header}>
                        <Text style={styles.tableCellHeader}>RAT</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableCell}>{testsData.pcr}</Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableCell}>{testsData.rat}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
        <Page style={styles.body}>
            <Text> </Text>
            <Text style={styles.tableLabelText}>Overall Hospital Data</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1Header}>
                        <Text style={styles.tableCellHeader}>Hospital</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Active</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Recovered</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Deaths</Text>
                    </View>
                </View>
                {Object.keys(facilitiesData).map((el,idx)=> {
                    return(
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text style={styles.tableCell}>{facilitiesData[el].name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{facilitiesData[el].active}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{facilitiesData[el].recovered}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{facilitiesData[el].deaths}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>

    </Document>
);