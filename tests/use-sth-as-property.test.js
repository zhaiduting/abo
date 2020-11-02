import abo from '../index';
import {expect} from "@jest/globals";

let f1, f2;

test('array as closet', () => {
    f1 = abo();
    f1.wear(1, 2, 3);
    f1.wear('four');
    f1.use([666, 777]);
    expect(f1.closet).toEqual([1, 2, 3, 'four', 666, 777]);

    f1.use([888], true);
    expect(f1.closet).toEqual([888]);
});

test('array as the specified property', () => {
    f2 = f1.grow();
    expect(f2.pets).toBeUndefined();

    f2.use(['dog', 'cat'], false, 'pets');
    expect(f2.pets).toEqual(['dog', 'cat']);

    //使用对象扩展 pets，可以省略参数2和参数3
    f2.use({pets: {4: 'duck'}});                //将对象的属性加入 pets 数组
    f2.use({pets: ['goose']});                  //将数组的元素追加到 pets 数组
    expect(f2.pets[4]).toBe('duck');
    expect(f2.pets[5]).toBe('goose');
    expect(f2.pets).toEqual(['dog', 'cat', undefined, undefined, 'duck', 'goose']);

    //使用数组扩展 pets，需要指定参数2为 false 并指定参数3为 'pets'
    f2.use(['xxx'], false, 'pets');
    expect(f2.pets).toEqual(['dog', 'cat', undefined, undefined, 'duck', 'goose', 'xxx']);

    //如果参数2为 true 不会扩展
    f2.use([888], true, 'pets');
    expect(f2.pets).toEqual([888]);
    f2.use({}, true, 'pets');
    expect(f2.pets).toEqual({});
});
