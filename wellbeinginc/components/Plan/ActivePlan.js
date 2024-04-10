'use client';
import './PlanPlan.css'; 
import SupabaseClient from '../Supabase';
import { useEffect, useState} from 'react';
import {pdf} from "@react-pdf/renderer";
import PlanPDF from './PlanPDF';
import Link from 'next/link';
import { saveAs } from 'file-saver';

export default function ActivePlan({user}) {
    //store data in maps so it's easy to access based on meal type and day
    const [activities, setActivities] = useState(null);
    const [meals,setMeals] = useState(null);
    const dow = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const mealTypes = ['Breakfast','Lunch','Dinner','Snack'];
    const [plan,setPlan] = useState(null);
    //get activities from db
    const getActivities = async (activitiesID) => {
        const {data, error} = await SupabaseClient()
        .from('testFitnessActivity')
        .select('ActivityID,type, duration')
        .in('ActivityID',activitiesID);
        if (error) 
            console.log('Error! There was an error fetching from testFitnessActivity!');
        else
        {
            let acti = []
            //get right order
            activitiesID.map(i=>{
                acti.push(data.filter((act)=>act.ActivityID==i)[0]);
            });
            setActivities(acti);
        }
    };
    
    //get the meals from db
    const getMenuMeals = async(menuID) => {
        const {data, error} = await SupabaseClient()
        .from('testMenuFood')
        .select(`MenuID, FoodName, MealType`)
        .in('MenuID', menuID);
        if (error)
            console.log('Error! There was an error fetching from testMenuFood!');
        else
            {
                let m = [[],[],[],[],[],[],[]];
                //get in right order - and order by mealtype
                menuID.map((i,ind)=>{
                    m[ind]=(
                        mealTypes.map(type=>
                            data.filter((meal)=>
                                (meal.MenuID==i&&meal.MealType==type))[0]));
                });
                setMeals(m);    
            }
    };

    //fetch plan data
    const getPlan = async(planID) => {
        const {data,error} = await SupabaseClient()
        .from('testPlanTemplate')
        .select(`planID, name, difficulty, description, testPlanMenu ( planID, menuID, day), testPlanActivity ( planID, activityID, day)`)
        .eq('planID',planID);
        if (error)
            console.log('Error! There was an error fetching from PlanTemplate!');
        else{
            console.log(data);
            setPlan(data[0]);
            //sort meals and activities by day
            let activitiesID = [];
            let menusID = [];
            if (data[0].testPlanActivity&&data[0].testPlanActivity)
                dow.map(day=>{
                    const m = data[0].testPlanMenu.filter((menu)=> menu.day==day)[0];
                    const a = data[0].testPlanActivity.filter((act)=> act.day==day)[0];
                    console.log(a)
                    menusID.push(m.menuID)
                    activitiesID.push(a.activityID);
                })
            getActivities(activitiesID);
            getMenuMeals(menusID);            
        }
    };

    //save pdf locally to download
    const downloadPDF = async() => {
        const blob = await pdf((
            <PlanPDF 
             plan={plan}
             meals={meals}
             activities={activities}
             dow={dow}
             />
        )).toBlob();
        saveAs(blob,'plan');
    };

    //check if the user has an active plan
    const fetchActivePlanData = async () => {
        const {data, error} = await SupabaseClient()
        .from('testPlanOccurence')
        .select()
        .eq('employeeID',user)
        .single();
        if (error)
            console.log('Error! There was an error fetching from PlanOccurence!');
        else{
            console.log(data);
            getPlan(data.planID);
        }
    };

    useEffect(()=>{
        fetchActivePlanData();
    },[]);

    return (
        <>
            <div className='buttons'>
                <div id="miniNav">
                    <button id="switchButton"><Link href="changePlan">Switch Plan</Link></button>
                    {plan && meals && activities && dow && (<button onClick={()=>downloadPDF()}>Download Plan</button>)}
                </div></div>
                <table className='plan-page-table'>
                    <tbody>
                        <tr className="headers">
                            <td></td>
                            <td>BREAKFAST</td>
                            <td>LUNCH</td>
                            <td>DINNER</td>
                            <td>SNACK</td>
                            <td>EXERCISE</td>
                        </tr>
                        {activities && meals &&
                            dow.map((day,i)=>(
                                    <tr key={day}>
                                        <td>{day.toUpperCase()}</td>
                                        <td>{meals[i][0]&&meals[i][0].FoodName}</td>
                                        <td>{meals[i][1]&&meals[i][1].FoodName}</td>
                                        <td>{meals[i][2]&&meals[i][2].FoodName}</td>
                                        <td>{meals[i][3]&&meals[i][3].FoodName}</td>
                                        <td>{activities[i].type} - {activities[i].duration} minutes</td>
                                    </tr>
                            ))
                        }

                    </tbody>
                </table>

        </>
    )
}