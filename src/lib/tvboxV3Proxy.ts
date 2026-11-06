// v3 后端代理：LunaTV 前端保留，v3 公共路由原样在外
// 环境变量 V3_BASE 可覆盖（默认 CF 版 https://tvbox.yuan2.top）
export const V3_BASE = (process.env.V3_BASE || 'https://tvbox.yuan2.top').replace(/\/$/, '');

export async function proxyV3(request: Request, path: string): Promise<Response> {
  const url = new URL(request.url);
  const target = `${V3_BASE}${path}${url.search}`;
  try {
    const resp = await fetch(target, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow',
      cache: 'no-store',
    });
    const body = await resp.arrayBuffer();
    const headers = new Headers();
    const ct = resp.headers.get('content-type') || 'text/plain; charset=utf-8';
    headers.set('Content-Type', ct);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'no-store');
    return new Response(body, { status: resp.status, headers });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ ok: false, error: 'v3 代理失败', msg }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
