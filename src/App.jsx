import React, { useState } from 'react';
import { Heart, Droplet, Wind, Activity, Cross, Search, Download, AlertCircle, Users, Cake } from 'lucide-react';

function App() {
  const [activeOrgan, setActiveOrgan] = useState('kidney');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMealPlans, setShowMealPlans] = useState(false);
  const [showSupplements, setShowSupplements] = useState(false);
  const [showFoodSafety, setShowFoodSafety] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    const results = [];
    const searchLower = term.toLowerCase();
    
    // Search through all organs
    Object.keys(organContent).forEach(organId => {
      const organ = organs.find(o => o.id === organId);
      const content = organContent[organId];
      
      // Search in nutrients
      content.keyNutrients.forEach(nutrient => {
        if (
          nutrient.nutrient.toLowerCase().includes(searchLower) ||
          nutrient.recommendation.toLowerCase().includes(searchLower) ||
          nutrient.rationale.toLowerCase().includes(searchLower)
        ) {
          results.push({
            organ: organ.name,
            organId: organId,
            type: 'Nutrient',
            title: nutrient.nutrient,
            content: nutrient.rationale,
            recommendation: nutrient.recommendation
          });
        }
      });
      
      // Search in red flags
      content.redFlags?.forEach(flag => {
        if (flag.toLowerCase().includes(searchLower)) {
          results.push({
            organ: organ.name,
            organId: organId,
            type: 'Red Flag',
            title: 'Warning',
            content: flag
          });
        }
      });
      
      // Search in focus areas
      content.focusAreas?.forEach(area => {
        if (area.toLowerCase().includes(searchLower)) {
          results.push({
            organ: organ.name,
            organId: organId,
            type: 'Focus Area',
            title: 'Clinical Focus',
            content: area
          });
        }
      });
    });
    
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const organs = [
    { id: 'kidney', name: 'Kidney', icon: Droplet, color: 'bg-blue-500', lightColor: 'bg-blue-50' },
    { id: 'liver', name: 'Liver', icon: Activity, color: 'bg-amber-500', lightColor: 'bg-amber-50' },
    { id: 'heart', name: 'Heart', icon: Heart, color: 'bg-purple-500', lightColor: 'bg-purple-50' },
    { id: 'lung', name: 'Lung', icon: Wind, color: 'bg-teal-500', lightColor: 'bg-teal-50' },
    { id: 'pancreas', name: 'Pancreas', icon: Cake, color: 'bg-green-500', lightColor: 'bg-green-50' }
  ];

  const organContent = {
    kidney: {
      keyNutrients: [
        { 
          nutrient: 'Calcium & Vitamin D', 
          recommendation: 'Calcium: 1000-1200 mg/day; Vitamin D: per lab values (often 1000-2000 IU)', 
          rationale: '🔴 CRITICAL POST-TX: Prevent steroid-induced osteoporosis and bone disease. Monitor 25-OH vitamin D levels quarterly first year. Supplement to maintain >30 ng/mL. | 🌍 CULTURAL: Lactose intolerance very common (70% Asian, 65% African American, 50% Hispanic). Offer non-dairy calcium sources: fortified plant milks, leafy greens, calcium-set tofu, sardines with bones, fortified foods. Vitamin D crucial for darker skin tones.', 
          source: 'KDIGO',
          disparities: '🔴 CRITICAL: African American (82%), Hispanic (69%), and Asian patients have MUCH higher rates of vitamin D deficiency due to melanin reducing skin synthesis. Need aggressive supplementation (often 2000-4000 IU/day). Check levels every 3 months.'
        },
        { 
          nutrient: 'Protein', 
          recommendation: 'Pre-tx: 0.6-0.8 g/kg IBW (CKD); Post-tx: 1.0-1.5 g/kg for first 3-6 months', 
          rationale: '🔴 CRITICAL: Pre-transplant protein restriction to reduce uremic toxins. Post-transplant increased needs for wound healing and steroid-induced catabolism. Monitor for graft function impact. | 🌍 CULTURAL: Plant-based proteins (beans, lentils, tofu) can meet needs - work with vegetarian/vegan patients on high-quality combinations. Traditional dishes can be adapted.', 
          source: 'KDOQI/ASN',
          disparities: 'African American and Hispanic patients have higher rates of CKD and face longer wait times for transplant. African American patients may need closer monitoring for tacrolimus metabolism differences (genetic polymorphisms affect drug levels).'
        },
        { 
          nutrient: 'Sodium', 
          recommendation: 'Pre-tx: <2000 mg/day; Post-tx: <2000-3000 mg/day initially', 
          rationale: '⚠️ CRITICAL FOR BP: Manage hypertension and fluid retention. Post-transplant sodium needs may increase with diuresis from improved kidney function. Individualize based on immunosuppression side effects. | 🌍 CULTURAL: Traditional cuisines (Latin, Asian, African) often higher in sodium from sauces, seasonings, preserved foods. Offer culturally relevant low-sodium alternatives: fresh herbs, citrus, ginger, garlic instead of soy sauce/fish sauce/adobo. Teach label reading in preferred language.', 
          source: 'KDOQI',
          disparities: 'African American patients have 3-4x higher rates of hypertensive kidney disease and salt sensitivity. May require stricter sodium restriction (<1500mg/day). Hispanic patients also at increased risk.'
        },
        { 
          nutrient: 'Potassium', 
          recommendation: 'Pre-tx: 2000-3000 mg/day (if hyperkalemic); Post-tx: Monitor and adjust', 
          rationale: '⚠️ MONITOR CLOSELY: Pre-transplant restriction common with declining GFR. Post-transplant can normalize but watch for tacrolimus-induced hyperkalemia. Adjust based on labs. | 🌍 CULTURAL: Many traditional foods are high in potassium (plantains, yuca, beans, tomatoes, coconut). Don\'t eliminate cultural foods - teach portion control and preparation methods (boiling/soaking to reduce potassium). Provide culturally appropriate alternatives.', 
          source: 'KDOQI',
          disparities: 'African American patients may have higher baseline potassium levels and increased risk of hyperkalemia with tacrolimus. More frequent monitoring needed.'
        },
        { 
          nutrient: 'Magnesium', 
          recommendation: 'Monitor and supplement as needed', 
          rationale: '⚠️ COMMON DEFICIENCY: Tacrolimus and cyclosporine cause renal magnesium wasting. Monitor levels monthly; supplement if <1.7 mg/dL. May need 400-800 mg/day. | 🌍 CULTURAL: Magnesium-rich foods include whole grains, nuts, seeds, beans, leafy greens - present in many traditional diets. Emphasize these foods while supplementing.', 
          source: 'Clinical Practice',
          disparities: 'All patients on tacrolimus at risk regardless of background. Monitor equally.'
        },
        { 
          nutrient: 'Carbohydrates', 
          recommendation: 'Complex carbohydrates; manage for NODAT risk', 
          rationale: '⚠️ DIABETES RISK: New-onset diabetes after transplant (NODAT) affects 20-50% of recipients. Prednisone and tacrolimus increase insulin resistance. Emphasize low glycemic index foods. | 🌍 CULTURAL: Work within traditional starches (rice, tortillas, plantains, yuca, injera, naan). Teach portion control, pair with protein/fiber, choose whole grain versions when possible. Don\'t eliminate cultural staples.', 
          source: 'ADA/Transplant Guidelines',
          disparities: '🔴 CRITICAL: Hispanic (55%), African American (35%), Asian American (42%), and Native American patients have MUCH higher NODAT risk. Need aggressive screening (glucose quarterly first year, HbA1c every 6 months). Earlier intervention needed. Pacific Islanders also at very high risk.'
        },
        { 
          nutrient: 'Phosphorus', 
          recommendation: 'Pre-tx: 800-1000 mg/day; Post-tx: Monitor and liberalize as appropriate', 
          rationale: 'Pre-transplant restriction to prevent bone disease. Post-transplant usually normalizes but monitor for steroid-induced bone loss. Adequate intake needed for bone health. | 🌍 CULTURAL: Educate about phosphate additives in processed foods - read labels for "PHOS". Dairy alternatives (coconut, oat milk) can be lower in phosphorus. Work within cultural food preferences.', 
          source: 'KDOQI/KDIGO',
          disparities: 'African American patients have higher rates of hyperphosphatemia in CKD. Need aggressive pre-transplant management.'
        },
        { 
          nutrient: 'Fluid', 
          recommendation: 'Pre-tx: Based on urine output + 500 mL; Post-tx: 2-3 L/day initially', 
          rationale: 'Pre-transplant fluid restriction common with oliguria/anuria. Post-transplant encourage fluids to support graft function and prevent dehydration with diuretics. | 🌍 CULTURAL: Hot climates and outdoor labor (more common in Hispanic/Latino communities) increase fluid needs. Adjust recommendations accordingly.', 
          source: 'Clinical Practice',
          disparities: 'Hispanic/Latino patients more likely to work in agriculture/construction with higher fluid needs and heat exposure.'
        }
      ],
      redFlags: [
        'Hyperkalemia (K+ >5.5 mEq/L) - especially with tacrolimus (more common in African American patients)',
        'NODAT development or poor glycemic control (55% risk in Hispanic, 42% in Asian, 35% in African American patients)',
        'Hypophosphatemia (<2.5 mg/dL) - risk with steroids',
        'Hypomagnesemia (<1.7 mg/dL) - common with calcineurin inhibitors',
        'Excessive weight gain (>10% in first year)',
        'Signs of rejection or declining graft function (rising creatinine) - African American patients have higher rejection rates',
        'Severe hypertension uncontrolled by diet (more common in African American patients)',
        'BK virus or CMV infection affecting nutritional status',
        'Food insecurity affecting medication/diet adherence',
        'Language barriers impacting understanding of dietary restrictions',
        'Vitamin D deficiency (check levels in all patients, especially those with darker skin tones)'
      ],
      focusAreas: [
        'TRANSITION NUTRITION: Gradual liberalization from pre-transplant CKD restrictions',
        'Monitor for immunosuppression side effects: tacrolimus (hyperkalemia, hypomagnesemia, hyperglycemia), prednisone (hyperglycemia, bone loss, weight gain), MMF (GI intolerance)',
        'NODAT prevention: carbohydrate quality, weight management, regular monitoring. 🔴 HIGH-RISK: Hispanic (55%), Asian (42%), African American (35%), Pacific Islander, Native American patients need quarterly glucose screening first year',
        'HEALTH EQUITY: Screen for food insecurity (use validated tools like 2-item Hunger Vital Sign). Refer to SNAP, food banks, local resources. Transportation barriers to appointments? Medication costs affecting adherence?',
        'CULTURAL HUMILITY: Use interpreter services for limited English proficiency. Provide written materials in preferred language. Work within cultural food preferences - don\'t eliminate traditional foods, adapt them',
        'Cardiovascular risk reduction: Mediterranean diet patterns, omega-3 fatty acids. Adapt to cultural preferences (Asian, Latin, African heritage diets have similar protective patterns)',
        'Infection prevention: proper food safety, avoid high-risk foods first 3-6 months',
        'Bone health: adequate calcium, vitamin D, weight-bearing exercise. 🔴 Vitamin D deficiency highest in African American (82%), Hispanic (69%), Asian patients - aggressive supplementation needed',
        'GI symptom management: common with MMF/mycophenolate - consider smaller frequent meals, avoid high-fat foods',
        'SOCIAL DETERMINANTS: Address housing instability, employment concerns, lack of health insurance affecting medication access. Connect with social work, patient assistance programs',
        'TACROLIMUS METABOLISM: African American patients may metabolize tacrolimus differently due to genetic polymorphisms (CYP3A5 expressors). May need higher doses and closer monitoring. Discuss with transplant pharmacist'
      ]
    },
    liver: {
      keyNutrients: [
        { 
          nutrient: 'Protein', 
          recommendation: 'Pre-tx: 1.2-1.5 g/kg dry weight (without encephalopathy); Post-tx: 1.2-2.0 g/kg acute phase', 
          rationale: '🔴 CRITICAL: Pre-transplant increased needs for muscle preservation despite malnutrition risk. Post-transplant high needs for healing, steroid catabolism. Do NOT restrict protein even with mild encephalopathy - use BCAA if needed.', 
          source: 'ESPEN/ASPEN' 
        },
        { 
          nutrient: 'Energy', 
          recommendation: 'Pre-tx: 35-40 kcal/kg dry weight; Post-tx: 30-35 kcal/kg', 
          rationale: '🔴 CRITICAL: Pre-transplant hypermetabolism common. Post-transplant high needs initially. Use indirect calorimetry if available. Prevent malnutrition and sarcopenia.', 
          source: 'ESPEN' 
        },
        { 
          nutrient: 'Vitamin A, D, E, K', 
          recommendation: 'Pre-tx: Supplement fat-soluble vitamins; Post-tx: Monitor and supplement as needed', 
          rationale: '🔴 COMMON DEFICIENCY: Cholestasis impairs fat absorption. Vitamin K critical for coagulation. Vitamin D for bone health. Monitor levels every 3-6 months.', 
          source: 'AASLD/ESPEN' 
        },
        { 
          nutrient: 'Calcium & Vitamin D', 
          recommendation: 'Calcium: 1200-1500 mg/day; Vitamin D: per levels (often 2000-4000 IU)', 
          rationale: '🔴 CRITICAL: Cirrhosis causes bone disease. Post-transplant steroids worsen bone loss. Aggressive supplementation needed. Consider bisphosphonates.', 
          source: 'AASLD' 
        },
        { 
          nutrient: 'Sodium', 
          recommendation: 'Pre-tx: <2000 mg/day with ascites; Post-tx: <2000-3000 mg/day initially', 
          rationale: '⚠️ ASCITES MANAGEMENT: Strict sodium restriction critical for fluid management pre-transplant. Post-transplant can liberalize but monitor for hypertension with immunosuppression.', 
          source: 'AASLD' 
        },
        { 
          nutrient: 'Zinc', 
          recommendation: 'Monitor levels; supplement if deficient (often 50 mg/day elemental)', 
          rationale: '⚠️ COMMON DEFICIENCY: Cirrhosis impairs zinc metabolism. Deficiency worsens encephalopathy, immune function, wound healing. Check levels quarterly.', 
          source: 'Clinical Practice' 
        },
        { 
          nutrient: 'Fluid', 
          recommendation: 'Pre-tx: 1-1.5 L/day with hyponatremia; Post-tx: Encourage adequate hydration', 
          rationale: 'Pre-transplant fluid restriction with severe ascites and hyponatremia (Na+ <125 mEq/L). Post-transplant no restriction unless specific indication.', 
          source: 'AASLD' 
        },
        { 
          nutrient: 'Branched-Chain Amino Acids', 
          recommendation: 'Consider supplementation pre-tx with recurrent encephalopathy', 
          rationale: 'BCAA (leucine, isoleucine, valine) may improve mental status in hepatic encephalopathy while maintaining protein intake. Not first-line but useful adjunct.', 
          source: 'ESPEN' 
        }
      ],
      redFlags: [
        'Hepatic encephalopathy - but do NOT restrict protein',
        'Severe ascites unresponsive to sodium/fluid restriction',
        'Malnutrition/sarcopenia (very common pre-transplant)',
        'Refractory hypoglycemia',
        'Vitamin K deficiency with coagulopathy',
        'Post-transplant NODAT (25-40% incidence)',
        'Excessive post-transplant weight gain',
        'Recurrent hepatitis C (if applicable) affecting graft'
      ],
      focusAreas: [
        'MALNUTRITION CRITICAL: 60-90% of pre-transplant patients malnourished. Aggressive nutrition support essential',
        'Late evening snack (50g carbohydrate) to prevent overnight catabolism and hypoglycemia',
        'Small frequent meals to manage early satiety from ascites',
        'Post-transplant: aggressive protein for healing, monitor for NODAT',
        'Fat-soluble vitamin repletion: use water-miscible forms if cholestatic',
        'Bone health: DEXA scan, calcium, vitamin D, bisphosphonates if indicated',
        'Immunosuppression effects: prednisone (hyperglycemia, bone loss, weight gain), tacrolimus (hyperglycemia, renal issues)',
        'Consider feeding tube if unable to meet needs orally pre-transplant'
      ]
    },
    heart: {
      keyNutrients: [
        { 
          nutrient: 'Sodium', 
          recommendation: 'Pre-tx: <2000 mg/day (heart failure); Post-tx: <2000-3000 mg/day', 
          rationale: '🔴 CRITICAL: Pre-transplant severe restriction for heart failure management. Post-transplant continue restriction for hypertension management (common with immunosuppression). Individualize based on BP and renal function.', 
          source: 'AHA/ISHLT' 
        },
        { 
          nutrient: 'Protein', 
          recommendation: 'Pre-tx: 1.0-1.2 g/kg (cardiac cachexia common); Post-tx: 1.2-1.5 g/kg first 6 months', 
          rationale: '🔴 CARDIAC CACHEXIA: 50% of advanced heart failure patients malnourished. Adequate protein critical. Post-transplant increased needs for healing and steroid effects.', 
          source: 'ISHLT' 
        },
        { 
          nutrient: 'Calcium & Vitamin D', 
          recommendation: 'Calcium: 1000-1200 mg/day; Vitamin D: maintain >30 ng/mL', 
          rationale: '🔴 BONE HEALTH: Prevent steroid-induced osteoporosis. Monitor vitamin D levels every 3-6 months. Consider bisphosphonates if indicated.', 
          source: 'ISHLT' 
        },
        { 
          nutrient: 'Fluid', 
          recommendation: 'Pre-tx: 1.5-2 L/day (heart failure); Post-tx: Adequate hydration', 
          rationale: '⚠️ VOLUME STATUS: Pre-transplant fluid restriction critical for heart failure. Post-transplant can liberalize but monitor for fluid retention with steroids and renal function.', 
          source: 'AHA' 
        },
        { 
          nutrient: 'Potassium', 
          recommendation: 'Maintain 4.0-5.0 mEq/L; adjust with medications', 
          rationale: '⚠️ ARRHYTHMIA RISK: Critical for cardiac rhythm. Monitor closely with diuretics, ACE inhibitors. Post-transplant watch for immunosuppression effects on potassium.', 
          source: 'AHA' 
        },
        { 
          nutrient: 'Magnesium', 
          recommendation: 'Maintain >2.0 mg/dL; supplement as needed', 
          rationale: '⚠️ ARRHYTHMIA RISK: Critical for cardiac function. Depletion with diuretics. Post-transplant tacrolimus causes wasting. Monitor monthly and supplement.', 
          source: 'AHA/Clinical Practice' 
        },
        { 
          nutrient: 'Energy', 
          recommendation: 'Pre-tx: 25-35 kcal/kg; Post-tx: 30-35 kcal/kg', 
          rationale: 'Prevent/treat cardiac cachexia pre-transplant. Post-transplant prevent excessive weight gain while supporting healing. Adjust for activity level.', 
          source: 'Clinical Practice' 
        },
        { 
          nutrient: 'Omega-3 Fatty Acids', 
          recommendation: '1-2 g EPA+DHA daily', 
          rationale: 'Anti-arrhythmic, anti-inflammatory effects. May reduce cardiac allograft vasculopathy. Cardioprotective benefits well-established.', 
          source: 'AHA/ISHLT' 
        }
      ],
      redFlags: [
        'Cardiac cachexia or unintentional weight loss >5% in 6 months',
        'Excessive post-transplant weight gain (>10% first year)',
        'Uncontrolled hypertension despite diet and medications',
        'NODAT development (20-40% of recipients)',
        'Hypomagnesemia or hypokalemia with arrhythmias',
        'Severe hyperlipidemia (cardiac allograft vasculopathy risk)',
        'Renal dysfunction impacting nutrition management',
        'Rejection episodes affecting nutritional status'
      ],
      focusAreas: [
        'CARDIAC CACHEXIA PREVENTION: Aggressive nutrition support pre-transplant. Small frequent meals, nutrient-dense foods',
        'Post-transplant weight management: prednisone increases appetite, tacrolimus affects metabolism',
        'CARDIOVASCULAR RISK REDUCTION: Mediterranean diet, omega-3s, plant sterols, fiber',
        'Cardiac allograft vasculopathy prevention: aggressive lipid management, statin therapy',
        'NODAT screening and prevention: monitor glucose, HbA1c quarterly first year',
        'Blood pressure management: sodium restriction, DASH diet principles, weight management',
        'Drug-nutrient interactions: grapefruit with immunosuppressants, high-fat meals with cyclosporine',
        'Exercise and cardiac rehab: essential for outcomes, adjust nutrition accordingly'
      ]
    },
    lung: {
      keyNutrients: [
        { 
          nutrient: 'Energy', 
          recommendation: 'Pre-tx: 35-45 kcal/kg (often hypermetabolic); Post-tx: 30-35 kcal/kg', 
          rationale: '🔴 CRITICAL: Pre-transplant patients often severely hypermetabolic (COPD, CF). High energy needs to prevent/treat malnutrition. Use indirect calorimetry if available. Post-transplant needs decrease but remain elevated.', 
          source: 'ATS/ISHLT' 
        },
        { 
          nutrient: 'Protein', 
          recommendation: 'Pre-tx: 1.5-2.0 g/kg; Post-tx: 1.5-2.0 g/kg acute phase', 
          rationale: '🔴 CRITICAL: Very high protein needs pre-transplant for muscle preservation (work of breathing, chronic inflammation). Post-transplant for wound healing, steroid catabolism. CF patients may need even higher.', 
          source: 'CF Foundation/ISHLT' 
        },
        { 
          nutrient: 'Fat (CF patients)', 
          recommendation: '40% of calories as fat for CF', 
          rationale: '🔴 CF-SPECIFIC: Pancreatic insufficiency requires high fat intake. Continue enzyme replacement therapy. Monitor fat-soluble vitamins closely.', 
          source: 'CF Foundation' 
        },
        { 
          nutrient: 'Vitamin A, D, E, K', 
          recommendation: 'High-dose supplementation especially for CF; monitor levels quarterly', 
          rationale: '🔴 CF CRITICAL: Pancreatic insufficiency causes severe malabsorption. Water-miscible forms needed. Vitamin A (10,000-15,000 IU), D (2000-4000 IU), E (400-800 IU), K (5-10 mg). Continue post-transplant.', 
          source: 'CF Foundation' 
        },
        { 
          nutrient: 'Calcium & Vitamin D', 
          recommendation: 'Calcium: 1200-1500 mg/day; Vitamin D: maintain >30 ng/mL', 
          rationale: '🔴 CRITICAL: Lung disease and chronic steroids cause severe bone disease. Post-transplant steroids worsen osteoporosis. Aggressive supplementation essential. DEXA screening.', 
          source: 'ISHLT' 
        },
        { 
          nutrient: 'Magnesium', 
          recommendation: 'Monitor and supplement (especially with tacrolimus)', 
          rationale: '⚠️ COMMON DEFICIENCY: Tacrolimus causes renal wasting. May need 400-800 mg/day supplementation. Monitor monthly.', 
          source: 'Clinical Practice' 
        },
        { 
          nutrient: 'Sodium', 
          recommendation: 'Pre-tx: Liberal (especially CF); Post-tx: <2000-3000 mg/day', 
          rationale: 'Pre-transplant CF patients have high sodium losses (sweat). Post-transplant restrict for hypertension management with immunosuppression. Major diet transition for CF patients.', 
          source: 'CF Foundation/ISHLT' 
        },
        { 
          nutrient: 'Fluid', 
          recommendation: 'Adequate hydration; adjust for respiratory secretions', 
          rationale: 'Adequate fluids to thin secretions. CF patients need higher intake due to losses. Monitor for fluid retention post-transplant.', 
          source: 'Clinical Practice' 
        }
      ],
      redFlags: [
        'BMI <18.5 pre-transplant (poor surgical outcomes)',
        'Severe malnutrition/muscle wasting (very common in COPD, CF)',
        'CF patients with uncontrolled diabetes (CFRD)',
        'Fat-soluble vitamin deficiencies (especially CF)',
        'Post-transplant NODAT (30-35% incidence)',
        'Severe osteoporosis (T-score <-2.5)',
        'Excessive post-transplant weight gain',
        'Gastroesophageal reflux (aspiration risk)'
      ],
      focusAreas: [
        'PRE-TRANSPLANT NUTRITION OPTIMIZATION: BMI 18.5-25 ideal for outcomes. Aggressive nutrition support if malnourished',
        'CF-SPECIFIC: Continue PERT (pancreatic enzyme replacement), high-calorie high-protein high-fat diet, fat-soluble vitamins',
        'CFRD management: insulin therapy, carbohydrate counting while maintaining high-calorie intake',
        'Post-transplant TRANSITION: CF patients must reduce fat/calories to prevent excessive weight gain (difficult psychological adjustment)',
        'Bone health: DEXA baseline and monitoring, calcium, vitamin D, bisphosphonates if indicated',
        'NODAT prevention and management: monitor glucose closely, manage steroid-induced hyperglycemia',
        'Immunosuppression effects: prednisone (hyperglycemia, weight gain, bone loss), tacrolimus (hyperglycemia, hypomagnesemia)',
        'GERD management: elevate head of bed, avoid late eating, PPI therapy (aspiration risk to new lungs)'
      ]
    },
    pancreas: {
      keyNutrients: [
        { 
          nutrient: 'Blood Glucose Monitoring', 
          recommendation: 'Monitor 4-6 times daily initially, adjust based on graft function', 
          rationale: '🔴 CRITICAL MARKER: Blood glucose is primary indicator of pancreas graft function. Rising glucose = potential rejection or graft failure. Continue monitoring even when insulin-free.', 
          source: 'Transplant Guidelines' 
        },
        { 
          nutrient: 'Carbohydrates', 
          recommendation: 'Individualized based on diabetes status; generally 45-60g per meal', 
          rationale: '🔴 CRITICAL: Most pancreas transplants done for Type 1 diabetes. Post-transplant goal is glycemic control WITHOUT exogenous insulin. Monitor closely for graft function. SPK (simultaneous pancreas-kidney) patients have additional considerations.', 
          source: 'ADA/Transplant Guidelines' 
        },
        { 
          nutrient: 'Protein', 
          recommendation: 'Post-tx: 1.2-1.5 g/kg first 6 months; adjust based on kidney function if SPK', 
          rationale: '🔴 CRITICAL: High protein needs for wound healing (extensive surgery). SPK patients must balance protein for healing with kidney graft function. Monitor creatinine closely.', 
          source: 'Clinical Practice' 
        },
        { 
          nutrient: 'Calcium & Vitamin D', 
          recommendation: 'Calcium: 1200-1500 mg/day; Vitamin D: maintain >30 ng/mL', 
          rationale: '🔴 CRITICAL: Years of diabetes cause bone disease. Post-transplant steroids worsen osteoporosis. Aggressive supplementation essential. DEXA baseline and monitoring.', 
          source: 'Endocrine Society' 
        },
        { 
          nutrient: 'Sodium', 
          recommendation: '<2000-3000 mg/day', 
          rationale: '⚠️ HYPERTENSION MANAGEMENT: Immunosuppression causes hypertension. SPK patients need sodium restriction for blood pressure and kidney graft protection.', 
          source: 'Clinical Practice' 
        },
        { 
          nutrient: 'Magnesium', 
          recommendation: 'Monitor and supplement as needed (often 400-800 mg/day)', 
          rationale: '⚠️ COMMON DEFICIENCY: Tacrolimus causes renal magnesium wasting. Diabetes history may compound deficiency. Monitor monthly; target >1.7 mg/dL.', 
          source: 'Clinical Practice' 
        },
        { 
          nutrient: 'Potassium (if SPK)', 
          recommendation: 'Monitor closely; adjust based on kidney function', 
          rationale: '⚠️ SPK-SPECIFIC: Tacrolimus can cause hyperkalemia. Monitor kidney graft function closely. Adjust dietary potassium based on labs.', 
          source: 'KDOQI' 
        },
        { 
          nutrient: 'Fiber', 
          recommendation: '25-35g/day from whole grains, fruits, vegetables', 
          rationale: 'Glycemic control, cardiovascular health. Important for long-term diabetes complication prevention even with functioning graft. Supports gut health.', 
          source: 'ADA' 
        },
        { 
          nutrient: 'Omega-3 Fatty Acids', 
          recommendation: '1-2 g EPA+DHA daily', 
          rationale: 'Cardiovascular protection critical given diabetes history. Anti-inflammatory effects. May improve lipid profile and reduce cardiovascular complications.', 
          source: 'AHA' 
        }
      ],
      redFlags: [
        'Rising blood glucose (>140 mg/dL fasting) - may indicate graft rejection or failure',
        'Return of hypoglycemia unawareness',
        'Need for exogenous insulin (graft failure)',
        'NODAT in previously normoglycemic areas (non-diabetes indication transplants are rare)',
        'Severe hypoglycemia episodes (graft overfunction - rare)',
        'SPK: Rising creatinine or declining kidney function',
        'Hyperkalemia (especially SPK patients on tacrolimus)',
        'Excessive weight gain (>10% first year)',
        'Poor wound healing (extensive surgical incisions)',
        'Urinary tract infections (bladder-drained pancreas)',
        'Pancreatitis symptoms (graft inflammation)'
      ],
      focusAreas: [
        'GLYCEMIC MONITORING CRITICAL: Blood glucose is primary graft function indicator. Teach patients that rising glucose requires immediate medical attention',
        'TRANSITION FROM DIABETES MANAGEMENT: Psychological adjustment to being "cured" of diabetes. Some patients struggle with loss of diabetes identity and management routines',
        'SPK CONSIDERATIONS: Balance nutrition for both organs. Kidney graft protection (sodium, potassium, protein) while supporting pancreas function',
        'CARDIOVASCULAR RISK REDUCTION: Aggressive management given diabetes history. Mediterranean diet, omega-3s, fiber, plant sterols',
        'HYPOGLYCEMIA EDUCATION: Rare but possible with overactive graft. Teach recognition and treatment. Some patients experience hypoglycemia unawareness resolution',
        'BONE HEALTH: Years of diabetes + steroid immunosuppression = high fracture risk. Calcium, vitamin D, DEXA monitoring, bisphosphonates if indicated',
        'IMMUNOSUPPRESSION EFFECTS: Prednisone (can cause hyperglycemia even with functioning pancreas graft), tacrolimus (hyperkalemia if SPK, hypomagnesemia), MMF (GI upset)',
        'WEIGHT MANAGEMENT: Common to gain weight post-transplant (improved health, steroid appetite, no longer managing diabetes). Focus on nutrient-dense foods and portion control',
        'LONG-TERM DIABETES COMPLICATION MONITORING: Continue screening for retinopathy, neuropathy, nephropathy (if not SPK). Graft doesn\'t reverse existing damage',
        'HYDRATION: Adequate fluids important. SPK patients need good hydration for kidney graft function'
      ]
    },
    general: {
      keyNutrients: [
        { 
          nutrient: 'Food Safety', 
          recommendation: 'Strict adherence first 3-6 months post-transplant', 
          rationale: '🔴 CRITICAL: Immunosuppression increases infection risk. Avoid high-risk foods, practice proper food handling, cook to safe temperatures. See food safety guidelines for details.', 
          source: 'CDC/Transplant Guidelines' 
        },
        { 
          nutrient: 'Grapefruit/Pomegranate', 
          recommendation: 'AVOID completely', 
          rationale: '🔴 CRITICAL DRUG INTERACTION: Inhibits CYP3A4 enzyme, dramatically increases tacrolimus/cyclosporine levels → toxicity risk. Includes juice and whole fruit. Effect lasts 24-72 hours.', 
          source: 'FDA' 
        },
        { 
          nutrient: 'St. John\'s Wort', 
          recommendation: 'AVOID completely', 
          rationale: '🔴 CRITICAL DRUG INTERACTION: Induces CYP3A4, dramatically DECREASES immunosuppressant levels → rejection risk. Many other herbal supplements also interact.', 
          source: 'FDA' 
        },
        { 
          nutrient: 'Weight Management', 
          recommendation: 'Maintain BMI 18.5-25; prevent excessive gain post-transplant', 
          rationale: '⚠️ COMMON ISSUE: Average 10-20 lb weight gain first year post-transplant. Prednisone increases appetite, improved health increases activity. Weight gain increases cardiovascular and diabetes risk.', 
          source: 'Multiple Guidelines' 
        },
        { 
          nutrient: 'Immunosuppression Effects', 
          recommendation: 'Monitor and manage nutrition-related side effects', 
          rationale: 'Tacrolimus: hyperglycemia, hyperkalemia, hypomagnesemia, nephrotoxicity. Prednisone: hyperglycemia, weight gain, bone loss, fluid retention. MMF/Mycophenolate: GI upset, diarrhea. Cyclosporine: hyperkalemia, nephrotoxicity, gingival hyperplasia.', 
          source: 'Transplant Pharmacology' 
        },
        { 
          nutrient: 'Cardiovascular Risk', 
          recommendation: 'Aggressive risk factor modification', 
          rationale: '⚠️ LEADING CAUSE OF DEATH: Cardiovascular disease major cause of late mortality in transplant recipients. Focus on lipid management, blood pressure, diabetes prevention, healthy diet patterns.', 
          source: 'Multiple Guidelines' 
        },
        { 
          nutrient: 'Bone Health', 
          recommendation: 'Universal calcium/vitamin D supplementation; DEXA monitoring', 
          rationale: '🔴 CRITICAL: All transplant recipients at high risk for bone disease. Baseline DEXA, repeat yearly. Calcium 1200-1500 mg/day, vitamin D to maintain >30 ng/mL. Consider bisphosphonates.', 
          source: 'Osteoporosis Guidelines' 
        },
        { 
          nutrient: 'Alcohol', 
          recommendation: 'Discuss with transplant team; generally limited or avoided', 
          rationale: 'Liver transplant: typically contraindicated (especially if alcohol-related liver disease). Other organs: limit to moderate intake if permitted. May interact with medications, affect compliance.', 
          source: 'Transplant Guidelines' 
        }
      ],
      redFlags: [
        'Non-adherence to immunosuppression or medical regimen',
        'Consumption of grapefruit, pomegranate, or contraindicated supplements',
        'Foodborne illness or high-risk food consumption',
        'New-onset diabetes after transplant (NODAT)',
        'Uncontrolled hypertension or hyperlipidemia',
        'Rapid or excessive weight changes',
        'Electrolyte abnormalities affecting organ function',
        'Signs of rejection (organ-specific symptoms)'
      ],
      focusAreas: [
        'MEDICATION ADHERENCE: Critical for graft survival. Discuss barriers, side effects, drug-nutrient interactions',
        'FOOD SAFETY EDUCATION: Comprehensive teaching on safe food handling, high-risk foods to avoid, proper cooking temperatures',
        'NODAT screening: 20-50% of all transplant recipients develop diabetes. Screen regularly, provide prevention education',
        'CARDIOVASCULAR RISK REDUCTION: Mediterranean diet, DASH principles, omega-3s, fiber, plant sterols',
        'BONE HEALTH: Universal calcium/vitamin D, DEXA monitoring, weight-bearing exercise, fall prevention',
        'INFECTION PREVENTION: Proper food safety, hand hygiene, avoid sick contacts, stay current with vaccines',
        'WEIGHT MANAGEMENT: Realistic goals, gradual changes, focus on nutrient density, regular physical activity',
        'QUALITY OF LIFE: Address psychological adjustment, body image, lifestyle changes, return to normalcy while maintaining health'
      ]
    }
  };

  const mealPlanResources = {
    kidney: [
      { name: 'National Kidney Foundation - Kidney Kitchen', url: 'https://www.kidney.org/nutrition/Kidney-Kitchen', description: 'Kidney-friendly recipes from various cultural backgrounds with filtering options for CKD stages and transplant' },
      { name: 'DaVita Kidney-Friendly Recipes', url: 'https://www.davita.com/diet-nutrition/recipes', description: 'Searchable recipe database with nutrition information, includes low-sodium and low-potassium options' },
      { name: 'American Kidney Fund - Kidney Kitchen', url: 'https://www.kidneyfund.org/living-kidney-disease/kidney-friendly-recipes', description: 'Budget-friendly kidney-friendly recipes with cultural variety' }
    ],
    liver: [
      { name: 'American Liver Foundation - Recipes', url: 'https://liverfoundation.org/resource-center/blog/tag/recipe/', description: 'Liver-friendly recipes and nutrition tips for liver disease and transplant patients' },
      { name: 'Canadian Liver Foundation - Recipes', url: 'https://www.liver.ca/patients-caregivers/liver-disease-management/nutrition/recipes/', description: 'Nutritious recipes suitable for liver disease management' },
      { name: 'UCSF Liver Transplant Nutrition Guide', url: 'https://transplant.ucsf.edu', description: 'Search for liver transplant nutrition resources and meal planning guidance' }
    ],
    heart: [
      { name: 'American Heart Association - Recipes', url: 'https://recipes.heart.org', description: 'Heart-healthy recipes with nutrition information, searchable by dietary needs' },
      { name: 'DASH Eating Plan Recipes', url: 'https://www.nhlbi.nih.gov/education/dash-eating-plan', description: 'DASH diet recipes ideal for heart transplant patients managing blood pressure' },
      { name: 'Mayo Clinic Heart-Healthy Recipes', url: 'https://www.mayoclinic.org/healthy-lifestyle/recipes/heart-healthy-recipes/rcs-20077894', description: 'Cardiologist-approved recipes with complete nutrition data' }
    ],
    lung: [
      { name: 'Cystic Fibrosis Foundation - Recipes', url: 'https://www.cff.org/managing-cf/recipes', description: 'High-calorie, high-protein recipes for CF patients pre-transplant' },
      { name: 'American Lung Association - Healthy Eating', url: 'https://www.lung.org/lung-health-diseases/wellness/nutrition', description: 'Nutrition guidance and resources for lung health' },
      { name: 'COPD Foundation Nutrition Resources', url: 'https://www.copdfoundation.org/Learn-More/I-am-a-Person-with-COPD/Nutrition.aspx', description: 'Meal planning for COPD and lung transplant patients' }
    ],
    pancreas: [
      { name: 'American Diabetes Association - Recipes', url: 'https://diabetes.org/healthy-living/recipes-nutrition/recipes', description: 'Diabetes-friendly recipes with carb counts, useful for monitoring post-transplant glucose' },
      { name: 'Beyond Type 1 - Recipes', url: 'https://beyondtype1.org/recipes/', description: 'Type 1 diabetes recipes and meal planning resources' },
      { name: 'JDRF Meal Planning Resources', url: 'https://www.jdrf.org/t1d-resources/living/nutrition/', description: 'Nutrition guidance for Type 1 diabetes and transplant considerations' }
    ],
    general: [
      { name: 'Transplant Living - Nutrition', url: 'https://transplantliving.org/after-the-transplant/healthy-living/nutrition/', description: 'UNOS general transplant nutrition guidance and meal planning tips' },
      { name: 'Oldways Cultural Food Traditions', url: 'https://oldwayspt.org', description: 'Mediterranean, Asian, Latin American, and African Heritage diet pyramids and recipes' },
      { name: 'USDA MyPlate', url: 'https://www.myplate.gov/myplate-kitchen', description: 'Recipe database with cultural variety and budget-friendly options' },
      { name: 'Leah\'s Pantry', url: 'https://www.leahspantry.org', description: 'Budget-friendly, culturally diverse recipes for families' }
    ]
  };

  const supplementGuidelines = {
    kidney: [
      { supplement: 'Calcium Carbonate or Citrate', dose: '1000-1200 mg/day (divided doses)', timing: 'With meals (carbonate) or anytime (citrate)', notes: 'Prevent steroid-induced bone loss. Citrate better absorbed, less constipating. Avoid taking with iron.' },
      { supplement: 'Vitamin D (Cholecalciferol)', dose: '1000-2000 IU/day or per lab values', timing: 'Daily with fat-containing meal', notes: 'Maintain 25-OH vitamin D >30 ng/mL. Monitor every 3 months first year. May need higher doses initially.' },
      { supplement: 'Magnesium Oxide or Glycinate', dose: '400-800 mg/day elemental', timing: 'Daily (split if GI upset)', notes: 'Tacrolimus causes renal magnesium wasting. Monitor levels monthly. Glycinate better absorbed, less GI upset. Target >1.7 mg/dL.' },
      { supplement: 'Multivitamin', dose: '1 daily', timing: 'Daily with meal', notes: 'General nutritional insurance. Avoid megadoses of vitamin A. Choose one without extra potassium if hyperkalemic.' },
      { supplement: 'Omega-3 Fatty Acids', dose: '1-2 g EPA+DHA daily', timing: 'With meals', notes: 'Cardiovascular protection, anti-inflammatory. Choose pharmaceutical grade. May reduce triglycerides.' }
    ],
    liver: [
      { supplement: 'Vitamin A (if deficient)', dose: '10,000 IU/day initially', timing: 'Daily with fat-containing meal', notes: 'Common deficiency pre-transplant. Monitor levels - can become toxic. Water-miscible form if cholestatic. Reduce dose once replete.' },
      { supplement: 'Vitamin D', dose: '2000-4000 IU/day or per levels', timing: 'Daily with fat', notes: 'Severe deficiency common pre-transplant. Monitor every 3 months. May need 50,000 IU weekly for repletion if very low.' },
      { supplement: 'Vitamin E (if deficient)', dose: '400-800 IU/day', timing: 'Daily with fat', notes: 'Common deficiency pre-transplant. Water-miscible form if cholestatic. Monitor levels. May not need long-term if absorbing well post-transplant.' },
      { supplement: 'Vitamin K (if deficient)', dose: '5-10 mg/day', timing: 'Daily', notes: 'Critical for coagulation pre-transplant. Monitor INR. Usually can discontinue post-transplant if absorbing well and not on anticoagulants.' },
      { supplement: 'Zinc Sulfate', dose: '50 mg elemental daily', timing: 'Between meals if tolerated', notes: 'Common deficiency in cirrhosis. Helps with wound healing, immune function, encephalopathy. Monitor levels quarterly.' },
      { supplement: 'Calcium', dose: '1200-1500 mg/day', timing: 'Divided doses with meals', notes: 'Critical for bone health. Liver disease and steroids cause severe bone loss. Consider bisphosphonates if T-score <-2.5.' },
      { supplement: 'Multivitamin', dose: '1 daily', timing: 'With meal', notes: 'General support. May not need separate fat-soluble vitamins if absorbing well post-transplant and levels normal.' }
    ],
    heart: [
      { supplement: 'Calcium', dose: '1000-1200 mg/day', timing: 'Divided doses', notes: 'Bone health with steroid use. Split doses for better absorption. Consider citrate form.' },
      { supplement: 'Vitamin D', dose: '1000-2000 IU/day or per levels', timing: 'Daily with fat', notes: 'Bone health, immune support. Monitor levels every 3-6 months. Target >30 ng/mL.' },
      { supplement: 'Magnesium', dose: '400-600 mg/day', timing: 'Daily or divided', notes: 'Critical for cardiac rhythm. Depleted by diuretics and tacrolimus. Monitor monthly. Target >2.0 mg/dL.' },
      { supplement: 'Omega-3 (EPA+DHA)', dose: '1-2 g/day', timing: 'With meals', notes: 'Anti-arrhythmic, reduces cardiac allograft vasculopathy risk. Use pharmaceutical grade. May reduce triglycerides.' },
      { supplement: 'Coenzyme Q10', dose: '100-200 mg/day', timing: 'With fat-containing meal', notes: 'If on statin therapy (depletes CoQ10). May help with muscle symptoms. Discuss with team.' },
      { supplement: 'Plant Sterols', dose: '2 g/day', timing: 'With meals', notes: 'LDL cholesterol reduction (additional 10%). Found in fortified foods or supplements. Use if high LDL despite statin.' }
    ],
    lung: [
      { supplement: 'Vitamin A (CF)', dose: '10,000-15,000 IU/day water-miscible', timing: 'Daily with PERT', notes: 'CF patients: Continue high-dose supplementation. Water-miscible form essential. Monitor levels quarterly. Non-CF: standard multivitamin usually adequate.' },
      { supplement: 'Vitamin D', dose: '2000-4000 IU/day', timing: 'Daily with fat (and PERT if CF)', notes: 'All lung transplant patients at high risk. CF patients need higher doses. Monitor levels every 3 months. Target >30 ng/mL.' },
      { supplement: 'Vitamin E (CF)', dose: '400-800 IU/day water-miscible', timing: 'Daily with PERT', notes: 'CF patients: Continue supplementation. Water-miscible form. Monitor levels. Non-CF: usually adequate in diet/MVI.' },
      { supplement: 'Vitamin K (CF)', dose: '5-10 mg/day', timing: 'Daily', notes: 'CF patients: Essential supplementation. Monitor coagulation if needed. Non-CF: usually adequate in diet.' },
      { supplement: 'Calcium', dose: '1200-1500 mg/day', timing: 'Divided doses', notes: 'ALL patients: critical for bone health. Lung disease and steroids cause severe osteoporosis. DEXA monitoring essential.' },
      { supplement: 'Magnesium', dose: '400-800 mg/day', timing: 'Daily', notes: 'Tacrolimus causes wasting. Monitor monthly. Essential for all patients.' },
      { supplement: 'Pancreatic Enzymes (CF)', dose: 'Per lipase needs', timing: 'With all meals and snacks', notes: 'CF patients: Continue PERT post-transplant. Adjust doses as needed. Monitor for adequate fat absorption.' },
      { supplement: 'Multivitamin', dose: '1-2 daily', timing: 'With meals', notes: 'CF patients may need 2/day for higher doses. Non-CF: standard MVI adequate.' }
    ],
    pancreas: [
      { supplement: 'Calcium Carbonate or Citrate', dose: '1200-1500 mg/day (divided doses)', timing: 'With meals (carbonate) or anytime (citrate)', notes: 'CRITICAL: Years of diabetes + steroids = severe bone loss risk. Citrate better absorbed. DEXA monitoring essential.' },
      { supplement: 'Vitamin D (Cholecalciferol)', dose: '2000-4000 IU/day or per lab values', timing: 'Daily with fat-containing meal', notes: 'Maintain 25-OH vitamin D >30 ng/mL. Diabetes history increases deficiency risk. Monitor every 3 months first year.' },
      { supplement: 'Magnesium Oxide or Glycinate', dose: '400-800 mg/day elemental', timing: 'Daily (split if GI upset)', notes: 'Tacrolimus causes renal wasting. Diabetes may compound deficiency. Glycinate better absorbed. Target >1.7 mg/dL.' },
      { supplement: 'Omega-3 (EPA+DHA)', dose: '1-2 g/day', timing: 'With meals', notes: 'CRITICAL for cardiovascular protection given diabetes history. May improve lipid profile. Choose pharmaceutical grade.' },
      { supplement: 'Multivitamin', dose: '1 daily', timing: 'With meal', notes: 'General nutritional support. Avoid megadoses. SPK patients: choose one without extra potassium if hyperkalemic.' },
      { supplement: 'Alpha-Lipoic Acid (if neuropathy)', dose: '600 mg/day', timing: 'Daily', notes: 'May help with diabetic neuropathy symptoms. Discuss with transplant team first. Not a replacement for glucose control.' },
      { supplement: 'B-Complex (if neuropathy)', dose: 'Per product', timing: 'Daily', notes: 'B1, B6, B12 may support nerve health. Especially if history of diabetic neuropathy. Don\'t exceed recommended doses.' }
    ],
    general: [
      { supplement: 'Do NOT Take', dose: 'AVOID', timing: 'Never', notes: '🔴 CRITICAL: Grapefruit/pomegranate (any form), St. John\'s Wort, high-dose antioxidants during cancer treatment. Discuss ALL supplements with transplant team before taking.' },
      { supplement: 'Probiotic (if on antibiotics)', dose: 'Per product', timing: '2 hours away from antibiotic', notes: 'May help prevent antibiotic-associated diarrhea. Choose reputable brand. Discuss with team if severely immunosuppressed.' },
      { supplement: 'Vitamin B12 (if on metformin)', dose: '1000 mcg/day', timing: 'Daily', notes: 'Metformin (for NODAT) can deplete B12. Monitor levels yearly if on long-term metformin.' }
    ]
  };

  const foodSafetyGuidelines = {
    general: [
      '🔴 CRITICAL PERIOD: First 3-6 months post-transplant when immunosuppression highest',
      '🔴 AVOID RAW/UNDERCOOKED: All meats, poultry, fish, shellfish, eggs (no runny yolks, no raw cookie dough)',
      '🔴 AVOID UNPASTEURIZED: Milk, cheese, juice, cider. Soft cheeses (brie, camembert, feta, queso fresco) unless labeled pasteurized',
      '🔴 AVOID DELI MEATS: Unless heated to 165°F (steaming hot). Listeria risk. Includes hot dogs, lunch meats, cold cuts',
      '🔴 AVOID RAW SPROUTS: Alfalfa, bean, clover sprouts. High bacterial contamination risk',
      '🔴 AVOID UNPASTEURIZED HONEY: Especially on immunosuppression. Pasteurized honey okay',
      '⚠️ WASH ALL PRODUCE: Thoroughly under running water. Use produce brush. Even if labeled "pre-washed"',
      '⚠️ SEPARATE RAW/COOKED: Use separate cutting boards for raw meats and produce. Prevent cross-contamination',
      '⚠️ COOK TO SAFE TEMPERATURES: Poultry 165°F, ground meats 160°F, whole cuts beef/pork 145°F, fish 145°F, eggs until firm',
      '⚠️ REFRIGERATE PROMPTLY: Within 2 hours (1 hour if >90°F outside). Keep fridge at 40°F or below',
      '⚠️ LEFTOVERS: Consume within 3-4 days. Reheat to 165°F. When in doubt, throw it out',
      '⚠️ BUFFETS/SALAD BARS: Avoid first 6 months. Temperature control uncertain. High contamination risk',
      '⚠️ RESTAURANT SAFETY: Choose reputable establishments. Request well-done meats. Avoid raw/undercooked items',
      'SAFE SEAFOOD: Well-cooked fish (145°F). Avoid raw (sushi, oysters, ceviche). Choose low-mercury options',
      'SAFE FRUITS: Thick-skinned fruits safer (bananas, oranges). Wash thoroughly. Avoid pre-cut fruit from stores',
      'SAFE VEGETABLES: Cooked vegetables safest. Wash raw thoroughly. Avoid unwashed salad greens from restaurants',
      'WATER SAFETY: Drink municipal or well-tested water. Avoid well water unless tested. Bottled water safe',
      'HAND HYGIENE: Wash hands before cooking/eating, after handling raw foods, after bathroom. 20 seconds with soap',
      'THAWING: In refrigerator, cold water (change every 30 min), or microwave. NEVER on counter',
      'PICNICS/OUTINGS: Use cooler with ice. Keep cold foods <40°F. Don\'t leave food out >1 hour if hot weather'
    ],
    grapefruit: [
      '🔴 ABSOLUTELY AVOID: Grapefruit (all forms - fresh, juice, dried)',
      '🔴 ABSOLUTELY AVOID: Pomegranate (all forms - seeds, juice, molasses)',
      '🔴 MECHANISM: Inhibits CYP3A4 enzyme → dramatically increases tacrolimus/cyclosporine blood levels',
      '🔴 RISK: Medication toxicity - kidney damage, neurological effects, increased infection risk',
      '🔴 DURATION: Effect lasts 24-72 hours. Even occasional consumption dangerous',
      '⚠️ CAUTION: Seville oranges (bitter oranges, used in marmalades), tangelos - may have similar effect',
      '✓ SAFE ALTERNATIVES: Regular oranges, tangerines, lemons, limes, other citrus (except listed above)',
      'NOTE: This interaction applies to most transplant patients on tacrolimus or cyclosporine. Confirm with your team'
    ],
    supplements: [
      '🔴 NEVER WITHOUT APPROVAL: St. John\'s Wort (decreases immunosuppressant levels → REJECTION RISK)',
      '🔴 DISCUSS FIRST: All herbal supplements, vitamins >100% DV, "immune boosting" products',
      '⚠️ COMMON INTERACTIONS: Echinacea (immune stimulant), high-dose antioxidants, milk thistle, ginseng',
      '⚠️ DISCUSS: Turmeric/curcumin (may affect drug levels), CBD/cannabis products (interactions unclear)',
      '✓ GENERALLY SAFE: Calcium, vitamin D, magnesium, standard multivitamin (as prescribed)',
      '✓ DISCUSS BUT LIKELY SAFE: Omega-3 fish oil, probiotics (after acute period)',
      'RULE: Assume interaction until proven otherwise. Always ask transplant team before taking ANY new supplement'
    ]
  };

  const resources = {
    financialAssistance: [
      { name: 'Find Help (211)', url: 'https://www.findhelp.org', description: 'Search local food assistance, housing, healthcare, utilities, and family services. Available in multiple languages.' },
      { name: 'SNAP Benefits (Food Stamps)', url: 'https://www.fns.usda.gov/snap', description: 'Monthly food assistance for low-income individuals. Transplant patients often qualify. Apply online or at local office.' },
      { name: 'Medicare Extra Help', url: 'https://www.ssa.gov/benefits/medicare/prescriptionhelp', description: 'Help paying for prescription drugs (Part D). Critical for expensive immunosuppression medications.' },
      { name: 'NeedyMeds', url: 'https://www.needymeds.org', description: 'Free information on patient assistance programs, free clinics, discount drug cards. Search by medication name.' },
      { name: 'Partnership for Prescription Assistance', url: 'https://www.pparx.org', description: 'Helps patients without prescription coverage get free or low-cost medications' },
      { name: 'Patient Advocate Foundation', url: 'https://www.patientadvocate.org', description: 'Co-pay relief for transplant medications, case management, insurance appeals assistance' },
      { name: 'HealthWell Foundation', url: 'https://www.healthwellfoundation.org', description: 'Financial assistance for medication co-pays, premiums, insurance. Specific transplant fund.' },
      { name: 'National Transplant Assistance Fund', url: 'https://www.transplantfund.org', description: 'Fundraising assistance for transplant-related expenses not covered by insurance' },
      { name: 'Feeding America Food Bank Locator', url: 'https://www.feedingamerica.org/find-your-local-foodbank', description: 'Locate food banks nationwide. Many have fresh produce programs and special diet assistance.' },
      { name: 'Transportation Assistance', url: 'https://www.benefits.gov', description: 'Search for local programs providing medical transportation. Many transplant centers have partnerships with services.' },
      { name: 'Modest Needs', url: 'https://www.modestneeds.org', description: 'Emergency assistance grants for rent, utilities, medical bills for working individuals' }
    ],
    healthEquity: [
      { name: 'National Culturally and Linguistically Appropriate Services (CLAS) Standards', url: 'https://thinkculturalhealth.hhs.gov/clas', description: 'HHS framework for providing culturally competent care. Essential training for all healthcare providers.' },
      { name: 'Ethnomed', url: 'https://ethnomed.org', description: 'Cultural information for healthcare providers. Patient education materials in 20+ languages. Cultural beliefs about health, traditional medicines.' },
      { name: 'Health Resources and Services Administration - Cultural Competence', url: 'https://www.hrsa.gov/about/organization/bureaus/ohe/health-equity/cultural-competency', description: 'Resources for addressing health disparities and providing culturally competent care' },
      { name: 'Stanford Medicine - Ethnogeriatrics', url: 'https://geriatrics.stanford.edu/ethnomed', description: 'Cultural-specific health information for diverse populations' },
      { name: 'Refugee Health Technical Assistance Center', url: 'https://refugeehealthta.org', description: 'Resources for serving refugee and immigrant populations, including dietary guidance' },
      { name: 'CDC - Health Equity Resources', url: 'https://www.cdc.gov/healthequity', description: 'Data on health disparities, toolkit for addressing social determinants of health' },
      { name: 'American Medical Association - Health Equity Resources', url: 'https://www.ama-assn.org/delivering-care/health-equity', description: 'Clinical resources for addressing bias, structural racism in healthcare' }
    ],
    culturalNutrition: [
      { name: 'Oldways Cultural Food Guides', url: 'https://oldwayspt.org', culture: 'Multi-cultural', description: 'Evidence-based healthy eating patterns: Mediterranean, Asian, Latin American, African Heritage, vegetarian pyramids' },
      { name: 'USDA MyPlate en Español', url: 'https://www.myplate.gov/resources/print-materials/myplate-tip-sheets-spanish', culture: 'Spanish', description: 'Nutrition education materials in Spanish' },
      { name: 'Kidneys Kitchen (NKF)', url: 'https://www.kidney.org/nutrition/Kidney-Kitchen', culture: 'Multi-cultural', description: 'Kidney-friendly recipes from various cultural backgrounds' },
      { name: 'Diverse Elders Coalition', url: 'https://www.diverseelders.org', culture: 'Multi-cultural', description: 'Resources for serving diverse older adult populations' },
      { name: 'Asian Health Coalition', url: 'https://www.asianhealth.org', culture: 'Asian', description: 'Health resources for Asian American communities, culturally appropriate materials' },
      { name: 'National Hispanic Medical Association', url: 'https://www.nhmamd.org', culture: 'Hispanic/Latino', description: 'Resources for serving Hispanic/Latino patients' },
      { name: 'Association of Black Cardiologists', url: 'https://abcardio.org', culture: 'African American', description: 'Health equity resources, patient education for African American communities' }
    ],
    interpreterServices: [
      { name: 'National Board of Certification for Medical Interpreters', url: 'https://www.certifiedmedicalinterpreters.org', description: 'Find certified medical interpreters. Federal law requires language assistance for LEP patients.' },
      { name: 'Language Line Solutions', url: 'https://www.languageline.com', description: 'On-demand phone/video interpretation in 240+ languages for healthcare settings' },
      { name: 'Think Cultural Health (HHS)', url: 'https://thinkculturalhealth.hhs.gov', description: 'Free CME courses on cultural competency, working with interpreters, health literacy' },
      { name: 'Multilingual Patient Education Materials', url: 'https://www.healthinfotranslations.org', description: 'Health education materials in 20+ languages. Free download and print.' }
    ],
    organizations: [
      { name: 'United Network for Organ Sharing (UNOS)', url: 'https://unos.org', description: 'National transplant network, patient resources, data' },
      { name: 'National Kidney Foundation', url: 'https://www.kidney.org', description: 'Kidney transplant resources, nutrition guidelines, patient education' },
      { name: 'American Liver Foundation', url: 'https://liverfoundation.org', description: 'Liver transplant information, support groups, nutrition guidance' },
      { name: 'American Heart Association', url: 'https://www.heart.org', description: 'Heart transplant resources, cardiac nutrition, lifestyle guidance' },
      { name: 'American Lung Association', url: 'https://www.lung.org', description: 'Lung transplant information, pulmonary nutrition' },
      { name: 'Cystic Fibrosis Foundation', url: 'https://www.cff.org', description: 'CF-specific transplant resources, nutrition guidelines for CF patients' }
    ],
    professional: [
      { name: 'Academy of Nutrition & Dietetics', url: 'https://www.eatright.org', description: 'Evidence Analysis Library, transplant nutrition resources' },
      { name: 'ASPEN (Nutrition Support)', url: 'https://www.nutritioncare.org', description: 'Clinical guidelines, transplant nutrition protocols' },
      { name: 'National Kidney Foundation KDOQI', url: 'https://www.kidney.org/professionals/kdoqi', description: 'Kidney disease and transplant clinical guidelines' },
      { name: 'AASLD (Liver)', url: 'https://www.aasld.org', description: 'Liver disease and transplant practice guidelines' },
      { name: 'ISHLT (Heart & Lung)', url: 'https://ishlt.org', description: 'International heart and lung transplant guidelines' },
      { name: 'Transplant Living (UNOS)', url: 'https://transplantliving.org', description: 'Patient education materials, nutrition handouts' }
    ],
    guidelines: [
      { name: 'KDOQI Nutrition Guidelines', year: '2020', organ: 'Kidney', description: 'Comprehensive CKD and transplant nutrition recommendations' },
      { name: 'ESPEN Liver Disease Guidelines', year: '2019', organ: 'Liver', description: 'European nutrition guidelines for liver disease and transplant' },
      { name: 'AASLD Practice Guidelines', year: 'Various', organ: 'Liver', description: 'Clinical practice guidelines for liver transplantation' },
      { name: 'AHA Dietary Guidelines', year: '2021', organ: 'Heart', description: 'Cardiovascular nutrition and heart transplant guidance' },
      { name: 'CF Foundation Nutrition Guidelines', year: '2016', organ: 'Lung/CF', description: 'CF-specific nutrition recommendations including transplant' },
      { name: 'KDIGO Transplant Guidelines', year: '2009', organ: 'Kidney', description: 'International kidney transplant clinical practice guidelines' }
    ]
  };

  const currentOrgan = organs.find(o => o.id === activeOrgan);
  const currentContent = organContent[activeOrgan];
  const OrganIcon = currentOrgan.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cross className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transplant Nutrition Dashboard</h1>
                <p className="text-sm text-gray-600">Evidence-Based Guidelines for Dietitians</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search nutrients, guidelines..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>

          {/* Search Results Modal */}
          {showSearchResults && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowSearchResults(false)}>
              <div className="bg-white rounded-xl max-w-4xl w-full my-8 p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Search Results for "{searchTerm}" ({searchResults.length} found)
                  </h2>
                  <button 
                    onClick={() => setShowSearchResults(false)} 
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  {searchResults.map((result, idx) => {
                    const organ = organs.find(o => o.id === result.organId);
                    return (
                      <div 
                        key={idx} 
                        className={`${organ.lightColor} border-l-4 ${organ.color.replace('bg-', 'border-')} rounded-lg p-4 cursor-pointer hover:shadow-md transition`}
                        onClick={() => {
                          setActiveOrgan(result.organId);
                          setShowSearchResults(false);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 ${organ.color} text-white rounded text-xs font-medium`}>
                              {result.organ}
                            </span>
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                              {result.type}
                            </span>
                          </div>
                          {result.recommendation && (
                            <span className={`px-3 py-1 ${organ.color} text-white rounded-full text-sm font-medium`}>
                              {result.recommendation}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{result.title}</h3>
                        <p className="text-sm text-gray-700">{result.content}</p>
                        <p className="text-xs text-gray-500 mt-2 italic">Click to view in {result.organ} section</p>
                      </div>
                    );
                  })}
                </div>
                
                {searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No results found for "{searchTerm}"</p>
                    <p className="text-sm text-gray-500 mt-2">Try searching for nutrients like "protein", "sodium", or conditions like "NODAT"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {showMealPlans && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4" onClick={() => setShowMealPlans(false)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Meal Planning Resources - {currentOrgan.name}</h2>
                <button onClick={() => setShowMealPlans(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>💡 Recommended Approach:</strong> The following resources offer evidence-based recipes and meal plans from reputable organizations. These resources serve diverse populations and can be adapted to individual patient needs, cultural preferences, and dietary restrictions.
                </p>
              </div>
              
              {mealPlanResources[activeOrgan] && (
                <div className="space-y-4">
                  {mealPlanResources[activeOrgan].map((resource, idx) => (
                    <a 
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 rounded-lg p-5 transition shadow-sm hover:shadow-md"
                    >
                      <h3 className="text-lg font-bold text-blue-900 mb-2">{resource.name}</h3>
                      <p className="text-sm text-blue-800 mb-2">{resource.description}</p>
                      <p className="text-xs text-blue-600 font-mono">{resource.url}</p>
                    </a>
                  ))}
                  
                  {mealPlanResources.general && (
                    <>
                      <div className="mt-8 mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Additional General Resources</h3>
                      </div>
                      {mealPlanResources.general.map((resource, idx) => (
                        <a 
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 border-2 border-green-200 rounded-lg p-5 transition shadow-sm hover:shadow-md"
                        >
                          <h3 className="text-lg font-bold text-green-900 mb-2">{resource.name}</h3>
                          <p className="text-sm text-green-800 mb-2">{resource.description}</p>
                          <p className="text-xs text-green-600 font-mono">{resource.url}</p>
                        </a>
                      ))}
                    </>
                  )}
                </div>
              )}
              
              <div className="mt-6 bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2">Working with Patients</h4>
                <ul className="text-sm text-purple-900 space-y-1">
                  <li>• Ask patients about their food preferences, cooking methods, and cultural practices</li>
                  <li>• Collaborate with patients to adapt traditional foods to meet transplant nutrition needs</li>
                  <li>• Use the resources above to find culturally appropriate recipes and meal ideas</li>
                  <li>• Provide materials in the patient's preferred language when available</li>
                  <li>• Consider food access, budget constraints, and cooking abilities when making recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {showSupplements && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4" onClick={() => setShowSupplements(false)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Supplement Guidelines - {currentOrgan.name}</h2>
                <button onClick={() => setShowSupplements(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              <div className="space-y-4">
                {supplementGuidelines[activeOrgan]?.map((supp, idx) => {
                  const isAvoid = supp.supplement.includes('NOT') || supp.dose === 'AVOID';
                  return (
                    <div key={idx} className={`${isAvoid ? 'bg-red-50 border-l-4 border-red-500' : 'bg-purple-50 border-l-4 border-purple-500'} rounded-lg p-4`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{supp.supplement}</h3>
                        <span className={`${isAvoid ? 'bg-red-500' : 'bg-purple-500'} text-white px-3 py-1 rounded-full text-sm font-medium`}>{supp.dose}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1"><strong>Timing:</strong> {supp.timing}</p>
                      <p className="text-sm text-gray-600">{supp.notes}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900">
                  <strong>Critical Reminder:</strong> Always discuss ALL supplements with the transplant team before taking. Many supplements interact with immunosuppressive medications and can cause rejection or toxicity.
                </p>
              </div>
            </div>
          </div>
        )}

        {showFoodSafety && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4" onClick={() => setShowFoodSafety(false)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Food Safety & Drug-Food Interactions</h2>
                <button onClick={() => setShowFoodSafety(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">General Food Safety</h3>
                  <div className="space-y-2">
                    {foodSafetyGuidelines.general.map((guideline, idx) => {
                      const isCritical = guideline.startsWith('🔴');
                      const isWarning = guideline.startsWith('⚠️');
                      return (
                        <div 
                          key={idx} 
                          className={`rounded-lg p-3 ${
                            isCritical ? 'bg-red-50 border-l-4 border-red-500' : 
                            isWarning ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                            'bg-blue-50 border-l-4 border-blue-500'
                          }`}
                        >
                          <p className="text-sm text-gray-900">{guideline}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Grapefruit & Pomegranate - CRITICAL</h3>
                  <div className="space-y-2">
                    {foodSafetyGuidelines.grapefruit.map((guideline, idx) => (
                      <div 
                        key={idx} 
                        className={`rounded-lg p-3 ${
                          guideline.startsWith('🔴') ? 'bg-red-50 border-l-4 border-red-500' :
                          guideline.startsWith('⚠️') ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                          guideline.startsWith('✓') ? 'bg-green-50 border-l-4 border-green-500' :
                          'bg-gray-50 border-l-4 border-gray-500'
                        }`}
                      >
                        <p className="text-sm text-gray-900">{guideline}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Supplements & Herbal Products</h3>
                  <div className="space-y-2">
                    {foodSafetyGuidelines.supplements.map((guideline, idx) => (
                      <div 
                        key={idx} 
                        className={`rounded-lg p-3 ${
                          guideline.startsWith('🔴') ? 'bg-red-50 border-l-4 border-red-500' :
                          guideline.startsWith('⚠️') ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                          guideline.startsWith('✓') ? 'bg-green-50 border-l-4 border-green-500' :
                          'bg-gray-50 border-l-4 border-gray-500'
                        }`}
                      >
                        <p className="text-sm text-gray-900">{guideline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResources && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4" onClick={() => setShowResources(false)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Professional Resources & Health Equity</h2>
                <button onClick={() => setShowResources(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-900">
                    <strong>💡 Health Equity Reminder:</strong> Screen ALL patients for social determinants of health (food insecurity, housing, transportation, medication costs). Use validated screening tools. Address disparities in transplant access and outcomes. Provide culturally humble, language-concordant care.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Financial Assistance & Food Access</h3>
                  <div className="space-y-3">
                    {resources.financialAssistance.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition"
                      >
                        <h4 className="font-bold text-green-900">{resource.name}</h4>
                        <p className="text-sm text-green-800 mt-1">{resource.description}</p>
                        <p className="text-xs text-green-600 mt-2">{resource.url}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🌍 Health Equity & Cultural Competence Resources</h3>
                  <div className="space-y-3">
                    {resources.healthEquity.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 transition"
                      >
                        <h4 className="font-bold text-purple-900">{resource.name}</h4>
                        <p className="text-sm text-purple-800 mt-1">{resource.description}</p>
                        <p className="text-xs text-purple-600 mt-2">{resource.url}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🍽️ Cultural Nutrition Resources</h3>
                  <div className="space-y-3">
                    {resources.culturalNutrition.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 transition"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-orange-900">{resource.name}</h4>
                          <span className="bg-orange-200 text-orange-900 px-2 py-1 rounded text-xs font-medium">{resource.culture}</span>
                        </div>
                        <p className="text-sm text-orange-800 mt-1">{resource.description}</p>
                        <p className="text-xs text-orange-600 mt-2">{resource.url}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🗣️ Language Access & Interpreter Services</h3>
                  <div className="space-y-3">
                    {resources.interpreterServices.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition"
                      >
                        <h4 className="font-bold text-blue-900">{resource.name}</h4>
                        <p className="text-sm text-blue-800 mt-1">{resource.description}</p>
                        <p className="text-xs text-blue-600 mt-2">{resource.url}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🏥 Patient Organizations</h3>
                  <div className="space-y-3">
                    {resources.organizations.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition"
                      >
                        <h4 className="font-bold text-blue-900">{resource.name}</h4>
                        <p className="text-sm text-blue-800 mt-1">{resource.description}</p>
                        <p className="text-xs text-blue-600 mt-2">{resource.url}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Professional Organizations</h3>
                  <div className="space-y-3">
                    {resources.professional.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-4 transition"
                      >
                        <h4 className="font-bold text-teal-900">{resource.name}</h4>
                        <p className="text-sm text-teal-800 mt-1">{resource.description}</p>
                        <p className="text-xs text-teal-600 mt-2">{resource.url}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Clinical Guidelines</h3>
                  <div className="space-y-3">
                    {resources.guidelines.map((resource, idx) => (
                      <div 
                        key={idx}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-amber-900">{resource.name}</h4>
                          <div className="text-right">
                            <span className="bg-amber-200 text-amber-900 px-2 py-1 rounded text-xs font-medium block mb-1">{resource.organ}</span>
                            <span className="text-xs text-amber-700">{resource.year}</span>
                          </div>
                        </div>
                        <p className="text-sm text-amber-800 mt-1">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4 mt-6">
                  <h4 className="font-bold text-indigo-900 mb-2">Key Health Disparities in Transplantation</h4>
                  <ul className="text-sm text-indigo-900 space-y-1">
                    <li>• African Americans: 3.5x higher rate of kidney failure, longer wait times, higher rejection rates, higher NODAT and hypertension</li>
                    <li>• Hispanic/Latino: 1.5x higher kidney failure rate, 55% NODAT risk, barriers to listing (insurance, documentation)</li>
                    <li>• Asian Americans: 42% NODAT risk, high rates of hepatitis B-related liver disease, lower transplant rates</li>
                    <li>• Native Americans: Highest diabetes rates, limited access to transplant centers, cultural barriers</li>
                    <li>• Women: Less likely to be referred for transplant, receive living donor kidneys at lower rates</li>
                    <li>• Low-income: Food insecurity affects diet adherence, medication costs affect immunosuppression adherence</li>
                    <li>• Rural: Limited access to transplant centers, transportation barriers, fewer specialists</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* General Guidelines Section - Always Visible */}
        <div className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 border-2 border-indigo-200">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-10 h-10 text-indigo-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Universal Transplant Guidelines</h2>
              <p className="text-sm text-gray-600">Critical information for ALL transplant recipients</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">🔴 Critical Drug-Food Interactions</h3>
              {organContent.general.keyNutrients.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{item.nutrient}</h4>
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium whitespace-nowrap ml-2">
                      {item.recommendation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{item.rationale}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">⚠️ Key Considerations</h3>
              {organContent.general.keyNutrients.slice(3, 8).map((item, idx) => (
                <div key={idx} className="bg-white border-l-4 border-yellow-500 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{item.nutrient}</h4>
                    <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-medium whitespace-nowrap ml-2">
                      {item.recommendation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Universal Red Flags</h3>
              </div>
              <ul className="space-y-2">
                {organContent.general.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-red-900">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Universal Focus Areas</h3>
              <ul className="space-y-2">
                {organContent.general.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Organ Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Organ-Specific Guidelines</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {organs.map((organ) => {
              const Icon = organ.icon;
              return (
                <button
                  key={organ.id}
                  onClick={() => setActiveOrgan(organ.id)}
                  className={`p-4 rounded-xl transition-all ${
                    activeOrgan === organ.id
                      ? `${organ.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium text-center">{organ.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Nutrients */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <OrganIcon className={`w-8 h-8 ${currentOrgan.color.replace('bg-', 'text-')}`} />
                <h2 className="text-2xl font-bold text-gray-900">{currentOrgan.name} Transplant</h2>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Patient Handout</span>
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Nutrient Recommendations</h3>
              <div className="space-y-3">
                {currentContent.keyNutrients.map((item, idx) => {
                  const isCritical = item.rationale.includes('🔴 CRITICAL');
                  const isWarning = item.rationale.includes('⚠️');
                  const borderColor = isCritical ? 'border-red-500' : isWarning ? 'border-yellow-500' : currentOrgan.color.replace('bg-', 'border-');
                  const bgColor = isCritical ? 'bg-red-50' : isWarning ? 'bg-yellow-50' : currentOrgan.lightColor;
                  
                  return (
                    <div key={idx} className={`${bgColor} border-l-4 ${borderColor} rounded-lg p-4`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{item.nutrient}</h4>
                        <span className={`px-3 py-1 ${currentOrgan.color} text-white rounded-full text-sm font-medium whitespace-nowrap ml-2`}>
                          {item.recommendation}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{item.rationale}</p>
                      {item.disparities && (
                        <p className="text-sm text-gray-700 mt-2">{item.disparities}</p>
                      )}
                      <p className="text-xs text-gray-500 italic mt-1">Source: {item.source}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Focus Areas</h3>
              <ul className="space-y-2">
                {currentContent.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${currentOrgan.color} rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Red Flags Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Red Flags</h3>
              </div>
              <ul className="space-y-3">
                {currentContent.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-red-900">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => { setShowMealPlans(true); setShowSupplements(false); setShowFoodSafety(false); setShowResources(false); }}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-blue-100 rounded-lg transition text-sm font-medium text-gray-700"
                >
                  📋 Meal Planning Resources
                </button>
                <button 
                  onClick={() => { setShowSupplements(true); setShowMealPlans(false); setShowFoodSafety(false); setShowResources(false); }}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-blue-100 rounded-lg transition text-sm font-medium text-gray-700"
                >
                  💊 Supplement Guidelines
                </button>
                <button 
                  onClick={() => { setShowFoodSafety(true); setShowMealPlans(false); setShowSupplements(false); setShowResources(false); }}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-blue-100 rounded-lg transition text-sm font-medium text-gray-700"
                >
                  🛡️ Food Safety & Drug Interactions
                </button>
                <button 
                  onClick={() => { setShowResources(true); setShowMealPlans(false); setShowSupplements(false); setShowFoodSafety(false); }}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-blue-100 rounded-lg transition text-sm font-medium text-gray-700"
                >
                  🔗 Financial Aid & Health Equity Resources
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 space-y-2">
          <p className="font-semibold">Evidence-Based Guidelines Integrated:</p>
          <p>KDOQI | KDIGO | ESPEN | ASPEN | AASLD | AHA | ISHLT | CF Foundation | Academy of Nutrition & Dietetics</p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-4 max-w-4xl mx-auto">
            <p className="font-semibold text-indigo-900 mb-2">Commitment to Health Equity</p>
            <p className="text-xs text-indigo-900">
              This dashboard integrates evidence on health disparities in transplantation. We acknowledge that systemic racism, discrimination, and social determinants of health create inequitable access to transplantation and outcomes. All patients deserve culturally humble, language-concordant, bias-free care. Screen for food insecurity, medication costs, transportation barriers, and housing instability. Address disparities in transplant referral, listing, and post-transplant care.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Disclaimer: This dashboard provides general guidelines. Always consult with the transplant team for patient-specific recommendations.</p>
        </div>
      </div>
    </div>
  );
}

export default App;