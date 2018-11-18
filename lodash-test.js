const _ = require('lodash');
function _string_escape(val, timeZone, dialect, format) {
    return [val, timeZone, dialect, format];
}

const args = ["%'--%", 0, ["%'--%"]];

var string_escape = _.partial(_string_escape, _, null, 'sqlite', true);
console.log('partial\t\t', string_escape(...args));

var string_escape = _.partialRight(_string_escape, null, 'sqlite');
console.log('partialRight\t', string_escape(...args));

