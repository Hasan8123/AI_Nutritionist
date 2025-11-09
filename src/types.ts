export interface NutritionData {
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

// Webhook response types based on provided example
export interface WebhookFoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WebhookTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WebhookOutput {
  status: string; // "success" | "error"
  food: WebhookFoodItem[];
  total: WebhookTotals;
}

// The webhook returns an array of envelopes with action and response.output
export interface WebhookEnvelope {
  action: string; // e.g., "parse"
  response: {
    output: WebhookOutput;
  };
}

export type WebhookResponse = WebhookEnvelope[];