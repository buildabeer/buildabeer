import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../user/auth.service";

import { RecipeService } from '../recipe.service';
import { DesignerService } from '../designer.service';

import { DecimalPipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  scale_number: number = 5;
  scaleModal: NgbModalRef;
  measurementModal: NgbModalRef;

  constructor(private _recipeService: RecipeService, public _router: Router,
    public _authService: AuthService, private _modalService: NgbModal,
    public _designer: DesignerService, private _activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    let recipeId: number = this._activatedRoute.snapshot.params['id'];
    this._designer.loadRecipe(recipeId);
  }

  savePdf(pdfPopup) {
    var pdf = new jsPDF('p', 'pt', 'letter');
    var name = this._designer.recipe.name ? this._designer.recipe.name : "new_recipe" + ".pdf"

    pdf.addHTML(document.getElementById('pdf'), function() {
      pdf.save(name);
    });
  }

  deleteRecipe() {
    if (window.confirm("Are you sure you want to delete this recipe?" )) {
      this._recipeService.deleteRecipe(this._designer.recipe.id)
        .subscribe((res) => {
          this._router.navigate(['/recipes'])
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the recipe, please try again later.");
          }
          console.error(error);
        })
    }
  }

  openMeasurement(measurementModal): void {
    this.measurementModal = this._modalService.open(measurementModal, { size: 'sm' });
  }
}
