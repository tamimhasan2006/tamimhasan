
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ZakatCalculator from './components/ZakatCalculator';
import ImpactStats from './components/ImpactStats';
import AiAssistant from './components/AiAssistant';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import { Project, Member, ViewState } from './types';
import { PROJECTS as INITIAL_PROJECTS } from './constants';
import { database } from './services/database';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('public');
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const savedProjects = await database.getProjects();
      const savedMembers = await database.getMembers();
      
      setProjects(savedProjects.length > 0 ? savedProjects : INITIAL_PROJECTS);
      setMembers(savedMembers);
      
      setIsLoading(false);
    };
    
    loadData();

    if (localStorage.getItem('as_sunnah_admin_auth') === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleUpdateProjects = async (newProjects: Project[]) => {
    setProjects(newProjects);
    await database.saveProjects(newProjects);
  };

  const handleUpdateMembers = async (newMembers: Member[]) => {
    setMembers(newMembers);
    await database.saveMembers(newMembers);
  };

  const onLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    setView('admin');
    localStorage.setItem('as_sunnah_admin_auth', 'true');
  };

  const onLogout = () => {
    setIsAdminAuthenticated(false);
    setView('public');
    localStorage.removeItem('as_sunnah_admin_auth');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-emerald-50">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-emerald-800 font-bold animate-pulse text-lg">আস-সুন্নাহ ফাউন্ডেশন ডাটা লোড হচ্ছে...</p>
      </div>
    );
  }

  if (view === 'admin' && isAdminAuthenticated) {
    return (
      <AdminPanel 
        projects={projects} 
        members={members}
        onUpdateProjects={handleUpdateProjects} 
        onUpdateMembers={handleUpdateMembers}
        onLogout={onLogout}
        onGoToSite={() => setView('public')}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        isAdmin={isAdminAuthenticated} 
        onAdminLogin={() => isAdminAuthenticated ? setView('admin') : setIsLoginModalOpen(true)} 
      />
      <main>
        <Hero />
        <ProjectGrid projects={projects} />
        <ImpactStats />
        <ZakatCalculator />
        
        {/* Member Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4">আমাদের দায়িত্বশীলবৃন্দ</h2>
              <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
            </div>
            {members.length === 0 ? (
              <p className="text-center text-gray-400 italic">কোনো সদস্য তালিকাভুক্ত নেই।</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {members.map(member => (
                  <div key={member.id} className="text-center group">
                    <div className="relative mb-4 inline-block">
                      <img src={member.image} className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover shadow-lg group-hover:scale-105 transition-transform border-4 border-white" />
                      <div className="absolute inset-0 bg-emerald-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg">{member.name}</h4>
                    <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider">{member.designation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-emerald-950 text-emerald-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-6">AS</div>
          <p className="max-w-md mx-auto text-sm text-emerald-400 mb-8 leading-relaxed">
            আমরা একটি সুশৃঙ্খল ও আদর্শ জাতি গঠনে এবং অসহায় মানুষের মুখে হাসি ফোটাতে নিরলস কাজ করে যাচ্ছি।
          </p>
          <div className="pt-8 border-t border-emerald-900 text-xs text-emerald-600 font-medium">
            © ২০২৪ আস-সুন্নাহ ফাউন্ডেশন ক্লোন। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>

      <AiAssistant />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={onLoginSuccess} 
      />
    </div>
  );
};

export default App;
