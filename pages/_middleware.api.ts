import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get('host') || 'demo.vercel.pub';

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.tokengate.xyz`, '').replace(`.x-aave.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');

  // console.log({ currentHost, hostname });

  const isRoot =
    hostname === 'localhost:3000' ||
    hostname === 'x-aave.vercel.app' ||
    hostname === 'tokengate.xyz' ||
    hostname === 'www.tokengate.xyz';

  // rewrite root application to `/` folder
  if (isRoot) {
    // console.log({ path });
    // console.log(`Kept ${url.toString()} => ${url.toString()}`);
    return NextResponse.rewrite(url);
  } else {
    if (path === '/') {
      const newURL = new URL(`/_sites/${currentHost}${path}`, req.url);
      console.log(`Rewrote ${url.toString()} => ${newURL.toString()}`);
      return NextResponse.rewrite(newURL);
    }
    //  Match all paths except for:
    //  1. /api routes
    //  2. /_next (Next.js internals)
    //  3. /examples (inside /public)
    //  4. all root files inside /public (e.g. /favicon.ico)
    const re1 = new RegExp('/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)');
    // console.log(re1.source);
    // Match all paths ending with file
    const re2 = /(?:\.([^.]+))?$/;

    if (re1.test(path) || re2.test(path)) {
      // if (re1.test(path)) console.log('hit re1');
      // if (re2.test(path)) console.log('hit re2');
      console.log(`Hit regex - ${url.toString()} => ${url.toString()}`);
      return NextResponse.rewrite(url);
    } else {
      // rewrite everything else to `/_sites/[site] dynamic route
      const newURL = new URL(`/_sites/${currentHost}${path}`, req.url);
      // console.log(`Rewrote (after) ${url.toString()} => ${newURL.toString()}`);
      return NextResponse.rewrite(newURL);
    }
  }
}
