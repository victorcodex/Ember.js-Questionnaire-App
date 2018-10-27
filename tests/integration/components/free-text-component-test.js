import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | free-text-component', function(hooks) {
  setupRenderingTest(hooks);

  test('Free text component test', async function(assert) {

    await render(hbs`{{free-text-component}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#free-text-component}}
        template block text
      {{/free-text-component}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    // set question_headline
    this.set('question_headline', 'Wen möchtest Du versichern?');

    await render(hbs`<h3>{{question_headline}}</h3>`);

    assert.equal(this.element.textContent.trim(), 'Wen möchtest Du versichern?', 'display question header');

  });
});
