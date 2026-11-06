import { proxyV3 } from '@/lib/tvboxV3Proxy';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  const url = new URL(request.url);
  const fn = url.pathname.split('/').pop() || 'super2.jar';
  return proxyV3(request, '/jar/' + fn);
}
