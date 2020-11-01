import abo from '../index';
import {expect} from "@jest/globals";

let f1, f2;

test('f1.use(object) 调用后拿到的属性', () => {
    let obj = {
        popCloset() {
            this.closet.pop();
        },
        pushCloset(el) {
            this.closet.push(el);
        }
    };
    f1 = abo();

    f1.use(obj);

    f1.use({
        joinCloset(s) {
            return this.closet.join(s);
        }
    });

    f1.use({
        __proto__: {key: 'Will not be used'}
    });

    expect(f1.popCloset).toBeDefined();
    expect(f1.closet).toEqual([]);

    f1.pushCloset(1);
    f1.pushCloset(2);
    f1.pushCloset({x: 3});
    expect(f1.closet).toEqual([1, 2, {x: 3}]);

    f1.popCloset();
    f1.popCloset();
    f1.popCloset();
    expect(f1.closet).toEqual([]);
});

test('从外界注入的属性及方法，不仅可以被 f1 继承，也可以被 f1 传给新生的对象 f2', () => {
    f2 = f1.grow();
    f2.pushCloset('f2-1');
    f2.pushCloset('f2-2');
    expect(f2.closet).toEqual(['f2-1', 'f2-2']);
    expect(f2.joinCloset(',')).toBe('f2-1,f2-2');
});
