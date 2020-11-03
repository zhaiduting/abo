import foo from './1.foo.test'
import {expect} from "@jest/globals";

/*
  使用构造函数 foo 需注意，无需使用 new 运输即可得到对象
  如果执意调用 new 运算，得到的结果也是一样的
  When using the constructor foo(), no need to use `new foo()`,
  If insist on `new foo()`, will get the same result.
 */
test('构造函数无需使用 new 运算', () => {
    const bar1 = foo();
    const bar2 = new foo();

    expect(bar1.closet).toEqual(bar2.closet);                   // closet 数组的地址不同
    expect(bar1.use).toBe(bar2.use);                            // ===
    expect(bar1.wear).toBe(bar2.wear);                          // ===
    expect(bar1.abo).toBe(bar2.abo);                            // ===
    expect(bar1.grow.toString()).toBe(bar2.grow.toString());    // grow 函数的地址也不同
});

const bar = foo();
bar.wear('bar');
test('在 bar.closet 中新增字符串 "bar"', ()=>{
    expect(bar.closet).toEqual(['foo', 'bar']);
});

export default bar.grow;
