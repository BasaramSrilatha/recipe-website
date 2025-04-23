import { Injectable } from '@angular/core';

  export interface Recipe {
    id?: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    imageUrl?: string;  // Make this optional
    createdAt?: Date;
  }
  

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      title: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: ['spaghetti', 'eggs', 'cheese', 'bacon', 'garlic'],
      instructions: 'Boil pasta. Fry bacon. Mix all ingredients.',
      createdAt: new Date('2023-05-20')
    },
    {
      title: 'Pancakes',
      description: 'Fluffy pancakes for breakfast.',
      ingredients: ['flour', 'milk', 'eggs', 'butter', 'syrup'],
      instructions: 'Mix ingredients. Fry on a hot griddle.',
      createdAt: new Date('2023-06-15')
    },
    {
      title: 'Caesar Salad',
      description: 'A fresh and crunchy salad with Caesar dressing.',
      ingredients: ['lettuce', 'croutons', 'cheese', 'Caesar dressing'],
      instructions: 'Toss ingredients together.',
      createdAt: new Date('2023-07-10')
    }
  ];

  addRecipe(recipe: Recipe) {
    recipe.createdAt = new Date();
    this.recipes.push(recipe);
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }
}
