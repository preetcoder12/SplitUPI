import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  UserMinus,
  Calculator,
  CreditCard,
  Sparkles,
  ArrowRight,
  Crown,
  Star,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

const PeopleInput = () => {
  const location = useLocation();
  const [peopleCount, setPeopleCount] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("equal");

  // Get amount from navigation state or default to 0 if not provided
  const [totalAmount] = useState(() => {
    if (location.state?.amount) {
      return parseFloat(location.state.amount);
    }
    // If no amount provided, redirect back to amount page
    navigate("/");
    return 0;
  });

  // Create floating particles effect
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleCountChange = (change) => {
    const newCount = Math.max(1, Math.min(20, peopleCount + change));
    setPeopleCount(newCount);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  const navigate = useNavigate();
  const handlePay = () => {
    // Add your payment logic here
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    navigate("/qr");
  };

  const perPersonAmount = totalAmount / peopleCount;

  const generateAvatars = (count) => {
    const colors = [
      "from-pink-400 to-rose-400",
      "from-blue-400 to-indigo-400",
      "from-green-400 to-emerald-400",
      "from-purple-400 to-violet-400",
      "from-yellow-400 to-orange-400",
      "from-cyan-400 to-teal-400",
      "from-red-400 to-pink-400",
      "from-indigo-400 to-purple-400",
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: i * 0.1,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 bg-white rounded-full opacity-10 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl mb-6 shadow-2xl transform hover:rotate-6 transition-transform duration-500">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-4 tracking-tight">
            Split Among Friends
          </h1>
          <p className="text-lg text-gray-300 font-light">
            Choose how many people to split the bill
          </p>
        </div>

        {/* Amount Summary */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl border border-white/20 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Amount</p>
              <div className="flex items-center">
                <FaRupeeSign className="w-6 h-6 text-white mr-1" />
                <p className="text-3xl font-bold text-white">
                  {totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Per Person</p>
              <div
                className={`flex items-center justify-end transition-all duration-300 ${
                  isAnimating ? "scale-110" : "scale-100"
                }`}
              >
                <FaRupeeSign className="w-6 h-6 text-emerald-400 mr-1" />
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {perPersonAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* People Counter */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Number of People
            </h2>

            {/* Counter Controls */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <button
                onClick={() => handleCountChange(-1)}
                disabled={peopleCount <= 1}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  peopleCount <= 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-red-500/25"
                }`}
              >
                <UserMinus className="w-6 h-6" />
              </button>

              <div
                className={`text-8xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 ${
                  isAnimating ? "scale-125 rotate-12" : "scale-100"
                }`}
              >
                {peopleCount}
              </div>

              <button
                onClick={() => handleCountChange(1)}
                disabled={peopleCount >= 20}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  peopleCount >= 20
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-emerald-500/25"
                }`}
              >
                <UserPlus className="w-6 h-6" />
              </button>
            </div>

            {/* People Avatars */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {generateAvatars(peopleCount).map((avatar, index) => (
                <div
                  key={avatar.id}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${avatar.color} flex items-center justify-center text-white font-bold shadow-lg transform transition-all duration-500 hover:scale-110 animate-fade-in-up`}
                  style={{ animationDelay: `${avatar.delay}s` }}
                >
                  {index === 0 && <Crown className="w-6 h-6" />}
                  {index !== 0 && <Star className="w-5 h-5" />}
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm">
              {peopleCount === 1 ? "Just you" : `${peopleCount} amazing people`}
            </p>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          className="w-full py-8 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
        >
          <div className="flex items-center justify-center space-x-4">
            <CreditCard className="w-8 h-8" />
            <span>Proceed to Payment</span>
            <ArrowRight
              className={`w-8 h-8 transition-transform duration-300 ${
                isAnimating ? "translate-x-3" : ""
              }`}
            />
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div className="text-lg font-normal mt-2 opacity-90 flex items-center justify-center">
            <FaRupeeSign className="w-4 h-4 mr-1" />
            {perPersonAmount.toFixed(2)} per person
          </div>
        </button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PeopleInput;
