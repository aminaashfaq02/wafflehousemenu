import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function generatePdf() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // 11 Pages of structured Waffle House Nutrition Data
  const pagesData = [
    {
      pageNumber: 1,
      sections: [
        {
          title: "BREAKFAST ALL-STAR SPECIAL™",
          rows: [
            { name: "2 Eggs - Scrambled", cal: "180", fatCal: "120", fat: "14", satFat: "4", transFat: "0", chol: "370", sodium: "120", carbs: "2", fiber: "0", sugars: "2", protein: "12", allergens: "Egg, Soy." },
            { name: "Includes: Classic Waffle", cal: "410", fatCal: "160", fat: "18", satFat: "10", transFat: "0", chol: "50", sodium: "870", carbs: "55", fiber: "2", sugars: "15", protein: "8", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat." },
            { name: "Plus choice: White Toast", cal: "230", fatCal: "110", fat: "13", satFat: "4.5", transFat: "0", chol: "0", sodium: "370", carbs: "26", fiber: "1", sugars: "3", protein: "4", allergens: "Milk, Soy, Wheat." },
            { name: "Wheat Toast", cal: "220", fatCal: "110", fat: "12", satFat: "4.5", transFat: "0", chol: "0", sodium: "330", carbs: "22", fiber: "4", sugars: "2", protein: "8", allergens: "Milk, Soy, Wheat." },
            { name: "Raisin Toast", cal: "300", fatCal: "130", fat: "14", satFat: "6", transFat: "0", chol: "0", sodium: "360", carbs: "38", fiber: "2", sugars: "16", protein: "6", allergens: "Milk, Soy, Wheat." },
            { name: "Grilled Biscuit", cal: "380", fatCal: "230", fat: "25", satFat: "14", transFat: "0", chol: "0", sodium: "900", carbs: "34", fiber: "1", sugars: "1", protein: "5", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Texas Toast - 1 Slice", cal: "200", fatCal: "110", fat: "12", satFat: "4.5", transFat: "0", chol: "0", sodium: "300", carbs: "19", fiber: "1", sugars: "2", protein: "3", allergens: "Milk, Soy, Wheat." },
            { name: "Grits", cal: "90", fatCal: "25", fat: "2.5", satFat: "0.5", transFat: "0", chol: "0", sodium: "300", carbs: "16", fiber: "1", sugars: "0", protein: "1", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Hashbrowns", cal: "190", fatCal: "60", fat: "7", satFat: "2.5", transFat: "0", chol: "0", sodium: "240", carbs: "29", fiber: "3", sugars: "0", protein: "3", allergens: "Soy." },
            { name: "Sliced Tomatoes", cal: "10", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "0", carbs: "2", fiber: "1", sugars: "2", protein: "1", allergens: "None" },
            { name: "Plus choice: Bacon (3 Slices)", cal: "140", fatCal: "100", fat: "12", satFat: "4", transFat: "0", chol: "30", sodium: "520", carbs: "0", fiber: "0", sugars: "0", protein: "8", allergens: "None" },
            { name: "Sausage (2 Patties)", cal: "260", fatCal: "220", fat: "24", satFat: "8", transFat: "0", chol: "50", sodium: "510", carbs: "1", fiber: "0", sugars: "0", protein: "10", allergens: "None" },
            { name: "City Ham", cal: "110", fatCal: "25", fat: "2.5", satFat: "1", transFat: "0", chol: "30", sodium: "740", carbs: "7", fiber: "0", sugars: "5", protein: "15", allergens: "None" },
            { name: "Country Ham", cal: "210", fatCal: "80", fat: "9", satFat: "3", transFat: "0", chol: "95", sodium: "1720", carbs: "0", fiber: "0", sugars: "0", protein: "32", allergens: "None" },
          ]
        },
        {
          title: "BREAKFAST HASHBROWN BOWLS",
          rows: [
            { name: "Sausage Egg & Cheese Bowl", cal: "920", fatCal: "550", fat: "60", satFat: "21", transFat: "0", chol: "445", sodium: "1620", carbs: "63", fiber: "5", sugars: "3", protein: "32", allergens: "Egg, Milk, Soy." },
            { name: "Bacon Egg & Cheese Bowl", cal: "800", fatCal: "430", fat: "48", satFat: "17", transFat: "0", chol: "425", sodium: "1630", carbs: "62", fiber: "5", sugars: "3", protein: "30", allergens: "Egg, Milk, Soy." },
            { name: "Ham Egg & Cheese Bowl", cal: "780", fatCal: "350", fat: "39", satFat: "13", transFat: "0", chol: "445", sodium: "2110", carbs: "66", fiber: "5", sugars: "5", protein: "40", allergens: "Egg, Milk, Soy." }
          ]
        }
      ]
    },
    {
      pageNumber: 2,
      sections: [
        {
          title: "EGG BREAKFASTS",
          rows: [
            { name: "2 Egg Breakfast: 2 Eggs - Scrambled", cal: "180", fatCal: "120", fat: "14", satFat: "4", transFat: "0", chol: "370", sodium: "120", carbs: "2", fiber: "0", sugars: "2", protein: "12", allergens: "Egg, Soy." },
            { name: "Cheese 'N Eggs: 2 Scrambled with Cheese", cal: "280", fatCal: "200", fat: "22", satFat: "9", transFat: "0", chol: "400", sodium: "620", carbs: "2", fiber: "0", sugars: "2", protein: "18", allergens: "Egg, Milk, Soy." },
            { name: "T-Bone & Eggs: T-Bone & 2 Scrambled Eggs", cal: "1230", fatCal: "660", fat: "73", satFat: "23", transFat: "0", chol: "1015", sodium: "1835", carbs: "3", fiber: "0", sugars: "3", protein: "139", allergens: "Egg, Soy." },
            { name: "Steak & Eggs: Sirloin Steak & 2 Eggs", cal: "660", fatCal: "400", fat: "46", satFat: "16", transFat: "1", chol: "845", sodium: "615", carbs: "4", fiber: "1", sugars: "3", protein: "59", allergens: "Egg, Soy." }
          ]
        }
      ]
    },
    {
      pageNumber: 3,
      sections: [
        {
          title: "EGG BREAKFASTS CONTINUED",
          rows: [
            { name: "Country Ham & Eggs: Ham & 2 Scrambled Eggs", cal: "640", fatCal: "280", fat: "33", satFat: "9", transFat: "0", chol: "925", sodium: "2105", carbs: "5", fiber: "2", sugars: "3", protein: "83", allergens: "Egg, Soy." },
            { name: "Chicken & Eggs: Grilled Chicken & 2 Eggs", cal: "550", fatCal: "340", fat: "39", satFat: "12.5", transFat: "0", chol: "805", sodium: "555", carbs: "3", fiber: "0", sugars: "3", protein: "46", allergens: "Egg, Soy." },
            { name: "Meat Lover's Chicken & Eggs (2 Breasts)", cal: "500", fatCal: "260", fat: "30.5", satFat: "8.5", transFat: "0", chol: "835", sodium: "1175", carbs: "4", fiber: "1", sugars: "3", protein: "54", allergens: "Egg, Soy." },
            { name: "Pork Chops & Eggs: 2 Pork Chops & 2 Eggs", cal: "570", fatCal: "320", fat: "37", satFat: "11", transFat: "0", chol: "840", sodium: "1965", carbs: "3", fiber: "0", sugars: "3", protein: "57", allergens: "Egg, Soy." }
          ]
        }
      ]
    },
    {
      pageNumber: 4,
      sections: [
        {
          title: "WAFFLES",
          rows: [
            { name: "Classic Waffle House Waffle", cal: "410", fatCal: "160", fat: "18", satFat: "10", transFat: "0", chol: "50", sodium: "870", carbs: "55", fiber: "2", sugars: "15", protein: "8", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat." },
            { name: "Pecan Waffle", cal: "560", fatCal: "300", fat: "33", satFat: "11.5", transFat: "0", chol: "50", sodium: "870", carbs: "58", fiber: "4", sugars: "16", protein: "10", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat." },
            { name: "Chocolate Chip Waffle", cal: "520", fatCal: "210", fat: "24", satFat: "13.5", transFat: "0", chol: "50", sodium: "870", carbs: "71", fiber: "3", sugars: "28", protein: "9", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Peanut Butter Chip Waffle", cal: "560", fatCal: "240", fat: "26", satFat: "17", transFat: "0", chol: "50", sodium: "965", carbs: "72", fiber: "3", sugars: "31", protein: "11", allergens: "Egg, Milk, Peanut, Soy, Wheat." }
          ]
        },
        {
          title: "HASHBROWNS AND TOPPINGS",
          rows: [
            { name: "Regular Hashbrowns", cal: "190", fatCal: "60", fat: "7", satFat: "2.5", transFat: "0", chol: "0", sodium: "240", carbs: "29", fiber: "3", sugars: "0", protein: "3", allergens: "Soy." },
            { name: "Large Hashbrowns", cal: "380", fatCal: "130", fat: "14", satFat: "5", transFat: "0", chol: "0", sodium: "490", carbs: "59", fiber: "5", sugars: "1", protein: "5", allergens: "Soy." },
            { name: "Triple Hashbrowns", cal: "570", fatCal: "180", fat: "21", satFat: "7.5", transFat: "0", chol: "0", sodium: "720", carbs: "87", fiber: "9", sugars: "0", protein: "9", allergens: "Soy." },
            { name: "Smothered (Sautéed Onions)", cal: "15", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "0", carbs: "3", fiber: "1", sugars: "1", protein: "0", allergens: "None" },
            { name: "Covered (Melted American Cheese)", cal: "50", fatCal: "40", fat: "4", satFat: "2.5", transFat: "0", chol: "15", sodium: "250", carbs: "0", fiber: "0", sugars: "0", protein: "3", allergens: "Milk, Soy." },
            { name: "Chunked (Hickory Smoked Ham)", cal: "60", fatCal: "10", fat: "1.5", satFat: "0", transFat: "0", chol: "25", sodium: "500", carbs: "2", fiber: "0", sugars: "1", protein: "9", allergens: "None" },
            { name: "Diced (Grilled Tomatoes)", cal: "5", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "0", carbs: "2", fiber: "0", sugars: "1", protein: "0", allergens: "None" },
            { name: "Peppered (Jalapeno Peppers)", cal: "10", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "390", carbs: "2", fiber: "0", sugars: "0", protein: "0", allergens: "None" },
            { name: "Capped (Grilled Mushrooms)", cal: "20", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "280", carbs: "3", fiber: "1", sugars: "1", protein: "2", allergens: "None" },
            { name: "Topped (Bert's Chili™)", cal: "80", fatCal: "25", fat: "3", satFat: "1", transFat: "0", chol: "5", sodium: "380", carbs: "8", fiber: "2", sugars: "1", protein: "5", allergens: "Milk, Soy, Wheat." },
            { name: "Country (Sausage Gravy)", cal: "90", fatCal: "45", fat: "5", satFat: "2", transFat: "0", chol: "5", sodium: "910", carbs: "10", fiber: "0", sugars: "2", protein: "1", allergens: "Egg, Milk, Soy, Wheat." }
          ]
        }
      ]
    },
    {
      pageNumber: 5,
      sections: [
        {
          title: "BREAKFAST SIDES & GRILLED BISCUITS",
          rows: [
            { name: "Bacon (3 Slices)", cal: "140", fatCal: "100", fat: "12", satFat: "4", transFat: "0", chol: "30", sodium: "520", carbs: "0", fiber: "0", sugars: "0", protein: "8", allergens: "None" },
            { name: "Large Bacon (5 Slices)", cal: "230", fatCal: "170", fat: "19", satFat: "7", transFat: "0", chol: "55", sodium: "870", carbs: "1", fiber: "0", sugars: "1", protein: "13", allergens: "None" },
            { name: "Sausage (2 Patties)", cal: "260", fatCal: "220", fat: "24", satFat: "8", transFat: "0", chol: "50", sodium: "510", carbs: "1", fiber: "0", sugars: "0", protein: "10", allergens: "None" },
            { name: "Large Sausage (3 Patties)", cal: "390", fatCal: "320", fat: "36", satFat: "12", transFat: "0", chol: "70", sodium: "770", carbs: "1", fiber: "0", sugars: "0", protein: "15", allergens: "None" },
            { name: "Biscuit & Sausage Gravy", cal: "470", fatCal: "270", fat: "30", satFat: "16", transFat: "0", chol: "5", sodium: "1810", carbs: "44", fiber: "1", sugars: "3", protein: "6", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Sausage Egg & Cheese Biscuit", cal: "650", fatCal: "430", fat: "48", satFat: "22", transFat: "0", chol: "225", sodium: "1470", carbs: "35", fiber: "1", sugars: "2", protein: "19", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Bacon Egg & Cheese Biscuit", cal: "610", fatCal: "400", fat: "44", satFat: "21.5", transFat: "0", chol: "220", sodium: "1560", carbs: "35", fiber: "1", sugars: "2", protein: "19", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Chicken Biscuit", cal: "520", fatCal: "250", fat: "27.5", satFat: "14.5", transFat: "0", chol: "90", sodium: "1830", carbs: "35", fiber: "2", sugars: "1", protein: "34", allergens: "Egg, Milk, Soy, Wheat." }
          ]
        }
      ]
    },
    {
      pageNumber: 6,
      sections: [
        {
          title: "BREAKFAST SANDWICHES AND MELTS",
          rows: [
            { name: "Egg Sandwich", cal: "220", fatCal: "75", fat: "8.5", satFat: "2", transFat: "0", chol: "185", sodium: "320", carbs: "27", fiber: "1", sugars: "4", protein: "10", allergens: "Egg, Soy, Wheat." },
            { name: "Egg & Cheese Sandwich", cal: "270", fatCal: "115", fat: "12.5", satFat: "4.5", transFat: "0", chol: "200", sodium: "570", carbs: "27", fiber: "1", sugars: "4", protein: "13", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Texas Egg & Cheese Melt", cal: "590", fatCal: "360", fat: "39", satFat: "16", transFat: "0", chol: "215", sodium: "1160", carbs: "39", fiber: "2", sugars: "5", protein: "18", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Sausage & Egg Sandwich", cal: "480", fatCal: "295", fat: "32.5", satFat: "10", transFat: "0", chol: "235", sodium: "830", carbs: "28", fiber: "1", sugars: "4", protein: "20", allergens: "Egg, Soy, Wheat." },
            { name: "Texas Sausage, Egg & Cheese Melt", cal: "850", fatCal: "580", fat: "63", satFat: "24", transFat: "0", chol: "265", sodium: "1670", carbs: "40", fiber: "2", sugars: "5", protein: "28", allergens: "Egg, Milk, Soy, Wheat." },
            { name: "Texas Bacon, Egg & Cheese Melt", cal: "730", fatCal: "460", fat: "51", satFat: "20", transFat: "0", chol: "245", sodium: "1680", carbs: "39", fiber: "2", sugars: "5", protein: "26", allergens: "Egg, Milk, Soy, Wheat." }
          ]
        }
      ]
    },
    {
      pageNumber: 7,
      sections: [
        {
          title: "TODDLE HOUSE® OMELET BREAKFASTS",
          rows: [
            { name: "Cheese Omelet (2 Eggs)", cal: "500", fatCal: "420", fat: "46", satFat: "17", transFat: "0", chol: "395", sodium: "620", carbs: "3", fiber: "0", sugars: "3", protein: "17", allergens: "Milk, Egg, Soy." },
            { name: "Ham & Cheese Omelet (2 Eggs)", cal: "560", fatCal: "430", fat: "47.5", satFat: "17", transFat: "0", chol: "420", sodium: "1120", carbs: "5", fiber: "0", sugars: "4", protein: "26", allergens: "Milk, Egg, Soy." },
            { name: "Cheesesteak Omelet (2 Eggs)", cal: "630", fatCal: "490", fat: "53", satFat: "20", transFat: "0", chol: "445", sodium: "920", carbs: "3", fiber: "0", sugars: "3", protein: "33", allergens: "Milk, Egg, Soy." },
            { name: "Fiesta Omelet (2 Eggs)", cal: "590", fatCal: "430", fat: "47.5", satFat: "17", transFat: "0", chol: "420", sodium: "1510", carbs: "12", fiber: "1", sugars: "6", protein: "26", allergens: "Milk, Egg, Soy." }
          ]
        }
      ]
    },
    {
      pageNumber: 8,
      sections: [
        {
          title: "BUILD YOUR OWN OMELET & TOPPINGS",
          rows: [
            { name: "Plain 2 Egg Omelet Base", cal: "400", fatCal: "340", fat: "38", satFat: "12", transFat: "0", chol: "370", sodium: "120", carbs: "2", fiber: "0", sugars: "2", protein: "12", allergens: "Egg, Soy." },
            { name: "Add Bacon", cal: "90", fatCal: "70", fat: "8", satFat: "3", transFat: "0", chol: "20", sodium: "350", carbs: "0", fiber: "0", sugars: "0", protein: "5", allergens: "None" },
            { name: "Add Sausage", cal: "130", fatCal: "110", fat: "12", satFat: "4", transFat: "0", chol: "25", sodium: "260", carbs: "0", fiber: "0", sugars: "0", protein: "5", allergens: "None" },
            { name: "Add Grilled Chicken", cal: "140", fatCal: "20", fat: "2.5", satFat: "0.5", transFat: "0", chol: "90", sodium: "930", carbs: "1", fiber: "1", sugars: "0", protein: "29", allergens: "None" },
            { name: "Add Cheesesteak", cal: "130", fatCal: "70", fat: "7", satFat: "3", transFat: "0", chol: "50", sodium: "300", carbs: "0", fiber: "0", sugars: "0", protein: "16", allergens: "Soy." },
            { name: "Add Melted American Cheese", cal: "100", fatCal: "80", fat: "8", satFat: "5", transFat: "0", chol: "25", sodium: "500", carbs: "1", fiber: "0", sugars: "1", protein: "5", allergens: "Milk, Soy." }
          ]
        }
      ]
    },
    {
      pageNumber: 9,
      sections: [
        {
          title: "DINNERS, STEAKS & TEXAS MELTS",
          rows: [
            { name: "Chicken Dinner (1 Breast + Toast + Hashbrowns)", cal: "565", fatCal: "190", fat: "21.5", satFat: "7.5", transFat: "0", chol: "90", sodium: "1490", carbs: "56", fiber: "7", sugars: "7", protein: "37", allergens: "Milk, Soy, Wheat." },
            { name: "Country Ham Dinner", cal: "635", fatCal: "250", fat: "28", satFat: "10", transFat: "0", chol: "95", sodium: "2280", carbs: "55", fiber: "6", sugars: "7", protein: "40", allergens: "Milk, Soy, Wheat." },
            { name: "Pork Chop Dinner (2 Chops)", cal: "1005", fatCal: "450", fat: "49", satFat: "17", transFat: "0", chol: "180", sodium: "1620", carbs: "55", fiber: "6", sugars: "7", protein: "84", allergens: "Milk, Soy, Wheat." },
            { name: "T-Bone Steak Dinner (10 oz)", cal: "725", fatCal: "330", fat: "37", satFat: "15", transFat: "1", chol: "100", sodium: "930", carbs: "56", fiber: "7", sugars: "7", protein: "42", allergens: "Milk, Soy, Wheat." },
            { name: "Sirloin Steak Dinner (5 oz)", cal: "615", fatCal: "270", fat: "30", satFat: "11.5", transFat: "0", chol: "60", sodium: "870", carbs: "55", fiber: "6", sugars: "7", protein: "29", allergens: "Milk, Soy, Wheat." },
            { name: "Texas Grilled Chicken Melt", cal: "660", fatCal: "320", fat: "35", satFat: "15", transFat: "0.5", chol: "115", sodium: "2040", carbs: "43", fiber: "3", sugars: "6", protein: "41", allergens: "Milk, Soy, Wheat." },
            { name: "Texas Cheesesteak™ Melt", cal: "650", fatCal: "360", fat: "40", satFat: "17", transFat: "1", chol: "75", sodium: "1400", carbs: "42", fiber: "3", sugars: "6", protein: "28", allergens: "Milk, Soy, Wheat." },
            { name: "Texas Angus Patty Melt", cal: "730", fatCal: "450", fat: "50", satFat: "21", transFat: "1.5", chol: "85", sodium: "1160", carbs: "42", fiber: "3", sugars: "6", protein: "26", allergens: "Milk, Soy, Wheat." }
          ]
        }
      ]
    },
    {
      pageNumber: 10,
      sections: [
        {
          title: "ANGUS BURGERS, SANDWICHES & PIES",
          rows: [
            { name: "Angus 1/4 LB Hamburger Deluxe", cal: "560", fatCal: "370", fat: "41", satFat: "16", transFat: "1.5", chol: "60", sodium: "540", carbs: "27", fiber: "1", sugars: "4", protein: "19", allergens: "Milk, Soy, Wheat." },
            { name: "Angus 1/4 LB Cheeseburger Deluxe", cal: "620", fatCal: "410", fat: "45", satFat: "18.5", transFat: "1", chol: "75", sodium: "795", carbs: "29", fiber: "2", sugars: "5", protein: "22", allergens: "Milk, Soy, Wheat." },
            { name: "Double Angus 1/4 LB Cheeseburger Deluxe", cal: "890", fatCal: "600", fat: "66", satFat: "28", transFat: "2", chol: "150", sodium: "1100", carbs: "29", fiber: "2", sugars: "5", protein: "40", allergens: "Milk, Soy, Wheat." },
            { name: "Grilled Chicken Sandwich Deluxe", cal: "490", fatCal: "240", fat: "26.5", satFat: "9.5", transFat: "0", chol: "90", sodium: "1420", carbs: "30", fiber: "3", sugars: "5", protein: "33", allergens: "Milk, Soy, Wheat." },
            { name: "Grilled Cheese Sandwich", cal: "330", fatCal: "190", fat: "21", satFat: "9.5", transFat: "0", chol: "30", sodium: "870", carbs: "26", fiber: "1", sugars: "3", protein: "10", allergens: "Milk, Soy, Wheat." },
            { name: "BLT Sandwich", cal: "275", fatCal: "115", fat: "13.5", satFat: "4", transFat: "0", chol: "30", sodium: "780", carbs: "27", fiber: "1", sugars: "4", protein: "12", allergens: "Soy, Wheat." },
            { name: "Southern Pecan Pie Slice", cal: "520", fatCal: "240", fat: "27", satFat: "14", transFat: "4", chol: "0", sodium: "280", carbs: "65", fiber: "1", sugars: "45", protein: "4", allergens: "Egg, Milk, Soy, Tree Nuts, Wheat." },
            { name: "Triple Chocolate Pie Slice", cal: "880", fatCal: "380", fat: "42", satFat: "14", transFat: "0", chol: "125", sodium: "660", carbs: "120", fiber: "2", sugars: "69", protein: "8", allergens: "Milk, Soy, Wheat." }
          ]
        }
      ]
    },
    {
      pageNumber: 11,
      sections: [
        {
          title: "SALADS & BEVERAGES",
          rows: [
            { name: "Garden Salad", cal: "35", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "20", carbs: "7", fiber: "2", sugars: "5", protein: "2", allergens: "None" },
            { name: "Grilled Chicken Salad", cal: "175", fatCal: "20", fat: "2.5", satFat: "0.5", transFat: "0", chol: "90", sodium: "950", carbs: "8", fiber: "3", sugars: "5", protein: "31", allergens: "None" },
            { name: "Coffee / Dark Roast (Mug)", cal: "5", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "0", carbs: "1", fiber: "0", sugars: "0", protein: "0", allergens: "None" },
            { name: "Coca-Cola® (20 oz)", cal: "160", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "35", carbs: "44", fiber: "0", sugars: "44", protein: "0", allergens: "None" },
            { name: "Diet Coke® (20 oz)", cal: "0", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "50", carbs: "0", fiber: "0", sugars: "0", protein: "0", allergens: "None" },
            { name: "Alice's Iced Tea™ - Sweet (20 oz)", cal: "70", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "0", carbs: "17", fiber: "0", sugars: "17", protein: "0", allergens: "None" },
            { name: "Minute Maid® Orange Juice (Regular)", cal: "230", fatCal: "0", fat: "0", satFat: "0", transFat: "0", chol: "0", sodium: "0", carbs: "53", fiber: "0", sugars: "48", protein: "0", allergens: "None" },
            { name: "Whole Milk (Regular)", cal: "130", fatCal: "45", fat: "5", satFat: "3.5", transFat: "0", chol: "20", sodium: "125", carbs: "13", fiber: "0", sugars: "13", protein: "9", allergens: "Milk." },
            { name: "Chocolate Milk (Regular)", cal: "230", fatCal: "80", fat: "9", satFat: "5", transFat: "0", chol: "35", sodium: "190", carbs: "31", fiber: "0", sugars: "29", protein: "9", allergens: "Milk." }
          ]
        }
      ]
    }
  ];

  for (const pageInfo of pagesData) {
    const page = pdfDoc.addPage([792, 612]); // Landscape letter 11x8.5 inches
    const { width, height } = page.getSize();

    // Top Header Banner
    page.drawRectangle({
      x: 0,
      y: height - 42,
      width: width,
      height: 42,
      color: rgb(0.04, 0.05, 0.06), // #0B0C0E
    });

    // Gold accent stripe
    page.drawRectangle({
      x: 0,
      y: height - 45,
      width: width,
      height: 3,
      color: rgb(0.96, 0.73, 0.0), // #F5BA00
    });

    page.drawText("WAFFLE HOUSE® — COMPLETE NUTRITIONAL & MENU DIRECTORY", {
      x: 36,
      y: height - 28,
      size: 13,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    page.drawText("v20.2 OFFICIAL REFERENCE", {
      x: width - 180,
      y: height - 28,
      size: 9,
      font: fontBold,
      color: rgb(0.96, 0.73, 0.0),
    });

    let currentY = height - 62;

    for (const sec of pageInfo.sections) {
      // Section Banner
      page.drawRectangle({
        x: 36,
        y: currentY - 18,
        width: width - 72,
        height: 18,
        color: rgb(0.72, 0.85, 0.95), // Light blue header like original PDF
      });

      page.drawText(sec.title, {
        x: 42,
        y: currentY - 14,
        size: 9,
        font: fontBold,
        color: rgb(0, 0, 0),
      });

      currentY -= 22;

      // Table Column Headers
      const colHeaders = [
        { label: "Item Name", x: 40, width: 220 },
        { label: "Cal", x: 265, width: 35 },
        { label: "Fat(g)", x: 305, width: 35 },
        { label: "SatF", x: 345, width: 30 },
        { label: "TrF", x: 380, width: 25 },
        { label: "Chol", x: 410, width: 35 },
        { label: "Sod(mg)", x: 450, width: 45 },
        { label: "Carb", x: 500, width: 35 },
        { label: "Fib", x: 540, width: 25 },
        { label: "Sug", x: 570, width: 25 },
        { label: "Prot", x: 600, width: 30 },
        { label: "Allergens", x: 635, width: 120 },
      ];

      page.drawRectangle({
        x: 36,
        y: currentY - 14,
        width: width - 72,
        height: 14,
        color: rgb(0.92, 0.94, 0.96),
      });

      for (const h of colHeaders) {
        page.drawText(h.label, {
          x: h.x,
          y: currentY - 11,
          size: 7.5,
          font: fontBold,
          color: rgb(0.1, 0.1, 0.1),
        });
      }

      currentY -= 16;

      // Rows
      let rowIdx = 0;
      for (const row of sec.rows) {
        if (currentY < 60) break;

        if (rowIdx % 2 === 1) {
          page.drawRectangle({
            x: 36,
            y: currentY - 12,
            width: width - 72,
            height: 13,
            color: rgb(0.97, 0.98, 0.99),
          });
        }

        page.drawText(row.name.substring(0, 42), { x: 40, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.cal, { x: 265, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.fat, { x: 305, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.satFat, { x: 345, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.transFat, { x: 380, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.chol, { x: 410, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.sodium, { x: 450, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.carbs, { x: 500, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.fiber, { x: 540, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.sugars, { x: 570, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.protein, { x: 600, y: currentY - 9, size: 7.5, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });
        page.drawText(row.allergens.substring(0, 30), { x: 635, y: currentY - 9, size: 7, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });

        // Light bottom border line
        page.drawLine({
          start: { x: 36, y: currentY - 12 },
          end: { x: width - 36, y: currentY - 12 },
          thickness: 0.5,
          color: rgb(0.9, 0.9, 0.9),
        });

        currentY -= 13;
        rowIdx++;
      }

      currentY -= 10;
    }

    // Bottom Footer
    page.drawLine({
      start: { x: 36, y: 35 },
      end: { x: width - 36, y: 35 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText("“2,000 CALORIES A DAY IS USED FOR GENERAL NUTRITION ADVICE, BUT CALORIE NEEDS VARY”", {
      x: 36,
      y: 22,
      size: 7,
      font: fontOblique,
      color: rgb(0.4, 0.4, 0.4),
    });

    page.drawText(`Page ${pageInfo.pageNumber} of 11`, {
      x: width - 100,
      y: 22,
      size: 8,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });
  }

  const pdfBytes = await pdfDoc.save();
  const outPath = path.resolve("public/waffle-house-menu-nutritionals.pdf");
  fs.writeFileSync(outPath, pdfBytes);
  console.log(`Generated PDF at ${outPath} (${pdfBytes.length} bytes)`);
}

generatePdf().catch(console.error);
