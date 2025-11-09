import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface NutritionResponse {
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      return new Response(
        JSON.stringify({ error: "No image file provided" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const meals = [
      { name: "Grilled Chicken Salad", calories: 425, protein: 38, carbs: 24, fat: 18 },
      { name: "Salmon with Quinoa", calories: 520, protein: 42, carbs: 45, fat: 18 },
      { name: "Vegetarian Buddha Bowl", calories: 380, protein: 15, carbs: 58, fat: 12 },
      { name: "Turkey Sandwich", calories: 450, protein: 28, carbs: 52, fat: 14 },
      { name: "Greek Yogurt Parfait", calories: 320, protein: 20, carbs: 42, fat: 8 },
      { name: "Steak and Vegetables", calories: 580, protein: 48, carbs: 22, fat: 32 },
      { name: "Pasta Primavera", calories: 480, protein: 16, carbs: 68, fat: 16 },
      { name: "Avocado Toast", calories: 350, protein: 12, carbs: 38, fat: 18 },
    ];

    const selectedMeal = meals[Math.floor(Math.random() * meals.length)];
    
    const response: NutritionResponse = {
      mealName: selectedMeal.name,
      calories: selectedMeal.calories,
      protein: selectedMeal.protein,
      carbs: selectedMeal.carbs,
      fat: selectedMeal.fat,
      confidence: Math.floor(Math.random() * 15) + 80,
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
