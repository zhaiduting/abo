import abo from '../index';
import {expect} from "@jest/globals";

let f1, f2;

f1 = abo();
f1.wear(11);
f1.wear(12);
f1.use(['1x', '1y']);
f1.join = function () {
    return this.closet.join('-');
};
f1.log = function () {
    console.log(this.closet);
};

f2 = f1.grow();
f2.use(['2x', '2y']);
f2.wear(21);
f2.wear(22);
f2.join = function () {                     //覆写 join()
    let str = this.super.join.call(this);   //调用父类 join()
    return 'f2.closet: ' + str;
};

test('super', () => {
    expect(f1.join()).toBe('11-12-1x-1y');
    expect(f2.join()).toBe('f2.closet: 11-12-1x-1y-2x-2y-21-22');
    // f2.log();                               //使用继承的 log()
});
