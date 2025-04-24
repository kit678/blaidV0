import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the hostname for the research site
const RESEARCH_HOSTNAME = 'research.blaidelabs.com';
// const DEV_RESEARCH_HOSTNAME = 'research.localhost:3000'; // Keep or remove based on local testing needs

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // Use clone for modifications
  const hostname = request.headers.get('host') || '';

  // Target internal path for the research content
  const researchInternalPath = '/research-content';

  // Check if the request is for the research domain's root
  if (hostname === RESEARCH_HOSTNAME /* || hostname === DEV_RESEARCH_HOSTNAME */ && url.pathname === '/') {
    // Rewrite the request for the root path to the internal research page path
    // The URL in the browser remains research.blaidelabs.com/
    console.log(`Rewriting ROOT ${hostname}${url.pathname} to ${researchInternalPath}`); // Updated log
    return NextResponse.rewrite(new URL(researchInternalPath, request.url));
  }

  // --- Redirects (Keep existing redirect logic) ---
  // Redirect /work to /products
  if (url.pathname === '/work') {
    return NextResponse.redirect(new URL('/products', url));
  }

  // Redirect /work/[slug] to /products/[slug]
  if (url.pathname.startsWith('/work/')) {
    const newPath = url.pathname.replace('/work/', '/products/');
    return NextResponse.redirect(new URL(newPath, url));
  }
  // --- End Redirects ---


  // Allow all other requests (including non-root paths on research domain
  // and all paths on other domains) to proceed normally.
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