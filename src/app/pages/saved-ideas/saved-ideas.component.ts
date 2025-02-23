import { Component, inject, signal } from '@angular/core';
import { NavbarComponent, AccordionListComponent, TabComponent, ITabData } from '@shared';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-saved-ideas',
  imports: [
    NavbarComponent,
    TabComponent,
    FormsModule,
    AccordionListComponent,
    MatButtonModule,
  ],
  templateUrl: './saved-ideas.component.html',
})
export default class SavedIdeasComponent {
  readonly dialog = inject(MatDialog);

  tabs = signal([
    { label: 'Tab 1', id: 1 },
    { label: 'Tab 2', id: 2 },
  ]);
  activeTab = signal<string>('');

  onTabsChange(tab: ITabData): void {
    this.activeTab.set(tab.label);
  }
}
