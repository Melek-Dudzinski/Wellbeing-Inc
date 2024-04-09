'use client';
import {Page, Text, Document, StyleSheet, View} from '@react-pdf/renderer';
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table'; //add tables
import React from "react";

export default function PlanPDF({plan, meals, activities,dow}){
    const styles = StyleSheet.create({
        FirstPageView: {
            backgroundColor:'#313038',
            margin:10,
            borderRadius: 5,
            padding:4,
            color:'#ededed',
            textAlign:'center'
        },
        planTitle:{
            fontSize:32,
        },
        planDesc:{
            fontSize:12
        },
        Table:{
            margin:1,
        },
        Row:{
            fontSize:12,
        },
        THeaders:{
            fontSize:17,
        },
        Break:{
            margin:20,
            fontSize:50
        }
    })

    return(
        <Document>
            {console.log(plan)}
             
            <Page>
                <View style={{justifyContent:'center'}}>
                    <View style={styles.FirstPageView}>
                        <Text style={styles.planTitle}>{plan.name}</Text>
                        <Text>{plan.difficulty}</Text>
                        <Text>{'\n'}</Text>
                        <Text style={styles.planDesc}>{plan.description}</Text>
                    </View>
                    <Text style={styles.Break}>{'\n'}</Text>
                    <Table style={styles.Table} tdStyle={{padding: '3px'}}>
                        <TH style={styles.THeaders}>
                                <TD style={{marginLeft:'4px'}}>DAY</TD>
                                <TD>BREAKFAST</TD>
                                <TD>LUNCH</TD>
                                <TD>DINNER</TD>
                                <TD>SNACK</TD>
                                <TD style={{marginRight:'4px'}}>EXERCISE</TD>
                        </TH>
                        {
                        dow.map((day,i)=>(
                                        <TR key={day} style={styles.Row}>
                                            <TD style={{marginLeft:'4px',fontSize:17}}>{day.toUpperCase()}</TD>
                                            <TD style={styles.Row}>{meals[i][0]&&meals[i][0].FoodName}</TD>
                                            <TD style={styles.Row}>{meals[i][1]&&meals[i][1].FoodName}</TD>
                                            <TD style={styles.Row}>{meals[i][2]&&meals[i][2].FoodName}</TD>
                                            <TD style={styles.Row}>{meals[i][3]&&meals[i][3].FoodName}</TD>
                                            <TD style={{marginRight:'4px',fontSize:12}}>{activities[i].type +' - '+ activities[i].duration+ ' minutes'}</TD>
                                        </TR>
                                ))
                        }
                    </Table>
                </View>
            </Page>
        </Document>
        
    );
}