export interface OrgTooltipRichContent {
  /** Ligne haute (ex. Sync cloud). */
  eyebrow?: string;
  /** Titre principal (ex. Dernière sync). */
  title: string;
  /** Ligne basse / métadonnées. */
  meta?: string;
}
