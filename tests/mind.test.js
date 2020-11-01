import abo from "../index";

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
    expect(f2.closet).toEqual(['Who', 'am', 'I']);
    expect(f2()).toBe('mind: Who am I');
    f1.use([], true);                                   // Clear extended elements.
    f1.wear('I');
    f1.wear('am');
    f1.wear('Caesar!');
    expect(f1()).toBe('mind: I am Caesar!')
});


test('新生对象可以抛弃原有的 mind() 方法，并定制自己的 idea() 方法', () => {
    f3 = f1.grow(                                       // Note: cannot use the arrow function here
        function () {
            return 'idea: ' + this.closet.join('-');
        }
    );
    expect(f3.closet).toEqual(['I', 'am', 'Caesar!']);
    expect(f3()).toBe('idea: I-am-Caesar!');
});
