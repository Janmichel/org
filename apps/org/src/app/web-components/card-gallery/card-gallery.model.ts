import { OrgCardAuthor, OrgCardVariant } from '@org/ui';

/** Ratio média de la carte (images plus courtes / plus longues). */
export type CardGalleryImageRatio =
  | 'wide'
  | 'landscape'
  | 'square'
  | 'portrait'
  | 'tall';

/** Item JSON consommé par la galerie / le web component. */
export interface CardGalleryItem {
  id?: string;
  variant?: OrgCardVariant;
  imageSrc: string;
  imageAlt?: string;
  /** `wide` | `landscape` | `square` | `portrait` | `tall` */
  imageRatio?: CardGalleryImageRatio;
  label?: string;
  title: string;
  description?: string;
  author?: OrgCardAuthor | null;
  meta?: string;
  actionLabel?: string;
  playAriaLabel?: string;
  playIconSrc?: string;
  leadingIcon?: string;
}

const IMAGE_RATIOS: readonly CardGalleryImageRatio[] = [
  'wide',
  'landscape',
  'square',
  'portrait',
  'tall'
];

export function normalizeImageRatio(
  value: unknown
): CardGalleryImageRatio | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  return IMAGE_RATIOS.includes(value as CardGalleryImageRatio)
    ? (value as CardGalleryImageRatio)
    : undefined;
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

  return raw.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return [];
    }
    const card = item as CardGalleryItem;
    if (typeof card.imageSrc !== 'string' || typeof card.title !== 'string') {
      return [];
    }
    const imageRatio = normalizeImageRatio(card.imageRatio);
    return [{ ...card, imageRatio }];
  });
}
