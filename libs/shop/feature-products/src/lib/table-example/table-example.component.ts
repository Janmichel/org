import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  IKisTableChange,
  IKisTableColumn,
  IKisTableRowAction,
  IKisTableSelection,
  KisTableActionsEnum,
  KisTableModule,
  TKisTableCellStatus
} from '@dms/kis-design-system/table';

export interface IExpTicket {
  id: number;
  tiketId: string;
  team: string;
  date: Date;
  status: 'CREATED' | 'PENDING' | 'ERROR' | 'SUCCESS';
  option: string;
  favorite?: boolean;
  active: boolean;
  cell: { title?: string; description?: string; status?: TKisTableCellStatus };
}

@Component({
  selector: 'shop-table-example',
  imports: [KisTableModule],
  templateUrl: './table-example.component.html',
  styleUrl: './table-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableExampleComponent {
  minColumnWidth = '100px';
  stickyStartColumnsConfig: string[] = ['id'];
  stickyEndColumnsConfig: string[] = ['active'];
  loading = signal(false);

  private readonly initialData: IExpTicket[] = [
    {
      id: 1,
      tiketId: 'KDS-123',
      team: 'Alexandrie',
      date: new Date('2024/10/01'),
      status: 'SUCCESS',
      option: 'Option1',
      active: false,
      favorite: false,
      cell: {
        title: 'Cell text content',
        description: 'Description text',
        status: 'SUCCESS'
      }
    },
    {
      id: 2,
      tiketId: 'KDS-124',
      team: 'Alexandrie',
      date: new Date('2025/01/08'),
      status: 'PENDING',
      option: 'Option2',
      active: false,
      favorite: false,
      cell: {
        title: 'Cell text content',
        description: 'Description text'
      }
    },
    {
      id: 3,
      tiketId: 'KDS-130',
      team: 'DesignSystem',
      date: new Date('2025/02/01'),
      status: 'CREATED',
      option: 'Option3',
      active: true,
      favorite: false,
      cell: {
        title: 'New ticket',
        description: 'Created, not started yet'
      }
    },
    {
      id: 4,
      tiketId: 'KDS-125',
      team: 'Alexandrie',
      date: new Date('2025/01/10'),
      status: 'ERROR',
      option: 'Option3',
      active: false,
      favorite: false,
      cell: {
        title: 'Cell text content',
        description: 'Description text',
        status: 'ERROR'
      }
    },
    {
      id: 5,
      tiketId: 'KDS-126',
      team: 'Lyon',
      date: new Date('2025/01/11'),
      status: 'SUCCESS',
      option: 'Option4',
      active: false,
      favorite: true,
      cell: {
        title: 'Cell text content'
      }
    },
    {
      id: 6,
      tiketId: 'KDS-127',
      team: 'Paris',
      date: new Date('2025/01/12'),
      status: 'PENDING',
      option: 'Option1',
      active: true,
      favorite: false,
      cell: {
        title: 'Waiting review',
        description: 'Pending approval'
      }
    }
  ];

  data = signal<IExpTicket[]>([...this.initialData]);

  columns = signal<IKisTableColumn[]>([
    { prop: 'id', label: 'ID', sortable: true },
    {
      prop: 'cell',
      label: 'Cell',
      displyAsFn: (
        value: {
          title?: string;
          description?: string;
          status?: TKisTableCellStatus;
        },
        _row: unknown
      ) => ({
        dataTestId: `test-${value.title ?? 'cell'}`,
        type: 'tableCell',
        tableCell: {
          title: value.title,
          description: value.description,
          status: value.status
        }
      })
    },
    { prop: 'tiketId', label: 'Ticket ID', sortable: true },
    { prop: 'team', label: 'Team', minWidth: '180px', sortable: true },
    { prop: 'date', label: 'Date', format: 'date', sortable: true },
    {
      prop: 'status',
      label: 'Status',
      sortable: true,
      displyAsFn: (value: string, _row: unknown) => ({
        dataTestId: `test-${value}`,
        type: 'chipsStatus',
        chipsStatus: {
          options: [{ label: value, status: value.toLowerCase() }]
        }
      })
    },
    { prop: 'option', label: 'Option', sortable: true },
    {
      prop: 'active',
      label: 'Active',
      sortable: true,
      displyAsFn: (value: boolean, _row: unknown) => ({
        dataTestId: `test-active-${value}`,
        type: 'field',
        field: {
          type: 'slideToggle',
          config: {
            ariaLabel: 'active',
            defaultValue: value
          },
          change: (row, prev, curr) => {
            console.warn('active change', row, prev, curr);
          }
        }
      })
    }
  ]);

  tableActions: IKisTableRowAction[] = [
    {
      name: 'more_action',
      code: KisTableActionsEnum.MORE,
      dataTestId: 'more',
      ariaLabel: 'more',
      toolTip: 'more',
      iconName: 'more_vert',
      actions: [
        {
          name: 'duplicate',
          code: KisTableActionsEnum.DUPLICATE,
          dataTestId: 'duplicate',
          click: (row: IExpTicket) => this.onCustom(row, 'duplicate')
        },
        {
          name: 'archive',
          code: KisTableActionsEnum.UPDATE,
          dataTestId: 'archive',
          click: (row: IExpTicket) => this.onCustom(row, 'archive')
        },
        {
          name: 'share',
          code: KisTableActionsEnum.IMPORT,
          dataTestId: 'share',
          click: (row: IExpTicket) => this.onCustom(row, 'share')
        },
        {
          name: 'Network',
          dataTestId: 'network',
          click: (row: IExpTicket) => this.onCustom(row, 'network')
        }
      ]
    },
    {
      name: 'favorite',
      code: KisTableActionsEnum.FAVORITE,
      dataTestId: 'favorite',
      ariaLabel: 'favorite',
      toolTip: 'Favorite',
      click: (row: IExpTicket) => this.setFavorite(row),
      activeProp: 'favorite'
    },
    {
      name: 'delete',
      code: KisTableActionsEnum.DELETE,
      dataTestId: 'delete',
      ariaLabel: 'delete',
      toolTip: 'Delete',
      click: (row: IExpTicket) => this.onDelete(row)
    },
    {
      name: 'view',
      code: KisTableActionsEnum.VIEW,
      dataTestId: 'view',
      ariaLabel: 'view',
      toolTip: 'View',
      click: (row: IExpTicket) => this.onView(row)
    }
  ];

  tableSelection: IKisTableSelection = {};

  onDelete(row: IExpTicket): void {
    this.data.update((curr) => curr.filter((r) => r.id !== row.id));
  }

  onView(row: IExpTicket): void {
    console.warn(`View ${row.tiketId}`);
  }

  setFavorite(row: IExpTicket): void {
    this.data.update((curr) =>
      curr.map((op) => ({
        ...op,
        favorite: row.tiketId === op.tiketId ? !row.favorite : op.favorite
      }))
    );
  }

  onCustom(row: IExpTicket, action: string): void {
    console.warn(`Action ${action} on ${row.tiketId}`);
  }

  onTableChange($event: IKisTableChange): void {
    console.warn('table change', $event);
  }
}
