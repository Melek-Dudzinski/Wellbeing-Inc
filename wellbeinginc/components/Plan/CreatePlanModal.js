import './CreatePlanModal.css'
import { useEffect, useState } from 'react';
import SupabaseClient from '../Supabase';
import { redirect } from "next/navigation";

const Modal = ({isOpen, onClose, user, type}) => {

  const [menus,setMenus] = useState(null);
  const [activities,setActivities] = useState(null);
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

  //insert menu for table on specific day
  const AddMenuToTable = async (plan,menu,day) => {
    console.log(plan, ' - ', menu, ' - ', day)
    const {error} = await SupabaseClient()
    .from('testPlanMenu')
    .insert({planID:plan,menuID:menu,day:day})
    .select()
    if (error)
    {
      console.log('Error! Error adding to the MenuPlan table!');
    }
  }

  //insert activity for table on specific day
  const AddActivityToTable = async (plan,activity,day) => {
    console.log(plan, ' - ', activity, ' - ', day)
    const {error} = await SupabaseClient()
    .from('testPlanActivity')
    .insert({planID:plan,activityID:activity,day:day})
    .select()
    if (error)
    {
      console.log('Error! Error adding to the PlanActivity table!');
    }
  }

  //create plan in db
  const createPlanTemplate = async (name,dif,desc,act,men,img) =>
  {
    const {data,error} = await SupabaseClient()
    .from('testPlanTemplate')
    .insert({name:name, difficulty:dif, description:desc, type:type, creator:user,img_url:img})
    .select('planID').single()
    if (error)
    {
      console.log('Error! Error adding to the planTemplate table!');
    }
    else {
      const planID = data.planID;
      men.map(m=>{
        AddMenuToTable(planID,m.menu,m.day);
      })
      act.map(a=>{
        AddActivityToTable(planID,a.activity,a.day);
      })
    }
  }
//handle on click
  const createPlan = async (formData) => {
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
    createPlanTemplate(name,difficulty,description,activityInput(),menuInput(),img);
    redirect('/changePlan');
  }

  //fetch data on render
  useEffect(()=>{
    getMenus();
    getActivities();
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
                    <label>Name</label>
                    <input type='text' required maxLength="100" name='name' defaultValue='Please enter your desired plan name...'></input>
                    <label>Difficulty</label>
                    <input type='text' maxLength="100" name='difficulty'></input>
                    <label>Description</label>
                    <input type='text' maxLength="300" name='description'></input>
                    <label>Image URL</label>
                    <input type='url' name='img'></input>
                    <legend>Choose your plan</legend>
                      {Array(7).fill(0).map((_, dayIndex) => ( 
                        <div key={dayIndex}> {/* Important for React to track */}
                          <label htmlFor={`day${dayIndex + 1}`}>{dow[dayIndex]}:</label>
                          <select name={"menu"+(dayIndex + 1)} id={`day${dayIndex + 1}`} required>
                            <option value="" disabled="">Choose the meal plan for the day</option>
                            {menus && menus.map((menu) => (
                              <option key={menu.MenuID} value={menu.MenuID}>
                                {menu.name} 
                              </option>
                            ))}
                          </select>
                          <br></br>
                          <select name={"activity"+(dayIndex + 1)} id={`day${dayIndex + 1}`} required>
                            <option value="" disabled="">Choose the activity for the day</option>
                            {activities && activities.map((a)=>(
                              <option key={a.ActivityID} value={a.ActivityID}>
                                {a.type} - {a.duration} minutes
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </fieldset>
                    <button id="plan-submit-button" type="submit" formAction={createPlan}>Save Plan</button>
                  </form>
                  </div>
                </div>
  );
};

export default Modal;