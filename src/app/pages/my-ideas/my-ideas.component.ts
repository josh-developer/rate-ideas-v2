import { Component, inject, signal } from '@angular/core';
import { NavbarComponent, AccordionListComponent, TabComponent, ITabData } from '@shared';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from './add-modal/add-modal.component';

@Component({
  selector: 'app-my-ideas',
  imports: [
    NavbarComponent,
    TabComponent,
    FormsModule,
    AccordionListComponent,
    MatButtonModule,
  ],
  templateUrl: './my-ideas.component.html',
})
export default class MyIdeasComponent {
  readonly dialog = inject(MatDialog);

  tabs = signal([
    { label: 'Tab 1', id: 1 },
    { label: 'Tab 2', id: 2 },
  ]);
  activeTab = signal<string>('');

  onTabsChange(tab: ITabData): void {
    this.activeTab.set(tab.label);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');     
    });
  }
}
