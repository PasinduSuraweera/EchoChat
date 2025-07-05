import { useState } from "react";
import { MessagesSquare } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-colors duration-500">
      <div className="relative w-full max-w-4xl flex flex-col lg:flex-row rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-80 h-80 bg-blue-300/30 dark:bg-blue-600/30 rounded-full -top-40 -left-40 blur-3xl animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-purple-300/30 dark:bg-purple-600/30 rounded-full -bottom-40 -right-40 blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Signup Form Section */}
        <div className="relative w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <MessagesSquare className="w-10 h-10 text-blue-500 dark:text-blue-400" />
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 tracking-tight">
              EchoChat
            </h1>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-100/80 dark:bg-red-900/80 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm transform transition-all duration-300 ease-in-out">
              {error.response.data.message}
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Create an Account</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Join EchoChat and connect with the world in real time!
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 dark:text-blue-400 bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                  <label className="text-xs text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">
                      privacy policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  disabled={isPending}
                >
                  {isPending && (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  )}
                  {isPending ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section (Illustration) */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/50 dark:to-purple-900/50 items-center justify-center p-12 z-10">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Connect with Anyone Worldwide</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-sm">
              Slide into real-time convos. Echo is your backstage pass to global chats — live, casual, and always on.
            </p>
            <div className="relative w-70 h-70 mx-auto">
              <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-xl animate-pulse"></div>
              <img
                src="/i2.png"
                alt="Language connection illustration"
                className="relative w-full h-full object-contain transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;