import './CreatePlanModal.css'

type CreatePlanModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const mealPlans = {
  Balanced: { 
    description: "Breakfast: Toast with avocado and egg. Lunch: Chicken salad sandwich. Snack: Apple slices with peanut butter. Dinner: Baked salmon with brown rice and roasted vegetables. Exercise: Brisk walk (45 minutes)",
  },
  PowerDiet: { 
    description:"Breakfast: Protein smoothie with oats, banana, peanut butter Lunch: Turkey burger on a  bun with a side salad Snack: Trail mix Dinner: Steak with sweet potatoes Exercise: Weightlifting(60 minutes)",
   },
  LightFitness: { 
   description: "Breakfast: Greek yogurt with berries Lunch: Lentil soup with a side salad Snack: Vegetable sticks with hummus Dinner: Grilled chicken breast with quinoa and steamed vegetables Exercise: Yoga(30 minutes)",
  },
  WeightGain: { 
    description:"Breakfast: Large bowl of oatmeal with milk and dried fruit Lunch: Pasta with chicken and marinara sauce Snack: Protein shake Dinner: Beef stir-fry with rice and vegetables Exercise: Strength training(45 minutes)",
   },
  WeightLoss: { 
    description: "Breakfast: Egg white omelet with spinach and tomatoes Lunch: Turkey wrap with vegetables Snack: Almonds Dinner: Grilled fish with mixed green salad Exercise: Cardio workout(40 minutes)",
   },
  Vegan: { 
    description: "Breakfast: Tofu scramble with spinach Lunch: Lentil soup with whole-grain crackers Snack: Fruit salad with nuts Dinner: Black bean burger on a whole-wheat bun, with a side salad Exercise: Yoga(45 minutes)",
   }
  // ... Other plans (WeightGain, WeightLoss, Vegan)
};

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
                      {Array(7).fill(0).map((_, dayIndex) => ( 
                        <div key={dayIndex}> {/* Important for React to track */}
                          <label htmlFor={`day${dayIndex + 1}`}>Day {dayIndex + 1}:</label>
                          <select name="Menu" id={`day${dayIndex + 1}`}>
                            <option value="" disabled="">Choose plan for the day</option>
                            {Object.keys(mealPlans).map((planName) => (
                              <option key={planName} value={planName}>
                                {mealPlans[planName].description}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </fieldset>
                    <button id="plan-submit-button"type="submit">Save Plan</button>
                  </form>
                  </div>
                </div>
  );
};

export default Modal;