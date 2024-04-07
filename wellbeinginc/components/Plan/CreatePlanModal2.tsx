import './CreatePlanModal.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'

type CreatePlanModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = (props : CreatePlanModalProps) => {
  if (!props.isOpen) return null;

  return (
          <div className="plan-modal-overlay">
                <div className="plan-modal">
                  <div id="plan-modal-header">
                    <button id="plan-close-button" onClick={props.onClose}>X</button>
                  </div>
                  <form>
                    <fieldset className="day-options">
                      <legend>Choose your plan</legend>
                      <label htmlFor="day1">Day 1:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                      <label htmlFor="day2">Day 2:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                      <label htmlFor="day2">Day 3:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                      <label htmlFor="day2">Day 4:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                      <label htmlFor="day2">Day 5:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                      <label htmlFor="day2">Day 6:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                      <label htmlFor="day2">Day 7:</label>
                      <select name="Menu" id="">
                        <option value="" disabled="">Choose plan for the day</option>
                        <option value="Balanced"> Breakfast: Toast with avocado and egg Lunch: Chicken salad sandwich  Snack: Apple slices with peanut butter Dinner: Baked salmon with brown rice and roasted vegetables <br /> Exercise: Brisk walk(45 minutes)</option>
                        <option value="PowerDiet">Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)</option>
                        <option value="LightFitness">Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)</option>
                        <option value="WeightGain">Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)</option>
                        <option value="WeightLoss">Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)</option>
                        <option value="Vegan">Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)</option>
                      </select>
                    </fieldset>
                    <button type="submit" id='plan-submit-button'>Save Plan</button>
                  </form>
                  </div>
                </div>
  );
};

export default Modal; 