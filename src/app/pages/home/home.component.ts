import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TabComponent } from '../../shared/components/tab/tab.component';
import { ITabData } from '../../shared/models/frontend/tab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, TabComponent, FormsModule],
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  tabs = signal([ { label: 'Tab 1', id: 1 }, { label: 'Tab 2', id: 2 } ]);
  activeTab = signal<string>('');
  inputText = 'TEST';

  onTabsChange(tab: ITabData): void {
    console.log("Ilvoldim, bratim: ", tab);   
    
    this.activeTab.set(tab.label);
  }
}
