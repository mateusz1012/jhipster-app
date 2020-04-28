import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FilmComponentsPage, FilmDeleteDialog, FilmUpdatePage } from './film.page-object';

const expect = chai.expect;

describe('Film e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let filmComponentsPage: FilmComponentsPage;
  let filmUpdatePage: FilmUpdatePage;
  let filmDeleteDialog: FilmDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Films', async () => {
    await navBarPage.goToEntity('film');
    filmComponentsPage = new FilmComponentsPage();
    await browser.wait(ec.visibilityOf(filmComponentsPage.title), 5000);
    expect(await filmComponentsPage.getTitle()).to.eq('mySecondApp.film.home.title');
  });

  it('should load create Film page', async () => {
    await filmComponentsPage.clickOnCreateButton();
    filmUpdatePage = new FilmUpdatePage();
    expect(await filmUpdatePage.getPageTitle()).to.eq('mySecondApp.film.home.createOrEditLabel');
    await filmUpdatePage.cancel();
  });

  it('should create and save Films', async () => {
    const nbButtonsBeforeCreate = await filmComponentsPage.countDeleteButtons();

    await filmComponentsPage.clickOnCreateButton();
    await promise.all([
      filmUpdatePage.setNameInput('name'),
      filmUpdatePage.setHandleInput('handle'),
      filmUpdatePage.userSelectLastOption()
    ]);
    expect(await filmUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await filmUpdatePage.getHandleInput()).to.eq('handle', 'Expected Handle value to be equals to handle');
    await filmUpdatePage.save();
    expect(await filmUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await filmComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Film', async () => {
    const nbButtonsBeforeDelete = await filmComponentsPage.countDeleteButtons();
    await filmComponentsPage.clickOnLastDeleteButton();

    filmDeleteDialog = new FilmDeleteDialog();
    expect(await filmDeleteDialog.getDialogTitle()).to.eq('mySecondApp.film.delete.question');
    await filmDeleteDialog.clickOnConfirmButton();

    expect(await filmComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
