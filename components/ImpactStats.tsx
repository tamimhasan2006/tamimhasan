
import React from 'react';
import { STATS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'ত্রাণ ও পুনর্বাসন', value: 45 },
  { name: 'শিক্ষা প্রকল্প', value: 25 },
  { name: 'মসজিদ নির্মাণ', value: 20 },
  { name: 'দাওয়াহ কার্যক্রম', value: 10 },
];

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7'];

const ImpactStats: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">আমাদের কাজের প্রভাব ও তহবিলের ব্যবহার</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              আমরা সংগৃহীত তহবিলের প্রতিটি পয়সা সর্বোচ্চ আমানতদারিতার সাথে নির্ধারিত খাতে ব্যয় করি। আমাদের কার্যক্রমের মাধ্যমে দেশজুড়ে কয়েক লক্ষ মানুষ সরাসরি উপকৃত হচ্ছে।
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center">
                  <span className="text-3xl mb-2">{stat.icon}</span>
                  <h4 className="text-2xl font-bold text-emerald-800">{stat.value}</h4>
                  <p className="text-sm text-emerald-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[400px] w-full bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col">
            <h4 className="text-center font-bold text-gray-700 mb-4">তহবিল বণ্টন (২০২৪)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
