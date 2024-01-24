import { Item, GildedRose } from '@/gilded-rose';
import exp from 'constants';

/**
 * Unit tests to cover Guilded Rose requirements.
**/

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo'); // Changed expected text to match the actual text.
  });

  it('should decrease quality & sellIn by 1 for normal items', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(9);
  });

  it('should increase quality for Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
  });

  it('should decrease quality twice as fast after sellIn date is 0', () => {
    const gildedRose = new GildedRose([new Item('Item', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(8);
  });

  it('should increase quality for Backstage passes while sellIn is positive', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
    const items = gildedRose.updateQuality();
    // SellIn decrease by 1, quality increase by 1
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(11);

    gildedRose.updateQuality();
    // SellIn < 10 days, quality increase by 2
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(13);

    // Decrease sellIn to 5
    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality();
    }
    // SellIn 5 days, quality increase by 3
    expect(gildedRose.items[0].sellIn).toBe(4);
    expect(gildedRose.items[0].quality).toBe(24);

    // Quality drops to 0 after the concert
    for (let i = 4; i > -1; i--) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('should decrease quality by 2 for Conjured items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Item', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(8);
  });

  it('should decrease quality by 4 for Conjured items with sellIn < 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Item', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(6);
  });

  it('should enure the quality of an item is never negative', () => {
    const gildedRose = new GildedRose([new Item('Item', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(0);
  });

  it('should enure the quality of an item is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  it('should enure the quality & sellIn of Sulfuras never changes', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 100, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(100);
    expect(items[0].quality).toBe(80);
  });
});
