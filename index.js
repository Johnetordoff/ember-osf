/* jshint node: true */
'use strict';
var path = require('path');
var config = require('config');
var Funnel = require('broccoli-funnel');

module.exports = {
    name: 'ember-osf',
    blueprintsPath: function() {
        return path.join(__dirname, 'blueprints');
    },
    config: function(environment, ENV) {
        let BACKEND = process.env.BACKEND || 'local';
        let SETTINGS = {};
        try {
            SETTINGS = config.get(BACKEND);
        } catch (e) {
            console.log(`WARNING: you\'ve specified a backend '${BACKEND}' that you have not configured in your config/local.yml`);
        }

        // For i18n
        ENV.i18n = {
            defaultLocale: 'en-US'
        };

        ENV.OSF = {
            clientId: SETTINGS.CLIENT_ID,
            scope: SETTINGS.OAUTH_SCOPES,
            apiNamespace: 'v2', // URL suffix (after host)
            backend: BACKEND,
            redirectUri: SETTINGS.REDIRECT_URI
        };

        if (BACKEND === 'local') {
            ENV.OSF.url = 'http://localhost:5000/';
            ENV.OSF.apiUrl = 'http://localhost:8000';
            ENV.OSF.authUrl = 'http://localhost:8080/oauth2/profile';
            ENV.OSF.renderUrl = 'http://localhost:7778/render';
            ENV.OSF.waterbutlerUrl = 'http://localhost:7777/';
            ENV.OSF.helpUrl = 'http://localhost:4200/help';

            ENV.OSF.accessToken = SETTINGS.PERSONAL_ACCESS_TOKEN;
            ENV.OSF.isLocal = true;
        } else if (BACKEND === 'stage') {
            ENV.OSF.url = 'https://staging.osf.io/';
            ENV.OSF.apiUrl = 'https://staging-api.osf.io';
            ENV.OSF.authUrl = 'https://staging-accounts.osf.io/oauth2/authorize';
            ENV.OSF.renderUrl = 'http://staging-mfr.osf.io/render';
            ENV.OSF.waterbutlerUrl = 'http://staging-files.osf.io/';
            ENV.OSF.helpUrl = 'http://help.osf.io';

        }
        if (BACKEND === 'stage2') {
            ENV.OSF.url = 'https://staging2.osf.io/';
            ENV.OSF.apiUrl = 'https://staging2-api.osf.io';
            ENV.OSF.authUrl = 'https://staging2-accounts.osf.io/oauth2/authorize';
            ENV.OSF.renderUrl = 'http://staging2-mfr.osf.io/render';
            ENV.OSF.waterbutlerUrl = 'http://staging2-files.osf.io/';
            ENV.OSF.helpUrl = 'http://help.osf.io';

        }
        if (BACKEND === 'test') {
            ENV.OSF.url = 'https://test.osf.io/';
            ENV.OSF.apiUrl = 'https://test-api.osf.io';
            ENV.OSF.authUrl = 'https://test-accounts.osf.io/oauth2/authorize';
            ENV.OSF.renderUrl = 'http://test-mfr.osf.io/render';

        }
        if (BACKEND === 'prod') {
            console.log(`WARNING: you\'ve specified production as a backend. Please do not use production for testing or development purposes`);
            ENV.OSF.url = 'https://osf.io/';
            ENV.OSF.apiUrl = 'https://api.osf.io';
            ENV.OSF.authUrl = 'https://accounts.osf.io/oauth2/authorize';
            ENV.OSF.renderUrl = 'http://mfr.osf.io/render';
            ENV.OSF.waterbutlerUrl = 'http://files.osf.io/';
            ENV.OSF.helpUrl = 'http://help.osf.io';

        }
        ENV['ember-simple-auth'] = {
            authorizer: 'authorizer:osf-token'
        };
    },
    included: function(app) {
        // Documentation of the `included` hook is mostly in the comment
        // threads of `ember-cli` issues on github. For example:
        // https://github.com/ember-cli/ember-cli/issues/3531#issuecomment-81133458
        this._super.included.apply(this, arguments);

        app.options['ember-font-awesome'] = {
            useScss: true
        };
    },
    treeForPublic() {
        return new Funnel('addon/assets', {
            destDir: 'assets/'
        });
    }
};
