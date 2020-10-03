import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

import { subst } from '../../src/index.ts';

Deno.test('subst - Returns empty string if the template is empty and there are no params', () => {
  const expected = '';
  const actual = subst('', {});
  assertEquals(actual, expected);
});

Deno.test('subst - Returns empty string if the template is empty but a param is passed', () => {
  const expected = '';
  const actual = subst('', { p: 1 });
  assertEquals(actual, expected);
});

Deno.test('subst - Substitutes all params present in the object passed', () => {
  const expected = '/1/a/false';
  const actual = subst('/:p/:q/:r', { p: 1, q: 'a', r: false });
  assertEquals(actual, expected);
});

Deno.test('subst - Allows parameters at the beginning of the template', () => {
  const expected = '42';
  const actual = subst(':p', { p: 42 });
  assertEquals(actual, expected);
});

Deno.test('subst - Renders boolean (true) params', () => {
  const expected = 'true';
  const actual = subst(':p', { p: true });
  assertEquals(actual, expected);
});

Deno.test('subst - Renders boolean (false) params', () => {
  const expected = 'false';
  const actual = subst(':p', { p: false });
  assertEquals(actual, expected);
});

Deno.test('subst - Renders string params', () => {
  const expected = 'test';
  const actual = subst(':p', { p: 'test' });
  assertEquals(actual, expected);
});

Deno.test('subst - Renders number params', () => {
  const expected = '234';
  const actual = subst(':p', { p: 234 });
  assertEquals(actual, expected);
});

Deno.test('subst - Throws if a param is an array', () => {
  assertThrows(() => subst(':p', { p: [] }), TypeError, "Path parameter p cannot be of type object. Allowed types are: boolean, string, number.")
});

Deno.test('subst - Throws if a param is an object', () => {
  assertThrows(() => subst(':p', { p: {} }), TypeError, "Path parameter p cannot be of type object. Allowed types are: boolean, string, number.")
});

Deno.test('subst - Throws if a param is a symbol', () => {
  assertThrows(() => subst(':p', { p: Symbol() }), TypeError, "Path parameter p cannot be of type symbol. Allowed types are: boolean, string, number.")
});

Deno.test('subst - Throws if a param is missing', () => {
  assertThrows(() => subst(':p', {}))
});
