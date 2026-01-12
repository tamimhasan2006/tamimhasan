
import React, { useState } from 'react';

const ZakatCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    business: 0,
    debts: 0
  });

  const totalWealth = (inputs.cash + inputs.gold + inputs.silver + inputs.business) - inputs.debts;
  const zakatAmount = totalWealth > 0 ? totalWealth * 0.025 : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <section id="zakat" className="py-20 bg-emerald-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">সহজ যাকাত ক্যালকুলেটর</h2>
            <p className="text-emerald-100 text-lg mb-8">
              যাকাত ইসলামের অন্যতম প্রধান রুকন। আপনার সম্পদের সঠিক যাকাত নির্ণয় করতে আমাদের ক্যালকুলেটরটি ব্যবহার করুন।
            </p>
            <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-yellow-400">💡</span> তথ্য নোট:
              </h4>
              <ul className="space-y-3 text-emerald-100 text-sm">
                <li>• সকল নগদ অর্থ ও ব্যাংকে গচ্ছিত টাকা যোগ করুন।</li>
                <li>• আপনার বর্তমান ব্যবসার স্টকের আনুমানিক বাজারমূল্য।</li>
                <li>• স্বর্ণ ও রূপার বর্তমান বাজারমূল্য অনুযায়ী হিসেব করুন।</li>
                <li>• ঋণের পরিমাণ বাদ দিন।</li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">নগদ টাকা (টাকা)</label>
                  <input 
                    type="number" 
                    name="cash"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">স্বর্ণের মূল্য (টাকা)</label>
                  <input 
                    type="number" 
                    name="gold"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">রূপার মূল্য (টাকা)</label>
                  <input 
                    type="number" 
                    name="silver"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">ব্যবসায়িক স্টক (টাকা)</label>
                  <input 
                    type="number" 
                    name="business"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-8 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">মোট সম্পদ</span>
                  <span className="text-xl font-bold">৳{totalWealth.toLocaleString()}</span>
                </div>
                <div className="bg-emerald-600 text-white p-6 rounded-2xl flex flex-col items-center">
                  <span className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-1">আপনার যাকাতের পরিমাণ</span>
                  <h3 className="text-3xl font-extrabold">৳{zakatAmount.toLocaleString()}</h3>
                </div>
                <button className="w-full mt-6 bg-emerald-100 text-emerald-800 py-4 rounded-xl font-bold hover:bg-emerald-200 transition-colors">
                  এখনই যাকাত প্রদান করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZakatCalculator;
