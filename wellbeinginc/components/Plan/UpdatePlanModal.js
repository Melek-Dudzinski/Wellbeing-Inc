import './CreatePlanModal.css'
import { useEffect, useState } from 'react';
import SupabaseClient from '../Supabase';
import { redirect } from "next/navigation";

const Modal = ({isOpen, onClose, planID}) => {

  const [menus,setMenus] = useState(null);
  const [activities,setActivities] = useState(null);
  const [planData,setPlanData] = useState(null);
  const [prevMenus, setPrevMenus] = useState(null);
  const [PrevActivities, setPrevActivities] = useState(null);
  const dow = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  //fetch menus for dropdown
  const getMenus = async () =>{
    const {data,error} = await SupabaseClient().from('testMenu').select()
    if (error)
      console.log("Error! Fetching menu error!");
    else 
      setMenus(data);
    }
  //fetch activities for dropdown
  const getActivities = async () =>{
    const {data,error} = await SupabaseClient().from('testFitnessActivity').select()
    if (error)
      console.log("Error! Fetching activities error!")
    else
      setActivities(data)
  }

  //get previous activities for default values
  const getPrevActivities = async (activitiesID) => {
    const {data, error} = await SupabaseClient()
    .from('testFitnessActivity')
    .select('ActivityID,type,duration')
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
        setPrevActivities(acti);
    }};

    //get the meals from db
    const getPrevMenus = async(menuID) => {
        const {data, error} = await SupabaseClient()
        .from('testMenu')
        .select(`MenuID, name`)
        .in('MenuID', menuID);
        if (error)
            console.log('Error! There was an error fetching from testMenuFood!');
        else
            {
                let temp = [];
                //get in right order by day
                console.log(data)
                menuID.map((i)=>{
                    temp.push(data.filter((m)=>i==m.MenuID)[0]);
                });
                setPrevMenus(temp);    
            }
    };
    

  //fetch plan data for default values
  const getPlanData = async () => {
    const {data,error} = await SupabaseClient().from('testPlanTemplate')
    .select()
    .select(`planID, name, difficulty,img_url, description, testPlanMenu ( planID, menuID, day), testPlanActivity ( planID, activityID, day)`)
    .eq('planID',planID);
    if (error)
        console.log("Error! Fetching planTemplate error!")
    else {
        setPlanData(data)
        let activitiesID = [];
        let menusID = [];
        if (data[0].testPlanActivity&&data[0].testPlanActivity)
            dow.map(day=>{
                const m = data[0].testPlanMenu.filter((menu)=> menu.day==day)[0];
                const a = data[0].testPlanActivity.filter((act)=> act.day==day)[0];
                console.log(a)
                if (m)
                    menusID.push(m.menuID)
                if (a)
                    activitiesID.push(a.activityID);
            })
        getPrevActivities(activitiesID);
        getPrevMenus(menusID);    
    }
        
  }

  //first remove previous menus 
  const removeMenus = async (menu) => {
    const {error} = await SupabaseClient()
    .from('testPlanMenu')
    .delete()
    .eq('planID',planID)
    if (error)
    {
      console.log('Error! Error removing from the PlanMenu table!');
    }
    else {
        //add the new menus
        menu.map(m=>{
            AddMenuToTable(m.menu,m.day);
          })
    }
  }

  //first remove previous activities
  const removeActivities = async (act) => {
    const {error} = await SupabaseClient()
    .from('testPlanActivity')
    .delete()
    .eq('planID',planID)
    if (error)
    {
      console.log('Error! Error removing from the PlanActivity table!');
    }
    else {
        //add new activities
        act.map(a=>{
            AddActivityToTable(a.activity,a.day);
          })
    }
  }

  //insert menu for table on specific day
  const AddMenuToTable = async (menu,day) => {
    console.log(planID, ' - ', menu, ' - ', day)
    const {error} = await SupabaseClient()
    .from('testPlanMenu')
    .insert({planID:planID,menuID:menu,day:day})
    .select()
    if (error)
    {
      console.log('Error! Error adding to the MenuPlan table!');
    }
  }

  //insert activity for table on specific day
  const AddActivityToTable = async (activity,day) => {
    console.log(planID, ' - ', activity, ' - ', day)
    const {error} = await SupabaseClient()
    .from('testPlanActivity')
    .insert({planID:planID,activityID:activity,day:day})
    .select()
    if (error)
    {
      console.log('Error! Error adding to the PlanActivity table!');
    }
  }

  //create plan in db
  const updatePlanTemplate = async (name,dif,desc,act,men,img) =>
  {
    const {error} = await SupabaseClient()
    .from('testPlanTemplate')
    .update({name:name, difficulty:dif, description:desc, img_url:img})
    .eq('planID',planID)
    if (error)
    {
      console.log('Error! Error adding to the planTemplate table!');
    }
    else {
        removeActivities(act);
        removeMenus(men);
    }
  }
