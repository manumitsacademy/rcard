import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionhistoryComponent } from './transactionhistory.component';

describe('TransactionhistoryComponent', () => {
  let component: TransactionhistoryComponent;
  let fixture: ComponentFixture<TransactionhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
