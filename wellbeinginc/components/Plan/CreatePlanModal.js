import './CreatePlanModal.css'
import profilePicture from '../images/Blank Profile Picture.jpg'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import SupabaseClient from '../Supabase';
import { redirect } from "next/navigation";

const mealPlans = {
  Balanced: { 
    breakfast: "Toast with avocado and egg",
    lunch: "Chicken salad sandwich",
    snack: "Apple slices with peanut butter",
    dinner: "Baked salmon with brown rice and roasted vegetables",
    exercise: "Brisk walk(45 minutes)"
  },
  PowerDiet: { 
    breakfast: "Protein smoothie with oats, banana, peanut butter",
    lunch: "Turkey burger on a  bun with a side salad",
    snack: "Trail mix",
    dinner: "Steak with sweet potatoes",
    exercise: " Weightlifting(60 minutes)"
   },
  LightFitness: { 
    breakfast: "Greek yogurt with berries",
    lunch: "Lentil soup with a side salad ",
    snack: "Vegetable sticks with hummus",
    dinner: "Grilled chicken breast with quinoa and steamed vegetables ",
    exercise: "Yoga(30 minutes)"
  },
  WeightGain: { 
    breakfast: "Large bowl of oatmeal with milk and dried fruit",
    lunch: " Pasta with chicken and marinara sauce",
    snack: "Protein shake",
    dinner: " Beef stir-fry with rice and vegetables",
    exercise: "Strength training(45 minutes)"
   },
  WeightLoss: { 
    breakfast: "Egg white omelet with spinach and tomatoes",
    lunch: "Turkey wrap with vegetables",
    snack: "Almonds",
    dinner: "Grilled fish with mixed green salad",
    exercise: "Cardio workout(40 minutes)"
   },
  Vegan: { 
    breakfast: " Tofu scramble with spinach ",
    lunch: " Lentil soup with whole-grain crackers",
    snack: " Fruit salad with nuts",
    dinner: "Black bean burger on a whole-wheat bun, with a side salad",
    exercise: "Yoga(45 minutes)"
   }
  // ... Other plans (WeightGain, WeightLoss, Vegan)
};

const Modal = ({isOpen, onClose, user, type}) => {

  const [menus,setMenus] = useState(null);
  const [activities,setActivities] = useState(null);
  
  const dow = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const getMenus = async () =>{
    const {data,error} = await SupabaseClient().from('testMenu').select()
    if (error)
      console.log("Error! Fetching menu error!");
    else 
      setMenus(data);
    }

  const getActivities = async () =>{
    const {data,error} = await SupabaseClient().from('testFitnessActivity').select()
    if (error)
      console.log("Error! Fetching activities error!")
    else
      setActivities(data)
  }

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

  const createPlanTemplate = async (name,dif,desc,act,men) =>
  {
    const {data,error} = await SupabaseClient()
    .from('testPlanTemplate')
    .insert({name:name, difficulty:dif, description:desc, type:type, creator:user})
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

  const createPlan = async (formData) => {
    const name = formData.get('name');
    const difficulty = formData.get('difficulty');
    const description = formData.get('description');
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
    createPlanTemplate(name,difficulty,description,activityInput(),menuInput());
    redirect('/changePlan');
  }

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
                    <input type='text' required minLength="1" maxLength="100" name='name' defaultValue='Please enter your desired plan name...'></input>
                    <label>Difficulty</label>
                    <input type='text' required minLength="1" maxLength="100" name='difficulty'></input>
                    <label>Description</label>
                    <input type='text' required minLength="1" maxLength="300" name='description'></input>
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