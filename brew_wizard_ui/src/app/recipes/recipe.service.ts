import { Injectable } from '@angular/core';
import { IRecipe } from './recipe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  // getRecipes(): any {
  //   return this.http.get(`${environment.token_auth_config.apiBase}/recipes`)
  //     .map((response: any) => response)
  //     .catch(this.handleError);
  // }

  getRecipes(category_number, subcategory, search, publicSearch, page): any {
    const query_string_array: string[] = [];
    let query_string = '';
    if (category_number && subcategory) {
      query_string_array.push('category_number=' + category_number);
      query_string_array.push('subcategory=' + subcategory);
    }
    if (search) {
      query_string_array.push('search=' + search);
    }
    if (publicSearch) {
      query_string_array.push('public=' + publicSearch);
    }
    if (page) {
      query_string_array.push('page=' + page);
    }
    if (query_string_array.length > 0) {
      query_string = '?' + query_string_array.join('&');
    }
    return this.http.get(`${environment.token_auth_config.apiBase}/recipes` + query_string)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getRecipe(recipeId: number): Observable<any> {
    return this.http.get(`${environment.token_auth_config.apiBase}/recipes/` + recipeId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  createRecipe(recipe: any): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/recipes/`, {recipe});
  }

  editRecipe(recipe: any): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/recipes/` + recipe.id, {recipe});
  }

  deleteRecipe(recipeId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/recipes/` + recipeId);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }

  getRecipeCount(): Observable<any> {
    return this.http.get(`${environment.token_auth_config.apiBase}/recipes/count`)
      .map((response: any) => response)
      .catch(this.handleError);
  }
}
