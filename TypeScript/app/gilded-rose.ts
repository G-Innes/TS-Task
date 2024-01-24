// This class represents an item in the inventory
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// This class represents the inventory
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // Method for updating quality and sellIn for items in the inventory.
  // It loops over each item in the array and calls the specificfunction for each item to update the quality.
  // After updating the quality it decreases the sellIn by 1 & returns the updated array of items.
  updateQuality() {
    this.items.forEach(item => {

      if (item.name === 'Aged Brie') {
        this.updateAgedBrie(item);
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackstagePass(item);
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        item.quality = 80; // Sulfuras quality is always 80
      } else if (item.name.startsWith('Conjured')) {
        this.updateConjuredItem(item);
      } else {
        this.updateNormalItem(item);
      }
      // Update all items' sellIn by 1, except for legendary items
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }
      // Ensure quality never exceeds 50 for all non-legendary items
      if (item.name !== 'Sulfuras, Hand of Ragnaros' && item.quality > 50) {
        item.quality = 50;
      }
      // Ensure quality is never negative
      if (item.quality < 0) {
        item.quality = 0;
      }
    });
    // Return updated items
    return this.items;
  }

  // Method for updating quality of normal items.
  updateNormalItem(item: Item) {
    if (item.quality > 0) {
      item.quality--;
    }
    // Decreases quality by 1 again if the sellIn date is less than 0.
    if (item.sellIn <= 0 && item.quality > 0) {
      item.quality--;
    }
  }

  // Method for updating quality of Brie- quality increases by 1 if the sellIn date > 0.
  updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  // Method for updating quality of Backstage passes.
  updateBackstagePass(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = 0; // Set quality to 0 if sellIn = 0.
    } else if (item.sellIn <= 5) {
      item.quality += 3; // Increase quality by 3 if sellIn <= 5.
    } else if (item.sellIn <= 10) {
      item.quality += 2; // Increase quality by 2 if sellIn <= 10.
    } else {
      item.quality += 1; // Otherwise, increase quality by 1.
    }
  }

  // Method for updating quality of Conjured items.
  updateConjuredItem(item: Item) {
    if (item.quality > 0) {
      item.quality -= 2; // Decrease quality by 2 if quality > 0.
    }
    if (item.sellIn <= 0 && item.quality > 0) {
      item.quality -= 2; // Decrease quality by 2 again if sellIn <= 0.
    }
  }
}