import { faNormalizeIcon } from './line-awesome.core';

describe('faNormalizeIcon', () => {
  it('should throw an error for an invalid icon value', () => {
    expect(() => faNormalizeIcon(['las'] as any)).toThrow(
      new Error('Invalid icon: ["las"]')
    );
  });
});
