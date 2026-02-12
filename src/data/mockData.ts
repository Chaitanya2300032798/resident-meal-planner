export interface Resident {
  id: string;
  name: string;
  age: number;
  room: string;
  photo: string;
  allergies: string[];
  preferences: string[];
  dietaryRestrictions: string[];
  calorieTarget: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'grain' | 'vegetable' | 'fruit' | 'dairy' | 'beverage' | 'dessert';
  allergens: string[];
  calories: number;
  available: boolean;
  stock: number;
  unit: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: string[];
  calories: number;
  tags: string[];
}

export interface MealPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
}

export const residents: Resident[] = [
  {
    id: '1', name: 'Margaret Thompson', age: 78, room: '101A',
    photo: '', allergies: ['Gluten', 'Peanuts'],
    preferences: ['Soft foods', 'Warm soups', 'Herbal tea'],
    dietaryRestrictions: ['Low sodium'], calorieTarget: 1800,
  },
  {
    id: '2', name: 'Robert Chen', age: 82, room: '103B',
    photo: '', allergies: ['Lactose'],
    preferences: ['Asian cuisine', 'Rice dishes', 'Green tea'],
    dietaryRestrictions: ['Diabetic'], calorieTarget: 1600,
  },
  {
    id: '3', name: 'Dorothy Williams', age: 75, room: '105A',
    photo: '', allergies: [],
    preferences: ['Mediterranean', 'Fresh salads', 'Fruit desserts'],
    dietaryRestrictions: ['Heart healthy'], calorieTarget: 1700,
  },
  {
    id: '4', name: 'James O\'Brien', age: 88, room: '108C',
    photo: '', allergies: ['Shellfish', 'Eggs'],
    preferences: ['Hearty meals', 'Mashed potatoes', 'Gravy'],
    dietaryRestrictions: ['High protein'], calorieTarget: 2000,
  },
  {
    id: '5', name: 'Maria Garcia', age: 71, room: '110A',
    photo: '', allergies: ['Soy'],
    preferences: ['Spicy food', 'Beans', 'Corn tortillas'],
    dietaryRestrictions: ['Low cholesterol'], calorieTarget: 1650,
  },
  {
    id: '6', name: 'William Foster', age: 85, room: '112B',
    photo: '', allergies: ['Tree nuts'],
    preferences: ['Classic American', 'Roast chicken', 'Pie'],
    dietaryRestrictions: ['Pureed diet'], calorieTarget: 1500,
  },
];

export const inventory: FoodItem[] = [
  { id: '1', name: 'Chicken Breast', category: 'protein', allergens: [], calories: 165, available: true, stock: 25, unit: 'lbs' },
  { id: '2', name: 'Salmon Fillet', category: 'protein', allergens: ['Fish'], calories: 208, available: true, stock: 15, unit: 'lbs' },
  { id: '3', name: 'Brown Rice', category: 'grain', allergens: [], calories: 216, available: true, stock: 40, unit: 'lbs' },
  { id: '4', name: 'Whole Wheat Bread', category: 'grain', allergens: ['Gluten'], calories: 69, available: true, stock: 30, unit: 'loaves' },
  { id: '5', name: 'Broccoli', category: 'vegetable', allergens: [], calories: 55, available: true, stock: 20, unit: 'lbs' },
  { id: '6', name: 'Sweet Potatoes', category: 'vegetable', allergens: [], calories: 103, available: true, stock: 35, unit: 'lbs' },
  { id: '7', name: 'Apples', category: 'fruit', allergens: [], calories: 95, available: true, stock: 50, unit: 'pcs' },
  { id: '8', name: 'Greek Yogurt', category: 'dairy', allergens: ['Lactose'], calories: 100, available: true, stock: 40, unit: 'cups' },
  { id: '9', name: 'Eggs', category: 'protein', allergens: ['Eggs'], calories: 78, available: true, stock: 60, unit: 'pcs' },
  { id: '10', name: 'Spinach', category: 'vegetable', allergens: [], calories: 23, available: true, stock: 15, unit: 'lbs' },
  { id: '11', name: 'Oatmeal', category: 'grain', allergens: ['Gluten'], calories: 150, available: true, stock: 20, unit: 'lbs' },
  { id: '12', name: 'Milk', category: 'dairy', allergens: ['Lactose'], calories: 103, available: true, stock: 30, unit: 'gallons' },
  { id: '13', name: 'Tomatoes', category: 'vegetable', allergens: [], calories: 22, available: true, stock: 25, unit: 'lbs' },
  { id: '14', name: 'Bananas', category: 'fruit', allergens: [], calories: 105, available: false, stock: 0, unit: 'pcs' },
  { id: '15', name: 'Ground Turkey', category: 'protein', allergens: [], calories: 170, available: true, stock: 18, unit: 'lbs' },
  { id: '16', name: 'Pasta', category: 'grain', allergens: ['Gluten'], calories: 200, available: true, stock: 22, unit: 'lbs' },
  { id: '17', name: 'Cheddar Cheese', category: 'dairy', allergens: ['Lactose'], calories: 113, available: true, stock: 12, unit: 'lbs' },
  { id: '18', name: 'Orange Juice', category: 'beverage', allergens: [], calories: 112, available: true, stock: 10, unit: 'gallons' },
];

