import { NextRequest, NextResponse } from 'next/server';

type Product = { barcode: string; name: string; brand: string; image: string; description: string; category: string; source: string };
const clean = (v: unknown) => typeof v === 'string' ? v.trim() : '';
async function fetchJson(url: string) {
  const res = await fetch(url, { headers: { 'User-Agent': 'MeuInventario/0.1 (stock inventory app)' }, signal: AbortSignal.timeout(7000), cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}
export async function GET(req: NextRequest) {
  const barcode = (req.nextUrl.searchParams.get('barcode') || '').replace(/\D/g, '');
  if (!/^\d{8,14}$/.test(barcode)) return NextResponse.json({ error: 'Código de barras inválido.' }, { status: 400 });
  const fields = 'product_name,product_name_pt,product_name_en,brands,image_front_url,image_url,generic_name,categories';
  const sources = [
    { label: 'Open Food Facts', url: `https://world.openfoodfacts.org/api/v3/product/${barcode}.json?fields=${fields}` },
    { label: 'Open Beauty Facts', url: `https://world.openbeautyfacts.org/api/v3/product/${barcode}.json?fields=${fields}` },
    { label: 'Open Products Facts', url: `https://world.openproductsfacts.org/api/v3/product/${barcode}.json?fields=${fields}` }
  ];
  const results = await Promise.allSettled(sources.map(s => fetchJson(s.url)));
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status !== 'fulfilled' || !result.value?.product) continue;
    const p = result.value.product;
    const name = clean(p.product_name_pt) || clean(p.product_name) || clean(p.product_name_en) || clean(p.generic_name);
    if (!name) continue;
    const product: Product = {
      barcode, name, brand: clean(p.brands), image: clean(p.image_front_url) || clean(p.image_url),
      description: clean(p.generic_name), category: clean(p.categories).split(',')[0] || '', source: sources[i].label
    };
    return NextResponse.json({ found: true, product, sourcesChecked: sources.map(s => s.label), marketplaceSearch: `https://www.mercadolivre.com.br/jm/search?query=${encodeURIComponent(barcode)}` });
  }
  return NextResponse.json({ found: false, barcode, sourcesChecked: sources.map(s => s.label), marketplaceSearch: `https://www.mercadolivre.com.br/jm/search?query=${encodeURIComponent(barcode)}` });
}
