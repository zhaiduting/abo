import abo from '../index';
import {expect} from "@jest/globals";

let f1, f2;

test('f1.use(object) 调用后拿到的属性', () => {
    let obj = {
        defaultInfo: {
            id: 1001,
            name: 'Jack',
        }
    };
    f1 = abo();

    f1.use(obj);
    f1.use({
        defaultInfo: {gender: 'male'}
    });

    expect(f1.defaultInfo).toEqual({
        id: 1001,
        name: 'Jack',
        gender: 'male'
    });

});

test('从外界注入的 defaultOptions 属性可以被 f1 传给新生的对象 f2', () => {
    f2 = f1.grow(f1);
    expect(f2.defaultInfo).toEqual({
        id: 1001,
        name: 'Jack',
        gender: 'male'
    });
});

test('使用 f2.use() 可以对 f2.defaultOptions 属性进行扩展', () => {
    f2.use({
        defaultInfo: {
            age: 100,
            email: 'zhaiduting@163.com',
            __proto__: {key: 'Will not be used'}
        }
    });
    expect(f2.defaultInfo).toEqual({
        id: 1001,
        name: 'Jack',
        gender: 'male',
        age: 100,
        email: 'zhaiduting@163.com'
    });
});
