import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { query } from '../../src/index.ts';

Deno.test('query - Returns empty string if there are no params', () => {
  const expected = '';
  const actual = query({});
  assertEquals(actual, expected);
});

Deno.test('query - Returns single key-value pair if one param is passed', () => {
  const expected = 'key=value';
  const actual = query({ key: 'value' });
  assertEquals(actual, expected);
});

Deno.test('query - Can handle multiple params', () => {
  const expected = 'p1=v1&p2=v2&p3=v3';
  const actual = query({ p1: 'v1', p2: 'v2', p3: 'v3' });
  assertEquals(actual, expected);
});

Deno.test('query - Escapes the value', () => {
  const expected = 'key=a+%22special%22+value';
  const actual = query({ key: 'a "special" value' });
  assertEquals(actual, expected);
});

Deno.test('query - Escapes the key', () => {
  const expected = 'a+%22special%22+key=value';
  const actual = query({ 'a "special" key': 'value' });
  assertEquals(actual, expected);
});
