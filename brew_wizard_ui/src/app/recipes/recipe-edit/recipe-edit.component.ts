import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../user/auth.service";

import { RecipeService } from '../recipe.service';
import { DesignerService } from '../designer.service';
import { SaveDialogService } from '../save-dialog.service'

import { DecimalPipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './../recipe.html',
  styleUrls: ['./../recipe.scss']
})
export class RecipeEditComponent implements OnInit {

  scale_number: number = 5;
  scaleModal: NgbModalRef;
  copy_name: string = "";
  copyModal: NgbModalRef;
  recipeRunnerModal: NgbModalRef;
  importModal: NgbModalRef;

  style_collapse: boolean;
  water_collapse: boolean;
  ingredients_collapse: boolean;
  mash_collapse: boolean;
  yeast_collapse: boolean;

  runner_step: number = 1;

  // xml
  xml_to_import: File = null;

  constructor(private _recipeService: RecipeService,
    public _authService: AuthService, private _modalService: NgbModal,
    public _designer: DesignerService, private _activatedRoute: ActivatedRoute,
    public _dialogService: SaveDialogService, private router: Router,) { }

  ngOnInit() {
    this.style_collapse = true;
    this.water_collapse = true;
    this.ingredients_collapse = true;
    this.mash_collapse = true;
    this.yeast_collapse = true;

    let recipeId: number = this._activatedRoute.snapshot.params['id'];
    this._designer.loadRecipe(recipeId);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this._designer.isDirty()) {
      return true;
    }

    return this._dialogService.confirm('Recipe has unsaved changes, discard changes?');
  }

  runRecipe(recipeRunner): void {
    this.recipeRunnerModal = this._modalService.open(recipeRunner, { size: 'lg' });
  }

  save(ignore_item): void {
    this._designer.update();
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
    var pdf = new jsPDF('p', 'pt', 'letter');
    var name = this._designer.recipe.name ? this._designer.recipe.name : "new_recipe" + ".pdf"
    var pdfModal = this._modalService.open(pdfPopup, { size: 'lg' });

    pdf.addHTML(document.getElementById('pdf'), function() {
      pdf.save(name);
      pdfModal.close()
    });
  }

  copySubmit(form: any): void {
    this._designer.copyRecipe(this.copy_name);
    this.copy_name = "";
    this.copyModal.close();
  }

  copyOpen(copyPopup) {
    this.copy_name = this._designer.recipe.name + " - Copy"
    this.copyModal = this._modalService.open(copyPopup, { size: 'sm' });
  }

  toggleAutoAdjust(toggle: boolean): void {
    this._designer.match_water = toggle;
    this._designer.match_agent = toggle;
    this._designer.match_malt = toggle;
    this._designer.match_hop = toggle;
    this._designer.match_yeast = toggle;
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
