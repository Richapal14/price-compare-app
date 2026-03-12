'use client';

import { useState } from 'react';
import { Search, ExternalLink, Loader2, Zap, ShieldCheck, Tag, CheckCircle, Mail, MapPin } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 scroll-smooth">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-blue-700 flex items-center gap-2">
            <Zap size={28} className="text-orange-500 fill-orange-500" />
            MyShopping
          </div>
          <div className="hidden md:flex gap-8 font-bold text-gray-600">
            <a href="#home" className="hover:text-blue-600 transition">Home</a>
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (With Search Bar) */}
      <header id="home" className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="bg-blue-800 text-blue-100 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
            India's #1 Price Engine
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Stop Overpaying for <br/><span className="text-orange-400">Online Shopping.</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto pb-6">
            Search once. Compare prices across Amazon, Flipkart, and Meesho instantly to find the absolute lowest price.
          </p>

          {/* The Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto border-4 border-white/20">
            <div className="w-full flex items-center px-4 py-3 md:py-0">
              <Search className="text-gray-400 mr-3" size={24} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for iPhone 15, Sony TV, Shoes..." 
                className="w-full text-lg outline-none text-gray-800 bg-transparent py-2"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto mt-2 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : 'Search Deals'}
            </button>
          </form>
        </div>
      </header>

      {/* 3. LIVE SEARCH RESULTS (Only shows if user searches) */}
      {results.length > 0 && (
        <section className="max-w-5xl mx-auto py-12 px-4 scroll-mt-24" id="results">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-100">
              <h2 className="font-bold text-xl text-gray-800">
                Live Results for <span className="text-blue-600">"{query}"</span>
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {results.map((item: any, index: number) => (
                <div key={item.platform} className={`p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-blue-50/50 transition-colors ${index === 0 ? 'bg-green-50/30' : ''}`}>
                  <span className="font-black text-2xl text-gray-700 w-32">{item.platform}</span>
                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-3xl font-black text-gray-900">₹{item.price.toLocaleString()}</span>
                    <a href={item.link} target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md">
                      Go to Store <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-500 text-lg">We provide powerful tools to make you a smarter shopper.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Live Price Scraping</h3>
            <p className="text-gray-600 leading-relaxed">Our bot scans top e-commerce sites in real-time so you always see the most accurate, up-to-the-second pricing.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Verified Stores Only</h3>
            <p className="text-gray-600 leading-relaxed">We only compare prices from trusted, reliable platforms like Amazon, Flipkart, and Myntra to keep you safe from scams.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Tag size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">100% Free to Use</h3>
            <p className="text-gray-600 leading-relaxed">You never pay a dime. We make our money through affiliate commissions directly from the stores when you buy.</p>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="about" className="py-20 px-4 bg-white border-y border-gray-100 scroll-mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" alt="Online Shopping" className="rounded-3xl shadow-2xl" />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">About MyShopping</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              MyShopping was founded with a simple mission: to bring transparency to online shopping in India. With prices constantly fluctuating across dozens of apps, it's impossible for a normal person to manually check who has the best deal.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" /> Built by independent developers</li>
              <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" /> Over 10,000+ products scanned daily</li>
              <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="text-green-500" /> Dedicated to saving you money</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION & FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-16 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-3xl font-black tracking-tighter text-white flex items-center gap-2 mb-6">
              <Zap size={32} className="text-orange-500 fill-orange-500" /> MyShopping
            </div>
            <p className="text-gray-400 mb-8 max-w-sm">
              Your ultimate shopping companion. Never miss a discount again.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="text-blue-500" /> myshopping606@gmail.com</div>
              
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
          <form action="https://formsubmit.co/myshopping606@gmail.com" method="POST" className="space-y-4">
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="name" required placeholder="Your Name" className="w-full p-3 rounded-xl bg-gray-700 border-none outline-none text-white focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" required placeholder="Email Address" className="w-full p-3 rounded-xl bg-gray-700 border-none outline-none text-white focus:ring-2 focus:ring-blue-500" />
          <textarea name="message" required placeholder="How can we help?" className="w-full p-3 rounded-xl bg-gray-700 border-none outline-none text-white focus:ring-2 focus:ring-blue-500 h-24 resize-none"></textarea>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl w-full transition">Send Message</button>
        </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MyShopping Compare. All rights reserved.
        </div>
      </footer>

    </div>
  );
}