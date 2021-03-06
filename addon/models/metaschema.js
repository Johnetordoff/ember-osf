import DS from 'ember-data';

import OsfModel from './osf-model';
/**
 * Model for OSF APIv2 metaschemas.
 * This model describes metaschemas, which contain the
 * supplemental questions accompanying a registration.  The schema field itself
 * contains the detailed blueprint of the metaschema.
 * For information on how to retrieve metaschemas see:
 *    https://api.osf.io/v2/docs/#!/v2/Meta_Schemas_List_GET
 *    https://api.osf.io/v2/docs/#!/v2/Meta_Schema_Detail_GET
*/

export default OsfModel.extend({
    name: DS.attr('string'),
    schemaVersion: DS.attr('number'),
    schema: DS.attr()
});
