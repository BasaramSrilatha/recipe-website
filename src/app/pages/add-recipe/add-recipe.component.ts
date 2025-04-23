import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe,RecipeService } from '../../shared/services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  recipe = {
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    imageUrl: ''
  };

  constructor(private recipeService: RecipeService, private router: Router) {}

  submitRecipe() {
    const newRecipe: Recipe = {
      title: this.recipe.title,
      description: this.recipe.description,
      ingredients: this.recipe.ingredients.split(',').map(i => i.trim()),
      instructions: this.recipe.instructions,
      createdAt: new Date()
    };

    this.recipeService.addRecipe(newRecipe);
    this.router.navigate(['/recipe-list']);
  }
}
