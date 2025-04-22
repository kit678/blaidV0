import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the hostname for the research site
const RESEARCH_HOSTNAME = 'research.blaidelabs.com';
const DEV_RESEARCH_HOSTNAME = 'research.localhost:3000'; // Adjust port if needed

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Determine if the request is for the research site
  const isResearchSite = hostname === RESEARCH_HOSTNAME || hostname === DEV_RESEARCH_HOSTNAME;

  // If it's the research site hostname, rewrite the path to the /app/(research) route group
  if (isResearchSite && !url.pathname.startsWith('/(research)')) {
    url.pathname = `/(research)${url.pathname}`;
    console.log(`Rewriting ${hostname}${request.nextUrl.pathname} to ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 