import { OrgCardAuthor, OrgCardVariant } from '@org/ui';

/** Item JSON consommé par la galerie / le web component. */
export interface CardGalleryItem {
  id?: string;
  variant?: OrgCardVariant;
  imageSrc: string;
  imageAlt?: string;
  label?: string;
  title: string;
  description?: string;
  author?: OrgCardAuthor | null;
  meta?: string;
  actionLabel?: string;
  playAriaLabel?: string;
  leadingIcon?: string;
}

export function parseCardGalleryItems(value: unknown): CardGalleryItem[] {
  if (value == null || value === '') {
    return [];
  }

  let raw: unknown = value;
  if (typeof value === 'string') {
    try {
      raw = JSON.parse(value);
    } catch {
      console.error('org-card-gallery: attribut items JSON invalide.');
      return [];
    }
  }

  if (!Array.isArray(raw)) {
    console.error('org-card-gallery: items doit être un tableau JSON.');
    return [];
  }

  return raw.filter((item): item is CardGalleryItem => {
    if (!item || typeof item !== 'object') {
      return false;
    }
    const card = item as CardGalleryItem;
    return typeof card.imageSrc === 'string' && typeof card.title === 'string';
  });
}
