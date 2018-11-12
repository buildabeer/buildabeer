import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { IWaterProfile } from './../../water-profile/water-profile';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {

  profileChart: any;

  _boundary: {
              id: number, profile_type: string, strength: string, bitterness: string, bitterness_2: string,
              color: string, calcium_min: number, calcium_max: number, alkalinity_min: number, alkalinity_max: number,
              sulfate_min: number, sulfate_max: number, chloride_min: number, chloride_max: number,
              magnesium_min: number, magnesium_max: number, ra_min: number, ra_max: number, acidify: string
            };

  @Input()
  canvas_id: string;

  @Input()
  set boundary(bound: {
              id: number, profile_type: string, strength: string, bitterness: string, bitterness_2: string,
              color: string, calcium_min: number, calcium_max: number, alkalinity_min: number, alkalinity_max: number,
              sulfate_min: number, sulfate_max: number, chloride_min: number, chloride_max: number,
              magnesium_min: number, magnesium_max: number, ra_min: number, ra_max: number, acidify: string
            }) {

    this._boundary = bound;
    if(this.profileChart) {
      this.profileChart.data.datasets[0].data = this.convertResults([ this._boundary.calcium_max, this._boundary.magnesium_max, this._boundary.chloride_max,
              this._boundary.alkalinity_max, this._boundary.sulfate_max, 150 ])
      this.profileChart.data.datasets[1].data = this.convertResults([ this._boundary.calcium_min, this._boundary.magnesium_min, this._boundary.chloride_min,
              this._boundary.alkalinity_min, this._boundary.sulfate_min, 0 ])
      this.profileChart.update()
    }
  }

  _current_water: IWaterProfile;

  @Input()
  set current_water(cw: IWaterProfile) {
    this._current_water = cw
    if(this.profileChart) {
      this.profileChart.data.datasets[2].data = this.convertResults([ this._current_water.calcium.toFixed(1), this._current_water.magnesium.toFixed(1),
              this._current_water.chloride.toFixed(1), this._current_water.bicarbonate.toFixed(1),
              this._current_water.sulfate.toFixed(1), this._current_water.sodium.toFixed(1) ])

      this.profileChart.data.labels = [["Ca", this._current_water.calcium.toFixed(1) + "/150"],["Mg", this._current_water.magnesium.toFixed(1) + "/40"],
        ["Cl", this._current_water.chloride.toFixed(1) + "/150"],["HCO3", this._current_water.bicarbonate.toFixed(1) + "/200"],
        ["SO4", this._current_water.sulfate.toFixed(1) + "/400"],["Na", this._current_water.sodium.toFixed(1) + "/150"]]
      this.profileChart.update()
    }
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var canvas = <HTMLCanvasElement> document.getElementById(this.canvas_id);
    var ctx = canvas.getContext("2d");

    this.profileChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels:[["Ca", this._current_water.calcium.toFixed(1) + "/150"],["Mg", this._current_water.magnesium.toFixed(1) + "/40"],
        ["Cl", this._current_water.chloride.toFixed(1) + "/150"],["HCO3", this._current_water.bicarbonate.toFixed(1) + "/200"],
        ["SO4", this._current_water.sulfate.toFixed(1) + "/400"],["Na", this._current_water.sodium.toFixed(1) + "/150"]],
        datasets:[

        {
          title: "Max",
          backgroundColor: 'rgba(0, 255, 0, .4)',
          borderColor: 'rgba(0, 255, 0, 1)',
          data: this.convertResults([ this._boundary.calcium_max, this._boundary.magnesium_max, this._boundary.chloride_max,
            this._boundary.alkalinity_max, this._boundary.sulfate_max, 150 ]),
          fill: '+1'
        },
        {
          title: "Min",
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 255, 0, 1)',
          data: this.convertResults([ this._boundary.calcium_min, this._boundary.magnesium_min, this._boundary.chloride_min,
            this._boundary.alkalinity_min, this._boundary.sulfate_min, 0 ]),
        },
        {
          title: "Actual",
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 255, 1)',
          data: this.convertResults([ this._current_water.calcium.toFixed(1), this._current_water.magnesium.toFixed(1),
            this._current_water.chloride.toFixed(1), this._current_water.bicarbonate.toFixed(1),
            this._current_water.sulfate.toFixed(1), this._current_water.sodium.toFixed(1) ])
        }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Water Profile Alignment'
        },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 1,
            display: false
          }
        }
      }
    })
  }

  convertResults(input_array): number[] {
    if(input_array[0] === undefined) {
      return [0, 0, 0, 0, 0, 0]
    }
    return [input_array[0] / 150, input_array[1] / 40, input_array[2] / 150,
            input_array[3] / 200, input_array[4] / 400, input_array[5] / 150 ]
  }

}
