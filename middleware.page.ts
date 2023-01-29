import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  console.log(' --------- HIT MIDDLEWARE --------- ');

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get('host') || 'demo.vercel.pub';

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.tokengate.xyz`, '').replace(`.x-aave.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');

  // console.log({ currentHost, hostname });

  // rewrite root application to `/` folder
  if (
    hostname === 'localhost:3000' ||
    hostname === 'x-aave.vercel.app' ||
    hostname === 'tokengate.xyz' ||
    hostname === 'www.tokengate.xyz'
  ) {
    console.log(`Keeping: ${url} => ${url}`);
    return NextResponse.rewrite(new URL(path, req.url));
    // return NextResponse.rewrite(url);
  }

  // rewrite everything else to `/_sites/[site] dynamic route
  const newUrl = new URL(`/_sites/${currentHost}${path}`, req.url);
  console.log(`Rewriting: ${url} => ${newUrl}`);
  return NextResponse.rewrite(newUrl);
}
