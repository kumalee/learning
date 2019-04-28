import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list rentals', function(hooks) {
  // This `setupApplicationTest` function ensures that
  // your Ember application is started and shut down between each test.
  setupApplicationTest(hooks);

  /**
   * QUnit passes in an object called an assert to each test function.
   * An assert has functions, such as equal(),
   * that allow your test to check for conditions within the test environment.
   * A test must have one passing assert to be successful.
  */
  test('visiting /', async function(assert) {
    /**
     * Ember application tests use a set of test helper functions,
     * such as the visit and currentURL functions used above.
     * We'll discuss those functions in more detail later in the tutorial.
    */
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
