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
  console.log("current Plan", currentPlan);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-3">
          <Spinner />
          <span className="text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <p className="text-gray-700 text-lg">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Toaster position="top-center" />
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Left: User info */}
          <div className="w-full md:w-1/3 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

            {user.imageUrl && (
              <div className="relative">
                <Image
                  src={user.imageUrl}
                  alt="profile avatar"
                  width={120}
                  height={120}
                  className="rounded-full mb-4 border-4 border-white/20 shadow-xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              </div>
            )}
            <h1 className="text-2xl font-bold mb-2 text-center">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-300 text-sm text-center break-all px-4">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          {/* Right: Subscription info */}
          <div className="w-full md:w-2/3 p-8 space-y-6 text-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">
                Subscription Details
              </h2>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner />
                <span className="ml-3 text-gray-600">
                  Loading subscription...
                </span>
              </div>
            ) : isError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-medium">{error?.message}</p>
              </div>
            ) : subscription ? (
              <>
                {/* Current Plan */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-700 font-bold mb-4 text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Current Plan
                  </h3>
                  {currentPlan ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-semibold text-gray-900">
                          {currentPlan.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-gray-900 text-xl">
                          ${currentPlan.amount}
                          <span className="text-sm text-gray-500">
                            {" "}
                            {currentPlan.currency}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {subscription?.subscription?.status || "ACTIVE"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-500 font-semibold">
                      Current plan not found
                    </p>
                  )}
                </div>

                {/* Change Plan */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    Change Subscription Plan
                  </h3>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white transition-all"
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
                    className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleUpdatePlan}
                    disabled={isUpdatePlanPending}
                  >
                    {isUpdatePlanPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Updating...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>

                {/* Unsubscribe */}
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold mb-3 text-red-900 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Danger Zone
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Unsubscribing will immediately cancel your subscription and
                    remove access to premium features.
                  </p>
                  <button
                    className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg ${
                      isUnsubscribePending
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleUnsubscribe}
                    disabled={isUnsubscribePending}
                  >
                    {isUnsubscribePending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Unsubscribing...
                      </span>
                    ) : (
                      "Unsubscribe"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                <p className="text-gray-700">
                  You are not subscribed to any plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
