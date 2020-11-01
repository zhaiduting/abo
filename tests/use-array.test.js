import abo from '../index';
import {expect} from "@jest/globals";

let f1, f2;

test('f1.use() 调用后 closet 值', () => {
    f1 = abo();
    f1.wear('f1-1', 'f1-2');
    f1.wear('f1-3');
    f1.use(['f1-a', 'f1-b']);
    f1.use([1, 2, 3]);
    expect(f1.closet).toEqual([
        'f1-1', 'f1-2', 'f1-3', 'f1-a', 'f1-b', 1, 2, 3
    ]);
});

test('f2 继承 f1 的 closet 值', () => {
    f2 = f1.grow();
    expect(f2.closet).toEqual([
        'f1-1', 'f1-2', 'f1-3', 'f1-a', 'f1-b', 1, 2, 3
    ]);
});

test('f2.use() 调用后 closet 值', () => {
    f2.use([{x: 1}, [56]]);
    f2.use([7, 8]);
    expect(f2.closet).toEqual([
        'f1-1', 'f1-2', 'f1-3', 'f1-a', 'f1-b', 1, 2, 3,
        {x: 1}, [56],
        7, 8
    ]);
});

test('测试 closet 的清空方法', () => {
    f2.use([]);
    expect(f2.closet).not.toEqual([]);
    f2.use([], true);
    expect(f2.closet).toEqual([]);
});
