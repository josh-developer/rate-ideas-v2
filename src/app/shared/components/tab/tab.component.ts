import { Component, input, output } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ITabData } from '../../models/frontend/Tab';

@Component({
  selector: 'app-tab',
  templateUrl: 'tab.component.html',
  styleUrl: 'tab.component.scss',
  imports: [MatTabsModule],
})
export class TabComponent {
  tabs = input<ITabData[]>([]);
  tabChange = output<ITabData>();

  onTabChange(tab: MatTabChangeEvent): void {
    const selectedTab = this.tabs()[tab.index];
    this.tabChange.emit(selectedTab);
  }
}
