import { faNormalizeIcon, IconProp } from './line-awesome.core';

describe('faNormalizeIcon', () => {
  it('should throw an error for an invalid icon value', () => {
    expect(() => faNormalizeIcon(['las'] as unknown as IconProp)).toThrow(
      new Error('Invalid icon: ["las"]')
    );
  });
});
