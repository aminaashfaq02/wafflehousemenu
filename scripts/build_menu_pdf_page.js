const fs = require('fs');
const path = require('path');

const pageData = [
  {
    pageNum: 1,
    title: "Page 1: Breakfast All-Star Special™ & Hashbrown Bowls",
    subtitle: "Complete nutrient profile for the signature 5-item platter and 4 meal bowls",
    items: [
      { name: "2 Eggs - Scrambled", cal: 180, fat: "14g", satFat: "4g", sodium: "176mg", carbs: "2g", protein: "12g", allergens: "Egg, Soy" },
      { name: "Classic Sweet Cream Waffle", cal: 410, fat: "18g", satFat: "10g", sodium: "870mg", carbs: "55g", protein: "8g", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat" },
      { name: "White Toast - 2 Slices", cal: 130, fat: "2g", satFat: "0g", sodium: "260mg", carbs: "25g", protein: "4g", allergens: "Milk, Soy, Wheat" },
      { name: "Wheat Toast - 2 Slices", cal: 120, fat: "2g", satFat: "0g", sodium: "250mg", carbs: "26g", protein: "6g", allergens: "Milk, Soy, Wheat" },
      { name: "Raisin Toast - 2 Slices", cal: 220, fat: "3g", satFat: "0g", sodium: "280mg", carbs: "42g", protein: "6g", allergens: "Milk, Soy, Wheat" },
      { name: "Grilled Biscuit", cal: 300, fat: "15g", satFat: "9g", sodium: "800mg", carbs: "34g", protein: "5g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Texas Toast - 1 Slice", cal: 100, fat: "1g", satFat: "0g", sodium: "190mg", carbs: "19g", protein: "3g", allergens: "Milk, Soy, Wheat" },
      { name: "Traditional Grits", cal: 90, fat: "3g", satFat: "1g", sodium: "300mg", carbs: "16g", protein: "3g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Regular Hashbrowns", cal: 190, fat: "7g", satFat: "3g", sodium: "240mg", carbs: "29g", protein: "3g", allergens: "Soy" },
      { name: "Sliced Tomatoes (3 slices)", cal: 10, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "2g", protein: "0g", allergens: "None" },
      { name: "Hickory-Smoked Bacon (3 Slices)", cal: 135, fat: "12g", satFat: "5g", sodium: "375mg", carbs: "0g", protein: "9g", allergens: "None" },
      { name: "Sausage (2 Patties)", cal: 260, fat: "24g", satFat: "8g", sodium: "510mg", carbs: "1g", protein: "10g", allergens: "None" },
      { name: "Chicken Sausage (2 Patties)", cal: 180, fat: "13g", satFat: "4g", sodium: "700mg", carbs: "0g", protein: "14g", allergens: "None" },
      { name: "City Ham (1 Slice)", cal: 100, fat: "3g", satFat: "1g", sodium: "850mg", carbs: "7g", protein: "14g", allergens: "None" },
      { name: "Country Ham (1 Slice)", cal: 190, fat: "9g", satFat: "3g", sodium: "2110mg", carbs: "1g", protein: "25g", allergens: "None" },
      { name: "Sausage Egg & Cheese Hashbrown Bowl", cal: 920, fat: "61g", satFat: "22g", sodium: "1666mg", carbs: "63g", protein: "33g", allergens: "Egg, Milk, Soy" },
      { name: "Chicken Sausage Egg & Cheese Hashbrown Bowl", cal: 840, fat: "50g", satFat: "18g", sodium: "1856mg", carbs: "62g", protein: "37g", allergens: "Egg, Milk, Soy" },
      { name: "Bacon Egg & Cheese Hashbrown Bowl", cal: 795, fat: "49g", satFat: "19g", sodium: "1531mg", carbs: "62g", protein: "32g", allergens: "Egg, Milk, Soy" },
      { name: "Ham Egg & Cheese Hashbrown Bowl", cal: 800, fat: "43g", satFat: "16g", sodium: "2416mg", carbs: "66g", protein: "41g", allergens: "Egg, Milk, Soy" }
    ]
  },
  {
    pageNum: 2,
    title: "Page 2: Classic Egg Breakfasts & Steaks",
    subtitle: "Two farm eggs cooked to order with steak, ham, chicken, or cheese",
    items: [
      { name: "2 Egg Breakfast (Plain Eggs)", cal: 180, fat: "14g", satFat: "4g", sodium: "176mg", carbs: "2g", protein: "12g", allergens: "Egg, Soy" },
      { name: "Cheese 'N Eggs (2 Eggs w/ Melted Cheese)", cal: 280, fat: "23g", satFat: "9g", sodium: "676mg", carbs: "4g", protein: "17g", allergens: "Egg, Milk, Soy" },
      { name: "T-Bone Steak & 2 Eggs Breakfast", cal: 600, fat: "43g", satFat: "15g", sodium: "436mg", carbs: "2g", protein: "49g", allergens: "Egg, Soy" },
      { name: "Steak & Eggs: Delmonico Steak & 2 Eggs", cal: 480, fat: "28g", satFat: "9g", sodium: "636mg", carbs: "2g", protein: "53g", allergens: "Egg, Soy" },
      { name: "Country Ham & 2 Eggs Breakfast", cal: 370, fat: "23g", satFat: "7g", sodium: "2286mg", carbs: "3g", protein: "37g", allergens: "Egg, Soy" },
      { name: "Grilled Chicken & 2 Eggs Breakfast", cal: 310, fat: "15g", satFat: "4g", sodium: "1106mg", carbs: "4g", protein: "41g", allergens: "Egg, Soy" }
    ]
  },
  {
    pageNum: 3,
    title: "Page 3: Protein Platters & Golden Sweet Cream Waffles",
    subtitle: "High-protein egg combos & custom waffle iron toppings",
    items: [
      { name: "Meat Lover's Chicken & Eggs (2 Filets)", cal: 440, fat: "16g", satFat: "4g", sodium: "2036mg", carbs: "6g", protein: "70g", allergens: "Egg, Soy" },
      { name: "Pork Chops & Eggs (2 Grilled Pork Chops)", cal: 520, fat: "28g", satFat: "9g", sodium: "1216mg", carbs: "2g", protein: "64g", allergens: "Egg, Soy" },
      { name: "Meat Lover's Pork Chops & Eggs (3 Chops)", cal: 690, fat: "35g", satFat: "12g", sodium: "1736mg", carbs: "2g", protein: "90g", allergens: "Egg, Soy" },
      { name: "Cheesesteak & 2 Eggs Breakfast", cal: 310, fat: "21g", satFat: "7g", sodium: "476mg", carbs: "2g", protein: "28g", allergens: "Egg, Soy" },
      { name: "Fiesta Protein Bowl (Chicken, 3 Eggs, 2 Cheese)", cal: 530, fat: "31g", satFat: "11g", sodium: "2084mg", carbs: "14g", protein: "52g", allergens: "Egg, Soy" },
      { name: "Classic Sweet Cream Waffle", cal: 410, fat: "18g", satFat: "10g", sodium: "870mg", carbs: "55g", protein: "8g", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat" },
      { name: "Roasted Georgia Pecans Topping", cal: 150, fat: "15g", satFat: "2g", sodium: "0mg", carbs: "3g", protein: "2g", allergens: "Tree Nuts" },
      { name: "Chocolate Chips Topping", cal: 95, fat: "5g", satFat: "3g", sodium: "0mg", carbs: "14g", protein: "1g", allergens: "Soy" },
      { name: "Blueberry Nougat Topping", cal: 98, fat: "2g", satFat: "3g", sodium: "8mg", carbs: "13g", protein: "1g", allergens: "Milk, Soy, Wheat" },
      { name: "Peanut Butter Chips Topping", cal: 113, fat: "6g", satFat: "5g", sodium: "71mg", carbs: "13g", protein: "2g", allergens: "Milk, Peanut, Soy" }
    ]
  },
  {
    pageNum: 4,
    title: "Page 4: Hashbrowns, 7+ Diner Toppings & Biscuits",
    subtitle: "Scattered, smothered, covered, chunked hashbrowns & grilled buttermilk biscuits",
    items: [
      { name: "Regular Hashbrowns", cal: 190, fat: "7g", satFat: "3g", sodium: "240mg", carbs: "29g", protein: "3g", allergens: "Soy" },
      { name: "Large Hashbrowns", cal: 380, fat: "14g", satFat: "5g", sodium: "480mg", carbs: "58g", protein: "6g", allergens: "Soy" },
      { name: "Triple Hashbrowns", cal: 570, fat: "21g", satFat: "8g", sodium: "720mg", carbs: "87g", protein: "9g", allergens: "Soy" },
      { name: "Sautéed Onions (Smothered)", cal: 15, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "3g", protein: "0g", allergens: "None" },
      { name: "Melted American Cheese (Covered)", cal: 50, fat: "5g", satFat: "3g", sodium: "250mg", carbs: "1g", protein: "3g", allergens: "Milk, Soy" },
      { name: "Hickory Smoked Ham (Chunked)", cal: 70, fat: "3g", satFat: "1g", sodium: "630mg", carbs: "2g", protein: "9g", allergens: "None" },
      { name: "Grilled Tomatoes (Diced)", cal: 5, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "2g", protein: "0g", allergens: "None" },
      { name: "Jalapeno Peppers (Peppered)", cal: 10, fat: "0g", satFat: "0g", sodium: "390mg", carbs: "2g", protein: "0g", allergens: "None" },
      { name: "Grilled Mushrooms (Capped)", cal: 10, fat: "0g", satFat: "0g", sodium: "140mg", carbs: "2g", protein: "1g", allergens: "None" },
      { name: "Bert's Chili™ (Topped)", cal: 55, fat: "2g", satFat: "1g", sodium: "260mg", carbs: "6g", protein: "5g", allergens: "Milk, Soy, Wheat" },
      { name: "Country Sausage Gravy (3 oz)", cal: 75, fat: "18g", satFat: "2g", sodium: "385mg", carbs: "8g", protein: "1g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Grilled Buttermilk Biscuit", cal: 300, fat: "15g", satFat: "9g", sodium: "800mg", carbs: "34g", protein: "5g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Sausage Egg & Cheese Biscuit", cal: 570, fat: "39g", satFat: "18g", sodium: "1393mg", carbs: "37g", protein: "19g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Country Ham Biscuits (2 Biscuits)", cal: 790, fat: "39g", satFat: "21g", sodium: "3710mg", carbs: "69g", protein: "35g", allergens: "Egg, Milk, Soy, Wheat" }
    ]
  },
  {
    pageNum: 5,
    title: "Page 5: Breakfast Sandwiches, Texas Toast Melts & Kids Meals",
    subtitle: "Piled high on grilled Texas toast or toasted white/wheat with melted cheese",
    items: [
      { name: "Egg Sandwich", cal: 220, fat: "9g", satFat: "2g", sodium: "348mg", carbs: "26g", protein: "10g", allergens: "Egg, Soy, Wheat" },
      { name: "Egg & Cheese Sandwich", cal: 270, fat: "13g", satFat: "5g", sodium: "598mg", carbs: "27g", protein: "13g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Texas Egg & Cheese Melt", cal: 390, fat: "18g", satFat: "7g", sodium: "968mg", carbs: "41g", protein: "17g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Sausage Sandwich", cal: 390, fat: "26g", satFat: "8g", sodium: "770mg", carbs: "26g", protein: "14g", allergens: "Soy, Wheat" },
      { name: "Sausage, Egg & Cheese Sandwich", cal: 530, fat: "37g", satFat: "13g", sodium: "1108mg", carbs: "28g", protein: "23g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Texas Sausage, Egg & Cheese Melt", cal: 650, fat: "42g", satFat: "15g", sodium: "1478mg", carbs: "42g", protein: "27g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Chicken Sausage Sandwich", cal: 310, fat: "15g", satFat: "4g", sodium: "960mg", carbs: "25g", protein: "18g", allergens: "Soy, Wheat" },
      { name: "Texas Chicken Sausage, Egg & Cheese Melt", cal: 570, fat: "31g", satFat: "11g", sodium: "1668mg", carbs: "41g", protein: "31g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Bacon & Egg Sandwich", cal: 355, fat: "21g", satFat: "7g", sodium: "723mg", carbs: "26g", protein: "19g", allergens: "Egg, Soy, Wheat" },
      { name: "Texas Bacon, Egg & Cheese Melt", cal: 525, fat: "30g", satFat: "12g", sodium: "1343mg", carbs: "41g", protein: "26g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Grilled Ham Sandwich", cal: 230, fat: "4g", satFat: "1g", sodium: "1110mg", carbs: "32g", protein: "18g", allergens: "Soy, Wheat" },
      { name: "Ham, Egg & Cheese Sandwich", cal: 370, fat: "16g", satFat: "5g", sodium: "1448mg", carbs: "34g", protein: "27g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Texas Ham, Egg & Cheese Melt", cal: 490, fat: "21g", satFat: "8g", sodium: "1818mg", carbs: "48g", protein: "31g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Kids Waffle Meal (w/ Bacon or Sausage)", cal: 410, fat: "18g", satFat: "10g", sodium: "870mg", carbs: "55g", protein: "8g", allergens: "Egg, Milk, Soy, Wheat" },
      { name: "Kids 1 Egg Breakfast (w/ Bacon or Sausage)", cal: 90, fat: "7g", satFat: "2g", sodium: "88mg", carbs: "1g", protein: "6g", allergens: "Egg, Soy" }
    ]
  },
  {
    pageNum: 6,
    title: "Page 6: Toddle House® Omelet Breakfasts",
    subtitle: "Fluffy folded farm egg omelets whipped in classic milkshake blenders",
    items: [
      { name: "Cheese Omelet Breakfast (2 Egg)", cal: 280, fat: "23g", satFat: "9g", sodium: "676mg", carbs: "4g", protein: "17g", allergens: "Milk, Egg, Soy" },
      { name: "Ham & Cheese Omelet Breakfast (2 Egg)", cal: 350, fat: "26g", satFat: "10g", sodium: "1306mg", carbs: "6g", protein: "26g", allergens: "Milk, Egg, Soy" },
      { name: "Cheesesteak Omelet Breakfast (2 Egg)", cal: 410, fat: "30g", satFat: "12g", sodium: "976mg", carbs: "4g", protein: "33g", allergens: "Milk, Egg, Soy" },
      { name: "Fiesta Omelet Breakfast (2 Egg)", cal: 380, fat: "26g", satFat: "10g", sodium: "1696mg", carbs: "13g", protein: "26g", allergens: "Milk, Egg, Soy" }
    ]
  },
  {
    pageNum: 7,
    title: "Page 7: Build-Your-Own Omelets & Lunch/Dinner Bowls",
    subtitle: "Custom omelet add-ons & hot hashbrown bowls",
    items: [
      { name: "Build-Your-Own Base Omelet (2 Eggs)", cal: 180, fat: "14g", satFat: "4g", sodium: "176mg", carbs: "2g", protein: "12g", allergens: "Egg, Soy" },
      { name: "Bacon Omelet Add-on", cal: 90, fat: "8g", satFat: "3g", sodium: "250mg", carbs: "0g", protein: "6g", allergens: "None" },
      { name: "Sausage Omelet Add-on", cal: 130, fat: "12g", satFat: "4g", sodium: "255mg", carbs: "1g", protein: "5g", allergens: "None" },
      { name: "Chicken Sausage Omelet Add-on", cal: 90, fat: "7g", satFat: "2g", sodium: "350mg", carbs: "0g", protein: "7g", allergens: "None" },
      { name: "Grilled Chicken Omelet Add-on", cal: 130, fat: "1g", satFat: "0g", sodium: "930mg", carbs: "2g", protein: "29g", allergens: "None" },
      { name: "Thin-Sliced Cheesesteak Omelet Add-on", cal: 130, fat: "7g", satFat: "3g", sodium: "300mg", carbs: "0g", protein: "16g", allergens: "Soy" },
      { name: "Cheesesteak Melt Hashbrown Bowl", cal: 625, fat: "30g", satFat: "13g", sodium: "1280mg", carbs: "63g", protein: "27g", allergens: "Milk, Soy" },
      { name: "Chicken Melt Hashbrown Bowl", cal: 625, fat: "24g", satFat: "10g", sodium: "1910mg", carbs: "65g", protein: "40g", allergens: "Milk, Soy" }
    ]
  },
  {
    pageNum: 8,
    title: "Page 8: Classic Dinners & Pork Chop Platters",
    subtitle: "Satisfying dinner plates served with grilled Texas toast & crispy hashbrowns",
    items: [
      { name: "Grilled Chicken Dinner (1 Filet)", cal: 130, fat: "1g", satFat: "0g", sodium: "930mg", carbs: "2g", protein: "29g", allergens: "Milk, Soy, Wheat" },
      { name: "Meat Lovers Chicken Dinner (2 Filets)", cal: 260, fat: "2g", satFat: "0g", sodium: "1860mg", carbs: "4g", protein: "58g", allergens: "Milk, Soy, Wheat" },
      { name: "Country Ham Dinner (1 Ham Slice)", cal: 190, fat: "9g", satFat: "3g", sodium: "2110mg", carbs: "1g", protein: "25g", allergens: "Milk, Soy, Wheat" },
      { name: "Pork Chop Dinner (2 Grilled Chops)", cal: 340, fat: "14g", satFat: "5g", sodium: "1040mg", carbs: "0g", protein: "52g", allergens: "Milk, Soy, Wheat" },
      { name: "Meat Lovers Pork Chop Dinner (3 Chops)", cal: 510, fat: "21g", satFat: "8g", sodium: "1560mg", carbs: "0g", protein: "78g", allergens: "Milk, Soy, Wheat" }
    ]
  },
  {
    pageNum: 9,
    title: "Page 9: USDA Choice Steaks, Texas Melts & Angus Burgers",
    subtitle: "Seared USDA steaks, Texas toast melts, Bert's Chili™ & Angus patties",
    items: [
      { name: "USDA Choice T-Bone Dinner (1 Steak)", cal: 420, fat: "29g", satFat: "11g", sodium: "260mg", carbs: "0g", protein: "37g", allergens: "Milk, Soy, Wheat" },
      { name: "USDA Choice Delmonico Dinner (1 Steak)", cal: 300, fat: "14g", satFat: "5g", sodium: "460mg", carbs: "0g", protein: "41g", allergens: "Milk, Soy, Wheat" },
      { name: "Texas Grilled Chicken Melt", cal: 445, fat: "12g", satFat: "5g", sodium: "1810mg", carbs: "45g", protein: "40g", allergens: "Milk, Soy, Wheat" },
      { name: "Texas Cheesesteak™ Melt", cal: 445, fat: "18g", satFat: "8g", sodium: "1180mg", carbs: "43g", protein: "27g", allergens: "Milk, Soy, Wheat" },
      { name: "Texas Angus Patty Melt", cal: 535, fat: "28g", satFat: "12g", sodium: "935mg", carbs: "43g", protein: "26g", allergens: "Milk, Soy, Wheat" },
      { name: "Regular Bert's Chili™ (4 oz Bowl)", cal: 110, fat: "4g", satFat: "1g", sodium: "520mg", carbs: "11g", protein: "9g", allergens: "Milk, Soy, Wheat" },
      { name: "Large Bert's Chili™ (8 oz Bowl)", cal: 220, fat: "7g", satFat: "2g", sodium: "1040mg", carbs: "22g", protein: "18g", allergens: "Milk, Soy, Wheat" },
      { name: "Angus 1/4 LB Hamburger Deluxe", cal: 370, fat: "19g", satFat: "7g", sodium: "295mg", carbs: "30g", protein: "19g", allergens: "Milk, Soy, Wheat" },
      { name: "Angus 1/4 LB Cheeseburger Deluxe", cal: 420, fat: "23g", satFat: "10g", sodium: "545mg", carbs: "31g", protein: "22g", allergens: "Milk, Soy, Wheat" },
      { name: "Double Angus 1/4 LB Cheeseburger Deluxe", cal: 690, fat: "45g", satFat: "19g", sodium: "850mg", carbs: "32g", protein: "39g", allergens: "Milk, Soy, Wheat" }
    ]
  },
  {
    pageNum: 10,
    title: "Page 10: Sandwiches Deluxe, Southern Pies & Beverages",
    subtitle: "Diner sandwiches, Southern Pecan & Chocolate pies, juices & coffee",
    items: [
      { name: "Grilled Chicken Sandwich Deluxe", cal: 280, fat: "3g", satFat: "0g", sodium: "1170mg", carbs: "32g", protein: "33g", allergens: "Milk, Soy, Wheat" },
      { name: "Grilled Chicken Bacon Cheese Sandwich Deluxe", cal: 420, fat: "15g", satFat: "6g", sodium: "1670mg", carbs: "33g", protein: "42g", allergens: "Milk, Soy, Wheat" },
      { name: "Classic Grilled Cheese Sandwich", cal: 230, fat: "11g", satFat: "5g", sodium: "760mg", carbs: "27g", protein: "9g", allergens: "Milk, Soy, Wheat" },
      { name: "Waffle Sandwich (Ham & Cheese on Wheat)", cal: 270, fat: "9g", satFat: "3g", sodium: "1350mg", carbs: "34g", protein: "23g", allergens: "Milk, Soy, Wheat" },
      { name: "Classic BLT Sandwich (3 Bacon Slices)", cal: 275, fat: "14g", satFat: "5g", sodium: "635mg", carbs: "27g", protein: "13g", allergens: "Soy, Wheat" },
      { name: "Texas Bacon Lover's BLT (5 Bacon Slices)", cal: 435, fat: "22g", satFat: "8g", sodium: "1005mg", carbs: "40g", protein: "21g", allergens: "Milk, Soy, Wheat" },
      { name: "Southern Pecan Pie (Regular Slice)", cal: 510, fat: "26g", satFat: "8g", sodium: "610mg", carbs: "66g", protein: "4g", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat" },
      { name: "Southern Pecan Pie (Small Slice)", cal: 255, fat: "13g", satFat: "4g", sodium: "305mg", carbs: "33g", protein: "2g", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat" },
      { name: "Triple Chocolate Silk Pie (Regular Slice)", cal: 490, fat: "25g", satFat: "15g", sodium: "270mg", carbs: "59g", protein: "2g", allergens: "Milk, Soy, Wheat" },
      { name: "Waffle House Signature Royal Blend Coffee (8 oz)", cal: 5, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "1g", protein: "0g", allergens: "None" },
      { name: "Coca-Cola® / Sprite® / Pibb-Xtra® (Regular)", cal: 160, fat: "0g", satFat: "0g", sodium: "35mg", carbs: "44g", protein: "0g", allergens: "None" },
      { name: "Diet Coke®", cal: 0, fat: "0g", satFat: "0g", sodium: "50mg", carbs: "0g", protein: "0g", allergens: "None" },
      { name: "Alice's Iced Tea™ (Sweet)", cal: 70, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "17g", protein: "0g", allergens: "None" },
      { name: "Alice's Iced Tea™ (Unsweet)", cal: 0, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "0g", protein: "0g", allergens: "None" },
      { name: "Simply Orange Juice (10 oz)", cal: 160, fat: "0g", satFat: "0g", sodium: "0mg", carbs: "37g", protein: "2g", allergens: "None" },
      { name: "Borden® Regular Whole Milk (Pint)", cal: 130, fat: "5g", satFat: "4g", sodium: "125mg", carbs: "13g", protein: "9g", allergens: "Milk" },
      { name: "Borden® Chocolate Milk (Pint)", cal: 230, fat: "9g", satFat: "5g", sodium: "190mg", carbs: "31g", protein: "9g", allergens: "Milk" }
    ]
  }
];

function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PC6H4Z4F7C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-PC6H4Z4F7C');
  </script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waffle House Menu PDF (Printable 2026 Menu &amp; Nutrition Facts)</title>
  <meta name="description" content="Download or print the official 2026 Waffle House Menu PDF (10 pages). Complete price ranges, calorie counts, macro breakdowns, and allergen tables for all 110+ diner favorites.">
  <link rel="canonical" href="https://www.wafflehouse-menu.com/menu/pdf">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

  <!-- Favicon & Brand Icons -->
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/waffle-icon-48.png?v=2">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/waffle-icon-32.png?v=2">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/waffle-icon-16.png?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/waffle-icon-192.png?v=2">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-icon.svg?v=2">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png?v=2">
  <link rel="shortcut icon" href="/favicon.ico?v=2">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#FFC72C">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Waffle House Menu PDF (Printable 2026 Menu &amp; Nutrition Facts)">
  <meta property="og:description" content="Download or print the official 10-page 2026 Waffle House menu PDF: complete calories, macro breakdown, sodium, and allergen guide for all 110+ items.">
  <meta property="og:url" content="https://www.wafflehouse-menu.com/menu/pdf">
  <meta property="og:site_name" content="Waffle House Menu Guide">
  <meta property="og:image" content="https://www.wafflehouse-menu.com/assets/nutrition/classic-waffle.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Waffle House Printable Menu PDF Cover and Table Guide">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Waffle House Menu PDF (Printable 2026 Menu &amp; Nutrition Facts)">
  <meta name="twitter:description" content="Printable 10-page Waffle House menu PDF with calories, macros, prices, and allergen tables for 110+ items.">
  <meta name="twitter:image" content="https://www.wafflehouse-menu.com/assets/nutrition/classic-waffle.jpg">

  <!-- Fonts & Core Stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/home.css">

  <style>
    body {
      font-family: 'Work Sans', sans-serif;
      background-color: #FBFBFC;
      color: #0B0B0E;
    }
    h1, h2, h3, h4, h5, .font-heading {
      font-family: 'Poppins', sans-serif;
    }
    @media print {
      header, footer, nav, #quick-actions, #jump-nav, #print-tips, #faq, .no-print {
        display: none !important;
      }
      body {
        background: white !important;
        color: black !important;
      }
      .printable-section {
        page-break-after: always;
        break-after: page;
      }
      table {
        width: 100% !important;
        border-collapse: collapse !important;
      }
      th, td {
        border: 1px solid #ddd !important;
        padding: 4px 6px !important;
        font-size: 8pt !important;
      }
    }
  </style>

  <!-- Schema Markup (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.wafflehouse-menu.com/menu/pdf",
        "url": "https://www.wafflehouse-menu.com/menu/pdf",
        "name": "Waffle House Menu PDF (Printable 2026 Menu & Nutrition Facts)",
        "description": "Download or print the official 2026 Waffle House Menu PDF covering 10 detailed pages with 110+ items, calories, macros, and allergen charts.",
        "breadcrumb": {
          "@id": "https://www.wafflehouse-menu.com/menu/pdf#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.wafflehouse-menu.com/menu/pdf#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.wafflehouse-menu.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Menu & Prices",
            "item": "https://www.wafflehouse-menu.com/menu"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Menu PDF",
            "item": "https://www.wafflehouse-menu.com/menu/pdf"
          }
        ]
      },
      {
        "@type": "DigitalDocument",
        "name": "Waffle House Menu & Nutrition Guide PDF (2026 Edition)",
        "encodingFormat": "application/pdf",
        "url": "https://www.wafflehouse-menu.com/assets/waffle-house-menu-nutrition-facts-2026.pdf",
        "description": "Verified 10-page printable reference sheet for all Waffle House breakfast platters, waffles, hashbrown bowls, steaks, melts, and drinks.",
        "dateModified": "2026-05-05",
        "inLanguage": "en-US",
        "fileSize": "73KB",
        "numberOfPages": 10
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I download the official Waffle House menu as a PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can directly download the complete 10-page 2026 Waffle House Menu & Nutrition Guide PDF on this page. It covers all 110+ diner offerings with full calorie counts, macronutrients, sodium totals, and allergen disclosures."
            }
          },
          {
            "@type": "Question",
            "name": "What items are included in the Waffle House menu PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 10-page guide includes the All-Star Special™, Breakfast Hashbrown Bowls, Toddle House® Omelets, USDA Choice Steaks, Classic Dinners, Texas Melts, Angus Burgers, Sweet Cream Waffles, Grilled Biscuits, Southern Pies, and all diner beverages."
            }
          },
          {
            "@type": "Question",
            "name": "How do I print the Waffle House menu PDF on US Letter or A4 paper?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When opening the PDF print dialog, select 'Fit to Printable Area' or 'Shrink to Fit'. The layout is formatted in landscape orientation to ensure all nutritional columns and allergen keys fit cleanly across standard 8.5x11 inch or A4 paper."
            }
          },
          {
            "@type": "Question",
            "name": "Are prices included in the Waffle House menu PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Because Waffle House operates over 1,900 locations with regional pricing variations (typically ranging from $12.35 to $13.55 for an All-Star Special), the official PDF focuses on standardized nutritional weights, portions, and ingredients. Current nationwide average prices and state-by-state comparisons are available on our live Interactive Menu page."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find vegetarian and gluten-free items in the PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The PDF features a dedicated 'Allergens' column on every page. Regular hashbrowns, sliced tomatoes, and egg plates are naturally gluten-free friendly, while classic waffles and cheese plates are highlighted for vegetarian diners."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="flex flex-col min-h-screen">

  <!-- ================= TOP HEADER ================= -->
  <header class="w-full flex flex-col sticky top-0 left-0 right-0 z-50 bg-white shadow-xs border-b border-gray-200">
    <!-- Upper Branding Bar -->
    <div class="py-4 md:py-5 text-center px-4 bg-white">
      <a title="WaffleHouse Menu Home" class="inline-block group focus:outline-none" href="/">
        <div class="flex items-center justify-center gap-3 mb-1">
          <img src="/assets/logo-icon.png" width="44" height="44" alt="Waffle House Menu Guide Logo" decoding="async" class="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
          <span class="flex items-center gap-2 text-[26px] sm:text-3xl md:text-[34px] whitespace-nowrap font-black text-[#0B0B0E] tracking-tight font-heading leading-none">
            WaffleHouse
            <span class="bg-[#FFC72C] text-[#0B0B0E] rounded-lg px-2.5 py-1.5 text-[0.62em] uppercase tracking-wider leading-none shadow-xs">Menu</span>
          </span>
        </div>
      </a>
      <p class="text-gray-500 font-medium text-xs sm:text-[13px] tracking-wide">
        Full Information About Waffle House Menu 2026
      </p>
    </div>

    <!-- Lower Brand Yellow Navigation Bar -->
    <div class="bg-[#FFC72C] border-t border-yellow-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 py-3.5" aria-label="Main Navigation">
          
          <!-- Menu & Prices Dropdown -->
          <div class="relative group" id="menu-nav-container">
            <a 
              href="/menu"
              id="menu-nav-btn" 
              class="inline-flex items-center gap-1 text-[#0B0B0E] text-[15px] font-extrabold hover:text-black/70 transition-colors whitespace-nowrap focus:outline-none cursor-pointer py-1"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span>Menu &amp; Prices</span>
              <svg class="w-3.5 h-3.5 text-[#0B0B0E] transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </a>
            <!-- Dropdown Panel -->
            <div class="hidden group-hover:block dropdown-panel absolute left-0 top-full pt-2 w-56 z-50 text-left">
              <div class="bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 overflow-hidden">
                <a href="/menu" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Full Menu &amp; Prices
                </a>
                <a href="/menu/pdf" class="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-900 bg-amber-50 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  <span>Printable Menu (PDF)</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">2026</span>
                </a>
                <a href="/prices-by-state" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Prices by State
                </a>
              </div>
            </div>
          </div>

          <a title="Catering" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/waffle-house-catering/">
            Catering
          </a>

          <!-- Nutrition Dropdown -->
          <div class="relative group" id="nutrition-nav-container">
            <button 
              id="nutrition-nav-btn" 
              type="button" 
              class="inline-flex items-center gap-1 text-[#0B0B0E] text-[15px] font-extrabold hover:text-black/70 transition-colors whitespace-nowrap focus:outline-none cursor-pointer py-1"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span>Nutrition</span>
              <svg class="w-3.5 h-3.5 text-[#0B0B0E] transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div class="hidden group-hover:block dropdown-panel absolute left-1/2 -translate-x-1/2 top-full pt-2 w-52 z-50 text-left">
              <div class="bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 overflow-hidden">
                <a href="/nutrition" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Nutrition Overview
                </a>
                <a href="/waffle-house-calories-allergies/" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Calories &amp; Allergies
                </a>
                <a href="/waffle-house-dietary-guide/" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Dietary Guide
                </a>
                <a href="/menu/pdf" class="block px-4 py-2 text-sm font-bold text-amber-900 bg-amber-50 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Printable Nutrition PDF
                </a>
              </div>
            </div>
          </div>

          <a title="Deals &amp; Coupons" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/coupons">
            Deals &amp; Coupons
          </a>
          <a title="Blog" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/blog/">
            Blog
          </a>
          <a title="Store Hours &amp; Locations" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/locations">
            Store Hours &amp; Locations
          </a>
          <a title="About Us" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/about">
            About Us
          </a>
          <a title="Contact" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/contact">
            Contact
          </a>
        </nav>

        <!-- Mobile Header Bar -->
        <div class="flex lg:hidden justify-between items-center py-2.5">
          <span class="text-[#0B0B0E] font-black text-sm tracking-wide uppercase font-heading">Menu Navigation</span>
          <button id="mobile-menu-btn" type="button" class="text-[#0B0B0E] p-1.5 hover:bg-black/10 rounded-lg transition-colors focus:outline-none cursor-pointer" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobile-nav" class="fixed inset-0 z-50 hidden" aria-hidden="true">
    <div id="mobile-nav-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"></div>
    <aside class="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 overflow-hidden">
      <div class="p-4 bg-[#FFC72C] flex items-center justify-between border-b border-yellow-400">
        <span class="font-heading font-black text-base text-[#0B0B0E] uppercase">WaffleHouse Menu</span>
        <button id="mobile-close-btn" class="p-1 rounded-lg text-[#0B0B0E] hover:bg-black/10" aria-label="Close menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm font-bold">
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/menu">Full Menu &amp; Prices</a>
        <a class="block py-2 border-b border-gray-100 text-amber-700 bg-amber-50 px-2 rounded-lg" href="/menu/pdf">Printable Menu (PDF)</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/waffle-house-catering/">Catering</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/nutrition">Nutrition Overview</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/waffle-house-calories-allergies/">Calories &amp; Allergies</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/waffle-house-dietary-guide/">Dietary Guide</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/coupons">Deals &amp; Coupons</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/blog/">Blog &amp; Guides</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/locations">Store Hours &amp; Locations</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/about">About Us</a>
        <a class="block py-2 text-[#0B0B0E]" href="/contact">Contact</a>
      </div>
    </aside>
  </div>

  <main id="main-content" tabindex="-1" class="flex-1">

    <!-- ================= BREADCRUMBS ================= -->
    <nav aria-label="breadcrumb" class="bg-[#FBFBFC] py-3 px-4 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol class="flex flex-wrap items-center gap-2 text-sm font-sans">
          <li class="flex items-center gap-2">
            <a class="text-[#0B0B0E] hover:text-amber-600 font-bold transition-colors" href="/">Home</a>
            <span class="text-gray-300">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"></path>
              </svg>
            </span>
          </li>
          <li class="flex items-center gap-2">
            <a class="text-[#0B0B0E] hover:text-amber-600 font-bold transition-colors" href="/menu">Menu &amp; Prices</a>
            <span class="text-gray-300">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"></path>
              </svg>
            </span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-amber-600 font-bold" aria-current="page">Menu PDF</span>
          </li>
        </ol>
      </div>
    </nav>

    <!-- ================= HERO SECTION (2-COLUMN WITH 3D PDF MOCKUP) ================= -->
    <section class="bg-white py-12 md:py-16 px-4 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left Column: Copy & Actions (7 cols) -->
          <div class="lg:col-span-7 text-left">
            
            <!-- Edition Pill Badge -->
            <div class="inline-flex items-center gap-2 bg-[#FFF8E1] border border-[#FFC72C] text-[#0B0B0E] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#FFC72C] animate-pulse"></span>
              <span>Printable Menu &bull; May 2026 Edition</span>
            </div>

            <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0B0E] font-heading tracking-tight mb-4 uppercase leading-tight">
              Waffle House Menu PDF
            </h1>
            
            <p class="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
              10 pages covering all 110+ diner dishes and drinks, from world-famous sweet cream waffles and All-Star Special™ platters to Texas Melts and Hashbrown Bowls, with calories, serving sizes, macronutrients, and allergens printed beside each item.
            </p>

            <!-- Action Download & Print Buttons -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 mb-4" id="quick-actions">
              <a 
                href="/assets/waffle-house-menu-nutrition-facts-2026.pdf" 
                download="Waffle-House-Menu-and-Nutrition-Guide-2026.pdf"
                class="inline-flex items-center justify-center gap-2.5 bg-[#FFC72C] text-[#0B0B0E] font-heading font-black text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-2xl shadow-sm hover:brightness-105 transition-all transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5 text-[#0B0B0E]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                </svg>
                <span>Download PDF (73.4 KB)</span>
              </a>

              <a 
                href="/assets/waffle-house-menu-nutrition-facts-2026.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 bg-[#0B0B0E] text-white font-heading font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-2xl hover:bg-gray-800 transition-all shadow-xs"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
                <span>Open in your browser</span>
              </a>

              <button 
                type="button" 
                onclick="window.print()" 
                class="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-[#FFC72C] text-[#0B0B0E] bg-white font-heading font-bold text-sm sm:text-base px-5 py-3.5 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.656"/>
                </svg>
                <span>Print Menu</span>
              </button>
            </div>

            <p class="text-xs text-gray-500 mb-6 font-medium">
              Updated May 2026 &bull; Official Nutritional &amp; Dietary Tables &bull; 10 Landscape Pages &bull; PDF format
            </p>

            <!-- 4 Quick Fact Metrics Cards (Cheesecake Factory Layout) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="bg-[#FBFBFC] border-2 border-gray-200 rounded-2xl p-3 text-center">
                <span class="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Pages</span>
                <span class="text-2xl font-black text-[#0B0B0E] font-heading mt-0.5 block">10</span>
              </div>
              <div class="bg-[#FBFBFC] border-2 border-gray-200 rounded-2xl p-3 text-center">
                <span class="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Dishes &amp; Drinks</span>
                <span class="text-2xl font-black text-[#0B0B0E] font-heading mt-0.5 block">110+</span>
              </div>
              <div class="bg-[#FBFBFC] border-2 border-gray-200 rounded-2xl p-3 text-center">
                <span class="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Sections</span>
                <span class="text-2xl font-black text-[#0B0B0E] font-heading mt-0.5 block">12</span>
              </div>
              <div class="bg-[#FBFBFC] border-2 border-[#FFC72C] bg-[#FFFDF7] rounded-2xl p-3 text-center">
                <span class="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Paper</span>
                <span class="text-base font-black text-[#0B0B0E] font-heading mt-1 block">Letter &amp; A4</span>
              </div>
            </div>

          </div>

          <!-- Right Column: 3D PDF Mockup Image (5 cols) -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative group w-full max-w-md">
              <div class="relative rounded-3xl overflow-hidden border-2 border-[#FFC72C]/50 shadow-2xl bg-white p-2.5">
                <img 
                  src="/assets/waffle-house-menu-pdf-mockup.jpg" 
                  alt="Waffle House Menu &amp; Nutrition Guide Official 2026 Printable PDF Booklet Mockup" 
                  class="w-full h-auto rounded-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
                  width="600"
                  height="600"
                  loading="eager"
                />
                <div class="absolute top-5 right-5 bg-[#0B0B0E]/90 text-[#FFC72C] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-xs border border-[#FFC72C]/40 font-heading shadow-md">
                  10 Pages &bull; Official 2026 Guide
                </div>
              </div>
              <p class="text-center text-xs text-gray-500 mt-3 font-medium">
                Photorealistic 3D preview of the 10-page printable landscape menu guide.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ================= WHAT'S INSIDE SECTION (CHEESECAKE FACTORY EXACT 3 CARDS) ================= -->
    <section class="py-14 md:py-16 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <p class="text-gray-500 text-xs font-black uppercase tracking-[0.2em] font-heading mb-2">Guide Overview</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0B0E] font-heading uppercase tracking-tight">
            What's Inside
          </h2>
          <p class="text-gray-600 text-sm sm:text-base mt-2">
            Every diner favorite laid out clearly for easy kitchen reference, travel planning, and group orders.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Card 1: A contents page that jumps -->
          <div class="bg-white rounded-3xl p-7 border-2 border-gray-200 hover:border-[#FFC72C] transition-all shadow-xs flex flex-col">
            <div class="w-12 h-12 rounded-2xl bg-[#FFF8E1] border border-[#FFC72C] flex items-center justify-center text-[#0B0B0E] font-black text-xl mb-5 font-heading">
              1
            </div>
            <h3 class="text-xl font-black text-[#0B0B0E] font-heading mb-3">A contents page that jumps</h3>
            <p class="text-gray-600 text-sm leading-relaxed flex-1">
              The first page lays out all 12 diner sections — from Breakfast Classics to Hashbrown Bowls, Texas Melts, and Beverages. On tablets, phones, or PDF readers, every section header links right to that page.
            </p>
          </div>

          <!-- Card 2: One line per dish -->
          <div class="bg-white rounded-3xl p-7 border-2 border-gray-200 hover:border-[#FFC72C] transition-all shadow-xs flex flex-col">
            <div class="w-12 h-12 rounded-2xl bg-[#FFF8E1] border border-[#FFC72C] flex items-center justify-center text-[#0B0B0E] font-black text-xl mb-5 font-heading">
              2
            </div>
            <h3 class="text-xl font-black text-[#0B0B0E] font-heading mb-3">One line per dish</h3>
            <p class="text-gray-600 text-sm leading-relaxed flex-1">
              Every dish gets a single horizontal row across landscape orientation: calories, total fat, saturated fat, sodium, carbs, protein, and allergens clearly printed beside each item for immediate comparison.
            </p>
          </div>

          <!-- Card 3: Built for paper -->
          <div class="bg-white rounded-3xl p-7 border-2 border-gray-200 hover:border-[#FFC72C] transition-all shadow-xs flex flex-col">
            <div class="w-12 h-12 rounded-2xl bg-[#FFF8E1] border border-[#FFC72C] flex items-center justify-center text-[#0B0B0E] font-black text-xl mb-5 font-heading">
              3
            </div>
            <h3 class="text-xl font-black text-[#0B0B0E] font-heading mb-3">Built for paper</h3>
            <p class="text-gray-600 text-sm leading-relaxed flex-1">
              Formatted in crisp high-contrast black and yellow tables for standard 8.5 &times; 11 inch US Letter or A4 paper. Crisp typography avoids ink bleeding so you can keep a copy on the fridge or take orders on group runs.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- ================= INTERACTIVE 10-PAGE DIRECTORY & TABLE EXPLORER ================= -->
    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200" id="directory">
      <div class="max-w-6xl mx-auto">
        
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="text-xs font-black text-gray-500 uppercase tracking-widest font-heading mb-2 block">Interactive Explorer</span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0B0E] font-heading uppercase tracking-tight">
            Browse The 10-Page Waffle House Menu Directory
          </h2>
          <p class="text-gray-600 text-sm sm:text-base mt-2">
            Click on any page number below to inspect the verified nutritional data directly on your screen without opening a PDF reader.
          </p>
        </div>

        <!-- Page Navigator Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-8" id="jump-nav">
          ${pageData.map((p, idx) => `
            <button 
              type="button" 
              class="page-tab-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading transition-all cursor-pointer ${idx === 0 ? 'bg-[#FFC72C] text-[#0B0B0E] shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
              data-page="${p.pageNum}"
            >
              Page ${p.pageNum}
            </button>
          `).join('')}
        </div>

        <!-- 10 Page Content Panels -->
        <div id="pages-container">
          ${pageData.map((p, idx) => `
            <div id="page-panel-${p.pageNum}" class="page-panel ${idx === 0 ? 'block' : 'hidden'} printable-section">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-4 rounded-2xl bg-[#FFF8E1] border-2 border-[#FFC72C]">
                <div>
                  <h3 class="text-lg sm:text-xl font-black text-[#0B0B0E] font-heading uppercase">${p.title}</h3>
                  <p class="text-xs sm:text-sm text-gray-600 font-medium">${p.subtitle}</p>
                </div>
                <span class="bg-[#0B0B0E] text-[#FFC72C] text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shrink-0 font-heading text-center">
                  Official Sheet #${p.pageNum}
                </span>
              </div>

              <!-- Responsive Table -->
              <div class="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-2xs mb-6">
                <table class="w-full text-left text-xs sm:text-sm">
                  <thead class="bg-gray-100 text-[#0B0B0E] font-heading font-black border-b border-gray-200 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th class="py-3 px-3.5">Menu Item Name</th>
                      <th class="py-3 px-2 text-center">Calories</th>
                      <th class="py-3 px-2 text-center">Total Fat</th>
                      <th class="py-3 px-2 text-center">Sat Fat</th>
                      <th class="py-3 px-2 text-center">Sodium</th>
                      <th class="py-3 px-2 text-center">Carbs</th>
                      <th class="py-3 px-2 text-center">Protein</th>
                      <th class="py-3 px-3">Allergens Disclosed</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    ${p.items.map(it => `
                      <tr class="hover:bg-amber-50/40 transition-colors">
                        <td class="py-2.5 px-3.5 font-bold text-[#0B0B0E]">${it.name}</td>
                        <td class="py-2.5 px-2 text-center font-black text-amber-700 bg-amber-50/30">${it.cal}</td>
                        <td class="py-2.5 px-2 text-center text-gray-600 font-semibold">${it.fat}</td>
                        <td class="py-2.5 px-2 text-center text-gray-600 font-semibold">${it.satFat}</td>
                        <td class="py-2.5 px-2 text-center text-gray-600 font-semibold">${it.sodium}</td>
                        <td class="py-2.5 px-2 text-center text-gray-600 font-semibold">${it.carbs}</td>
                        <td class="py-2.5 px-2 text-center font-bold text-gray-900">${it.protein}</td>
                        <td class="py-2.5 px-3">
                          ${it.allergens !== 'None' 
                            ? `<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">${it.allergens}</span>` 
                            : `<span class="text-gray-400 text-xs">None</span>`}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    </section>

    <!-- ================= PRINTING & PAPER GUIDE ================= -->
    <section class="py-14 md:py-16 px-4 bg-[#FBFBFC] border-b border-gray-200" id="print-tips">
      <div class="max-w-5xl mx-auto">
        
        <div class="bg-white rounded-3xl border-2 border-[#FFC72C] p-6 sm:p-10 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.656"/>
              </svg>
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-[#0B0B0E] font-heading uppercase">
              Paper &amp; Printing Best Practices
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed font-sans">
            <div>
              <h4 class="font-bold text-[#0B0B0E] text-base mb-1">Standard Paper Formatting (US Letter &amp; A4)</h4>
              <p class="text-gray-600">
                In your computer or mobile print dialog, set the orientation to <strong>Landscape</strong> and choose <strong>&ldquo;Fit to printable area&rdquo;</strong>. This prevents margin clipping and keeps all 12 columns perfectly centered across the sheet.
              </p>
            </div>
            <div>
              <h4 class="font-bold text-[#0B0B0E] text-base mb-1">Double-Sided Printing &amp; Ink Conservation</h4>
              <p class="text-gray-600">
                If printing double-sided, select <strong>&ldquo;Flip on short edge&rdquo;</strong> for landscape layouts. To save color cartridge ink, select &ldquo;Black and White / Grayscale&rdquo; — all borders and numbers maintain 100% legibility.
              </p>
            </div>
            <div>
              <h4 class="font-bold text-[#0B0B0E] text-base mb-1">Group Orders &amp; Road Trip Logistics</h4>
              <p class="text-gray-600">
                Printing Pages 1, 4, and 5 provides the essentials for group breakfast call-ins, tailgate catering, sports teams, and road-trippers passing through the Interstate diner corridor.
              </p>
            </div>
            <div>
              <h4 class="font-bold text-[#0B0B0E] text-base mb-1">Prices &amp; Seasonal Revisions</h4>
              <p class="text-gray-600">
                Diner pricing varies slightly by location and local food cost index ($12.35 – $13.55 average for All-Star Special). When menu updates occur, this PDF document is replaced with the latest verified edition.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ================= WHEN THE WEBSITE IS BETTER (CHEESECAKE FACTORY EXACT 4 CARDS) ================= -->
    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <p class="text-gray-500 text-xs font-black uppercase tracking-[0.2em] font-heading mb-2">Live Digital Features</p>
          <h2 class="text-2xl sm:text-3xl font-black text-[#0B0B0E] font-heading uppercase mb-3">
            When The Website Is Better
          </h2>
          <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
            Paper can't search, filter, or calculate custom orders. When you need real-time prices or custom hashbrown combos, use the live website:
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <a href="/menu" class="group bg-[#FAF7F0] border-2 border-gray-200 hover:border-[#FFC72C] rounded-2xl p-5 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-[#FFC72C] flex items-center justify-center text-[#0B0B0E] font-black mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
              </div>
              <h3 class="text-base font-black text-[#0B0B0E] font-heading group-hover:text-amber-700 transition-colors mb-1.5">Interactive menu</h3>
              <p class="text-gray-600 text-xs leading-relaxed">
                Browse full food photos, customizable hashbrown toppings (scattered, smothered, covered), and live pricing across categories.
              </p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-black text-amber-700 mt-4 font-heading group-hover:translate-x-1 transition-transform">
              Explore Menu &rarr;
            </span>
          </a>

          <a href="/waffle-house-calories-allergies/" class="group bg-[#FAF7F0] border-2 border-gray-200 hover:border-[#FFC72C] rounded-2xl p-5 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-[#0B0B0E] flex items-center justify-center text-[#FFC72C] font-black mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
              </div>
              <h3 class="text-base font-black text-[#0B0B0E] font-heading group-hover:text-amber-700 transition-colors mb-1.5">Allergen filter</h3>
              <p class="text-gray-600 text-xs leading-relaxed">
                Instantly filter out dairy, eggs, soy, wheat, or gluten to find safe diner meals with kitchen cross-contact precautions.
              </p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-black text-amber-700 mt-4 font-heading group-hover:translate-x-1 transition-transform">
              Filter Allergens &rarr;
            </span>
          </a>

          <a href="/nutrition" class="group bg-[#FAF7F0] border-2 border-gray-200 hover:border-[#FFC72C] rounded-2xl p-5 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 font-black mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
              </div>
              <h3 class="text-base font-black text-[#0B0B0E] font-heading group-hover:text-amber-700 transition-colors mb-1.5">Nutrition facts</h3>
              <p class="text-gray-600 text-xs leading-relaxed">
                Full macro breakdown, sodium levels, and calorie counts for customized combo orders and weight loss planning.
              </p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-black text-amber-700 mt-4 font-heading group-hover:translate-x-1 transition-transform">
              View Nutrition &rarr;
            </span>
          </a>

          <a href="/locations" class="group bg-[#FAF7F0] border-2 border-gray-200 hover:border-[#FFC72C] rounded-2xl p-5 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-900 font-black mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              </div>
              <h3 class="text-base font-black text-[#0B0B0E] font-heading group-hover:text-amber-700 transition-colors mb-1.5">Locations near you</h3>
              <p class="text-gray-600 text-xs leading-relaxed">
                Check 24/7 diner hours, directions, phone numbers, and dine-in or to-go ordering at over 1,900 restaurants.
              </p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-black text-amber-700 mt-4 font-heading group-hover:translate-x-1 transition-transform">
              Find Diners &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- ================= DISCOVER MORE (CHEESECAKE FACTORY EXACT PILLS) ================= -->
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-xl sm:text-2xl font-black text-[#0B0B0E] font-heading uppercase mb-2">
          Discover More
        </h2>
        <p class="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto mb-6">
          Explore recipes, catering options, seasonal deals, and secret ordering hacks:
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a href="/recipes/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFC72C] text-[#0B0B0E] font-heading font-bold text-xs sm:text-sm hover:shadow-xs transition-all">
            <span>Find Recipes</span>
            <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <a href="/locations" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFC72C] text-[#0B0B0E] font-heading font-bold text-xs sm:text-sm hover:shadow-xs transition-all">
            <span>Store Hours &amp; Locations</span>
            <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <a href="/waffle-house-catering/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFC72C] text-[#0B0B0E] font-heading font-bold text-xs sm:text-sm hover:shadow-xs transition-all">
            <span>Waffle House Catering</span>
            <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <a href="/coupons" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFC72C] text-[#0B0B0E] font-heading font-bold text-xs sm:text-sm hover:shadow-xs transition-all">
            <span>Deals &amp; Coupons</span>
            <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <a href="/blog/waffle-house-secret-menu-items/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFC72C] text-[#0B0B0E] font-heading font-bold text-xs sm:text-sm hover:shadow-xs transition-all">
            <span>Secret Menu Items</span>
            <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <a href="/waffle-house-all-star-special-price/" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFC72C] text-[#0B0B0E] font-heading font-bold text-xs sm:text-sm hover:shadow-xs transition-all">
            <span>All Star Special Price</span>
            <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ================= FREQUENTLY ASKED QUESTIONS (HOMEPAGE EXACT STYLING) ================= -->
    <section class="py-16 md:py-20 bg-[#F9FAFB] border-t border-gray-200" id="faq">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1 font-heading">Got Questions?</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B0B0E] tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p class="text-gray-600 text-sm sm:text-base mt-2 font-sans">
            Everything you need to know about the Waffle House Menu PDF, printing tips, calories, and nutrition facts.
          </p>
        </div>

        <!-- FAQ Container with Brand Yellow Border (Exact Homepage Style) -->
        <div class="border-2 border-[#FFC72C] rounded-3xl p-5 sm:p-7 bg-[#FAF7F0] shadow-sm my-6">
          <div class="space-y-3 font-sans" id="home-faq-list">
            
            <!-- FAQ 1 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>Can I download the official Waffle House menu as a PDF?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Yes! You can download the complete, verified 10-page <strong>Waffle House Menu &amp; Nutrition Guide PDF (2026 Edition)</strong> right here. It includes itemized calories, macros, sodium, and allergen indicators for over 110 diner items.
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>What information is included in the 10-page Waffle House PDF?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                The 10-page guide provides detailed nutritional tables for the <strong>All-Star Special™</strong>, Breakfast Hashbrown Bowls, Classic Dinners, Toddle House&reg; Omelets, Texas Melts, 100% Angus Burgers, Sweet Cream Waffles, Grilled Biscuits, Southern Pies, and Beverages. Every item includes Calories, Total Fat, Saturated Fat, Trans Fat, Cholesterol, Sodium, Total Carbs, Dietary Fiber, Sugars, Protein, and Allergen disclosures.
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>How do I print the Waffle House menu at home on US Letter or A4 paper?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                When printing from Chrome, Safari, Edge, or Adobe Acrobat, set your paper size to <strong>US Letter (8.5 &times; 11 inches)</strong> or <strong>A4</strong>, orientation to <strong>Landscape</strong>, and select <strong>&ldquo;Fit to printable area&rdquo;</strong>. You can also click the &ldquo;Print Sheet&rdquo; button above to trigger instant browser printing.
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>Why are menu prices listed as regional estimates?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Waffle House operates more than 1,900 franchised and corporate restaurants across 25 U.S. states. Prices fluctuate slightly by market supply, interstate travel plazas, and local tax rates (averaging $12.35 to $13.55 for the All-Star Special). For live pricing updates by state and restaurant, explore our <a href="/menu" class="text-amber-700 underline font-bold">Interactive Menu &amp; Prices</a> page.
              </div>
            </div>

            <!-- FAQ 5 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>How can I find gluten-free or low-calorie items in the PDF?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Check the <strong>Allergens</strong> column on each page. Plain farm eggs (180 cal), grilled chicken breasts (140 cal), and regular hashbrowns (190 cal) are naturally wheat-free. For a full breakdown of kitchen cross-contact precautions, visit our dedicated <a href="/waffle-house-calories-allergies/" class="text-amber-700 underline font-bold">Calories &amp; Allergies Guide</a>.
              </div>
            </div>

            <!-- FAQ 6 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>How frequently is this printable menu PDF updated?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                This document is maintained and updated in sync with Waffle House corporate nutritional disclosures (current edition: May 2026). Whenever recipe formulations, sodium benchmarks, or menu offerings change, the PDF and directory tables are refreshed immediately.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- ================= FOOTER (EXACT HOMEPAGE FOOTER) ================= -->
  <footer id="footer-section" class="bg-[#0B0B0E] text-white pt-10 pb-8 font-sans border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Section: Brand Identity & Intro Tagline -->
      <div class="mb-8 pb-6 border-b border-gray-800/80">
        <div class="flex items-center gap-2.5 mb-2">
          <img src="/assets/logo-icon.png" width="32" height="32" alt="Waffle House Menu Guide Logo" decoding="async" loading="lazy" class="w-8 h-8 shrink-0 rounded-lg">
          <span class="font-heading font-black text-lg text-white tracking-tight">
            WaffleHouse <span class="text-[#FFC72C]">Menu Guide</span>
          </span>
        </div>
        <p class="text-gray-400 text-xs leading-relaxed max-w-xl">
          Your complete guide to the Waffle House menu, including current prices, full nutrition facts, allergen information, catering options, and restaurant locations across the United States.
        </p>
      </div>

      <!-- 3-Column Navigation Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-8 border-b border-gray-800/80">
        
        <!-- Column 1: Menu & nutrition -->
        <div>
          <h4 class="font-heading font-bold text-white text-[13px] uppercase tracking-wider mb-3.5">
            Menu &amp; nutrition
          </h4>
          <ul class="space-y-2 text-[13px]">
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/menu">
                Full menu
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/nutrition">
                Nutrition
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/waffle-house-calories-allergies/">
                Allergen filter
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/waffle-house-dietary-guide/">
                Dietary guides
              </a>
            </li>
            <li>
              <a class="text-[#FFC72C] font-bold transition-colors duration-150 inline-block" href="/menu/pdf">
                Printable menu (PDF)
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/menu#panel-waffles">
                Breakfast &amp; Waffles
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/waffle-house-catering/">
                Catering
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Plan a visit -->
        <div>
          <h4 class="font-heading font-bold text-white text-[13px] uppercase tracking-wider mb-3.5">
            Plan a visit
          </h4>
          <ul class="space-y-2 text-[13px]">
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/locations">
                Store hours &amp; locations
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/coupons">
                Deals &amp; coupons
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/blog/">
                All blogs &amp; guides
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/prices-by-state">
                Prices by state
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/menu#panel-lunch-dinner">
                Lunch &amp; dinner
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/menu#panel-beverages">
                Beverages &amp; coffee
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: About & legal -->
        <div>
          <h4 class="font-heading font-bold text-white text-[13px] uppercase tracking-wider mb-3.5">
            About &amp; legal
          </h4>
          <ul class="space-y-2 text-[13px]">
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/about">
                About us
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/contact">
                Contact
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/#faq">
                FAQ
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/privacy-policy">
                Privacy policy
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/terms-and-conditions">
                Terms &amp; conditions
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/disclaimer">
                Disclaimer
              </a>
            </li>
            <li>
              <a class="text-gray-400 hover:text-[#FFC72C] transition-colors duration-150 inline-block" href="/cookies-policy">
                Cookies policy
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Disclaimer & Copyright Row -->
      <div class="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p class="text-center md:text-left leading-relaxed">
          <strong class="text-gray-400">Disclaimer:</strong> WaffleHouse-Menu.com is an independent consumer information resource and is not affiliated with, endorsed by, or sponsored by Waffle House, Inc. All trademarks, service marks, and trade names are the property of their respective owners. Prices and nutritional formulations can vary by location.
        </p>
        <p class="whitespace-nowrap font-medium text-gray-400">
          &copy; 2026 WaffleHouse-Menu.com. All rights reserved.
        </p>
      </div>

    </div>
  </footer>

  <!-- Scripts: Interactive Tab Switching & Homepage FAQ Accordion -->
  <script>
    // Tab switching for 10-page directory
    const tabBtns = document.querySelectorAll('.page-tab-btn');
    const panels = document.querySelectorAll('.page-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.getAttribute('data-page');

        // Reset all buttons
        tabBtns.forEach(b => {
          b.classList.remove('bg-[#FFC72C]', 'text-[#0B0B0E]', 'shadow-xs');
          b.classList.add('bg-gray-100', 'text-gray-700');
        });

        // Activate clicked button
        btn.classList.remove('bg-gray-100', 'text-gray-700');
        btn.classList.add('bg-[#FFC72C]', 'text-[#0B0B0E]', 'shadow-xs');

        // Show matching panel
        panels.forEach(p => {
          p.classList.add('hidden');
          p.classList.remove('block');
        });

        const activePanel = document.getElementById('page-panel-' + page);
        if (activePanel) {
          activePanel.classList.remove('hidden');
          activePanel.classList.add('block');
        }
      });
    });

    // Mobile navigation toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileClose = document.getElementById('mobile-close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileBackdrop = document.getElementById('mobile-nav-backdrop');

    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener('click', () => {
        mobileNav.classList.remove('hidden');
      });
      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          mobileNav.classList.add('hidden');
        });
      }
      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', () => {
          mobileNav.classList.add('hidden');
        });
      }
    }

    // Homepage FAQ Accordion
    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('hidden');
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  </script>

