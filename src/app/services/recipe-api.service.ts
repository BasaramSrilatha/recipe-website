import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  _id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private apiUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // Accept a plain recipe object and POST as JSON
  addRecipe(recipe: Omit<Recipe, '_id' | 'createdAt'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }
  // DELETE a recipe by ID
  deleteRecipe(id: string) {
    return this.http.delete(`http://localhost:3000/api/recipes/${id}`);
  }
  

}
