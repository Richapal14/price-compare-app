import { NextResponse } from 'next/server';

export async function GET(request: Request) {
const { searchParams } = new URL(request.url);
const query = searchParams.get('q')?.toLowerCase();

if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
}

try {
    let results = [];

    // 🧠 SMART DEMO DATABASE
    // This gives realistic prices for common test searches so your app looks professional!
    
    if (query.includes('iphone 15')) {
    results = [
        { platform: 'Amazon', price: 70999, link: `https://www.amazon.in/s?k=${query}` },
        { platform: 'Flipkart', price: 71999, link: `https://www.flipkart.com/search?q=${query}` },
        { platform: 'Croma', price: 72499, link: `https://www.croma.com/search/?q=${query}` }
    ];
    } 
    else if (query.includes('macbook') || query.includes('laptop')) {
    results = [
        { platform: 'Amazon', price: 84990, link: `https://www.amazon.in/s?k=${query}` },
        { platform: 'Flipkart', price: 86990, link: `https://www.flipkart.com/search?q=${query}` },
        { platform: 'Reliance', price: 89999, link: `https://www.reliancedigital.in/search?q=${query}` }
    ];
    }
    else if (query.includes('kurti') || query.includes('dress') || query.includes('shoes')) {
    results = [
        { platform: 'Meesho', price: 499, link: `https://www.meesho.com/search?q=${query}` },
        { platform: 'Flipkart', price: 549, link: `https://www.flipkart.com/search?q=${query}` },
        { platform: 'Amazon', price: 599, link: `https://www.amazon.in/s?k=${query}` }
    ];
    }
    else {
      // Fallback for any other random search
    results = [
        { platform: 'Amazon', price: 1499, link: `https://www.amazon.in/s?k=${query}` },
        { platform: 'Flipkart', price: 1549, link: `https://www.flipkart.com/search?q=${query}` },
        { platform: 'Myntra', price: 1699, link: `https://www.myntra.com/${query}` }
    ];
    }

    // Always sort cheapest to the top
    results.sort((a, b) => a.price - b.price);

    // Add an artificial 1.5 second delay so the loading spinner looks authentic!
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(results);

} catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
}
}