import { referenceAssets as assets } from './reference-assets';

export const categories = [
  { name: 'Free / DIY', slug: 'free', image: assets['free'] },
  { name: 'For Him', slug: 'forhim', image: assets['for-him'] },
  { name: 'Coworker', slug: 'coworker', image: assets['coworker-gifts'] },
  { name: 'Young Adult', slug: 'youngadult', image: assets['young-adult'] },
  { name: 'All', slug: 'all', image: assets['all'] },
  { name: 'Popular', slug: 'popular', image: assets['popular'] },
  { name: 'Affordable', slug: 'affordable', image: assets['affordable'] },
  { name: 'Kids', slug: 'kids', image: assets['kids'] },
  { name: 'NSFW', slug: 'nsfw', image: assets['nsfw'] },
  { name: 'For Her', slug: 'forher', image: assets['for-her'] },
  { name: 'Unique', slug: 'unique', image: assets['unique'] },
  { name: 'Newest', slug: 'new', image: assets['newest'] },
  { name: 'Elderly', slug: 'elderly', image: assets['elderly'] },
];

export const occasions = ['Christmas','Birthday',"Valentine’s Day",'Father’s Day','Mother’s Day','Retirement','Wedding','Graduation','Anniversary','Housewarming'];
export const personalities = ['Romantic','Handy','Relaxing','Aesthetic','Geeky / Nerdy','Fun','Funny','Sentimental','Social','Active / Sports','Practical','Spiritual'];
export const interests = ['Fishing','Music','Sweets','Artistic','Fashion','Hunting','Pets','Culinary','Pranks'];
export const relationships = ['Mother In Law','Aunt','Grandpa','Niece','Friend','Family','Coworker'];

export const gifts = [
  {name:'Donate To A Charity On Their Behalf',price:0,image:assets['donate'],url:'https://www.charitynavigator.org/'},
  {name:'Heated Vibration Massage Seat',price:52.99,image:assets['massage-seat'],url:'https://www.amazon.com/dp/B0798LJDV3/'},
  {name:'Tactical Multitool Wallet',price:89,image:assets['wallet'],url:'https://www.amazon.com/dp/B01N9QSXMT/'},
  {name:'Chocolate Covered Strawberries Assortment',price:44.53,image:assets['strawberries'],url:'https://www.amazon.com/dp/B004MPA8P6/'},
  {name:'Heated Pillow Massager',price:69.95,image:assets['massager'],url:'https://www.amazon.com/dp/B00BOYA2M2/'},
  {name:'Couples Love Note Jar',price:44.95,image:assets['love-notes'],url:'https://www.amazon.com/dp/B017WKH5EE/'},
  {name:'Build a Shared Memory Keepsakes Box',price:0,image:assets['memory-box'],url:'https://atozenlife.com/make-diy-memory-box/'},
  {name:'Create a Scavenger Hunt',price:0,image:assets['scavenger'],url:'https://www.scavenger-hunt-fun.com/create-a-scavenger-hunt.html'},
];
