
import React, { useState } from 'react';
import { Project, ProjectCategory, Member } from '../types';
import { database } from '../services/database';

interface AdminPanelProps {
  projects: Project[];
  members: Member[];
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateMembers: (members: Member[]) => void;
  onLogout: () => void;
  onGoToSite: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ projects, members, onUpdateProjects, onUpdateMembers, onLogout, onGoToSite }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'members' | 'settings' | 'guide'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const isCloudActive = database.isCloudConnected();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    if (activeTab === 'projects') {
      const newProject: Project = {
        id: editingItem?.id || Date.now().toString(),
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as ProjectCategory,
        image: formData.get('image') as string || `https://picsum.photos/seed/${Math.random()}/800/600`,
        raised: Number(formData.get('raised')),
        goal: Number(formData.get('goal')),
      };
      onUpdateProjects(editingItem?.id ? projects.map(p => p.id === editingItem.id ? newProject : p) : [newProject, ...projects]);
    } else {
      const newMember: Member = {
        id: editingItem?.id || Date.now().toString(),
        name: formData.get('name') as string,
        designation: formData.get('designation') as string,
        image: formData.get('image') as string || `https://i.pravatar.cc/150?u=${Math.random()}`,
        phone: formData.get('phone') as string,
      };
      onUpdateMembers(editingItem?.id ? members.map(m => m.id === editingItem.id ? newMember : m) : [newMember, ...members]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-['Hind_Siliguri']">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-emerald-950 text-white p-6 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-10 border-b border-emerald-900 pb-6">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">AS</div>
          <div>
            <h2 className="text-xl font-bold">এডমিন ড্যাশবোর্ড</h2>
            <div className={`text-[10px] font-bold uppercase flex items-center gap-1.5 mt-1 ${isCloudActive ? 'text-emerald-400' : 'text-amber-400'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              {isCloudActive ? 'Cloud Live' : 'Local Data'}
            </div>
          </div>
        </div>
        
        <nav className="space-y-1.5 flex-grow">
          {[
            { id: 'projects', label: 'প্রজেক্ট তালিকা', icon: '📁' },
            { id: 'members', label: 'সদস্য তালিকা', icon: '👥' },
            { id: 'guide', label: 'ফাইল আপলোড গাইড', icon: '☁️' },
            { id: 'settings', label: 'সেটিংস', icon: '⚙️' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full p-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-300 hover:bg-emerald-900/50'}`}
            >
              <span className="text-xl">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-emerald-900 space-y-3">
          <button onClick={onGoToSite} className="w-full flex items-center gap-3 p-4 hover:bg-emerald-900/50 text-emerald-400 rounded-xl font-bold">🌐 সাইট দেখুন</button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 hover:bg-red-900/30 text-red-400 rounded-xl font-bold">🚪 লগ আউট</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeTab === 'guide' ? (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-gray-900 mb-4">কিভাবে ফাইল আপলোড করবেন?</h1>
            <p className="text-gray-500 text-lg mb-10 font-medium">একটি একটি করে কোড কপি-পেস্ট করার দরকার নেই। নিচের নিয়মটি দেখুন:</p>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100 flex gap-6 items-start">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black">১</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">এডিট মোড থেকে বের হন</h3>
                  <p className="text-gray-600 leading-relaxed">আপনার ফোনের স্ক্রিনে থাকা <strong className="text-red-500">"Cancel changes"</strong> বাটনে ক্লিক করে আগের পেজে ফিরে যান।</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100 flex gap-6 items-start">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black">২</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Files সিলেক্ট করুন</h3>
                  <p className="text-gray-600 leading-relaxed">রেপোজিটরি পেজে থাকা <strong className="text-emerald-700">Add file</strong> বাটনে ক্লিক করুন এবং <strong className="text-emerald-700">Upload files</strong> অপশনটি বেছে নিন।</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100 flex gap-6 items-start">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black">৩</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">ফাইল সিলেক্ট করুন</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">এখন আপনার ফোনের মেমোরি থেকে সব ফাইলগুলো (index, app, types ইত্যাদি) একসাথে সিলেক্ট করুন। সব ফাইল লিস্টে চলে আসলে নিচে থাকা সবুজ <strong>"Commit changes"</strong> বাটনে ক্লিক করুন।</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-emerald-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">গুরুত্বপূর্ণ ফাইলসমূহ:</h3>
                <ul className="text-emerald-100 space-y-2 font-mono text-sm">
                  <li>• index.html</li>
                  <li>• index.tsx</li>
                  <li>• App.tsx</li>
                  <li>• types.ts</li>
                  <li>• constants.tsx</li>
                  <li>• package.json</li>
                </ul>
                <div className="mt-8">
                   <button onClick={() => window.open('https://vercel.com/new', '_blank')} className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black hover:bg-emerald-50 transition-colors shadow-xl">Vercel এ কানেক্ট করুন →</button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-gray-900 mb-8">সেটিংস</h1>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">সিঙ্ক স্ট্যাটাস</h3>
              <div className={`p-8 rounded-[2rem] border-2 transition-all ${isCloudActive ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${isCloudActive ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                    {isCloudActive ? '✓' : '!'}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{isCloudActive ? 'ক্লাউড কানেক্টেড' : 'লোকাল ডাটা'}</h4>
                    <p className="text-sm opacity-80">{isCloudActive ? 'আপনার তথ্য নিরাপদ আছে।' : 'তথ্য শুধুমাত্র এই ব্রাউজারে সংরক্ষিত হচ্ছে।'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-black text-gray-900">{activeTab === 'projects' ? 'প্রজেক্ট' : 'সদস্য'} তালিকা</h1>
                <p className="text-gray-500 font-medium mt-1">সবকিছু এখান থেকে নিয়ন্ত্রণ করুন।</p>
              </div>
              <button 
                onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="text-xl">+</span> নতুন যোগ করুন
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-6">আইটেম</th>
                    <th className="px-8 py-6">{activeTab === 'projects' ? 'লক্ষ্যমাত্রা' : 'পদবী'}</th>
                    <th className="px-8 py-6 text-right">একশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(activeTab === 'projects' ? projects : members).map((item: any) => (
                    <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={item.image} className="w-14 h-14 rounded-xl object-cover shadow-sm border border-gray-100" />
                          <div className="font-bold text-gray-800 text-lg">{item.title || item.name}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-gray-600">
                        {activeTab === 'projects' ? `৳${item.goal.toLocaleString()}` : item.designation}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-3 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all">✏️</button>
                          <button onClick={() => activeTab === 'projects' ? onUpdateProjects(projects.filter(p => p.id !== item.id)) : onUpdateMembers(members.filter(m => m.id !== item.id))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md flex items-center justify-center z-[300] p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-xl p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-3xl font-black text-gray-900 mb-8">{editingItem ? 'তথ্য আপডেট' : 'নতুন এন্ট্রি'}</h2>
            <form onSubmit={handleSave} className="space-y-5">
              {activeTab === 'projects' ? (
                <>
                  <input name="title" defaultValue={editingItem?.title} placeholder="প্রজেক্টের নাম" required className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="goal" defaultValue={editingItem?.goal} placeholder="লক্ষ্যমাত্রা (৳)" required className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                    <input type="number" name="raised" defaultValue={editingItem?.raised} placeholder="সংগৃহীত (৳)" required className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                  </div>
                </>
              ) : (
                <>
                  <input name="name" defaultValue={editingItem?.name} placeholder="সদস্যের নাম" required className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                  <input name="designation" defaultValue={editingItem?.designation} placeholder="পদবী" required className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                </>
              )}
              <input name="image" defaultValue={editingItem?.image} placeholder="ইমেজ লিঙ্ক (URL)" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" />
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-3xl font-bold hover:bg-gray-200 transition-all">বাতিল</button>
                <button type="submit" className="flex-1 py-5 bg-emerald-600 text-white rounded-3xl font-bold shadow-xl shadow-emerald-200 transition-all active:scale-95">সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
