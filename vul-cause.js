/* To understand this program's behavior, the following websites may be helpful.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * https://lodash.com/docs/#partial
 * https://lodash.com/docs/#partialRight
 */

const _ = require('lodash');
function _string_escape(val, timeZone, dialect, format) {
    return [val, timeZone, dialect, format];
}

var val = ["%'--%"]

var string_escape = _.partial(_string_escape, _, null, 'sqlite', true);
console.log('partial\t\t', val.map(string_escape));

var string_escape = _.partialRight(_string_escape, null, 'sqlite');
console.log('partialRight\t', val.map(string_escape));

