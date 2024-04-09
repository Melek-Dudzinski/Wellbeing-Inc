'use client';
import {Page, Text, Document, StyleSheet, View} from '@react-pdf/renderer';
import React from "react";

export default function PlanPDF(plan, meals, activities){
    const dow = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const styles = StyleSheet.create({
        
    })

    return(
        <Document>
            {
             
            <Page>
                <View>
                    <Text>{plan.name}</Text>
                    <Text>{plan.difficulty}</Text>
                </View>
                <View>
                    {dow.map((day,i)=>(
                                    <tr key={day}>
                                        <td>{day.toUpperCase()}</td>
                                        <td>{meals[i][0]&&meals[i][0].FoodName}</td>
                                        <td>{meals[i][1]&&meals[i][1].FoodName}</td>
                                        <td>{meals[i][2]&&meals[i][2].FoodName}</td>
                                        <td>{meals[i][3]&&meals[i][3].FoodName}</td>
                                        <td>{activities[i].type} - {activities[i].duration} minutes</td>
                                    </tr>
                            ))}
                </View>
            </Page>
            }

            
        </Document>
        
    );
}