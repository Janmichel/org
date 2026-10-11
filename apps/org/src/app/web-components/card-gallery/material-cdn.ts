/** CDN Google Fonts — Roboto + Material Icons (ligatures mat-icon). */
export const MATERIAL_CDN_HREFS = [
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap'
] as const;

const PRECONNECT_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
] as const;

function appendStylesheet(
  parent: ParentNode,
  href: string,
  options?: { crossOrigin?: boolean }
): void {
  if (parent.querySelector(`link[href="${href}"]`)) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  if (options?.crossOrigin) {
    link.crossOrigin = 'anonymous';
  }
  parent.appendChild(link);
}

/** Preconnect + feuilles de style sur document.head (hôte). */
export function ensureMaterialCdnOnDocument(): void {
  for (const origin of PRECONNECT_ORIGINS) {
    if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      continue;
    }
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    if (origin.includes('gstatic')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  }

  for (const href of MATERIAL_CDN_HREFS) {
    appendStylesheet(document.head, href);
  }
}

/**
 * Réinjecte les feuilles Material dans un ShadowRoot.
 * Les @font-face du document s’appliquent, mais les règles `.material-icons`
 * du CDN ne traversent pas le Shadow DOM.
 */
export function ensureMaterialCdnInShadow(shadow: ShadowRoot): void {
  for (const href of MATERIAL_CDN_HREFS) {
    appendStylesheet(shadow, href, { crossOrigin: true });
  }
}
