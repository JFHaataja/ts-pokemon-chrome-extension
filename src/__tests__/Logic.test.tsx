import { describe, it, expect, vi } from 'vitest';
import { getPokemonWeaknesses } from '../lib/logic';
import * as api from '../lib/api';

describe('getPokemonWeaknesses', () => {
  it('returns correct weaknesses for single type', async () => {
    vi.spyOn(api, 'fetchTypeData').mockResolvedValue({
      damage_relations: {
        double_damage_from: [{ name: 'water' }, { name: 'electric' }],
      },
    });

    const result = await getPokemonWeaknesses(['flying']);
    expect(result).toEqual(expect.arrayContaining(['water', 'electric']));
  });

  it('returns unique weaknesses when types overlap', async () => {
    vi.spyOn(api, 'fetchTypeData')
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: 'ice' }, { name: 'rock' }],
        },
      })
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: 'rock' }, { name: 'fire' }],
        },
      });

    const result = await getPokemonWeaknesses(['flying', 'grass']);
    expect(result).toEqual(expect.arrayContaining(['ice', 'rock', 'fire']));
    expect(result.length).toBe(3); // rock does not duplicate
  });

  it('throws or handles error if fetch fails', async () => {
    vi.spyOn(api, 'fetchTypeData').mockRejectedValue(new Error('API failure'));

    await expect(getPokemonWeaknesses(['ghost'])).rejects.toThrow('API failure');
  });
});
