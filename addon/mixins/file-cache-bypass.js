import Ember from 'ember';

/**
 * This is a hack to resolve a server-side race condition.
 * After creating/modifying/deleting a file through Waterbutler, it can take
 * a fraction of a second for the API's cache to properly update, and
 * trying to reload the file model in that time can return stale data.
 *
 * This adapter mixin appends a nonce to requests that are likely to run into
 * that race condition, forcing a cache miss.
 */
export default Ember.Mixin.create({
    fileManager: Ember.inject.service(),

    // HACK: Messing with Ember Data's privates.
    ajaxOptions() {
        let options = this._super(...arguments);
        if (this.get('fileManager').isReloadingUrl(options.url)) {
            let prefix = options.url.indexOf('?') === -1 ? '?' : '&';
            let nonce = Date.now();
            // The name of the query parameter doesn't matter, just the nonce
            options.url += `${prefix}cachebypass=${nonce}`;
        }
        return options;
    }
});
