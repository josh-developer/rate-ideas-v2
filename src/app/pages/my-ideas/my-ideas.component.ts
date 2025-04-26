import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent, AccordionListComponent, TabComponent, ITabData } from '@shared';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { IdeasStore } from '../../store/ideas/ideas.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStore } from '../../store/user/user.store';

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
export default class MyIdeasComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly ideasStore = inject(IdeasStore);
  readonly userStore = inject(UserStore);
  readonly destroyRef = inject(DestroyRef);

  tabs = signal<ITabData[]>([]);

  ngOnInit(): void {
    this.getMyIdeas();
    
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

  getMyIdeas() {    
    const userId = this.userStore.getUser().id;
    this.ideasStore
      .getMyIdeas(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMyIdeas();
    });
  }
}