//handle on click
  const updatePlan = async (formData) => {
    const name = formData.get('name');
    const difficulty = formData.get('difficulty');
    const description = formData.get('description');
    const img = formData.get('img');
    const menuInput = () => {
      let arr = [];
      for (let i=0;i<7;i++)
        arr.push({menu : formData.get("menu"+(i+1)), day: dow[i]});
      return arr
    } 
    const activityInput = () => {
      let arr = [];
      for (let i=0;i<7;i++)
      arr.push({activity : formData.get("activity"+(i+1)), day: dow[i]});
      return arr
    } 
    console.log(menuInput(), activityInput())
    updatePlanTemplate(name,difficulty,description,activityInput(),menuInput(),img);
    redirect('/changePlan');
  }

  //fetch data on render
  useEffect(()=>{
    getMenus();
    getActivities();
    getPlanData();
  },[])

  if (!isOpen) return null;

  return (
          <div className="plan-modal-overlay">
                <div className="plan-modal">
                  <div id="plan-modal-header">
                    <button id="plan-close-button" onClick={onClose}>X</button>
                  </div>
                  <form>
                    <fieldset className="day-options">
                    {planData[0] &&
                    (<>
                        <label>Name</label>
                        <input type='text' required maxLength="100" name='name' defaultValue={planData[0].name}></input>
                        <label>Difficulty</label>
                        <input type='text' maxLength="100" name='difficulty' defaultValue={planData[0].difficulty}></input>
                        <label>Description</label>
                        <input type='text' maxLength="300" name='description' defaultValue={planData[0].description}></input>
                        <label>Image URL</label>
                        <input type='url' name='img' defaultValue={planData[0].img_url}></input>
                    </>)}
                    <legend>Choose your plan</legend>
                      {prevMenus && PrevActivities&& Array(7).fill(0).map((_, dayIndex) => ( 
                        <div key={dayIndex}> {/* Important for React to track */}
                          <label htmlFor={`day${dayIndex + 1}`}>{dow[dayIndex]}:</label>
                          <select name={"menu"+(dayIndex + 1)} id={`day${dayIndex + 1}`} required>
                            <option value={prevMenus[dayIndex].MenuID} disabled="">{prevMenus[dayIndex].name}</option>
                            {menus && menus.map((menu) => (
                              <option key={menu.MenuID} value={menu.MenuID}>
                                {menu.name} 
                              </option>
                            ))}
                          </select>
                          <br></br>
                          <select name={"activity"+(dayIndex + 1)} id={`day${dayIndex + 1}`} required>
                            <option value={PrevActivities[dayIndex].ActivityID} disabled="" >{PrevActivities[dayIndex].type} - {PrevActivities[dayIndex].duration} minutes</option>
                            {activities && activities.map((a)=>(
                              <option key={a.ActivityID} value={a.ActivityID}>
                                {a.type} - {a.duration} minutes
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </fieldset>
                    <button id="plan-submit-button" type="submit" formAction={updatePlan}>Submit Changes</button>
                  </form>
                  </div>
                </div>
  );
};

export default Modal;