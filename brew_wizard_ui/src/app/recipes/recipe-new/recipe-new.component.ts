import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../user/auth.service';

import { RecipeService } from '../recipe.service';
import { DesignerService } from '../designer.service';
import { SaveDialogService } from '../save-dialog.service';

import { DecimalPipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './../recipe.html',
  styleUrls: ['./../recipe.scss']
})
export class RecipeNewComponent implements OnInit {
  signIn = {
          login: '',
          password: ''
        };
  signInErrors: string[] = [];

  scale_number = 5;
  scaleModal: NgbModalRef;
  copy_name = '';
  copyModal: NgbModalRef;
  loginModal: NgbModalRef;
  recipeRunnerModal: NgbModalRef;
  importModal: NgbModalRef;

  style_collapse: boolean;
  water_collapse: boolean;
  ingredients_collapse: boolean;
  mash_collapse: boolean;
  yeast_collapse: boolean;

  runner_step = 1;

  // xml
  xml_to_import: File = null;

  constructor(private _recipeService: RecipeService,
    public _authService: AuthService, private _modalService: NgbModal,
    public _designer: DesignerService, public _dialogService: SaveDialogService,
    private router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.style_collapse = true;
    this.water_collapse = true;
    this.ingredients_collapse = true;
    this.mash_collapse = true;
    this.yeast_collapse = true;

    this._activatedRoute.queryParams.subscribe(params => {
      if (params.recipe_id) {
        this._designer.loadRecipeCopy(Number(params.recipe_id));
      } else {
        this._designer.init(true);
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this._designer.isDirty()) {
      return true;
    }

    return this._dialogService.confirm('Recipe has not been saved, discard recipe?');
  }

  runRecipe(recipeRunner): void {
    this.recipeRunnerModal = this._modalService.open(recipeRunner, { size: 'lg' });
  }

  onSignInSubmit() {
    this._authService.loginUser(this.signIn)
      .subscribe((res) => {
        this.signIn = {
          login: '',
          password: ''
        };
        this.loginModal.close();
        this._designer.save();
      },
      err => {
        this.signIn = {
          login: '',
          password: ''
        };
        this.signInErrors = err.errors;
      });
  }

  save(loginPopup): void {
    this.loginModal = this._modalService.open(loginPopup, { size: 'sm' });
  }

  scaleSubmit(form: any): void {
    this._designer.recipeScale(this.scale_number);
    this.scale_number = 5;
    this.scaleModal.close();
  }

  scaleOpen(scalePopup) {
    this.scaleModal = this._modalService.open(scalePopup, { size: 'sm' });
  }

  savePdf(pdfPopup) {
    const pdf = new jsPDF('p', 'pt', 'letter');
    const name = this._designer.recipe.name ? this._designer.recipe.name : 'new_recipe' + '.pdf';
    const pdfModal = this._modalService.open(pdfPopup, { size: 'lg' });

    pdf.addHTML(document.getElementById('pdf'), function() {
      pdf.save(name);
      pdfModal.close();
    });
  }

  copySubmit(form: any): void {
    this._designer.copyRecipe(this.copy_name);
    this.copy_name = '';
    this.copyModal.close();
  }

  copyOpen(copyPopup) {
    this.copy_name = this._designer.recipe.name + ' - Copy';
    this.copyModal = this._modalService.open(copyPopup, { size: 'sm' });
  }

  toggleAutoAdjust(toggle: boolean): void {
    this._designer.match_water = toggle;
    this._designer.match_agent = toggle;
    this._designer.match_malt = toggle;
    this._designer.match_hop = toggle;
    this._designer.match_yeast = toggle;
    this._designer.match_misc = toggle;
  }

  importXmlOpen(importPopup) {
    this.importModal = this._modalService.open(importPopup, { size: 'sm' });
  }

  importXml() {
    this._designer.importXml(this.xml_to_import);
    this.xml_to_import = null;
    this.importModal.close();
  }

  handleFileInput(files: FileList) {
    this.xml_to_import = files.item(0);
  }
}
