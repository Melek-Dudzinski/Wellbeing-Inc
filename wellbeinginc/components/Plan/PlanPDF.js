'use client';
import {Page, Text, Document, StyleSheet, View} from '@react-pdf/renderer'; //react pdf components for rendering the pdf
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table'; //add tables
import React from "react";

export default function PlanPDF({plan, meals, activities,dow}){
    //styling
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
            textAlign:'center'
        },
        planDesc:{
            fontSize:12
        },
        Table:{
            margin:1,
            fontSize:12,
        },
        THeaders:{
            color:'white',
            backgroundColor:'#17B169',
            borderColor:'white',
            padding:'3px'
        },
        Column:{
            padding: '3px'
        },
        Break:{
            margin:20,
            fontSize:50
        }
    })

    //document with the react pdf components
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
                    <Table style={styles.Table} tdStyle={styles.Column}>
                        <TH>
                                <TD style={{marginLeft:'4px',color:'white',backgroundColor:'#17B169',borderColor:'white',padding:'3px'}}>DAY</TD>
                                <TD style={styles.THeaders}>BREAKFAST</TD>
                                <TD style={styles.THeaders}>LUNCH</TD>
                                <TD style={styles.THeaders}>DINNER</TD>
                                <TD style={styles.THeaders}>SNACK</TD>
                                <TD style={{marginRight:'4px',color:'white',backgroundColor:'#17B169',borderColor:'white',padding:'3px'}}>EXERCISE</TD>
                        </TH>
                        {
                        dow.map((day,i)=>(
                                        <TR key={day}>
                                            <TD style={{marginLeft:'4px',color:'white',backgroundColor:'#17B169',borderColor:'white'}}>{day.toUpperCase()}</TD>
                                            <TD >{meals[i][0]&&meals[i][0].FoodName}</TD>
                                            <TD >{meals[i][1]&&meals[i][1].FoodName}</TD>
                                            <TD >{meals[i][2]&&meals[i][2].FoodName}</TD>
                                            <TD >{meals[i][3]&&meals[i][3].FoodName}</TD>
                                            <TD style={{marginRight:'4px'}}>{activities[i].type +' - '+ activities[i].duration+ ' minutes'}</TD>
                                        </TR>
                                ))
                        }
                    </Table>
                </View>
            </Page>
        </Document>
        
    );
}