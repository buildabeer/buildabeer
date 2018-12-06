import { AuthService } from '../../user/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IStyle } from '../../style/style';
import { IRecipe } from '../recipe';
import { IEquipment } from '../../equipment/equipment';
import { StyleService } from '../../style/style.service';
import { RecipeService } from '../recipe.service';
import { EquipmentService } from '../../equipment/equipment.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DesignerService } from '../designer.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @ViewChild('local') localTab: ElementRef;
  @ViewChild('public') publicTab: ElementRef;

  recipe: IRecipe[] = [];
  search = '';
  previousSearch = '';
  title = 'Recipes';
  selectedStyleCategoryDropdown: {style: IStyle, count: number} = null;
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;
  pageCount = 1;
  isCollapsed: boolean[] = [];

  style_list: {style: IStyle, count: number}[] = [];

  used_styles: IStyle[] = [];
  used_equipment: IEquipment[] = [];

  // xml
  xml_to_import: File = null;
  loading = true;
  importModal: NgbModalRef;

  // search timer
  typingTimer: any;
  doneTypingInterval = 1000;

  currentTab = 'local';
  loading_message = 'Loading recipes...';

  constructor(private _recipeService: RecipeService,
    private _styleService: StyleService, private _equipmentService: EquipmentService,
    public _designer: DesignerService, private _modalService: NgbModal,
    public _authService: AuthService) { }

  ngOnInit() {
    this._designer.init(true);
    if (!this._authService.userSignedIn()) {
      this.localTab.nativeElement.classList.remove('active');
      this.publicTab.nativeElement.classList.add('active');
      this.currentTab = 'public';
    }
    this.updateRecipeList();
  }

  trackByRecipeName(index: number, profile: any): string {
    return profile.name;
  }

  onPageChange(): void {
    if (this.page > this.pageCount) {
      this.page = this.pageCount;
    } else if (this.page < 1) {
      this.page = 1;
    }
    this.pageText = this.page;
    this.updateRecipeList();
  }

  getTotalRecipeCount() {
    let recipe_count = 0;
    this.style_list.forEach((list) => {
      recipe_count += list.count;
    });

    return recipe_count;
  }

  deleteEvent(event): void {
    const index = this.recipe.indexOf(event.recipe);
    if (index > -1) {
      this.recipe.splice(index, 1);
    }
  }

  importXmlOpen(importPopup) {
    this.importModal = this._modalService.open(importPopup, { size: 'sm' });
  }

  importXml() {
    this._designer.massImportXml(this.xml_to_import);
    this.xml_to_import = null;
    this.importModal.close();
  }

  handleFileInput(files: FileList) {
    this.xml_to_import = files.item(0);
  }

  tabChange(change_type: string) {
    if (change_type !== this.currentTab) {
      this.currentTab = change_type;
      this.updateRecipeList();
    }
  }

  updateRecipeList() {
    this.recipe = [];
    this.errorMessage = 'Searching...';
    this._recipeService.getRecipes((this.selectedStyleCategoryDropdown ? this.selectedStyleCategoryDropdown.style.category_number : null),
      (this.selectedStyleCategoryDropdown ? this.selectedStyleCategoryDropdown.style.subcategory : null),
      this.search, this.currentTab === 'public', this.page)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000);
      })
      .subscribe(recipeData => {
          this.errorMessage = 'No data found.';

          let tempStyle;
          if (this.selectedStyleCategoryDropdown) {
            tempStyle = this.selectedStyleCategoryDropdown;
          }
          this.style_list = recipeData.style_list;
          if (tempStyle) {
            this.style_list.some((style) => {
              if (style.style.id === tempStyle.style.id) {
                this.selectedStyleCategoryDropdown = style;
                return true;
              }
            });
          }

          this.pageCount = recipeData.page_count;

          this.used_styles = [];
          this.used_equipment = [];
          recipeData.recipe_list.forEach((recipe) => {
            this.used_styles.push(recipe.style);
            this.used_equipment.push(recipe.equipment);
          });
          this.style_list = this.style_list.sort(function(a, b) {
            if (a.style.category_number < b.style.category_number) {
              return -1;
            } else if (a.style.category_number > b.style.category_number) {
              return 1;
            } else {
              if (a.style.subcategory < b.style.subcategory) {
                return -1;
              } else if (a.style.subcategory > b.style.subcategory) {
                return 1;
              } else {
                return 0;
              }
            }
          });

          if (recipeData.recipe_list !== null) {
            this.recipe = recipeData.recipe_list;
          }
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try against later.';
          }
          console.error(error);
      });
  }

  searchTyping() {
    clearTimeout(this.typingTimer);
    if (this.search != this.previousSearch) {
      this.typingTimer = setTimeout(() => {
        this.previousSearch = this.search;
        this.updateRecipeList();
      }, this.doneTypingInterval);
    }
  }
}
