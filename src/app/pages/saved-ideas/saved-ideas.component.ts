import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent, AccordionListComponent, TabComponent, ITabData } from '@shared';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { IdeasStore } from '../../store/ideas/ideas.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export default class SavedIdeasComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly ideasStore = inject(IdeasStore);
  readonly destroyRef = inject(DestroyRef);

  tabs = signal<ITabData[]>([]);

  ngOnInit(): void {
    this.ideasStore.setAllIdeas([]);
    this.ideasStore.setIdeas(this.ideasStore.activeTab()!);    

    this.ideasStore
      .getAllSavedIdeas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const categories = this.ideasStore.categories().map(category => ({
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
