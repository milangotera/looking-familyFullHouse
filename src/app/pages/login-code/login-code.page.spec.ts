import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginCodePage } from './login-code.page';

describe('LoginCodePage', () => {
  let component: LoginCodePage;
  let fixture: ComponentFixture<LoginCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
