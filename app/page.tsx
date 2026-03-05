'use client';

import { useState } from 'react';
import { Search, ExternalLink, Loader2, ShoppingBag } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    // New function for Quick Categories
  const handleQuickSearch = async (searchTerm: string) => {
    setQuery(searchTerm); // Updates the text in the input box
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`/api/compare?q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`/api/compare?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // We added the background image directly to the main wrapper
    <main 
      className="min-h-screen p-4 md:p-8 bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* This is the dark overlay to make the background less distracting */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* This is our new Glassmorphism Card */}
      <div className="relative w-full max-w-3xl space-y-8 bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/20">
        
        {/* Header & Search Bar */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <ShoppingBag className="text-blue-600" size={40} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Compare & <span className="text-blue-600">Save</span>
          </h1>
          <p className="text-gray-500 text-lg">Find the lowest prices across top Indian stores.</p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl shadow-inner border mt-8">
            {/* --- NEW: Quick Search Categories --- */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => handleQuickSearch('iPhone 15')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition backdrop-blur-sm flex items-center gap-2"
            >
              📱 Top Smartphones
            </button>
            <button 
              onClick={() => handleQuickSearch('Sony Headphones')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition backdrop-blur-sm flex items-center gap-2"
            >
              🎧 Audio & Earbuds
            </button>
            <button 
              onClick={() => handleQuickSearch('Smart Watches')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition backdrop-blur-sm flex items-center gap-2"
            >
              ⌚ Smart Watches
            </button>
            <button 
              onClick={() => handleQuickSearch('Gaming Laptops')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition backdrop-blur-sm flex items-center gap-2"
            >
              💻 Laptops
            </button>
          </div>
          {/* ------------------------------------ */}
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., iPhone 15, Sony Headphones..." 
              className="flex-1 px-5 py-3 outline-none bg-transparent text-black text-lg"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 md:py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              Search Deals
            </button>
          </form>
        </div>

        {/* Results Table */}
        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700 flex justify-between items-center">
              <span>Live Price Results for <span className="text-blue-600">"{query}"</span></span>
            </div>
            <div className="divide-y divide-gray-100">
              {results.map((item: any, index: number) => (
                <div key={item.platform} className={`p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors hover:bg-gray-50 ${index === 0 ? 'bg-green-50/50' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xl w-28 text-black">{item.platform}</span>
                    {index === 0 && <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold shadow-sm flex items-center gap-1">✨ Best Deal</span>}
                  </div>
                  
                  <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-6">
                    <span className="text-2xl md:text-3xl font-black text-gray-900">₹{item.price.toLocaleString()}</span>
                    <a 
                      href={item.link} 
                      target="_blank"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      Buy Now <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}