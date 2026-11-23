import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {
  OrgTableCellClickEvent,
  OrgTableColumn,
  OrgTableRow,
  OrgTableRowClickEvent
} from './table.model';

@Component({
  selector: 'org-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'org-table',
    'data-testId': 'org-table-host'
  }
})
export class OrgTable {
  readonly columns = input.required<readonly OrgTableColumn[]>();
  readonly data = input.required<readonly OrgTableRow[]>();
  readonly ariaLabel = input('Tableau de données');

  /**
   * Clic sur une cellule dont la colonne a `cellClick` actif.
   * N’émet jamais en même temps que `rowClick` (stopPropagation).
   */
  readonly cellClick = output<OrgTableCellClickEvent>();

  /**
   * Clic sur la ligne (ou sur une cellule sans `cellClick`).
   * Non déclenché si une cellule `cellClick` a intercepté le clic.
   */
  readonly rowClick = output<OrgTableRowClickEvent>();

  protected readonly displayedColumns = computed(() =>
    this.columns().map((column) => column.key)
  );

  protected readonly dataSource = computed(() => [...this.data()]);

  protected displayValue(row: OrgTableRow, key: string): string {
    const value = row[key];
    if (value == null) {
      return '';
    }
    return String(value);
  }

  /** Décide si CETTE cellule (ligne × colonne) est cliquable. */
  protected isCellClickEnabled(
    row: OrgTableRow,
    column: OrgTableColumn
  ): boolean {
    const mode = column.cellClick;
    if (mode == null || mode === false) {
      return false;
    }
    if (mode === true) {
      return true;
    }
    return mode(row);
  }

  protected onCellClick(
    row: OrgTableRow,
    column: OrgTableColumn,
    event: MouseEvent
  ): void {
    if (!this.isCellClickEnabled(row, column)) {
      // Laisse bulle → rowClick
      return;
    }
    event.stopPropagation();
    this.cellClick.emit({
      row,
      column,
      value: row[column.key],
      index: this.rowIndex(row),
      event
    });
  }

  protected onCellKeyActivate(
    row: OrgTableRow,
    column: OrgTableColumn,
    event: Event
  ): void {
    if (!this.isCellClickEnabled(row, column)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.cellClick.emit({
      row,
      column,
      value: row[column.key],
      index: this.rowIndex(row),
      event: event as unknown as MouseEvent
    });
  }

  protected onRowClick(
    row: OrgTableRow,
    index: number,
    event: MouseEvent
  ): void {
    this.rowClick.emit({ row, index, event });
  }

  private rowIndex(row: OrgTableRow): number {
    return this.data().indexOf(row);
  }
}
