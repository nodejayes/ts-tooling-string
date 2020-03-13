import 'mocha';
import {assert} from 'chai';
import {StringFactory} from '../src';

describe('String Factory Tests', () => {
    describe('[Method]: RandomAlphaString', () => {
        it('generate Random String', () => {
            const tmp = StringFactory.RandomAlphaString(50);
            assert.lengthOf(tmp, 50);
            assert.isTrue(tmp.IsAlpha!());
        });
        it('cannot generate empty string', () => {
            assert.equal(StringFactory.RandomAlphaString(0).length, 1);
            assert.equal(StringFactory.RandomAlphaString(-1).length, 1);
        });
    });
});
