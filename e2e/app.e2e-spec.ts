import { ColoursAngularFrontEndPage } from './app.po';

describe('colours-angular-front-end App', () => {
  let page: ColoursAngularFrontEndPage;

  beforeEach(() => {
    page = new ColoursAngularFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
