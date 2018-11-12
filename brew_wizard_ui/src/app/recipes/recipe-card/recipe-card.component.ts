import { AuthService } from "../../user/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRecipe } from '../recipe';
import { IEquipment } from '../../equipment/equipment';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input()
  recipe: IRecipe;

  @Input()
  style_name: string;

  @Input()
  equipment: IEquipment;

  @Output()
  onRecipeDelete = new EventEmitter();

  constructor(private _recipeService: RecipeService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
  }

  deleteCard(): void {
    if (window.confirm("Are you sure you want to delete this recipe?" )) {
      this._recipeService.deleteRecipe(this.recipe.id)
        .subscribe((res) => {
          if(this._router.url !== '/recipes') {
            this._router.navigate(['/recipes'])
          } else {
            this.onRecipeDelete.emit({recipe: this.recipe});
          }
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the recipe recipe, please try again later.");
          }
          console.error(error);
        })
    }
  }
}
