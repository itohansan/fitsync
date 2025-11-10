"use client";

import { availablePlans } from "@/lib/plans";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// Types
type SubscribeResponse = { url: string };
type SubscribeError = { error: string };

// Function to handle subscription
async function subscribeToPlan(
  planType: string,
  userId: string,
  email: string
): Promise<SubscribeResponse> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planType, userId, email }),
  });

  if (!response.ok) {
    const errorData: SubscribeError = await response.json();
    throw new Error(errorData.error || "Something went wrong.");
  }

  const data: SubscribeResponse = await response.json();
  return data;
}

export default function Subscribe() {
  const { user } = useUser();
  const router = useRouter();

  const userId = user?.id;
  const email = user?.emailAddresses[0].emailAddress || "";

  // Mutation setup
  const { mutate, isPending } = useMutation<
    SubscribeResponse,
    Error,
    { planType: string }
  >({
    mutationFn: async ({ planType }) => {
      if (!userId) {
        throw new Error("User not signed in");
      }
      return subscribeToPlan(planType, userId, email);
    },
    onMutate: () => {
      toast.loading("Processing your subscription...");
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  // Handle button click
  function handleSubscribe(planType: string) {
    if (!userId) {
      router.push("/sign-up");
      return;
    }
    mutate({ planType });
  }

  return (
    <div className="mt-16 mb-14">
      <Toaster position="top-center" />

      {/* Header Section */}
      <div>
        <p className="mt-4 px-2 text-xl text-center max-w-2xl mx-auto leading-relaxed text-white/90 ">
          Get started on our <strong>Weekly Plan</strong> or upgrade to{" "}
          <strong>Monthly</strong> or <strong>Yearly</strong> when you&apos;re
          ready.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="mt-12 container mx-auto space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 px-4 ">
        {availablePlans.map((plan, key) => (
          <div
            key={key}
            className="relative p-8 border border-gray-500 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-out bg-black/80 backdrop-blur-sm "
          >
            {/* Plan Info */}
            <div className="flex-1">
              {plan.isPopular && (
                <p className="absolute top-0 right-1 py-2 px-3 bg-emerald-500 text-white text-xs font-semibold rounded-lg">
                  Most Popular
                </p>
              )}

              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>

              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${plan.amount}
                </span>
                <span className="text-base text-gray-400">
                  /{plan.interval}
                </span>
              </p>

              <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3 text-gray-200">
                {plan.features.map((feature, key) => (
                  <li key={key} className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() => handleSubscribe(plan.interval)}
              disabled={isPending}
              className={`mt-8 w-full py-3 px-6 rounded-md font-medium text-center transition-colors duration-300 
                ${
                  plan.interval === "month"
                    ? "bg-emerald-400 hover:bg-emerald-500 text-black "
                    : "bg-emerald-900 hover:bg-emerald-600 text-white"
                }
                ${isPending ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {isPending ? "Please wait..." : `Subscribe ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
