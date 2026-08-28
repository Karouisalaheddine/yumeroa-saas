export interface Recipe {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'Breakfast' | 'Dinners' | 'Desserts' | 'Vegan' | 'Quick & Easy' | 'All Recipes';
  status: 'PUBLISHED';
  createdAt: Date;
}

export const REAL_20_RECIPES: Recipe[] = [
  {
    id: 'rec-01',
    title: 'Creamy Garlic Butter Tuscan Salmon',
    slug: 'creamy-garlic-butter-tuscan-salmon',
    excerpt: 'Pan-seared salmon fillets bathed in a rich garlic butter cream sauce with sun-dried tomatoes and fresh baby spinach.',
    coverImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-25T10:00:00Z'),
    content: `
      <h2>Why You'll Love This Tuscan Salmon</h2>
      <p>This restaurant-quality Tuscan Salmon recipe features crispy, golden pan-seared salmon nestled in a velvety garlic parmesan cream sauce. Bursting with flavor from sun-dried tomatoes, fresh spinach, and aromatic herbs, it comes together in under 30 minutes for the ultimate weeknight dinner.</p>
      <h2>Ingredients Required</h2>
      <ul>
        <li><strong>Salmon:</strong> 4 fresh center-cut salmon fillets (skin-on or off)</li>
        <li><strong>Butter & Olive Oil:</strong> 2 tbsp unsalted butter + 1 tbsp extra virgin olive oil</li>
        <li><strong>Garlic:</strong> 5 cloves minced fresh garlic</li>
        <li><strong>Sun-Dried Tomatoes:</strong> 1/2 cup drained and chopped sun-dried tomatoes in oil</li>
        <li><strong>Heavy Cream:</strong> 1 cup heavy whipping cream or full-fat coconut cream</li>
        <li><strong>Spinach:</strong> 3 cups fresh baby spinach leaves</li>
        <li><strong>Parmesan:</strong> 1/2 cup freshly grated Parmesan cheese</li>
      </ul>
      <h2>Step-by-Step Cooking Instructions</h2>
      <h3>Step 1: Sear the Salmon</h3>
      <p>Pat salmon dry. Season with salt and pepper. Heat olive oil in skillet and sear salmon 4-5 mins per side until golden. Set aside.</p>
      <h3>Step 2: Build Garlic Cream Sauce</h3>
      <p>Melt butter, sauté minced garlic and sun-dried tomatoes for 2 mins. Pour in heavy cream and simmer.</p>
      <h3>Step 3: Combine & Serve</h3>
      <p>Stir in fresh spinach and Parmesan until wilted. Return salmon to pan, coat in sauce, and serve warm!</p>
    `
  },
  {
    id: 'rec-02',
    title: 'Fluffy Japanese Soufflé Pancakes',
    slug: 'fluffy-japanese-souffle-pancakes',
    excerpt: 'Ultra-tall, airy, melt-in-your-mouth soufflé pancakes served with whipped butter, fresh berries, and maple syrup.',
    coverImage: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-24T09:00:00Z'),
    content: `
      <h2>The Secret to Sky-High Fluffy Pancakes</h2>
      <p>These viral Japanese soufflé pancakes are cloud-like, pillowy, and insanely delicious. The key is beating egg whites into a stiff meringue and gently folding them into the batter.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>2 large eggs (separated into whites and yolks)</li>
        <li>1.5 tbsp whole milk + 1/2 tsp vanilla extract</li>
        <li>3 tbsp cake flour + 1/2 tsp baking powder</li>
        <li>2 tbsp granulated sugar + 1 tbsp water for steaming</li>
      </ul>
      <h2>Instructions</h2>
      <p>Whisk yolks with milk and flour. Beat egg whites with sugar into stiff meringue. Fold meringue into yolk paste. Cook mounds in non-stick pan with 1 tbsp water covered for 5 mins per side.</p>
    `
  },
  {
    id: 'rec-03',
    title: 'Classic Avocado Toast with Poached Egg',
    slug: 'classic-avocado-toast-poached-egg',
    excerpt: 'Artisanal sourdough topped with smashed ripe avocado, chili flakes, microgreens, and a perfectly runny poached egg.',
    coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-23T08:30:00Z'),
    content: `
      <h2>The Ultimate Breakfast Ritual</h2>
      <p>Crisp toasted sourdough piled high with creamy lemon avocado and a warm runny poached egg. Ready in 10 minutes!</p>
      <h2>Ingredients</h2>
      <ul>
        <li>2 thick slices thick-cut sourdough bread</li>
        <li>1 large ripe Hass avocado + 1 tbsp lemon juice</li>
        <li>2 fresh farm eggs + red pepper flakes</li>
      </ul>
      <h2>Instructions</h2>
      <p>Toast sourdough. Mash avocado with lemon juice and sea salt. Poach egg in simmering water for 3 minutes. Layer avocado and poached egg on toast, season with chili flakes.</p>
    `
  },
  {
    id: 'rec-04',
    title: 'Authentic Italian Margherita Pizza',
    slug: 'authentic-italian-margherita-pizza',
    excerpt: 'Crispy Neapolitan pizza crust topped with San Marzano tomato sauce, fresh mozzarella di bufala, and aromatic basil leaves.',
    coverImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-22T19:00:00Z'),
    content: `
      <h2>Simplicity at Its Finest</h2>
      <p>The iconic Pizza Margherita celebrates red San Marzano tomatoes, white mozzarella di bufala, and fresh green basil.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 ball Neapolitan pizza dough</li>
        <li>1/2 cup crushed San Marzano tomatoes</li>
        <li>120g fresh mozzarella di bufala</li>
        <li>Fresh basil leaves & olive oil</li>
      </ul>
      <h2>Instructions</h2>
      <p>Stretch dough, spread tomato sauce, torn mozzarella, and olive oil. Bake at 500°F for 8 minutes. Top with fresh basil right out of oven.</p>
    `
  },
  {
    id: 'rec-05',
    title: 'Decadent Molten Chocolate Lava Cakes',
    slug: 'decadent-molten-chocolate-lava-cakes',
    excerpt: 'Rich individual dark chocolate cakes with a warm, gooey liquid chocolate center served with vanilla bean ice cream.',
    coverImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop',
    category: 'Desserts',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-21T21:00:00Z'),
    content: `
      <h2>The Wow-Factor Dessert</h2>
      <p>Break into a tender dark chocolate cake shell to reveal a glowing river of molten chocolate ganache.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>4 oz 70% dark bittersweet chocolate</li>
        <li>1/2 cup unsalted butter</li>
        <li>2 eggs + 2 egg yolks + 1/4 cup sugar</li>
        <li>2 tbsp flour</li>
      </ul>
      <h2>Instructions</h2>
      <p>Melt chocolate and butter. Whisk eggs and sugar until pale. Fold chocolate into eggs with flour. Bake in buttered ramekins at 425°F for 12 minutes.</p>
    `
  },
  {
    id: 'rec-06',
    title: 'Creamy Thai Green Vegan Curry',
    slug: 'creamy-thai-green-vegan-curry',
    excerpt: 'A vibrant plant-based green curry infused with lemongrass, coconut milk, crisp snow peas, baby corn, and fried tofu cubes.',
    coverImage: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-20T18:00:00Z'),
    content: `
      <h2>A Bowl of Pure Comfort</h2>
      <p>Aromatic Thai green curry paste simmered in rich coconut milk with pan-fried tofu, baby corn, snow peas, and Thai basil.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 block extra-firm tofu (cubed and pan-fried)</li>
        <li>3 tbsp Thai green curry paste</li>
        <li>1 can full-fat coconut milk + 1 cup veg broth</li>
        <li>Baby corn, snow peas, bell pepper, and Thai basil</li>
      </ul>
      <h2>Instructions</h2>
      <p>Sauté green curry paste in coconut milk. Add broth, crisp vegetables, and tofu; simmer 8 mins. Finish with Thai basil and serve over jasmine rice.</p>
    `
  },
  {
    id: 'rec-07',
    title: '15-Minute Garlic Butter Shrimp Pasta',
    slug: '15-minute-garlic-butter-shrimp-pasta',
    excerpt: 'Succulent juicy shrimp tossed with linguine pasta in a lemony garlic butter sauce with fresh parsley.',
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
    category: 'Quick & Easy',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-19T19:30:00Z'),
    content: `
      <h2>Fast, Elegant, and Foolproof</h2>
      <p>Juicy jumbo shrimp seared in garlic butter and tossed with tender linguine, lemon zest, and white wine.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 lb large shrimp (peeled & deveined)</li>
        <li>8 oz linguine pasta</li>
        <li>4 tbsp butter + 6 cloves garlic (minced)</li>
        <li>1/4 cup white wine + fresh lemon juice</li>
      </ul>
      <h2>Instructions</h2>
      <p>Cook linguine al dente. Sear shrimp 2 mins per side in butter. Deglaze pan with white wine and lemon juice. Toss pasta into garlic butter sauce and garnish with parsley.</p>
    `
  },
  {
    id: 'rec-08',
    title: 'Crispy Honey Garlic Chicken Wings',
    slug: 'crispy-honey-garlic-chicken-wings',
    excerpt: 'Oven-baked extra crispy chicken wings coated in a sticky, sweet, and glossy honey garlic glaze.',
    coverImage: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1200&auto=format&fit=crop',
    category: 'Quick & Easy',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-18T17:00:00Z'),
    content: `
      <h2>Game Day Favorite</h2>
      <p>Baking powder creates an ultra-crispy oven baked wing skin without deep frying. Tossed in sticky honey soy garlic sauce.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>2 lbs chicken wingettes</li>
        <li>1 tbsp baking powder + 1 tsp salt</li>
        <li>1/3 cup honey + 1/4 cup soy sauce + minced garlic</li>
      </ul>
      <h2>Instructions</h2>
      <p>Coat wings with baking powder and bake at 400°F for 45 minutes on wire rack. Simmer honey garlic glaze and toss baked wings until shiny.</p>
    `
  },
  {
    id: 'rec-09',
    title: 'Classic French Berry Tart',
    slug: 'classic-french-berry-tart',
    excerpt: 'Buttery shortcrust pastry shell filled with silky vanilla pastry cream and topped with vibrant fresh berries.',
    coverImage: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop',
    category: 'Desserts',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-17T15:00:00Z'),
    content: `
      <h2>Patisserie Perfection</h2>
      <p>Crisp sweet butter pastry crust filled with real vanilla bean pastry cream and arranged with strawberries, blueberries, and raspberries.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 blind-baked tart crust</li>
        <li>2 cups milk + 1 vanilla bean + 4 egg yolks</li>
        <li>2 cups fresh mixed berries + apricot glaze</li>
      </ul>
      <h2>Instructions</h2>
      <p>Cook vanilla pastry cream until thick and chill completely. Spread inside baked tart shell, top with fresh berries, and brush with warm apricot glaze.</p>
    `
  },
  {
    id: 'rec-10',
    title: 'Loaded Veggie Quinoa Buddha Bowl',
    slug: 'loaded-veggie-quinoa-buddha-bowl',
    excerpt: 'Nourishing bowl filled with fluffy quinoa, roasted sweet potatoes, chickpea croutons, avocado, and creamy tahini dressing.',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-16T12:00:00Z'),
    content: `
      <h2>Healthy & Energizing Meal Prep</h2>
      <p>Fluffy quinoa, crisp roasted chickpeas, sweet potato cubes, avocado, and shredded red cabbage served with lemon tahini dressing.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 cup cooked quinoa</li>
        <li>1 roasted sweet potato + 1 can roasted chickpeas</li>
        <li>Avocado, cabbage, baby kale</li>
        <li>Dressing: Tahini, lemon juice, maple syrup</li>
      </ul>
      <h2>Instructions</h2>
      <p>Assemble quinoa base in bowls, layer sweet potato, chickpeas, and fresh greens. Drizzle generously with creamy tahini dressing.</p>
    `
  },
  {
    id: 'rec-11',
    title: 'Classic French Beef Bourguignon',
    slug: 'classic-french-beef-bourguignon',
    excerpt: 'Tender melt-in-your-mouth beef braised in red wine broth with bacon lardons, pearl onions, and sautéed mushrooms.',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-15T19:00:00Z'),
    content: `
      <h2>Julia Child’s Beloved Icon</h2>
      <p>Slow-braised beef chuck roast in Pinot Noir wine with aromatics, bacon lardons, pearl onions, and cremini mushrooms.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>3 lbs beef chuck roast (cubed)</li>
        <li>6 oz thick bacon + 1 bottle Burgundy red wine</li>
        <li>2 cups beef stock + pearl onions + mushrooms</li>
      </ul>
      <h2>Instructions</h2>
      <p>Sear beef in bacon fat. Add red wine, beef stock, herbs, and braise in oven at 325°F for 3 hours. Stir in sautéed pearl onions and mushrooms.</p>
    `
  },
  {
    id: 'rec-12',
    title: 'Berry Acai Smoothie Bowl',
    slug: 'berry-acai-smoothie-bowl',
    excerpt: 'Thick antioxidant-packed frozen acai blend topped with chia seeds, coconut flakes, banana slices, and almond butter.',
    coverImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-14T08:00:00Z'),
    content: `
      <h2>Tropical Morning Boost</h2>
      <p>Thick blended frozen acai, berries, and banana served in a bowl with granola, chia seeds, coconut, and nut butter.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 acai packet + 1 cup frozen berries + 1 frozen banana</li>
        <li>Granola, chia seeds, coconut flakes, almond butter</li>
      </ul>
      <h2>Instructions</h2>
      <p>Blend frozen fruits with minimal liquid until thick. Scoop into chilled bowl and arrange rows of toppings.</p>
    `
  },
  {
    id: 'rec-13',
    title: 'Creamy New York Cheesecake with Raspberry Sauce',
    slug: 'creamy-new-york-cheesecake-raspberry',
    excerpt: 'Dense, rich, ultra-creamy baked cheesecake on a Graham cracker crust drizzled with tart raspberry coulis.',
    coverImage: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop',
    category: 'Desserts',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-13T20:00:00Z'),
    content: `
      <h2>The Standard of Great Cheesecake</h2>
      <p>Classic baked cheesecake with real vanilla and sour cream on a Graham crust served with fresh raspberry sauce.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>32 oz cream cheese + 1 cup sugar + 4 eggs</li>
        <li>Graham cracker crust + sour cream + vanilla</li>
        <li>Raspberry sauce: Raspberries, sugar, lemon juice</li>
      </ul>
      <h2>Instructions</h2>
      <p>Beat cream cheese and sugar. Add eggs and sour cream. Bake in water bath at 325°F for 65 mins. Chill overnight and top with raspberry sauce.</p>
    `
  },
  {
    id: 'rec-14',
    title: 'Authentic Creamy Carbonara',
    slug: 'authentic-creamy-carbonara',
    excerpt: 'Traditional Roman pasta made with guanciale, fresh egg yolks, Pecorino Romano cheese, and cracked black pepper.',
    coverImage: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1200&auto=format&fit=crop',
    category: 'Quick & Easy',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-12T19:30:00Z'),
    content: `
      <h2>No Cream Required!</h2>
      <p>Authentic Roman carbonara creates its silky sauce solely from egg yolks, Pecorino Romano, rendered guanciale, and starchy pasta water.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>12 oz spaghetti</li>
        <li>5 oz guanciale or pancetta</li>
        <li>4 egg yolks + 1 cup Pecorino Romano cheese</li>
      </ul>
      <h2>Instructions</h2>
      <p>Crisp guanciale. Whisk eggs and Pecorino. Toss cooked pasta into guanciale fat off heat, pour egg mixture while stirring with pasta water.</p>
    `
  },
  {
    id: 'rec-15',
    title: 'Smokey Lentil Shepherd’s Pie',
    slug: 'smokey-lentil-shepherds-pie',
    excerpt: 'Hearty brown lentils and root vegetables cooked in savory herb gravy topped with fluffy garlic mashed potatoes.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-11T18:30:00Z'),
    content: `
      <h2>Plant-Based Comfort Food</h2>
      <p>Savory brown lentils simmered with carrots, peas, and herbs under a golden browned garlic mashed potato crust.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1.5 cups cooked lentils + carrots, peas, onion</li>
        <li>Tomato paste + veg broth + herbs</li>
        <li>3 cups garlic mashed potatoes</li>
      </ul>
      <h2>Instructions</h2>
      <p>Sauté aromatics and lentils in broth. Transfer to baking dish, top with mashed potatoes, and bake at 400°F for 25 mins until golden.</p>
    `
  },
  {
    id: 'rec-16',
    title: 'Matcha Green Tea Latte Pancakes',
    slug: 'matcha-green-tea-latte-pancakes',
    excerpt: 'Vibrant green pancakes infused with Japanese ceremonial grade matcha served with white chocolate drizzle.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-10T09:00:00Z'),
    content: `
      <h2>Antioxidant Morning Delight</h2>
      <p>Fluffy buttermilk pancakes infused with ceremonial matcha green tea powder and drizzled with melted white chocolate.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1.5 cups flour + 2 tbsp ceremonial matcha</li>
        <li>1.25 cups buttermilk + 1 egg + melted butter</li>
        <li>White chocolate & strawberries</li>
      </ul>
      <h2>Instructions</h2>
      <p>Whisk dry ingredients with matcha powder. Stir in buttermilk and egg. Cook on medium griddle and stack high with melted white chocolate!</p>
    `
  },
  {
    id: 'rec-17',
    title: 'Slow-Cooked Mexican Birria Tacos',
    slug: 'slow-cooked-mexican-birria-tacos',
    excerpt: 'Crispy corn tortillas dipped in chili broth, filled with braised shredded beef and melted Oaxaca cheese served with consommé.',
    coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-09T18:00:00Z'),
    content: `
      <h2>The Ultimate Dip-and-Eat Tacos</h2>
      <p>Tender shredded beef braised in guajillo chili sauce stuffed into chili-dipped tortillas with melted cheese and served with hot consommé.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>3 lbs beef chuck roast + guajillo & ancho chiles</li>
        <li>Corn tortillas + Oaxaca cheese + white onion & cilantro</li>
      </ul>
      <h2>Instructions</h2>
      <p>Braise beef in chili broth 3.5 hours. Dip tortillas in red chili oil, crisp on griddle with cheese and beef, fold and serve with hot consommé broth!</p>
    `
  },
  {
    id: 'rec-18',
    title: 'Homemade Cinnamon Rolls with Cream Cheese Frosting',
    slug: 'homemade-cinnamon-rolls-cream-cheese',
    excerpt: 'Soft, pillowy brioche dough swirled with buttery brown sugar cinnamon and smothered in tangy cream cheese glaze.',
    coverImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-08T08:30:00Z'),
    content: `
      <h2>Better Than Cinnabon</h2>
      <p>Soft golden brioche rolls packed with brown sugar cinnamon and slathered with rich cream cheese frosting.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>Brioche yeast dough + brown sugar cinnamon filling</li>
        <li>Tangy cream cheese frosting</li>
      </ul>
      <h2>Instructions</h2>
      <p>Roll out dough, spread cinnamon butter, roll and slice into 12 buns. Bake at 350°F for 25 mins and frost while warm!</p>
    `
  },
  {
    id: 'rec-19',
    title: 'Crispy Air Fryer Sesame Tofu',
    slug: 'crispy-air-fryer-sesame-tofu',
    excerpt: 'Extra crunchy air-fried tofu cubes coated in a savory sweet sesame garlic sauce served with steamed broccoli.',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-07T17:30:00Z'),
    content: `
      <h2>Better Than Takeout</h2>
      <p>Super crisp cornstarch-coated air fryer tofu tossed in sweet soy sesame garlic glaze.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 block pressed tofu + 1.5 tbsp cornstarch</li>
        <li>Soy sesame garlic glaze + toasted sesame seeds</li>
      </ul>
      <h2>Instructions</h2>
      <p>Air fry tofu cubes at 400°F for 15 mins. Toss in thick soy garlic glaze and serve over rice with green onions.</p>
    `
  },
  {
    id: 'rec-20',
    title: 'Classic French Onion Soup',
    slug: 'classic-french-onion-soup',
    excerpt: 'Rich caramelized onion soup topped with toasted baguette slices and melted Gruyère cheese.',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    status: 'PUBLISHED',
    createdAt: new Date('2026-08-06T19:00:00Z'),
    content: `
      <h2>Deep Flavor from Patience</h2>
      <p>Caramelized yellow onions simmered in white wine and rich beef broth, topped with toasted baguette and melted Gruyère.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>3 lbs yellow onions + 1/2 cup white wine</li>
        <li>6 cups beef broth + baguette + Gruyère cheese</li>
      </ul>
      <h2>Instructions</h2>
      <p>Caramelize onions for 45 mins. Add wine and broth; simmer 20 mins. Ladle into bowls, top with baguette slice and Gruyère, and broil until bubbly.</p>
    `
  }
];
