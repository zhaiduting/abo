import foo from './1.foo.test';
import bar from './2.bar.test';
import {expect} from "@jest/globals";

const baz_by_foo = foo();
const baz_by_bar = bar();

test('baz1.closet and baz2.cloet', ()=>{
    expect(baz_by_foo.closet).toEqual(['foo']);         //字符串 foo 是文件 1.foo.test.js 中设置的
    expect(baz_by_bar.closet).toEqual(['foo', 'bar']);  //字符串 bar 是文件 2.bar.test.js 中新增加的
});
