import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname)
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$')
    const id = req.nextUrl.pathname.replace('/api/entries/', '')
    if (!checkMongoIDRegExp.test(id)) {
      //old way to return a bad request, prior to next 13
      //const url = req.nextUrl.clone()
      //url.pathname = '/api/bad-request'
      //url.search = `?message=${id} is not a valid mongoId`
      //return NextResponse.rewrite(url)

      return new NextResponse(JSON.stringify({ ok: false, message: `${id} is not a valid mongoId` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/entries/:path*'],
}
