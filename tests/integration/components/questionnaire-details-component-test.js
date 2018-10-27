import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire-details-component', function(hooks) {
  setupRenderingTest(hooks);

  test('Questionnaire details component test', async function(assert) {

    await render(hbs`{{questionnaire-details-component}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#questionnaire-details-component}}
        template block text
      {{/questionnaire-details-component}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    // set questionnaire_name
    this.set('questionnaire_name', 'Privathaftpflichtversicherung');

    await render(hbs`<h3>{{questionnaire_name}}</h3>`);

    assert.equal(this.element.textContent.trim(), 'Privathaftpflichtversicherung', 'display questionnaire name');

    // set questionnaire_description
    this.set('questionnaire_description', 'Um Dein persönliches Privathaftpflichtversicherungs-Angebot zu erstellen, benötigen wir noch ein paar Informationen von Dir.');

    await render(hbs`<h3>{{questionnaire_description}}</h3>`);

    assert.equal(this.element.textContent.trim(), 'Um Dein persönliches Privathaftpflichtversicherungs-Angebot zu erstellen, benötigen wir noch ein paar Informationen von Dir.', 'display questionnaire decription');


  });
});
