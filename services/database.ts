
import { createClient } from '@supabase/supabase-js';
import { Project, Member } from '../types';

// These should be set in Vercel Environment Variables for real-time multi-device sync.
// Go to Vercel Project Settings -> Environment Variables to add SUPABASE_URL and SUPABASE_ANON_KEY
const supabaseUrl = typeof process !== 'undefined' ? process.env.SUPABASE_URL || '' : '';
const supabaseKey = typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY || '' : '';

const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export const database = {
  isCloudConnected(): boolean {
    return !!supabase;
  },

  async getProjects(): Promise<Project[]> {
    try {
      if (supabase) {
        const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
        if (!error && data) return data;
      }
    } catch (e) {
      console.error("Cloud fetch error:", e);
    }
    const saved = localStorage.getItem('as_sunnah_projects');
    return saved ? JSON.parse(saved) : [];
  },

  async saveProjects(projects: Project[]) {
    try {
      if (supabase) {
        // Clear old and insert new for simplicity in this demo, 
        // or use upsert if IDs are consistent
        await supabase.from('projects').upsert(projects);
      }
    } catch (e) {
      console.error("Cloud save error:", e);
    }
    localStorage.setItem('as_sunnah_projects', JSON.stringify(projects));
  },

  async getMembers(): Promise<Member[]> {
    try {
      if (supabase) {
        const { data, error } = await supabase.from('members').select('*').order('id', { ascending: false });
        if (!error && data) return data;
      }
    } catch (e) {
      console.error("Cloud fetch error:", e);
    }
    const saved = localStorage.getItem('as_sunnah_members');
    return saved ? JSON.parse(saved) : [];
  },

  async saveMembers(members: Member[]) {
    try {
      if (supabase) {
        await supabase.from('members').upsert(members);
      }
    } catch (e) {
      console.error("Cloud save error:", e);
    }
    localStorage.setItem('as_sunnah_members', JSON.stringify(members));
  }
};
