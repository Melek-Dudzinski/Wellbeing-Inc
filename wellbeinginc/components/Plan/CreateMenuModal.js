import './CreatePlanModal.css'
import { useEffect, useState } from 'react';
import SupabaseClient from '../Supabase';
import { redirect } from "next/navigation";

const Modal = ({isOpen, onClose}) => {

  const [food,setFood] = useState(null);
  const mealTypes = ['Breakfast','Lunch','Dinner','Snack'];

  //fetch foodItems for dropdown
  const getFoodItem = async () =>{
    const {data,error} = await SupabaseClient().from('testFoodItem').select()
    if (error)
      console.log("Error! Fetching FoodItem error!")
    else
      setFood(data)
  }

  //insert menu for table on specific day
  const AddMenuFood = async (menu,meals) => {
    meals.map(async(meal,i)=>{
        const {data,error} = await SupabaseClient()
        .from('testMenuFood')
        .insert({MenuID:menu,FoodName:meal,MealType: mealTypes[i]})
        if (error)
            console.log('Error! Error adding to the MenuFood table!');
    })
  }

  //create menu in db
  const AddMenu = async (n,type,meals) =>
  {
    const {data,error} = await SupabaseClient()
    .from('testMenu')
    .insert({name:n,type:type})
    .select()
    if (error)
    {
        console.log('Error! Error adding to the Menu table!');
    }
    else {
        AddMenuFood(data[0].MenuID,meals)
    }
  }

//handle on click
  const createMenu = async (formData) => {
    const name = formData.get('name');
    const type = formData.get('type');
    const meals = [formData.get(mealTypes[0]), formData.get(mealTypes[1]), formData.get(mealTypes[2]), formData.get(mealTypes[3])];
    AddMenu(name,type,meals);
    redirect('/changePlan');
  }

  //fetch data on render
  useEffect(()=>{
    getFoodItem();
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
                    <input type='text' required maxLength="100" name='name' defaultValue='New Menu'></input>
                    <label>Type</label>
                    <input type='text' maxLength="100" name='type'></input>
                    <legend>Choose your Menu</legend>
                      {Array(4).fill(0).map((_, mealId) => ( 
                        <div key={mealId}> {/* Important for React to track */}
                          <label htmlFor={mealTypes[mealId]}>{mealTypes[mealId]}:</label>
                          <select name={mealTypes[mealId]} id={mealId} required>
                            <option value="" disabled="">Choose the meal plan for the day</option>
                            {food && food.map((f) => (
                              <option key={f.name} value={f.name}>
                                {f.name} 
                              </option>
                            ))}
                          </select>
                          <br></br>
                        </div>
                      ))}
                    </fieldset>
                    <button id="plan-submit-button" type="submit" formAction={createMenu}>Save Menu</button>
                  </form>
                  </div>
                </div>
  );
};

export default Modal;