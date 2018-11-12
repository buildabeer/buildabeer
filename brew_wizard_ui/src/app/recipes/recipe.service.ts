import { Injectable } from '@angular/core';
import { IRecipe } from './recipe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class RecipeService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  // getRecipes(): any {
  //   return this._angularTokenService.get("recipes")
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

  getRecipes(category_number, subcategory, search, publicSearch, page): any {
    var query_string_array: string[] = []
    var query_string: string = ''
    if(category_number && subcategory) {
      query_string_array.push("category_number=" + category_number)
      query_string_array.push("subcategory=" + subcategory)
    }
    if(search) {
      query_string_array.push("search=" + search)
    }
    if(publicSearch) {
      query_string_array.push("public=" + publicSearch)
    }
    if(page) {
      query_string_array.push("page=" + page)
    }
    if(query_string_array.length > 0) {
      query_string = '?' + query_string_array.join("&")
    }
    return this._angularTokenService.get("recipes" + query_string)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getRecipe(recipeId: number): Observable<any> {
    return this._angularTokenService.get("recipes/" + recipeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  createRecipe(recipe: any): any {
    return this._angularTokenService.post("recipes/", {recipe})
  }

  editRecipe(recipe: any): any {
    return this._angularTokenService.put("recipes/" + recipe.id, {recipe})
  }

  deleteRecipe(recipeId: number): any {
    return this._angularTokenService.delete("recipes/" + recipeId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }

  getRecipeCount(): Observable<any> {
    return this._angularTokenService.get("recipes/count")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
}
