import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
 return { name: 'Meu Inventário', short_name: 'Inventário', description: 'Leitor de códigos de barras e controle de estoque', start_url: '/', display: 'standalone', background_color: '#f7f8fa', theme_color: '#172b4d', lang: 'pt-BR' };
}
