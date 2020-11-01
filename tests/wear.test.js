import abo from '../index.js';
import {expect} from "@jest/globals";

let f1, f2, f3;

test('f1.closet', () => {
    f1 = abo();
    f1.wear('f1-1', 'f1-2');

    f2 = f1.grow();
    f2.wear('f2-1');
    f2.wear('f2-2');

    f3 = f2.grow();
    f3.wear('f3-3');

    expect(f1.closet).toEqual(['f1-1', 'f1-2']);
    expect(f2.closet).toEqual(['f1-1', 'f1-2', 'f2-1', 'f2-2']);
    expect(f3.closet).toEqual(['f1-1', 'f1-2', 'f2-1', 'f2-2', 'f3-3']);

});

// console.log(
//     JSON.stringify([f1.closet, f2.closet, f3.closet], null, 2)
// );
