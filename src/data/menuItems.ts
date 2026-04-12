import brownieImg from "@/assets/brownie.jpg";
import cakeImg from "@/assets/cake.jpg";
import sundaeImg from "@/assets/sundae.jpg";
import cookiesImg from "@/assets/cookies.jpg";
import cheesecakeImg from "@/assets/cheesecake.jpg";
import cupcakeImg from "@/assets/cupcake.jpg";
import tiramisuImg from "@/assets/tiramisu.jpg";
import redvelvetImg from "@/assets/redvelvet.jpg";
import wafflesImg from "@/assets/waffles.jpg";
import lavacakeImg from "@/assets/lavacake.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "brownie-classic",
    name: "Classic Fudge Brownie",
    description: "Rich, gooey chocolate brownie with walnut crunch",
    price: 350,
    image: brownieImg,
    category: "Brownies",
  },
  {
    id: "cake-pink",
    name: "Pink Celebration Cake",
    description: "Fluffy vanilla cake with pink buttercream & sprinkles",
    price: 1800,
    image: cakeImg,
    category: "Cakes",
  },
  {
    id: "sundae-choco",
    name: "Chocolate Sundae",
    description: "Vanilla ice cream drowned in hot fudge & whipped cream",
    price: 450,
    image: sundaeImg,
    category: "Sundaes",
  },
  {
    id: "cookies-chocchip",
    name: "Choc Chip Cookies",
    description: "Crispy edges, chewy center, loaded with chocolate chips",
    price: 200,
    image: cookiesImg,
    category: "Cookies",
  },
  {
    id: "cheesecake-strawberry",
    name: "Strawberry Cheesecake",
    description: "Creamy New York cheesecake with fresh strawberry glaze",
    price: 550,
    image: cheesecakeImg,
    category: "Cakes",
  },
  {
    id: "cupcake-pink",
    name: "Pink Frosted Cupcake",
    description: "Chocolate cupcake topped with dreamy pink frosting",
    price: 250,
    image: cupcakeImg,
    category: "Cupcakes",
  },
  {
    id: "tiramisu-classic",
    name: "Classic Tiramisu",
    description: "Layers of coffee-soaked ladyfingers & mascarpone cream",
    price: 500,
    image: tiramisuImg,
    category: "Desserts",
  },
  {
    id: "cake-redvelvet",
    name: "Red Velvet Cake",
    description: "Vibrant red layers with silky cream cheese frosting",
    price: 1600,
    image: redvelvetImg,
    category: "Cakes",
  },
  {
    id: "waffles-strawberry",
    name: "Strawberry Waffles",
    description: "Golden crispy waffles with fresh strawberries & cream",
    price: 400,
    image: wafflesImg,
    category: "Waffles",
  },
  {
    id: "lavacake-choco",
    name: "Chocolate Lava Cake",
    description: "Warm cake with a molten chocolate center, pure indulgence",
    price: 600,
    image: lavacakeImg,
    category: "Cakes",
  },
];
