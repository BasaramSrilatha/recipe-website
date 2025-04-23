import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeApiService, Recipe } from '../../services/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  showForm = false;
  newRecipe: any = {
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    imageUrl: ''  // Image URL instead of file upload
  };

  constructor(private recipeApi: RecipeApiService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  loadRecipes() {
    this.recipeApi.getRecipes().subscribe(data => {
      this.recipes = data.filter(recipe => recipe.title && recipe.description);
    });
  }

  generateRecipe() {
    const ingredientsArray = this.newRecipe.ingredients
      .split(',')
      .map((item: string) => item.trim());

    // Create the recipe object
    const recipeData = {
      title: this.newRecipe.title,
      description: this.newRecipe.description,
      ingredients: ingredientsArray,
      instructions: this.newRecipe.instructions,
      imageUrl: this.newRecipe.imageUrl // Use the image URL
    };

    // Send the recipe data to the API
    this.recipeApi.addRecipe(recipeData).subscribe(() => {
      this.loadRecipes(); // Reload list after adding
      this.toggleForm();
      this.resetForm();
    });
  }

  resetForm() {
    this.newRecipe = {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      imageUrl: ''
    };
  }
  deleteRecipe(id: string) {
    console.log('→ Attempting to delete recipe with id:', id);
    this.recipeApi.deleteRecipe(id).subscribe({
      next: () => {
        console.log('← Delete successful');
        this.loadRecipes();
      },
      error: err => {
        console.error('✖ Delete failed:', err);
      }
    });
  }
  }
  

