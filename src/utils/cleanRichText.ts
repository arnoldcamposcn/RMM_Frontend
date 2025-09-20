/**
 * Decodifica entidades HTML y elimina etiquetas.
 * Ejemplo: '<p>Nuestra edici&oacute;n</p>' -> 'Nuestra edición'
 */
export function cleanRichText(html: string): string {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return html.replace(/<[^>]*>?/g, '');
    }
  
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
  