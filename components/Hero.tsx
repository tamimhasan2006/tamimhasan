
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/humanity/1920/1080" 
          alt="Charity background" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold mb-4 backdrop-blur-sm border border-emerald-500/30">
            সেবা, দাওয়াহ ও শিক্ষা
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            মানবতার সেবায় <br />
            <span className="text-emerald-400">আস-সুন্নাহ ফাউন্ডেশন</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
            আমরা একটি সুশৃঙ্খল ও আদর্শ জাতি গঠনে এবং অসহায় মানুষের মুখে হাসি ফোটাতে নিরলস কাজ করে যাচ্ছি। আপনার ক্ষুদ্র দান বদলে দিতে পারে একটি জীবন।
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/40">
              সহযোগিতা করুন
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all">
              আমাদের কাজ দেখুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