export const sampleMeals: Meal[] = [
  { id: '1', name: 'Herb Grilled Chicken', type: 'lunch', items: ['Chicken Breast', 'Brown Rice', 'Broccoli'], calories: 436, tags: ['High protein', 'Gluten free'] },
  { id: '2', name: 'Oatmeal & Fresh Fruit', type: 'breakfast', items: ['Oatmeal', 'Apples', 'Bananas'], calories: 350, tags: ['Fiber rich', 'Warm'] },
  { id: '3', name: 'Salmon with Sweet Potato', type: 'dinner', items: ['Salmon Fillet', 'Sweet Potatoes', 'Spinach'], calories: 480, tags: ['Heart healthy', 'Omega 3'] },
  { id: '4', name: 'Greek Yogurt Parfait', type: 'snack', items: ['Greek Yogurt', 'Apples'], calories: 195, tags: ['Light', 'Calcium'] },
  { id: '5', name: 'Turkey & Veggie Wrap', type: 'lunch', items: ['Ground Turkey', 'Tomatoes', 'Spinach'], calories: 380, tags: ['Lean protein'] },
  { id: '6', name: 'Scrambled Eggs & Toast', type: 'breakfast', items: ['Eggs', 'Whole Wheat Bread'], calories: 290, tags: ['Classic', 'Quick'] },
  { id: '7', name: 'Pasta Primavera', type: 'dinner', items: ['Pasta', 'Broccoli', 'Tomatoes'], calories: 410, tags: ['Vegetarian'] },
  { id: '8', name: 'Fresh Fruit Bowl', type: 'snack', items: ['Apples', 'Bananas'], calories: 200, tags: ['Fresh', 'Natural'] },
];

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function generateMealPlan(resident: Resident): MealPlan[] {
  const safeMeals = sampleMeals.filter(meal => {
    const mealAllergens = meal.items.flatMap(itemName => {
      const item = inventory.find(i => i.name === itemName);
      return item ? item.allergens : [];
    });
    return !mealAllergens.some(a => resident.allergies.includes(a));
  });

  const getRandomMeal = (type: Meal['type']): Meal => {
    const typeMeals = safeMeals.filter(m => m.type === type);
    if (typeMeals.length === 0) return sampleMeals.filter(m => m.type === type)[0];
    return typeMeals[Math.floor(Math.random() * typeMeals.length)];
  };

  return weekDays.map(day => ({
    day,
    breakfast: getRandomMeal('breakfast'),
    lunch: getRandomMeal('lunch'),
    dinner: getRandomMeal('dinner'),
    snack: getRandomMeal('snack'),
  }));
}
