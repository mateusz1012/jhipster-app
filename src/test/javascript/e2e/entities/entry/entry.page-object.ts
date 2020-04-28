import { element, by, ElementFinder } from 'protractor';

export class EntryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-entry div table .btn-danger'));
  title = element.all(by.css('jhi-entry div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EntryUpdatePage {
  pageTitle = element(by.id('jhi-entry-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  filmTitleInput = element(by.id('field_filmTitle'));
  descriptionInput = element(by.id('field_description'));
  dateInput = element(by.id('field_date'));
  filmSelect = element(by.id('field_film'));
  tagSelect = element(by.id('field_tag'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFilmTitleInput(filmTitle) {
    await this.filmTitleInput.sendKeys(filmTitle);
  }

  async getFilmTitleInput() {
    return await this.filmTitleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async filmSelectLastOption() {
    await this.filmSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async filmSelectOption(option) {
    await this.filmSelect.sendKeys(option);
  }

  getFilmSelect(): ElementFinder {
    return this.filmSelect;
  }

  async getFilmSelectedOption() {
    return await this.filmSelect.element(by.css('option:checked')).getText();
  }

  async tagSelectLastOption() {
    await this.tagSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tagSelectOption(option) {
    await this.tagSelect.sendKeys(option);
  }

  getTagSelect(): ElementFinder {
    return this.tagSelect;
  }

  async getTagSelectedOption() {
    return await this.tagSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EntryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-entry-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-entry'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
