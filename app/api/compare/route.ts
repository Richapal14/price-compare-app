import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
const { searchParams } = new URL(request.url);
const query = searchParams.get('q');

if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
}

try {
    const results = [];

    // --- 1. Scrape Amazon via Free Proxy ---
    try {
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
      // The Magic Trick: Wrapping the URL in a free proxy!
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(amazonUrl)}`;
    
    const { data: amazonHtml } = await axios.get(proxyUrl, {
        headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' 
        }
    });
    const $ = cheerio.load(amazonHtml);
    
    const priceText = $('.a-price-whole').first().text().replace(/,/g, '');
    if (priceText) {
        results.push({
        platform: 'Amazon',
        price: parseInt(priceText),
        link: amazonUrl, 
        });
    }
    } catch (e) {
    console.log("Amazon proxy scrape failed");
    }

    // --- 2. Scrape Flipkart via Free Proxy ---
    try {
    const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
      // Wrapping Flipkart URL in the proxy
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(flipkartUrl)}`;

    const { data: flipkartHtml } = await axios.get(proxyUrl, {
        headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' 
        }
    });
    const $$ = cheerio.load(flipkartHtml);
    
    const priceText = $$('._30jeq3, .Nx9bqj').first().text().replace('₹', '').replace(/,/g, '');
    if (priceText) {
        results.push({
        platform: 'Flipkart',
        price: parseInt(priceText),
        link: flipkartUrl,
        });
    }
    } catch (e) {
    console.log("Flipkart proxy scrape failed");
    }

    // Sort cheapest to top
    results.sort((a, b) => a.price - b.price);
    
    return NextResponse.json(results);

} catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
}
}