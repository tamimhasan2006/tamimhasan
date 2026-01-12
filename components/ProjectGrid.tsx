
import React from 'react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">আমাদের চলমান প্রকল্পসমূহ</h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            সুনির্দিষ্ট লক্ষ্য ও স্বচ্ছতার সাথে আমরা বিভিন্ন সামাজিক ও ধর্মীয় প্রকল্পে কাজ করছি।
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">বর্তমানে কোনো সক্রিয় প্রজেক্ট নেই।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const progress = (project.raised / project.goal) * 100;
              return (
                <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-emerald-700">সংগৃহীত: ৳{project.raised.toLocaleString()}</span>
                        <span className="text-gray-500">লক্ষ্য: ৳{project.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100">
                      অংশগ্রহণ করুন
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
