import { proxyV3 } from '@/lib/tvboxV3Proxy';
export const runtime = 'nodejs';
export async function GET(request: Request) { return proxyV3(request, '/tvbox2'); }
