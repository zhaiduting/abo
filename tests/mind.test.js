import abo from "../index";
import {expect} from "@jest/globals";

let f1, f2, f3;
let mind, idea;

test('mind() 注入并执行', () => {
    mind = function () {
        return 'mind: ' + this.closet.join(' ');
    };
    f1 = abo(mind);
    f1.wear('Who');
    f1.wear('am');
    f1.wear('I');
    expect(f1()).toBe('mind: Who am I')
});

test('mind() 注入后对新生对象一样有效', () => {
    f2 = f1.grow();
    expect(f2.closet).toEqual(['Who', 'am', 'I']);      // extended from f1
    expect(f2()).toBe('mind: Who am I');
    f1.use([], true);                                             // Clear extended elements.
    f1.wear('I');
    f1.wear('am');
    f1.wear('Caesar!');
    expect(f1()).toBe('mind: I am Caesar!')
});


test('新生对象可以抛弃原有的 mind() 方法，并定制自己的 idea() 方法', () => {
    f3 = f1.grow(                                                  // Note: cannot use the arrow function here
        function (head, tail) {
            return (head || 'idea: ') + this.closet.join('-') + (tail || '?');
        }
    );
    expect(f3.closet).toEqual(['I', 'am', 'Caesar!']);   // extended from f2
    expect(
        f3('What? ', '!')
    ).toBe('What? I-am-Caesar!!');
});
