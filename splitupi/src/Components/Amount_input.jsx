import React, { useState, useEffect } from "react";
import { Users, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AmountInput = () => {
  const [amount, setAmount] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  // Create floating particles effect
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        // Navigate to people page with amount data
        navigate("/people", { 
          state: { 
            amount: parseFloat(amount).toFixed(2) 
          } 
        });
      }, 1000);
    }
  };

  const formatAmount = (val) => {
    if (!val) return "0.00";
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl mb-6 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-4 tracking-tight">
            SplitUp
          </h1>
          <p className="text-xl text-gray-300 font-light">Enter the amount to split among friends</p>
        </div>

        {/* Amount Display */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center transition-all duration-500 ${
            isAnimating ? 'scale-110 rotate-1' : 'scale-100'
          }`}>
            <FaRupeeSign className="w-12 h-12 text-emerald-400 mr-2" />
            <span className={`text-7xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 ${
              amount ? 'opacity-100' : 'opacity-50'
            }`}>
              {formatAmount(amount)}
            </span>
          </div>
          {amount && (
            <div className="mt-4 text-sm text-gray-400 animate-fade-in">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Ready to split with your crew
            </div>
          )}
        </div>

        {/* Input Container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-emerald-400/50 transition-all duration-500">
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="0.00"
              className={`w-full bg-transparent border-2 rounded-2xl px-6 py-6 text-2xl font-semibold text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                focused 
                  ? 'border-emerald-400 shadow-lg shadow-emerald-400/25' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              step="1"
              min="0"
            />
            
            {/* Input Glow Effect */}
            {focused && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-sm -z-10 animate-pulse"></div>
            )}

            {/* Floating Label */}
            <label className={`absolute left-6 transition-all duration-300 pointer-events-none ${
              amount || focused
                ? '-top-3 text-sm bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-semibold'
                : 'top-6 text-xl text-gray-400'
            }`}>
              {amount || focused ? 'Amount to Split (₹)' : 'Enter your amount...'}
            </label>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0}
            className={`w-full mt-8 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform ${
              amount && parseFloat(amount) > 0
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 hover:-translate-y-1'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <span>{amount && parseFloat(amount) > 0 ? 'Split This Amount' : 'Enter Amount First'}</span>
              {amount && parseFloat(amount) > 0 && (
                <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${
                  isAnimating ? 'translate-x-2' : ''
                }`} />
              )}
              {amount && parseFloat(amount) > 0 && <Sparkles className="w-6 h-6 animate-pulse" />}
            </div>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            { icon: Users, title: "Split Evenly", desc: "Divide among friends" },
            { icon: FaRupeeSign, title: "Track Expenses", desc: "Monitor spending" },
            { icon: Sparkles, title: "Smart Calculate", desc: "Auto calculations" }
          ].map((feature, index) => (
            <div key={index} className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:transform hover:scale-105">
              <feature.icon className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AmountInput;