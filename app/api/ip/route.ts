import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        // Get geolocation data directly from Vercel Edge
        const { country } = geolocation(request);
        console.log("Vercel Geolocation Country:", country);
        
        // Return the country code from Vercel's geolocation
        return NextResponse.json({ 
            ip: country || null,
        });
    } catch (error) {
        console.error("Error with geolocation:", error);
        
        // Fallback to external service only if Vercel geolocation fails
        try {
            const res = await fetch(`https://api.ipify.org?format=json`);
            const data = await res.json();
            console.log("User's IP from fallback service:", data?.ip);
            const userIp = data.ip;
            const geo = await fetch(`https://get.geojs.io/v1/ip/country/${userIp}.json`);
            const ip = await geo.json();
            return NextResponse.json({ ip: ip.country });
        } catch (fallbackError) {
            console.error("Fallback geolocation also failed:", fallbackError);
            return NextResponse.json({ error: "Failed to fetch geolocation" }, { status: 500 });
        }
    }
}