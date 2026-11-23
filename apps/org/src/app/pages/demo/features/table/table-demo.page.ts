import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  OrgTable,
  OrgTableCellClickEvent,
  OrgTableColumn,
  OrgTableRow,
  OrgTableRowClickEvent
} from '@org/ui';

@Component({
  selector: 'app-table-demo-page',
  imports: [OrgTable],
  templateUrl: './table-demo.page.html',
  styleUrls: ['../../shared/demo-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDemoPage {
  protected readonly tableColumns: readonly OrgTableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nom', cellClick: true },
    { key: 'role', label: 'Rôle' },
    {
      key: 'status',
      label: 'Statut',
      cellClick: (row) => row['status'] === 'Actif'
    }
  ];

  protected readonly tableData: readonly OrgTableRow[] = [
    { id: '01', name: 'Olivia Quinn', role: 'Designer', status: 'Actif' },
    { id: '02', name: 'Alex Martin', role: 'Dev', status: 'Actif' },
    { id: '03', name: 'Sam Leroy', role: 'PO', status: 'Absent' },
    { id: '04', name: 'Maya Chen', role: 'QA', status: 'Actif' },
    { id: '05', name: 'Leo Bernard', role: 'Dev', status: 'Revue' }
  ];

  protected readonly tableLog = signal(
    'Clique un nom (cellClick) ou ailleurs sur la ligne (rowClick)…'
  );

  protected onTableCellClick(event: OrgTableCellClickEvent): void {
    console.warn('cellClick', event);
    this.tableLog.set(
      `cellClick → col=${event.column.key} value=${String(event.value)} row=${event.index}`
    );
  }

  protected onTableRowClick(event: OrgTableRowClickEvent): void {
    console.warn('rowClick', event);
    this.tableLog.set(
      `rowClick → row=${event.index} name=${String(event.row['name'])}`
    );
  }
}
