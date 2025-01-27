export const GlobalStyles = {
  colors: {
    lightGreen: "#E7FBB4",
    darkGreen: "#638C6D",
    lighterOrange: "#ffd1b7",
    lightOrange: "#ff7d32",
    darkOrange: "#C84C05",
    accent500: "#f7bc0c",
    error50: "#fcc4e4",
    error500: "#9b095c",
    gray500: "#102c2c",
    gray700: "#091b1b",
  },
};

class Category {
  constructor(id, title, color) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}

// export const CATEGORIES = [
//   new Category("c1", "Italian", "#f5428d"),
//   new Category("c2", "Quick & Easy", "#f54242"),
//   new Category("c3", "Hamburgers", "#f5a442"),
//   new Category("c4", "German", "#f5d142"),
//   new Category("c5", "Light & Lovely", "#368dff"),
//   new Category("c6", "Exotic", "#41d95d"),
//   new Category("c7", "Breakfast", "#9eecff"),
//   new Category("c8", "Asian", "#b9ffb0"),
//   new Category("c9", "French", "#ffc7ff"),
//   new Category("c10", "Summer", "#47fced"),
//   new Category("c11", "Greek", "#0099ad"),
//   new Category("c12", "Dessert", "#ce4dc7"),
// ];

export const CATEGORIES = [
  new Category("c1", "Italian", GlobalStyles.colors.darkGreen),
  new Category("c2", "Quick & Easy", GlobalStyles.colors.darkOrange),
  new Category("c3", "Hamburgers", GlobalStyles.colors.darkOrange),
  new Category("c4", "German", GlobalStyles.colors.darkGreen),
  new Category("c5", "Light & Lovely", GlobalStyles.colors.darkGreen),
  new Category("c6", "Exotic", GlobalStyles.colors.darkOrange),
  new Category("c7", "Breakfast", GlobalStyles.colors.darkOrange),
  new Category("c8", "Asian", GlobalStyles.colors.darkGreen),
  new Category("c9", "French", GlobalStyles.colors.darkGreen),
  new Category("c10", "Summer", GlobalStyles.colors.darkOrange),
  new Category("c11", "Greek", GlobalStyles.colors.darkOrange),
  new Category("c12", "Dessert", GlobalStyles.colors.darkGreen),
];

export default Category;
