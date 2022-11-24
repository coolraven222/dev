# Development

### Link to Deployed Website
`https://coolraven222.github.io/dev/`

### Goal and Value of the Application
The application aims to enable fans to build their Pokemon team by type and ability. Users can browse through 12 types of Pokemon, add/remove them from the team, and get the total ability of the team. They can quickly spot the most suitable Pokemon by filtering by type, filtering by ability, sorting by ID, and sorting by ability.

### Usability Principles Considered
* Learnability: The design is very intuitive and easy to understand. Pokemon cards are listed in grids. Each has basic information and a grey "ADD TO TEAM" button. All major functions are put on the navigation bar on top. Users can filter, sort, and check the cart on the bar.
* Efficiency: Users can quickly add Pokemon, remove Pokemon, and perform sorting/ranking. For all the functions mentioned, users can get them done within two clicks.
* Memorability: Users can easily restore proficiency because the design is simple, and there are not many operations to remember.
* Errors: my webpage has high recoverability. No matter what users do, to return to the default page, they only need to choose "All" in "filter by type," "filter by ability," and "By ID" in "sort by ability."
* Satisfaction: It is very pleasant to use the page because the interface is well-designed in shape, organization, and color.

### Organization of Components
The major components are App, Item, Cart, and CartItem. The app is the main page and the entry for everything. Within it, there is first a MyNav, containing the page's name, two filters, one sorting feature, and a cart icon. Items are cards containing Pokemon's information. The cards (Item) will be shown below according to the two filters and one sorting algorithm on MyNav. The cart is represented by the cart icon on the right of MyNav. When a user clicks on the icon, the cart will be shown as a drawer. Cart contains CartItems, which will be rendered one by one as CartItem inside Cart. States related to the components will be explained in the final section. Data is passed down will be explained in the next section.

### How Data is Passed Down Through Components
Data is passed down through props. Here are how major components interact with each other:
* App <-> Item: App passes down item (Pokemon item) and handleAddItem (a function to add item to cartItems) to Item. Item uses item to create pokemon card containing img, name, id, ability, and type on the main page. Item uses handleAddItem to create an "ADD TO TEAM" button at the bottom of each card, so users can add the corresponding Pokemon to cartItems.
* App <-> Cart: App passes down cartItems (list of Pokemon added to the team), handleAddItem (a function to add item to cartItems), and handleRemoveItem (a function to remove item from cartItems). Cart uses the list of cart items to calculate the team's total ability.
* Cart <-> CartItem: Cart passes down item (Pokemon item), handleAddItem (a function to add item to cartItems), and handleRemoveItem (a function to remove item from cartItems) to CartItems. For each CartItem, it uses handleAddItem to create a "+" button and uses handleRemoveItem to create a "-" button on the side of each item. Also, For each CartItem, it will calculate and show each Pokemon's unit ability, total amount, and total ability.


### How the User Triggers State Changes
1. [cartOpen, setCartOpen]: cartOpen is initated as false. When a user clicks the cart icon, cartOpen will be set as true, so a cart will open as a drawer. When onClose, cartOpen is set as false, so the drawer will disappear.
2. [cartItems, setCartItems]: cartItems are initiated as an empty list. When a user clicks "ADD TO TEAM" on the main page or "+" on the cart item, "handleAddItem" will be called on click, and the item associated with the addition will be passed to the function. If the function finds the item with the same id in cartItems, it will add its amount by 1. If it cannot find, it will add the item to cartItems with an amount equal to 1.
3. [type, setType]: type is initiated as "All." When a user clicks the filter of types on the top left, it will change the event key accordingly; it will then trigger selectFilterType, which will setType to the selected eventkey type. For each pokemonData, it will be first filtered by matchesPokemonType, which will select Pokemon by type according to the state. So for filteredData, it is already filtered and would only render pokemon with selected types.
4. [abilityStandard, setAbilityStandard]: Same as [type, setType]. The only difference is that the filter condition is changed to matchesAbilityStandard, where if "All," all will be shown. If it is "High," only those with an ability higher than 100 will be shown. If it is "Low," those with an ability no higher than 100 will be shown.
5. [order, setOrder]: order is initiated as "By ID." The user trigger logic is the same as above, and the event key can be "By ID" or "By Ability" .Before rendering data, pokemonData will be processed to filteredData. The process includes two filters mentioned above, and this sorting. If the event key is "By ID," comparison logic is "a.id - b.id". Else, the logic is "a.ability - b.ability".
