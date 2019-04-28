import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list rentals', function(hooks) {
  // This `setupApplicationTest` function ensures that
  // your Ember application is started and shut down between each test.
  setupApplicationTest(hooks);
  setupMirage(hooks);

  /**
   * QUnit passes in an object called an assert to each test function.
   * An assert has functions, such as equal(),
   * that allow your test to check for conditions within the test environment.
   * A test must have one passing assert to be successful.
  */
  test('should show rentals as the home page', async function (assert) {
    /**
     * Ember application tests use a set of test helper functions,
     * such as the visit and currentURL functions used above.
     * We'll discuss those functions in more detail later in the tutorial.
    */
   await visit('/');
   assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });

  test('should link to information about the company', async function(assert) {
    await visit('/');
    await click(".menu-about");
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });

  test('should link to contact information', async function(assert) {
    await visit('/');
    await click(".menu-contact");
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });

  test('should list available rentals.', async function(assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
  });
});
