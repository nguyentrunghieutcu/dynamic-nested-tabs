import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.scss'],
  exportAs: 'dynamic-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTabComponent implements OnInit {
  @Input() tabs: string[] = [];
  @Input() visibleTabs: string[] = [];
  @Input() moreTabs: string[] = [];
  @Input() selectedTab: number = 0;
  @Output() indexSelected: EventEmitter<any> = new EventEmitter();

  constructor(public cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.adjustTabs();
  }

  ngOnChanges() {}

  ngDoCheck() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjustTabs();
  }

  adjustTabs() {
    const tabWidth = 150;
    const moreButtonWidth = 50;
    const windowWidth = window.innerWidth;
    const maxVisibleTabs = Math.floor(
      (windowWidth - moreButtonWidth) / tabWidth
    );

    this.visibleTabs = this.tabs.slice(0, maxVisibleTabs);
    this.moreTabs = this.tabs.slice(maxVisibleTabs);
    this.cd.markForCheck();
  }

  selectTab(index: number) {
    if (index >= this.visibleTabs.length) {
      const selectedTab = this.moreTabs[index - this.visibleTabs.length];

      this.moreTabs.splice(index - this.visibleTabs.length, 1);

      this.visibleTabs.splice(0, 0, selectedTab);

      this.selectedTab = 0;

      this.tabs = [...this.visibleTabs, ...this.moreTabs];
    } else {
      this.selectedTab = index;
    }
    this.indexSelected.emit(this.selectedTab);
    this.adjustTabs();
  }

  trackByFn(index, item) {
    return index;
  }
}
