export interface Plan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export const availablePlans: Plan[] = [
  {
    name: "Weekly Plan",
    amount: 9.99,
    currency: "USD",
    interval: "week",
    description: "Great if you want to try the service befor commiting longer",
    features: ["Unlimited AI plans", "Cancel Anytime", "AI Insights"],
  },
  {
    name: "Monthly Plan",
    amount: 39.99,
    currency: "USD",
    interval: "month",
    isPopular: true,
    description: "Perfect for ongoing, month-month planning",
    features: [
      "Unlimited AI plans",
      "Cancel Anytime",
      "AI Insights and priority",
    ],
  },
  {
    name: "Yearly Plan",
    amount: 139.99,
    currency: "USD",
    interval: "year",
    description: "Best value for long-terem goals",
    features: ["Unlimited AI plans", "Cancel Anytime", "AI Insights"],
  },
];

// map plan to price id

const priceIDMap: Record<string, string> = {
  week: process.env.STRIPE_PRICE_WEEKLY!,
  month: process.env.STRIPE_PRICE_MONTHLY!,
  year: process.env.STRIPE_PRICE_YEARLY!,
};

export const getPriceIDFromType = (planType: string) => priceIDMap[planType];
