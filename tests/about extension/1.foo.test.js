import abo from '../../index';
import {expect} from "@jest/globals";

const foo = abo();

foo.wear('foo');

test('foo.closet', () => {
    expect(foo.closet).toEqual(['foo']);
});

export default foo.grow;
