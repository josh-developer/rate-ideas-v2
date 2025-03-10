import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent, AccordionListComponent, TabComponent, ITabData } from '@shared';
import { FormsModule } from '@angular/forms';
import { IdeasStore } from '../../store/ideas/ideas.store';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, TabComponent, FormsModule, AccordionListComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  ideasStore = inject(IdeasStore);

  tabs = signal([
    { label: 'Tab 1', id: 1 },
    { label: 'Tab 2', id: 2 },
  ]);
  activeTab = signal<string>('');

  ngOnInit(): void {
    this.ideasStore.getAllCategories().subscribe();
  }

  onTabsChange(tab: ITabData): void {
    this.activeTab.set(tab.label);
  }
}
