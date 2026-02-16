import FrameMaker from "./components/FrameMaker";
import { HugeiconsIcon } from '@hugeicons/react';

import { 
  Ramadhan01Icon, 
} from '@hugeicons/core-free-icons';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-white text-gray-900 pb-20">
      
      {/* Header */}
      <header className="border-b-2 border-slate-200 py-4 px-6 mb-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
           <HugeiconsIcon icon={Ramadhan01Icon} size={40} className="text-blue-600" />
           <h1 className="text-2xl font-black text-slate-700 tracking-tight">Ramadan Mubarak!</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center gap-8 px-4">
        <div className="text-center space-y-4 max-w-2xl">
          <p className="text-xl text-gray-500 font-bold">
            রমজান উপলক্ষে কাস্টম প্রোফাইল পিকচার তৈরি করুন
          </p>
        </div>

        <FrameMaker />

      </main>

      {/* Simple Footer */}
      <footer className="mt-20 text-center text-gray-400 font-bold text-sm">
        <p>© 2026 FrameMaker. Made with ❤️ for Ramadan.</p>
        <p>Created by <a href="https://momin.pro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Momin</a></p>
      </footer>
    </div>
  );
}
