import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, MessagesSquare, ShuffleIcon } from "lucide-react";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting formState:", formState); // Debug log
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-colors duration-500">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-80 h-80 bg-blue-300/30 dark:bg-blue-600/30 rounded-full -top-40 -left-40 blur-3xl animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-purple-300/30 dark:bg-purple-600/30 rounded-full -bottom-40 -right-40 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6 bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-gray-200/50 dark:bg-gray-700/50 overflow-hidden shadow-md">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-300/50 dark:bg-gray-600/50">
                    <svg
                      className="size-12 text-gray-500 dark:text-gray-400 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-500/30 dark:hover:bg-blue-600/30 transition-all duration-300"
              >
                <ShuffleIcon className="size-5" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                placeholder="Your full name"
              />
            </div>

            {/* Bio */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Bio
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 h-24 resize-none"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-gray-500 dark:text-gray-400 opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="w-full px-4 py-3 pl-10 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin size-5" />
                  Onboarding...
                </>
              ) : (
                <>
                  <MessagesSquare className="size-5" />
                  Complete Onboarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;