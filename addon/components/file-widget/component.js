import Ember from 'ember';
import layout from './template';

import {
    getAuthUrl
} from 'ember-osf/utils/auth';

import loadAll from 'ember-osf/utils/load-relationship';

export default Ember.Component.extend({
    layout,
    authUrl: getAuthUrl(),
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    fileManager: Ember.inject.service(),
    user: null,
    query: null,
    userNodes: Ember.A(),
    selectedNode: null,
    _url: null,
    init() {
        this._super(...arguments);
        if (this.get('session.isAuthenticated')) {
            this._setCurrentUser();
        }
    },
    _setCurrentUser() {
        this.get('currentUser').load().then(user => this.set('user', user));
    },
    onGetCurrentUser: Ember.observer('user', function() {
        var user = this.get('user');
        if (user) {
            loadAll(user, 'nodes', this.get('userNodes'));
        } else {
            this.set('userNodes', Ember.A());
        }
    }),
    actions: {
        loginSuccess() {
            this._setCurrentUser();
        },
        loginFail() {
            // TODO
        },
        deselectNode() {
            this.set('selectedNode', null);
        },
        selectNodeFile(file) {
            this.send('selectFile', file.get('links.download'));
        },
        selectNode(node) {
            console.log(node);
        },
        selectFile(url) {
            console.log(url);
        },
        preUpload() {
            return new Ember.RSVP.Promise((resolve) => resolve());
        }
    }
});
