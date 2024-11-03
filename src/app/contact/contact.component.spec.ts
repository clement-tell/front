import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ContactComponent} from './contact.component';
import {AppComponent} from '../app.component';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {By} from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let router: Router;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ContactComponent
      ],
      providers: [
        AppComponent,
        MessageService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait initialiser `remainingCharacters` à la valeur maximale quand aucun message n\'est présent', () => {
    const characterCountElement = fixture.debugElement.query(By.css('.character-count')).nativeElement;
    expect(characterCountElement.textContent).toBe(` ${component.maxLength} caractères restants `);
  });

  it('devrait réduire `remainingCharacters` en fonction de la longueur du message', () => {
    const characterCountElement = fixture.debugElement.query(By.css('.character-count')).nativeElement;
    const messageTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

    messageTextarea.value = 'A'.repeat(12);
    messageTextarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(characterCountElement.textContent).toBe(` ${component.maxLength - 12} caractères restants `);
  });

  it("devrait désactiver le bouton d'envoi lorsque le mail est invalide", () => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const messageTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;

    emailInput.value = '';
    messageTextarea.value = 'message';
    emailInput.dispatchEvent(new Event('input'));
    messageTextarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.classList).toContain('p-disabled');
  });

  it("devrait désactiver le bouton d'envoi lorsque le message est invalide", () => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const messageTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;

    emailInput.value = 'test@gmail.com';
    messageTextarea.value = '';
    emailInput.dispatchEvent(new Event('input'));
    messageTextarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.classList).toContain('p-disabled');
  });

  it('devrait activer le bouton d\'envoi lorsque le formulaire est valide', () => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const messageTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;

    emailInput.value = 'test@gmail.com';
    messageTextarea.value = 'message';
    emailInput.dispatchEvent(new Event('input'));
    messageTextarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.classList).not.toContain('p-disabled');
  });


  it('devrait appeler `onSend` et naviguer vers `/home` en affichant un message de succès', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const messageServiceSpy = spyOn(messageService, 'add');

    component.onSend();
    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(messageServiceSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Envoyé !',
      detail: 'Demande de contact envoyée avec succès.'
    });
  }));
});
