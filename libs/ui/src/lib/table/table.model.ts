/**
 * Contrat client `org-table`.
 *
 * - `cellClick` sur une colonne = opt-in. Défaut = false → le clic remonte en `rowClick`.
 * - `cellClick: true` = toutes les cellules de la colonne émettent `(cellClick)` (sans `rowClick`).
 * - `cellClick: (row) => boolean` = cellule précise (ex. seulement si status === 'Actif').
 */
export type OrgTableCellClickMode =
  | boolean
  | ((row: OrgTableRow) => boolean);

export interface OrgTableColumn {
  key: string;
  label: string;
  /**
   * Active le clic cellule pour cette colonne.
   * @default false — le clic traverse vers `rowClick`.
   */
  cellClick?: OrgTableCellClickMode;
}

/** Ligne de données (objet indexé par key de colonne). */
export type OrgTableRow = Record<string, unknown>;

export interface OrgTableRowClickEvent {
  row: OrgTableRow;
  index: number;
  event: MouseEvent;
}

export interface OrgTableCellClickEvent {
  row: OrgTableRow;
  column: OrgTableColumn;
  value: unknown;
  index: number;
  event: MouseEvent;
}
