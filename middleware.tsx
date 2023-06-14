import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    // Handle case where geo is undefined
    if (!req.geo) {
        return NextResponse.next();
    }

    const { nextUrl: url, geo } = req;
    const country = geo.country || 'DE';
    console.log(country)
    // If the user is from Turkey, redirect them to a different URL
    if (country === 'IE') {
        return NextResponse.redirect('https://moshapparel.com');
    }

    url.searchParams.set('country', country);
    return NextResponse.rewrite(url);
}
