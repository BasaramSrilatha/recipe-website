import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  template: `
    <div class="home-container">
      <div class="overlay">
        <h1>Welcome to <span class="brand">TechnoRecipes</span> 🍽️</h1>
        <p>Discover, share, and save your favorite recipes with ease.</p>
        <!-- Correct routerLink for Explore Recipes -->
        <a routerLink="/recipe-list" class="explore-btn">Explore Recipes</a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      background-image: url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092');
      background-size: cover;
      background-position: center;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .overlay {
      background-color: rgba(0, 0, 0, 0.6);
      padding: 2rem;
      border-radius: 16px;
      color: white;
      text-align: center;
      width: 90%;
      max-width: 600px;
    }

    .brand {
      color: #ff9800;
    }

    .explore-btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 1.2rem;
      background-color: #ff9800;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .explore-btn:hover {
      background-color: #e68900;
    }

    h1 {
      margin-bottom: 10px;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  `]
})
export class HomeComponent {}
