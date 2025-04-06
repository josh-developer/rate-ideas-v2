import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent, AccordionListComponent, TabComponent, ITabData } from '@shared';
import { FormsModule } from '@angular/forms';
import { IdeasStore } from '../../store/ideas/ideas.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, TabComponent, FormsModule, AccordionListComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  ideasStore = inject(IdeasStore);
  destroyRef = inject(DestroyRef);

  tabs = signal<ITabData[]>([]);  

  ngOnInit(): void {
    this.ideasStore
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        const categories = data.data.map(category => ({
          label: category.name,
          id: category.id,
        }));

        this.tabs.set(categories);
      });
  }

  onTabsChange(tab: ITabData): void {
    this.ideasStore.setActiveTab(tab.id);
    this.ideasStore.setIdeas(tab.id);
  }
}