</body>
</html>
`;
}

// 1. Create directory 'menu/pdf'
fs.mkdirSync('menu/pdf', { recursive: true });

const html = generateHtml();

// 2. Write menu/pdf/index.html
fs.writeFileSync('menu/pdf/index.html', html, 'utf8');
console.log('Successfully wrote menu/pdf/index.html (' + (html.length / 1024).toFixed(1) + ' KB)');

// 3. Write menu-pdf.html as mirror
fs.writeFileSync('menu-pdf.html', html, 'utf8');
console.log('Successfully wrote menu-pdf.html');

// 4. Update nutrition-guide-2026.html as mirror so any existing links work seamlessly
fs.writeFileSync('nutrition-guide-2026.html', html, 'utf8');
console.log('Successfully updated nutrition-guide-2026.html');

// 5. Update waffle-house-menu-pdf/index.html as mirror
fs.mkdirSync('waffle-house-menu-pdf', { recursive: true });
fs.writeFileSync('waffle-house-menu-pdf/index.html', html, 'utf8');
console.log('Successfully wrote waffle-house-menu-pdf/index.html');

// 6. Also create menu/index.html if not present, copying menu.html so /menu/ never breaks!
if (!fs.existsSync('menu/index.html')) {
  fs.copyFileSync('menu.html', 'menu/index.html');
  console.log('Created menu/index.html from menu.html for safety');
}
