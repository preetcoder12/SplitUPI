// src/components/QRCodeDisplay.jsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeDisplay = ({ upiLink }) => (
  <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
    {/* Animated Background */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 lg:w-96 sm:h-72 lg:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-72 lg:w-96 sm:h-72 lg:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 sm:w-72 lg:w-96 sm:h-72 lg:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
    </div>

    <article className="relative z-10 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-xs sm:max-w-sm lg:max-w-md w-full border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-105">
      {/* Decorative elements */}
      <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-8 h-8 sm:w-12 lg:w-16 sm:h-12 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full opacity-30 blur-lg sm:blur-xl"></div>
      <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-10 h-10 sm:w-16 lg:w-20 sm:h-16 lg:h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-30 blur-lg sm:blur-xl"></div>
      
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl mb-2 sm:mb-3 shadow-lg">
          <svg className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
          Quick Payment
        </h2>
      </div>

      {/* QR Code Container */}
      <div className="relative mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-xl sm:rounded-2xl blur-sm"></div>
        <div className="relative bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-2xl border border-white/10">
          {upiLink ? (
            <div className="flex justify-center">
              <QRCodeSVG
                value={upiLink}
                size={window.innerWidth < 640 ? 200 : window.innerWidth < 1024 ? 240 : 280}
                bgColor="#fff"
                fgColor="#111"
                title="UPI Payment QR Code"
                marginSize={4}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 w-48 sm:h-60 lg:h-70 sm:w-60 lg:w-70 mx-auto">
              <p className="text-red-500 font-medium text-sm sm:text-base lg:text-lg text-center">No UPI link provided</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center space-y-1 sm:space-y-2">
        <p className="text-white font-medium text-base sm:text-lg lg:text-xl">
          Scan QR Code to Pay
        </p>
        <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed px-2">
          Open any UPI app and scan this code to make your payment instantly
        </p>
      </div>

      {/* Footer decoration */}
      <div className="flex justify-center mt-4 sm:mt-6 space-x-1">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
      </div>
    </article>

    {/* Custom Styles */}
    <style jsx>{`
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
  </main>
);

export default QRCodeDisplay;