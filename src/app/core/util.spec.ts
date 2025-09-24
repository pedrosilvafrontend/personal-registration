import { Util } from './util';

describe('Util', () => {
  it('should compare objects by id and return true when ids match', () => {
    const option = { id: 1, name: 'a' };
    const value = { id: 1, name: 'b' };
    expect(Util.objectCompare(option, value)).toBe(true);
  });

  it('should return false when ids do not match', () => {
    const option = { id: 1 };
    const value = { id: 2 };
    expect(Util.objectCompare(option, value)).toBe(false);
  });

  it('should return falsey when option has no id', () => {
    const option = { code: 1 } as any;
    const value = { id: 1 };
    expect(Util.objectCompare(option, value)).toBeFalsy();
  });

  it('should return falsey when value is null/undefined', () => {
    const option = { id: 1 };
    expect(Util.objectCompare(option, null as any)).toBeFalsy();
    expect(Util.objectCompare(option, undefined as any)).toBeFalsy();
  });
});
