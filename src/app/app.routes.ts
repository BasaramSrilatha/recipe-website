import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { Component } from '@angular/core';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe-list',
    component: RecipeListComponent
  },
  {
    path:'add-recipe',
    component: AddRecipeComponent
  }
];
