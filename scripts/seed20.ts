import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { supabase } from '../lib/supabase';

const recipes = [
  {
    title: 'Creamy Garlic Butter Tuscan Salmon',
    slug: 'creamy-garlic-butter-tuscan-salmon',
    excerpt: 'Pan-seared salmon fillets bathed in a rich garlic butter cream sauce with sun-dried tomatoes and fresh baby spinach.',
    coverImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
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
        <li><strong>Seasonings:</strong> Salt, freshly cracked black pepper, and Italian seasoning</li>
      </ul>

      <h2>Step-by-Step Cooking Instructions</h2>
      <h3>Step 1: Sear the Salmon</h3>
      <p>Pat salmon fillets dry with paper towels. Season generously on both sides with salt, pepper, and Italian seasoning. Heat olive oil in a large skillet over medium-high heat. Add salmon fillets skin-side up and sear for 4–5 minutes until golden brown. Flip and cook for another 3 minutes. Remove salmon and set aside on a plate.</p>

      <h3>Step 2: Build the Garlic Cream Sauce</h3>
      <p>Melt butter in the same skillet over medium heat. Add minced garlic and sauté for 1 minute until fragrant. Add sun-dried tomatoes and cook for 2 minutes. Pour in heavy cream and bring to a gentle simmer, stirring continuously.</p>

      <h3>Step 3: Add Spinach & Cheese</h3>
      <p>Stir in fresh baby spinach and freshly grated Parmesan cheese. Allow spinach to wilt into the sauce for about 2 minutes as the cheese melts to create a creamy texture.</p>

      <h3>Step 4: Combine & Serve</h3>
      <p>Return seared salmon fillets back into the skillet, spooning the rich Tuscan garlic cream sauce over the top. Simmer for 1 minute until heated through. Garnish with fresh basil or parsley and serve hot over rice or pasta!</p>
    `
  },
  {
    title: 'Fluffy Japanese Soufflé Pancakes',
    slug: 'fluffy-japanese-souffle-pancakes',
    excerpt: 'Ultra-tall, airy, melt-in-your-mouth soufflé pancakes served with whipped butter, fresh berries, and maple syrup.',
    coverImage: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    content: `
      <h2>The Secret to Sky-High Fluffy Pancakes</h2>
      <p>These viral Japanese soufflé pancakes are cloud-like, pillowy, and insanely delicious. The key is beating egg whites into a stiff meringue and gently folding them into the batter before steaming them low and slow in a covered pan.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>2 large eggs (separated into whites and yolks)</li>
        <li>1.5 tbsp whole milk</li>
        <li>1/2 tsp pure vanilla extract</li>
        <li>3 tbsp cake flour (sifted)</li>
        <li>1/2 tsp baking powder</li>
        <li>2 tbsp granulated sugar</li>
        <li>1 tbsp water (for steaming)</li>
        <li>Fresh berries, whipped butter, and maple syrup for serving</li>
      </ul>

      <h2>Instructions</h2>
      <h3>Step 1: Prepare the Yolk Batter</h3>
      <p>In a medium bowl, whisk egg yolks, milk, and vanilla until smooth. Sift in cake flour and baking powder, whisking gently until combined into a thick paste.</p>
      <h3>Step 2: Whip the Meringue</h3>
      <p>In a clean, dry bowl, beat egg whites with an electric mixer until foamy. Gradually add granulated sugar one tablespoon at a time, whipping until glossy stiff peaks form.</p>
      <h3>Step 3: Fold & Cook</h3>
      <p>Gently fold one-third of the meringue into the yolk mixture, then fold in the remaining meringue. Preheat a non-stick pan on ultra-low heat. Scoop tall mounds of batter onto the pan, add 1 tbsp of water to the pan, cover with a lid, and steam for 5 minutes per side until light golden.</p>
    `
  },
  {
    title: 'Classic Avocado Toast with Poached Egg',
    slug: 'classic-avocado-toast-poached-egg',
    excerpt: 'Artisanal sourdough topped with smashed ripe avocado, chili flakes, microgreens, and a perfectly runny poached egg.',
    coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    content: `
      <h2>The Ultimate Breakfast Ritual</h2>
      <p>Nothing beats a slice of crisp toasted sourdough piled high with seasoned creamy avocado and a warm runny yolk. It takes only 10 minutes and delivers cafes-style luxury at home.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>2 thick slices thick-cut sourdough bread</li>
        <li>1 large ripe Hass avocado</li>
        <li>2 fresh farm eggs</li>
        <li>1 tbsp lemon juice</li>
        <li>Red pepper flakes, sea salt flakes, and fresh microgreens</li>
      </ul>

      <h2>Instructions</h2>
      <p>Toast sourdough until golden. Mash avocado with lemon juice, salt, and black pepper. Poach eggs in gently simmering water with a splash of vinegar for 3 minutes. Spread mashed avocado onto toast, top with poached egg, and sprinkle with red pepper flakes and microgreens.</p>
    `
  },
  {
    title: 'Authentic Italian Margherita Pizza',
    slug: 'authentic-italian-margherita-pizza',
    excerpt: 'Crispy Neapolitan pizza crust topped with San Marzano tomato sauce, fresh mozzarella di bufala, and aromatic basil leaves.',
    coverImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    content: `
      <h2>Simplicity at Its Finest</h2>
      <p>The iconic Pizza Margherita celebrates the colors of the Italian flag: red tomatoes, white mozzarella, and green basil. Made with fermented pizza dough baked at high heat for maximum blistered crust goodness.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>1 ball homemade or store-bought Neapolitan pizza dough</li>
        <li>1/2 cup crushed San Marzano tomatoes</li>
        <li>120g fresh mozzarella di bufala (torn into pieces)</li>
        <li>Fresh basil leaves</li>
        <li>Extra virgin olive oil and coarse sea salt</li>
      </ul>

      <h2>Instructions</h2>
      <p>Stretch dough into a 12-inch circle. Spread tomato sauce evenly leaving a 1-inch border. Top with mozzarella pieces and a drizzle of olive oil. Bake on a piping hot pizza steel or stone at 500°F (260°C) for 7-9 minutes until crust is charred. Top with fresh basil right after baking.</p>
    `
  },
  {
    title: 'Decadent Molten Chocolate Lava Cakes',
    slug: 'decadent-molten-chocolate-lava-cakes',
    excerpt: 'Rich individual dark chocolate cakes with a warm, gooey liquid chocolate center served with vanilla bean ice cream.',
    coverImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop',
    category: 'Desserts',
    content: `
      <h2>The Wow-Factor Dessert</h2>
      <p>Break into a tender baked chocolate cake shell to reveal a waterfall of melted dark chocolate ganache. Unbelievably easy to make ahead for dinner parties!</p>

      <h2>Ingredients</h2>
      <ul>
        <li>4 oz high-quality dark bittersweet chocolate (70%)</li>
        <li>1/2 cup unsalted butter</li>
        <li>2 large eggs + 2 egg yolks</li>
        <li>1/4 cup granulated sugar</li>
        <li>2 tbsp all-purpose flour</li>
        <li>Pinch of espresso powder and salt</li>
      </ul>

      <h2>Instructions</h2>
      <p>Melt chocolate and butter together until smooth. Whisk eggs, yolks, and sugar until thick. Fold melted chocolate and flour into eggs. Divide batter into greased ramekins and bake at 425°F for exactly 12 minutes. Invert onto plates and serve immediately with vanilla ice cream.</p>
    `
  },
  {
    title: 'Creamy Thai Green Vegan Curry',
    slug: 'creamy-thai-green-vegan-curry',
    excerpt: 'A vibrant plant-based green curry infused with lemongrass, coconut milk, crisp snow peas, baby corn, and fried tofu cubes.',
    coverImage: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    content: `
      <h2>A Bowl of Pure Comfort</h2>
      <p>Packed with vibrant vegetables and protein-rich tofu, this aromatic Thai green curry balances spicy, savory, sweet, and tangy flavors in a coconut milk broth.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>1 block extra-firm tofu (cubed and pan-fried)</li>
        <li>3 tbsp Thai green curry paste</li>
        <li>1 can (14oz) full-fat coconut milk</li>
        <li>1 cup vegetable broth</li>
        <li>1 cup snow peas, baby corn, and sliced bell peppers</li>
        <li>1 tbsp soy sauce + 1 tbsp coconut sugar</li>
        <li>Fresh Thai basil and lime wedges</li>
      </ul>

      <h2>Instructions</h2>
      <p>Sauté green curry paste in 2 tbsp coconut milk until fragrant. Pour in remaining coconut milk and vegetable broth. Add vegetables and fried tofu; simmer for 8 minutes until tender. Stir in soy sauce, coconut sugar, and Thai basil. Serve hot with jasmine rice!</p>
    `
  },
  {
    title: '15-Minute Garlic Butter Shrimp Pasta',
    slug: '15-minute-garlic-butter-shrimp-pasta',
    excerpt: 'Succulent juicy shrimp tossed with linguine pasta in a lemony garlic butter sauce with fresh parsley.',
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
    category: 'Quick & Easy',
    content: `
      <h2>Fast, Elegant, and Foolproof</h2>
      <p>When you need dinner on the table in a flash, this 15-minute shrimp scampi pasta is your ultimate holy grail. Made with simple kitchen staples that punch high in flavor!</p>

      <h2>Ingredients</h2>
      <ul>
        <li>1 lb large shrimp (peeled and deveined)</li>
        <li>8 oz linguine or spaghetti</li>
        <li>4 tbsp butter + 2 tbsp olive oil</li>
        <li>6 cloves garlic (minced)</li>
        <li>1/4 cup white wine or chicken broth</li>
        <li>Juice of 1 fresh lemon + lemon zest</li>
        <li>Red pepper flakes and chopped fresh parsley</li>
      </ul>

      <h2>Instructions</h2>
      <p>Boil pasta in salted water until al dente. In a skillet, melt butter with olive oil and sear shrimp for 2 minutes per side; transfer to plate. Sauté garlic and red pepper flakes for 1 minute. Deglaze pan with white wine and lemon juice. Toss pasta and shrimp into sauce. Garnish with parsley and enjoy!</p>
    `
  },
  {
    title: 'Crispy Honey Garlic Chicken Wings',
    slug: 'crispy-honey-garlic-chicken-wings',
    excerpt: 'Oven-baked extra crispy chicken wings coated in a sticky, sweet, and glossy honey garlic glaze.',
    coverImage: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1200&auto=format&fit=crop',
    category: 'Quick & Easy',
    content: `
      <h2>Game Day Favorite</h2>
      <p>No deep fryer needed! Coating chicken wings with baking powder before baking creates an insanely crispy skin that holds onto the irresistible honey garlic glaze.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>2 lbs chicken wingettes and drumettes</li>
        <li>1 tbsp aluminium-free baking powder + 1 tsp salt</li>
        <li>1/3 cup honey</li>
        <li>1/4 cup low-sodium soy sauce</li>
        <li>4 cloves garlic (minced) + 1 tsp grated ginger</li>
        <li>Sesame seeds and sliced green onions for garnish</li>
      </ul>

      <h2>Instructions</h2>
      <p>Toss dry wings with baking powder and salt. Bake at 400°F on a wire rack for 45 minutes, flipping halfway. Simmer honey, soy sauce, garlic, and ginger until thickened. Toss baked crispy wings in warm glaze and sprinkle with sesame seeds!</p>
    `
  },
  {
    title: 'Classic French Berry Tart',
    slug: 'classic-french-berry-tart',
    excerpt: 'Buttery shortcrust pastry shell filled with silky vanilla pastry cream and topped with vibrant fresh berries.',
    coverImage: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop',
    category: 'Desserts',
    content: `
      <h2>Patisserie Perfection</h2>
      <p>A showstopping French dessert featuring sweet shortbread crust (Pâte Sucrée), creamy real vanilla bean crème pâtissière, and a colorful crown of strawberries, raspberries, and blueberries.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>1 blind-baked 9-inch tart crust</li>
        <li>2 cups whole milk + 1 vanilla bean (split)</li>
        <li>4 egg yolks + 1/2 cup sugar + 3 tbsp cornstarch</li>
        <li>2 cups fresh mixed berries (raspberries, blueberries, blackberries)</li>
        <li>2 tbsp apricot jam (warmed for glazing)</li>
      </ul>

      <h2>Instructions</h2>
      <p>Prepare vanilla pastry cream by whisking hot milk into egg yolk mixture and boiling until thick; chill completely. Fill sweet tart shell with chilled cream, arrange fresh berries artfully on top, and brush with warm apricot glaze for bakery shine.</p>
    `
  },
  {
    title: 'Loaded Veggie Quinoa Buddha Bowl',
    slug: 'loaded-veggie-quinoa-buddha-bowl',
    excerpt: 'Nourishing bowl filled with fluffy quinoa, roasted sweet potatoes, chickpea croutons, avocado, and creamy tahini dressing.',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    content: `
      <h2>Healthy & Energizing Meal Prep</h2>
      <p>Colorful, satisfying, and bursting with vitamins. This plant-powered grain bowl delivers complete protein, healthy fats, and fiber all in one dish.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>1 cup cooked fluffy quinoa</li>
        <li>1 medium sweet potato (cubed and roasted)</li>
        <li>1 can chickpeas (drained, seasoned, and crisp-roasted)</li>
        <li>1 cup shredded red cabbage & baby kale</li>
        <li>1/2 Hass avocado (sliced)</li>
        <li>Tahini Dressing: 3 tbsp tahini, 1 tbsp lemon juice, 1 tbsp maple syrup, warm water</li>
      </ul>

      <h2>Instructions</h2>
      <p>Arrange cooked quinoa in serving bowls. Top with roasted sweet potato, crunchy chickpeas, fresh kale, cabbage, and sliced avocado. Drizzle generously with lemon tahini dressing before serving.</p>
    `
  },
  {
    title: 'Classic French Beef Bourguignon',
    slug: 'classic-french-beef-bourguignon',
    excerpt: 'Tender melt-in-your-mouth beef braised in red wine broth with bacon lardons, pearl onions, and sautéed mushrooms.',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    content: `
      <h2>Julia Child’s Beloved Icon</h2>
      <p>Slow-simmered beef stew laced with Pinot Noir, aromatics, herbs, and crispy bacon. The deep rich gravy makes this the ultimate luxury comfort meal.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>3 lbs beef chuck roast (cut into 2-inch cubes)</li>
        <li>6 oz thick-cut bacon (chopped)</li>
        <li>1 bottle (750ml) French red wine (Pinot Noir or Burgundy)</li>
        <li>2 cups beef stock</li>
        <li>1 lb fresh pearl onions + 1 lb cremini mushrooms</li>
        <li>Fresh thyme, rosemary, and bay leaves</li>
      </ul>
      <h2>Instructions</h2>
      <p>Crisp bacon in Dutch oven. Sear seasoned beef cubes in bacon fat. Add wine, beef stock, garlic, and herb bundle. Cover and braise in oven at 325°F for 3 hours until fork tender. Sauté pearl onions and mushrooms separately, then stir into stew before serving with mashed potatoes.</p>
    `
  },
  {
    title: 'Berry Acai Smoothie Bowl',
    slug: 'berry-acai-smoothie-bowl',
    excerpt: 'Thick antioxidant-packed frozen acai blend topped with chia seeds, coconut flakes, banana slices, and almond butter.',
    coverImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    content: `
      <h2>Tropical Morning Boost</h2>
      <p>Refreshingly cold and nutrient-rich! This thick acai smoothie bowl eats like ice cream for breakfast while nourishing your body with superfruits.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 frozen acai packet (unsweetened)</li>
        <li>1 cup frozen mixed berries + 1 frozen banana</li>
        <li>1/4 cup coconut water or almond milk</li>
        <li>Toppings: Sliced banana, chia seeds, toasted coconut, granola, and drizzled almond butter</li>
      </ul>
      <h2>Instructions</h2>
      <p>Blend frozen acai, berries, banana, and coconut water in a high-speed blender using a tamper until thick and smooth. Scoop into a chilled bowl and arrange artistic rows of toppings.</p>
    `
  },
  {
    title: 'Creamy New York Cheesecake with Raspberry Sauce',
    slug: 'creamy-new-york-cheesecake-raspberry',
    excerpt: 'Dense, rich, ultra-creamy baked cheesecake on a Graham cracker crust drizzled with tart raspberry coulis.',
    coverImage: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop',
    category: 'Desserts',
    content: `
      <h2>The Standard of Great Cheesecake</h2>
      <p>Smooth, velvety texture with subtle vanilla and lemon zest accents baked in a water bath to guarantee zero cracks on top.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>2 cups Graham cracker crumbs + 1/2 cup melted butter</li>
        <li>32 oz full-fat cream cheese (room temperature)</li>
        <li>1 cup granulated sugar + 4 large eggs</li>
        <li>1/2 cup sour cream + 1 tbsp vanilla extract</li>
        <li>Raspberry sauce: 2 cups fresh raspberries + 1/4 cup sugar + 1 tbsp lemon juice</li>
      </ul>
      <h2>Instructions</h2>
      <p>Press crumbs into springform pan. Beat cream cheese and sugar until smooth; incorporate eggs one at a time. Stir in sour cream and vanilla. Bake in water bath at 325°F for 65 minutes. Chill overnight before slicing and serving with warm raspberry sauce.</p>
    `
  },
  {
    title: 'Authentic Creamy Carbonara',
    slug: 'authentic-creamy-carbonara',
    excerpt: 'Traditional Roman pasta made with guanciale, fresh egg yolks, Pecorino Romano cheese, and cracked black pepper.',
    coverImage: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1200&auto=format&fit=crop',
    category: 'Quick & Easy',
    content: `
      <h2>No Cream Required!</h2>
      <p>Real Roman carbonara relies solely on the emulsion of egg yolks, rendered pork fat, pasta water, and sharp Pecorino Romano cheese to create its glossy sauce.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>12 oz spaghetti or rigatoni</li>
        <li>5 oz guanciale or pancetta (diced)</li>
        <li>4 large egg yolks + 1 whole egg</li>
        <li>1 cup finely grated Pecorino Romano cheese</li>
        <li>Freshly cracked coarse black pepper</li>
      </ul>
      <h2>Instructions</h2>
      <p>Crisp guanciale in a skillet until golden. Whisk eggs, Pecorino, and pepper in a bowl. Boil pasta in lightly salted water. Toss hot drained pasta into crispy guanciale fat off the heat, pour in egg mixture while vigorously stirring with starchy pasta water to form a silky sauce.</p>
    `
  },
  {
    title: 'Smokey Lentil Shepherd’s Pie',
    slug: 'smokey-lentil-shepherds-pie',
    excerpt: 'Hearty brown lentils and root vegetables cooked in savory herb gravy topped with fluffy garlic mashed potatoes.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    content: `
      <h2>Plant-Based Comfort Food</h2>
      <p>A wholesome vegan twist on the classic British dish. Filled with protein-rich lentils, carrots, peas, and mushrooms baked under a golden potato crust.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1.5 cups cooked brown or green lentils</li>
        <li>1 diced onion, 2 carrots, 2 celery stalks, 1 cup peas</li>
        <li>2 tbsp tomato paste + 1.5 cups vegetable broth</li>
        <li>3 cups fluffy mashed Yukon Gold potatoes (with olive oil & garlic)</li>
        <li>Fresh rosemary and thyme</li>
      </ul>
      <h2>Instructions</h2>
      <p>Sauté aromatics and vegetables. Add tomato paste, herbs, lentils, and broth; simmer for 15 minutes. Transfer to baking dish, pipe or spread garlic mashed potatoes on top, and bake at 400°F for 25 minutes until golden brown.</p>
    `
  },
  {
    title: 'Matcha Green Tea Latte Pancakes',
    slug: 'matcha-green-tea-latte-pancakes',
    excerpt: 'Vibrant green pancakes infused with Japanese ceremonial grade matcha served with white chocolate drizzle.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    content: `
      <h2>Antioxidant Morning Delight</h2>
      <p>Start your morning with a calming matcha kick! Earthy ceremonial green tea powder pairs naturally with sweet white chocolate and fresh strawberries.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1.5 cups all-purpose flour</li>
        <li>2 tbsp ceremonial grade matcha powder</li>
        <li>2 tbsp sugar + 1 tbsp baking powder</li>
        <li>1.25 cups buttermilk + 1 egg + 2 tbsp melted butter</li>
        <li>Melted white chocolate & strawberries for serving</li>
      </ul>
      <h2>Instructions</h2>
      <p>Whisk dry ingredients including matcha powder. Stir in buttermilk, egg, and melted butter until just combined. Cook on buttered griddle over medium heat until bubbles pop. Stack high and drizzle with white chocolate!</p>
    `
  },
  {
    title: 'Slow-Cooked Mexican Birria Tacos',
    slug: 'slow-cooked-mexican-birria-tacos',
    excerpt: 'Crispy corn tortillas dipped in chili broth, filled with braised shredded beef and melted Oaxaca cheese served with consommé.',
    coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    content: `
      <h2>The Ultimate Dip-and-Eat Tacos</h2>
      <p>Juicy tender beef chuck braised with dried guajillo and ancho chiles. Tortillas are dipped in the rich chili fat, griddled with cheese until crispy, and served with hot consommé broth for dipping.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>3 lbs beef chuck roast + 1 lb short ribs</li>
        <li>4 dried guajillo chiles + 2 ancho chiles (rehydrated & blended)</li>
        <li>1 onion, 6 garlic cloves, cumin, oregano, cinnamon</li>
        <li>Corn tortillas + shredded Oaxaca or Monterey Jack cheese</li>
        <li>Diced white onion and cilantro</li>
      </ul>
      <h2>Instructions</h2>
      <p>Braise beef in chili sauce and beef broth for 3.5 hours until shreddable. Dip corn tortillas in red oil skimmed from broth. Fry on hot griddle, top with cheese and shredded beef, fold in half, and cook until crunchy. Serve with warm consommé broth!</p>
    `
  },
  {
    title: 'Homemade Cinnamon Rolls with Cream Cheese Frosting',
    slug: 'homemade-cinnamon-rolls-cream-cheese',
    excerpt: 'Soft, pillowy brioche dough swirled with buttery brown sugar cinnamon and smothered in tangy cream cheese glaze.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    category: 'Breakfast',
    content: `
      <h2>Better Than Cinnabon</h2>
      <p>Warm out of the oven! The secret to soft rolls that stay fluffy for days is pouring warm heavy cream over the risen rolls right before baking.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>Brioche dough: 4 cups flour, 1 packet yeast, 1 cup warm milk, 1/3 cup butter, 2 eggs</li>
        <li>Filling: 1/3 cup melted butter, 1 cup dark brown sugar, 2.5 tbsp ground cinnamon</li>
        <li>Frosting: 4 oz cream cheese, 1/4 cup butter, 1.5 cups powdered sugar, 1 tsp vanilla</li>
      </ul>
      <h2>Instructions</h2>
      <p>Knead dough and let rise 1 hour. Roll out into rectangle, spread butter, brown sugar, and cinnamon. Roll tightly, slice into 12 rolls. Let rise 30 minutes, pour 1/3 cup warm cream over top, and bake at 350°F for 25 minutes. Slather generously with cream cheese frosting while warm!</p>
    `
  },
  {
    title: 'Crispy Air Fryer Sesame Tofu',
    slug: 'crispy-air-fryer-sesame-tofu',
    excerpt: 'Extra crunchy air-fried tofu cubes coated in a savory sweet sesame garlic sauce served with steamed broccoli.',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    category: 'Vegan',
    content: `
      <h2>Better Than Takeout</h2>
      <p>Air frying tofu cut into bite-sized cubes creates a super crisp exterior without excess oil. Tossed in a sweet soy garlic sesame sauce!</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 block extra-firm tofu (pressed and cubed)</li>
        <li>1.5 tbsp cornstarch + 1 tbsp soy sauce + 1 tsp sesame oil</li>
        <li>Sauce: 3 tbsp soy sauce, 2 tbsp maple syrup, 1 tbsp rice vinegar, 1 tsp garlic, 1 tsp sesame oil, 1 tsp cornstarch</li>
        <li>Toasted sesame seeds and green onions</li>
      </ul>
      <h2>Instructions</h2>
      <p>Toss tofu cubes with soy sauce, sesame oil, and cornstarch. Air fry at 400°F for 15 minutes, shaking halfway. Simmer sauce in pan until sticky, toss crispy tofu in glaze, and serve over rice with sesame seeds.</p>
    `
  },
  {
    title: 'Classic French Onion Soup',
    slug: 'classic-french-onion-soup',
    excerpt: 'Rich caramelized onion soup topped with toasted baguette slices and melted Gruyère cheese.',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
    category: 'Dinners',
    content: `
      <h2>Deep Flavor from Patience</h2>
      <p>Caramelizing onions slowly over 45 minutes transforms them into sweet golden jam, building the rich base for this timeless French Bistro starter.</p>
      <h2>Ingredients</h2>
      <ul>
        <li>3 lbs yellow onions (thinly sliced)</li>
        <li>3 tbsp butter + 1 tbsp olive oil</li>
        <li>1/2 cup dry white wine or sherry</li>
        <li>6 cups rich beef stock</li>
        <li>1 French baguette (sliced) + 2 cups shredded Gruyère cheese</li>
        <li>Fresh thyme and bay leaf</li>
      </ul>
      <h2>Instructions</h2>
      <p>Cook onions slowly in butter for 45 minutes until deep golden brown. Deglaze pan with white wine. Add beef stock and herbs; simmer 20 minutes. Ladle soup into oven-safe bowls, top with toasted baguette slice and mountain of Gruyère cheese. Broil for 4 minutes until cheese is bubbly and brown!</p>
    `
  }
];

async function seed() {
  console.log('Seeding 20 realistic culinary recipes...');
  for (const recipe of recipes) {
    try {
      await prisma.article.upsert({
        where: { slug: recipe.slug },
        update: {
          title: recipe.title,
          excerpt: recipe.excerpt,
          content: recipe.content,
          coverImage: recipe.coverImage,
          status: 'PUBLISHED',
        },
        create: {
          title: recipe.title,
          slug: recipe.slug,
          excerpt: recipe.excerpt,
          content: recipe.content,
          coverImage: recipe.coverImage,
          status: 'PUBLISHED',
        },
      });
      console.log(`[Prisma OK] ${recipe.title}`);
    } catch (err: any) {
      console.log(`Prisma fallback to Supabase for ${recipe.title}...`);
      const { error } = await supabase.from('articles').upsert(
        {
          title: recipe.title,
          slug: recipe.slug,
          excerpt: recipe.excerpt,
          content: recipe.content,
          cover_image: recipe.coverImage,
          status: 'PUBLISHED',
        },
        { onConflict: 'slug' }
      );
      if (error) {
        console.error(`[Supabase Error] ${recipe.title}:`, error.message);
      } else {
        console.log(`[Supabase OK] ${recipe.title}`);
      }
    }
  }
  console.log('✨ All 20 real recipes successfully seeded!');
}

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    try { await prisma.$disconnect(); } catch {}
  });
