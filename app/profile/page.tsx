"use client";

import { Spinner } from "@/components/spinner";
import { availablePlans } from "@/lib/plans";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

async function fetchSubscriptionStatus() {
  const response = await fetch("/api/profile/subscription-status");
  return response.json();
}

async function updatePlan(newPlan: string) {
  const response = await fetch("/api/profile/change-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPlan }),
  });
  return response.json();
}

async function unsubscribe() {
  const response = await fetch("/api/profile/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export default function Profile() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const { isLoaded, isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: subscription,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscriptionStatus,
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60 * 10000,
  });

  const {
    data: updatedPlan,
    mutate: updatePlanMutation,
    isPending: isUpdatePlanPending,
  } = useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Subscription plan updated successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Error updating plan");
    },
  });

  const { mutate: unsubscribeMutation, isPending: isUnsubscribePending } =
    useMutation({
      mutationFn: unsubscribe,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["subscription"] });
        toast.success("Unsubscribed successfully");
        router.push("/subscribe");
      },
      onError: () => {
        toast.error("Error unsubscribing");
      },
    });

  const currentPlan = availablePlans.find(
    (plan) => plan.interval === subscription?.subscription?.subscriptionTier
  );

  function handleUpdatePlan() {
    if (selectedPlan) {
      updatePlanMutation(selectedPlan);
      setSelectedPlan("");
    } else {
      toast.error("Please select a new plan first.");
    }
  }

  function handleUnsubscribe() {
    if (
      confirm(
        "Are you sure you want to unsubscribe? You will lose access to premium features."
      )
    ) {
      unsubscribeMutation();
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="mt-16 flex items-center justify-center min-h-screen p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-5xl shadow-md  overflow-hidden border border-gray-500 bg-gray-50">
        <div className="flex flex-col md:flex-row">
          {/* Left: User info */}
          <div className="w-full md:w-1/3 p-6 bg-black flex flex-col items-center text-white">
            {user.imageUrl && (
              <Image
                src={user.imageUrl}
                alt="profile avatar"
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
            )}
            <h1 className="text-2xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mb-4">{user.primaryEmailAddress?.emailAddress}</p>
          </div>

          {/* Right: Subscription info */}
          <div className="w-full md:w-2/3 p-6 space-y-6 text-black">
            <h2 className="text-2xl font-[550] mb-6 text-black">
              Subscription Details
            </h2>

            {isLoading ? (
              <div className="flex items-center">
                <Spinner />{" "}
                <span className="ml-2">Loading subscription...</span>
              </div>
            ) : isError ? (
              <p className="text-red-500">{error?.message}</p>
            ) : subscription ? (
              <>
                {/* Current Plan */}
                <div className="border border-black/50  p-4">
                  <h3 className="text-black/70 font-semibold mb-2 ">
                    Current Plan
                  </h3>
                  {currentPlan ? (
                    <>
                      <p>
                        <strong>Plan:</strong> {currentPlan.name}
                      </p>
                      <p>
                        <strong>Amount:</strong> {currentPlan.amount}
                        {currentPlan.currency}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {subscription?.subscription?.status || "ACTIVE"}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-500 font-[550]">
                      Current plan not found
                    </p>
                  )}
                </div>

                {/* Change Plan */}
                <div className="border border-black/50  p-4">
                  <h3 className="text-lg font-[550] mb-2 text-black/70">
                    Change Subscription Plan
                  </h3>
                  <select
                    className="w-full px-3 py-2 border border-black/50-md focus:outline-none text-black/50"
                    defaultValue={currentPlan?.interval || ""}
                    disabled={isUpdatePlanPending}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  >
                    <option value="">Select a new plan</option>
                    {availablePlans.map((plan, key) => (
                      <option key={key} value={plan.interval}>
                        {plan.name} - ${plan.amount} / {plan.interval}
                      </option>
                    ))}
                  </select>
                  <button
                    className="mt-3 w-full p-2  bg-black text-white font-[550] hover:bg-black/85"
                    onClick={handleUpdatePlan}
                    disabled={isUpdatePlanPending}
                  >
                    {isUpdatePlanPending ? "Updating..." : "Save Changes"}
                  </button>
                </div>

                {/* Unsubscribe */}
                <div className="border border-black/50 p-4">
                  <h3 className="text-lg font-semibold mb-2">Unsubscribe</h3>
                  <button
                    className={`w-full bg-black/85  text-white py-2 px-4 font-[550] hover:bg-red-600 transition-colors ${
                      isUnsubscribePending
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleUnsubscribe}
                    disabled={isUnsubscribePending}
                  >
                    {isUnsubscribePending ? "Unsubscribing..." : "Unsubscribe"}
                  </button>
                </div>
              </>
            ) : (
              <p>You are not subscribed to any plan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
