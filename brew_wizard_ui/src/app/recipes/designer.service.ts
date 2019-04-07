import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';

import { WaterProfileService } from './../water-profile/water-profile.service';
import { AgentService } from './../water-agent/agent.service';
import { AcidService } from './../acid/acid.service';
import { MaltService } from './../malt/malt.service';
import { HopService } from './../hop/hop.service';
import { MiscellaneousService } from './../miscellaneous/miscellaneous.service';
import { YeastService } from './../yeast/yeast.service';
import { StyleService } from './../style/style.service';
import { RecipeService } from './recipe.service';
import { EquipmentService } from './../equipment/equipment.service';
import { ContactService } from './../static-pages/contact-us/contact.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IWaterProfile } from './../water-profile/water-profile';
import { IWaterAgent } from './../water-agent/agent';
import { IAcid } from './../acid/acid';
import { IMalt } from './../malt/malt';
import { IHop } from './../hop/hop';
import { IYeast } from './../yeast/yeast';
import { IStyle } from './../style/style';
import { IMiscellaneous } from './../miscellaneous/miscellaneous';
import { IRecipe } from './recipe';
import { IEquipment } from './../equipment/equipment';

import * as FileSaver from 'file-saver';


@Injectable()
export class DesignerService {

  bug_report = {
    title: 'Bug Report',
    message: ''
  };

  recipe_user_id: number;

  sliders: { color: number, hoppiness: number, strength: number } = { color: 1, hoppiness: 1, strength: 1 };

  water_profile_select = true;
  water_profile: {
    style: string,
    color: string,
    hoppiness: string,
    strength: string
  } = {
    style: 'ale',
    color: 'pale',
    hoppiness: 'soft',
    strength: 'light'
  };
  recipe: IRecipe;

  // used stuff
  used_waters: IWaterProfile[] = [];
  used_malts: IMalt[] = [];
  used_hops: IHop[] = [];
  used_yeast: IYeast[] = [];
  used_equipment: IEquipment;
  used_style: IStyle;
  used_miscellaneous: IMiscellaneous[] = [];
  used_acids: IAcid[] = [];
  used_sparge_acids: IAcid[] = [];
  used_water_profile: {
    id: number, profile_type: string, strength: string, bitterness: string, bitterness_2: string,
    color: string, calcium_min: number, calcium_max: number, alkalinity_min: number, alkalinity_max: number,
    sulfate_min: number, sulfate_max: number, chloride_min: number, chloride_max: number,
    magnesium_min: number, magnesium_max: number, ra_min: number, ra_max: number, acidify: string
  } = null;
  used_water_ratio = 1;

  strike_amount = 0;
  so4_cl_ratio = 1;
  ra = 0;
  mash_ph = 5.5;

  // lists
  waters: IWaterProfile[] = [];
  agents: IWaterAgent[] = [];
  acids: IAcid[] = [];
  malts: IMalt[] = [];
  maltTypes: any[] = [];
  hops: IHop[] = [];
  yeast: IYeast[] = [];
  styles: IStyle[] = [];
  equipment: IEquipment[] = [];
  miscellaneous: IMiscellaneous[] = [];
  mash_steps: any[] = [];
  water_profiles: {
    id: number, profile_type: string, strength: string, bitterness: string, bitterness_2: string,
    color: string, calcium_min: number, calcium_max: number, alkalinity_min: number, alkalinity_max: number,
    sulfate_min: number, sulfate_max: number, chloride_min: number, chloride_max: number,
    magnesium_min: number, magnesium_max: number, ra_min: number, ra_max: number, acidify: string
  }[] = [];




  // water vars
  target_water: IWaterProfile = null;
  add_water: IWaterProfile;

  add_acid: IAcid;
  add_sparge_acid: IAcid;
  mash_acid = false;
  sparge_acid = false;

  // malt vars
  infusion_step: number;
  add_malt: IMalt;

  // hop vars
  add_hop: IHop;

  // misc vars
  add_misc: IMiscellaneous;

  // yeast vars
  add_yeast: IYeast;

  // checkbox vars
  match_water = true;
  match_agent = true;
  match_malt = true;
  match_hop = true;
  match_misc = true;
  match_yeast = true;

  // settings
  old_recipe: string;

  measurement = {
    temperature: 'us',
    liquid: 'us',
    malts: 'us',
    agents: 'metric',
    hops: 'us',
    pressure: 'us',
    ibu: 'tinseth',
    color: 'srm'
  };

  // detail modals
  detailModal: NgbModalRef;
  detailIndex = 0;

  // loading
  error = false;
  loading_message = 'Loading...';
  loading_waters = true;
  loading_agents = true;
  loading_acids = true;
  loading_mashsteps = true;
  loading_malttypes = true;
  loading_malts = true;
  loading_hops = true;
  loading_miscs = true;
  loading_yeast = true;
  loading_styles = true;
  loading_equipment = true;
  loading_recipe = true;
  loading_measurements = true;
  loading_water_profiles = true;

  constructor(private _waterProfileService: WaterProfileService,
    private _agentService: AgentService, private _maltService: MaltService,
    private _hopService: HopService, private _yeastService: YeastService,
    private _styleService: StyleService, private _equipmentService: EquipmentService,
    private _recipeService: RecipeService, public _router: Router,
    private _userService: UserService, private _miscService: MiscellaneousService,
    private _modalService: NgbModal, private _acidService: AcidService,
    private _contactService: ContactService) { }

  sendContact(contact) {
    this._contactService.sendContact(contact)
      .subscribe((res) => {
        if (res.status === 201) {
          this.bug_report = {
            title: 'Bug Report',
            message: ''
          };
          window.alert('Message sent.');
        }
      },
        err => {
          window.alert('Ironically, there was an error sending your message. Please feel free to yell at us on github.com/buildabeer/buildabeer');
        });
  }

  reset_recipe() {
    this.loading_waters = true;
    this.loading_agents = true;
    this.loading_acids = true;
    this.loading_mashsteps = true;
    this.loading_malttypes = true;
    this.loading_malts = true;
    this.loading_hops = true;
    this.loading_miscs = true;
    this.loading_yeast = true;
    this.loading_styles = true;
    this.loading_equipment = true;
    this.loading_water_profiles = true;
    this.loading_recipe = true;
    this.error = false;

    this.match_water = true;
    this.match_agent = true;
    this.match_malt = true;
    this.match_hop = true;
    this.match_misc = true;
    this.match_yeast = true;

    // used stuff
    this.used_waters = [];
    this.used_malts = [];
    this.used_hops = [];
    this.used_miscellaneous = [];
    this.used_yeast = [];
    this.used_equipment = undefined;
    this.used_style = undefined;
    this.used_acids = [];
    this.used_sparge_acids = [];

    this.measurement = {
      temperature: 'us',
      liquid: 'us',
      malts: 'us',
      agents: 'metric',
      hops: 'us',
      pressure: 'us',
      ibu: 'tinseth',
      color: 'srm'
    };

    // lists
    this.waters = [];
    this.agents = [];
    this.malts = [];
    this.maltTypes = [];
    this.hops = [];
    this.miscellaneous = [];
    this.yeast = [];
    this.styles = [];
    this.equipment = [];
    this.mash_steps = [];
    this.acids = [];

    this.recipe = {
      name: '',
      id: null,
      brewer: '',
      recipe_date: new Date(),
      version: 1,
      batch_size: this.measurement.liquid === 'us' ? 5.5 : 20,
      boil_time: 60,
      equipment_id: null,
      water_profile_id: null,
      target_water_id: null,
      style_id: null,
      notes: '',
      description: '',
      taste_notes: '',
      sparge_type: 'batch',
      mash_type: 'none',
      global: false,
      storage_type: 'bottle',
      storage_temperature: this.checkFahrenheitToCelsius(45),
      carbonation_volumes: 2.4,
      carbonation_with: 'cornsugar',
      primary_ferm_temp: this.checkFahrenheitToCelsius(50),
      secondary_ferm_temp: this.checkFahrenheitToCelsius(50),
      recipe_waters_attributes: [],
      recipe_water_agents_attributes: [],
      recipe_acids_attributes: [],
      recipe_sparge_acids_attributes: [],
      recipe_malts_attributes: [],
      recipe_hops_attributes: [],
      recipe_miscellaneous_attributes: [],
      recipe_yeasts_attributes: [],
      recipe_mashes_attributes: [],
      yeast_starters_attributes: [],
      mash_ratio: this.checkMashRatioUnits(2.0),
      secondary_fermentation: false,
      primary_ferm_days: 14,
      secondary_ferm_days: 30,
      efficiency: this.used_equipment ? this.used_equipment.efficiency : 72,
      recipe_type: 'All Grain',
      user_nickname: ''
    };

    this.old_recipe = undefined;
    this.setStrikeAmount();
  }

  init(new_recipe) {
    this.reset_recipe();

    this._waterProfileService.getWaterProfiles()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(profileData => {
        this.waters = profileData;

        if (!this.target_water) {
          if (this.recipe.target_water_id) {
            this.waters.some((water) => {
              if (water.id === this.recipe.target_water_id) {
                this.target_water = water;
                return true;
              }
            });
          } else {
            this.target_water = this.waters[0];
          }
        }

        if (!this.used_waters[0]) {
          this.waters.some((wp) => {
            if (wp.name === 'Distilled Water') {
              this.used_waters.push(wp);
              this.recipe.recipe_waters_attributes
                .push({ 'water_id': wp.id, 'quantity': this.checkGallonsToLiters(this.estimateGallonsNeeded()), 'id': null, 'boil': false });
              return true;
            }
          });
        }

        this.loading_waters = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    if (new_recipe) {
      this.loading_recipe = false;

      this._agentService.getAgents()
        .retryWhen((err) => {
          return err.scan((retryCount) => {
            retryCount++;
            if (retryCount < 3) {
              return retryCount;
            } else {
              throw (err);
            }
          }, 0).delay(1000);
        })
        .subscribe(agentData => {
          this.agents = agentData;

          agentData.forEach((agent) => {
            this.recipe.recipe_water_agents_attributes.push({ 'id': null, 'water_agent_id': agent.id, 'quantity': 0 });
          });
          this.loading_agents = false;
        },
          error => {
            this.error = true;
            console.error(error);
          });

      this._maltService.getMashSteps()
        .retryWhen((err) => {
          return err.scan((retryCount) => {
            retryCount++;
            if (retryCount < 3) {
              return retryCount;
            } else {
              throw (err);
            }
          }, 0).delay(1000);
        })
        .subscribe(mashStepData => {
          this.mash_steps = mashStepData;
          mashStepData.forEach((step, i) => {
            this.recipe.recipe_mashes_attributes.push({
              name: step.name,
              mash_step_id: step.id,
              id: null,
              used: false,
              temperature: this.checkFahrenheitToCelsius(Math.round((step.max_temp - step.min_temp) / 2 + step.min_temp)),
              time: Math.round((step.max_time - step.min_time) / 2 + step.min_time)
            });
            if (step.name === 'Alpha- and Beta-Amylase') {
              this.infusion_step = i;
            }
          });
          this.loading_mashsteps = false;
        },
          error => {
            this.error = true;
            console.error(error);
          });
    }

    this._acidService.getAcids()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(acidData => {
        this.acids = acidData;
        this.loading_acids = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._maltService.getTypes()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(maltTypeData => {
        this.maltTypes = maltTypeData;
        this.loading_malttypes = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._maltService.getMalts()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(maltData => {
        this.malts = maltData;
        this.loading_malts = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._hopService.getHops()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(hopData => {
        this.hops = hopData;
        this.loading_hops = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._miscService.getMiscellanies()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(miscData => {
        this.miscellaneous = miscData;
        this.loading_miscs = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._yeastService.getYeasts()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(yeastData => {
        this.yeast = yeastData;
        this.loading_yeast = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._styleService.getStyles()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(styleData => {
        this.styles = styleData;
        if (!this.used_style) {
          if (this.recipe.style_id) {
            this.styles.some((style) => {
              if (style.id === this.recipe.style_id) {
                this.used_style = style;
                return true;
              }
            });
          } else {
            this.used_style = this.styles[0];
          }
          this.recipe.carbonation_volumes = Math.round(
            ((this.used_style.max_carb - this.used_style.min_carb) / 2 + this.used_style.min_carb) * 10) / 10;
        }

        if (this.water_profiles) {
          this.water_profiles.some((wp) => {
            if (wp.id === this.used_style.water_profile_id) {
              this.used_water_profile = wp;

              this.water_profile.style = wp.profile_type;
              this.setSliders(wp);
              return true;
            }
          });
        }

        this.loading_styles = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._equipmentService.getEquipments()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(equipmentData => {
        this.equipment = equipmentData;
        this.used_equipment = this.equipment[0];
        this.recipe.efficiency = this.used_equipment.efficiency;
        this.loading_equipment = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._waterProfileService.getStyleWaterProfiles()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(profileData => {
        this.water_profiles = profileData;
        if (this.used_style) {
          profileData.some((wp) => {
            if (wp.id === this.used_style.water_profile_id) {
              this.used_water_profile = wp;

              this.water_profile.style = wp.profile_type;
              this.setSliders(wp);
              return true;
            }
          });
        }
        this.loading_water_profiles = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });

    this._userService.getSettings()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(settingData => {
        if (settingData !== null) {
          this.measurement = settingData;
        }
        this.loading_measurements = false;
      },
        error => {
          this.error = true;
          console.error(error);
        });
  }

  loadRecipe(recipeId): void {
    this.init(false);
    this.recipe = {
      name: '',
      id: null,
      brewer: '',
      recipe_date: new Date(),
      version: 1,
      batch_size: this.measurement.liquid === 'us' ? 5.5 : 20,
      boil_time: 60,
      equipment_id: null,
      water_profile_id: null,
      target_water_id: null,
      style_id: null,
      notes: '',
      description: '',
      taste_notes: '',
      sparge_type: 'none',
      mash_type: 'none',
      global: false,
      storage_type: 'bottle',
      storage_temperature: this.checkFahrenheitToCelsius(45),
      carbonation_volumes: 2.4,
      carbonation_with: 'cornsugar',
      primary_ferm_temp: this.checkFahrenheitToCelsius(50),
      secondary_ferm_temp: this.checkFahrenheitToCelsius(50),
      recipe_waters_attributes: [],
      recipe_water_agents_attributes: [],
      recipe_acids_attributes: [],
      recipe_sparge_acids_attributes: [],
      recipe_malts_attributes: [],
      recipe_hops_attributes: [],
      recipe_miscellaneous_attributes: [],
      recipe_yeasts_attributes: [],
      recipe_mashes_attributes: [],
      yeast_starters_attributes: [],
      mash_ratio: this.checkMashRatioUnits(2.0),
      secondary_fermentation: false,
      primary_ferm_days: 14,
      secondary_ferm_days: 30,
      efficiency: this.used_equipment ? this.used_equipment.efficiency : 72,
      recipe_type: 'All Grain',
      user_nickname: ''
    };

    this._recipeService.getRecipe(recipeId)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            this.error = true;
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(recipeData => {
        this.recipe.name = recipeData.name;
        this.recipe_user_id = recipeData.user_id;
        this.recipe.id = recipeData.id;
        this.recipe.brewer = recipeData.brewer;
        this.recipe.recipe_date = recipeData.recipe_date;
        this.recipe.version = recipeData.version;
        this.recipe.batch_size = this.checkGallonsToLiters(recipeData.batch_size);
        this.recipe.boil_time = recipeData.boil_time;
        this.recipe.equipment_id = recipeData.equipment_id;
        this.recipe.water_profile_id = recipeData.water_profile_id;
        this.recipe.target_water_id = recipeData.target_water_id;
        this.recipe.style_id = recipeData.style_id;
        this.recipe.notes = recipeData.notes;
        this.recipe.description = recipeData.description;
        this.recipe.taste_notes = recipeData.taste_notes;
        this.recipe.sparge_type = recipeData.sparge_type;
        this.recipe.global = recipeData.global;
        this.recipe.storage_type = recipeData.storage_type;
        this.recipe.storage_temperature = this.checkFahrenheitToCelsius(recipeData.storage_temperature);
        this.recipe.carbonation_volumes = recipeData.carbonation_volumes;
        this.recipe.carbonation_with = recipeData.carbonation_with;
        this.recipe.primary_ferm_temp = this.checkFahrenheitToCelsius(recipeData.primary_ferm_temp);
        this.recipe.secondary_ferm_temp = this.checkFahrenheitToCelsius(recipeData.secondary_ferm_temp);
        this.recipe.mash_ratio = this.checkMashRatioUnits(recipeData.mash_ratio);
        this.recipe.secondary_fermentation = recipeData.secondary_fermentation;
        this.recipe.primary_ferm_days = recipeData.primary_ferm_days;
        this.recipe.secondary_ferm_days = recipeData.secondary_ferm_days;
        this.recipe.efficiency = recipeData.efficiency;
        this.recipe.recipe_type = recipeData.recipe_type;
        this.recipe.mash_type = recipeData.mash_type;
        this.recipe.yeast_starters_attributes = recipeData.yeast_starters;

        this.used_waters = recipeData.waters;
        this.used_hops = recipeData.hops;
        this.used_miscellaneous = recipeData.miscellaneous;
        this.used_yeast = recipeData.yeasts;
        this.used_acids = recipeData.acids;
        this.used_sparge_acids = recipeData.sparge_acids;

        this.used_acids.forEach((used_acid, i) => {
          this.acids.some((acid) => {
            if (acid.name === used_acid.name) {
              this.used_acids[i] = acid;
              return true;
            }
          });
        });

        this.used_sparge_acids.forEach((used_acid, i) => {
          this.acids.some((acid) => {
            if (acid.name === used_acid.name) {
              this.used_sparge_acids[i] = acid;
              return true;
            }
          });
        });

        this.used_waters.forEach((used_water, i) => {
          this.waters.some((water) => {
            if (water.name === used_water.name) {
              this.used_waters[i] = water;
              return true;
            }
          });
        });

        this.equipment.some((equip) => {
          if (equip.id === this.recipe.equipment_id) {
            this.used_equipment = equip;
            return true;
          }
        });

        this.water_profiles.some((wp) => {
          if (wp.id === this.recipe.water_profile_id) {
            this.used_water_profile = wp;

            this.water_profile.style = wp.profile_type;
            this.setSliders(wp);
            return true;
          }
        });

        this.styles.some((style) => {
          if (style.id === this.recipe.style_id) {
            this.used_style = style;
            this.recipe.carbonation_volumes = (style.max_carb - style.min_carb) / 2 + style.min_carb;
            return true;
          }
        });

        this.waters.some((water) => {
          if (water.id === this.recipe.target_water_id) {
            this.target_water = water;
            return true;
          }
        });

        if (this.target_water === null) {
          this.target_water = undefined;
        }

        this.recipe.recipe_waters_attributes = recipeData.recipe_waters;

        this.recipe.recipe_malts_attributes = recipeData.recipe_malts;
        this.recipe.recipe_malts_attributes.forEach((recipe_malt) => {
          recipeData.malts.some((used_malt) => {
            if (recipe_malt.malt_id === used_malt.id) {
              this.used_malts.push(used_malt);
              return true;
            }
          });
        });

        this.recipe.recipe_hops_attributes = recipeData.recipe_hops;

        if (this.measurement.liquid !== 'us') {
          this.recipe.recipe_waters_attributes.forEach((recipe_water) => {
            recipe_water.quantity = this.checkGallonsToLiters(recipe_water.quantity);
          });
          this.recipe.recipe_malts_attributes.forEach((recipe_malt) => {
            recipe_malt.quantity = this.checkPoundsToGrams(recipe_malt.quantity, 'malts');
            recipe_malt.color = this.checkColor(recipe_malt.color);
          });
          this.recipe.recipe_hops_attributes.forEach((recipe_hop) => {
            recipe_hop.quantity = this.checkPoundsToGrams(recipe_hop.quantity, 'hops');
          });
        }
        this.setStrikeAmount();

        this.recipe.recipe_miscellaneous_attributes = recipeData.recipe_miscellaneous;
        this.recipe.recipe_miscellaneous_attributes.forEach((recipe_misc) => {
          if (recipe_misc.time >= 24 * 60) {
            recipe_misc.time_label = 'Days';
            recipe_misc.time = recipe_misc.time / 24 / 60;
          } else if (recipe_misc.time >= 60) {
            recipe_misc.time_label = 'Hours';
            recipe_misc.time = recipe_misc.time / 60;
          } else {
            recipe_misc.time_label = 'Minutes';
          }
        });

        this.recipe.recipe_yeasts_attributes = recipeData.recipe_yeasts;
        this.recipe.recipe_acids_attributes = recipeData.recipe_acids;
        this.recipe.recipe_sparge_acids_attributes = recipeData.recipe_sparge_acids;

        this._agentService.getAgents()
          .retryWhen((err) => {
            return err.scan((retryCount) => {
              retryCount++;
              if (retryCount < 3) {
                return retryCount;
              } else {
                throw (err);
              }
            }, 0).delay(1000);
          })
          .subscribe(agentData => {
            this.agents = agentData;
            agentData.forEach((agent, i) => {
              const new_agent = { 'id': null, 'water_agent_id': agent.id, 'quantity': 0 };
              recipeData.recipe_water_agents.some((used_agent) => {
                if (used_agent.water_agent_id === new_agent.water_agent_id) {
                  new_agent.id = used_agent.id;
                  new_agent.quantity = this.checkPoundsToGrams(used_agent.quantity, 'agents');
                  return true;
                }
              });
              this.recipe.recipe_water_agents_attributes.push(new_agent);
            });
            this.loading_agents = false;
          },
            error => {
              this.error = true;
              console.error(error);
            });

        this._maltService.getMashSteps()
          .retryWhen((err) => {
            return err.scan((retryCount) => {
              retryCount++;
              if (retryCount < 3) {
                return retryCount;
              } else {
                throw (err);
              }
            }, 0).delay(1000);
          })
          .subscribe(mashStepData => {
            this.mash_steps = mashStepData;
            mashStepData.forEach((step, i) => {
              this.recipe.recipe_mashes_attributes.push({
                name: step.name,
                mash_step_id: step.id,
                id: null,
                used: false,
                temperature: this.checkFahrenheitToCelsius(Math.round((step.max_temp - step.min_temp) / 2 + step.min_temp)),
                time: Math.round((step.max_time - step.min_time) / 2 + step.min_time)
              });
              if (step.name === 'Alpha- and Beta-Amylase') {
                this.infusion_step = i;
              }
            });

            recipeData.recipe_mashes.forEach((used_step) => {
              this.recipe.recipe_mashes_attributes.forEach((step) => {
                if (used_step.mash_step_id === step.mash_step_id) {
                  step.id = used_step.id;
                  step.used = true;
                  step.temperature = this.checkFahrenheitToCelsius(used_step.temperature);
                  step.time = used_step.time;
                }
              });
            });
            this.loading_mashsteps = false;
          },
            error => {
              this.error = true;
              console.error(error);
            });

        this.loading_recipe = false;
      },
        error => {
          if (error.status === 401) {
            console.error('You must log in first.');
          } else {
            console.error('Problem with the service. Please try again later.');
          }
          this.error = true;
          console.error(error);
        });
  }

  loadRecipeCopy(recipeId): void {
    this.init(false);
    this.recipe = {
      name: '',
      id: null,
      brewer: '',
      recipe_date: new Date(),
      version: 1,
      batch_size: this.measurement.liquid === 'us' ? 5.5 : 20,
      boil_time: 60,
      equipment_id: null,
      water_profile_id: null,
      target_water_id: null,
      style_id: null,
      notes: '',
      description: '',
      taste_notes: '',
      sparge_type: 'none',
      mash_type: 'none',
      global: false,
      storage_type: 'bottle',
      storage_temperature: this.checkFahrenheitToCelsius(45),
      carbonation_volumes: 2.4,
      carbonation_with: 'cornsugar',
      primary_ferm_temp: this.checkFahrenheitToCelsius(50),
      secondary_ferm_temp: this.checkFahrenheitToCelsius(50),
      recipe_waters_attributes: [],
      recipe_water_agents_attributes: [],
      recipe_acids_attributes: [],
      recipe_sparge_acids_attributes: [],
      recipe_malts_attributes: [],
      recipe_hops_attributes: [],
      recipe_miscellaneous_attributes: [],
      recipe_yeasts_attributes: [],
      recipe_mashes_attributes: [],
      yeast_starters_attributes: [],
      mash_ratio: this.checkMashRatioUnits(2.0),
      secondary_fermentation: false,
      primary_ferm_days: 14,
      secondary_ferm_days: 30,
      efficiency: this.used_equipment ? this.used_equipment.efficiency : 72,
      recipe_type: 'All Grain',
      user_nickname: ''
    };

    this._recipeService.getRecipe(recipeId)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            this.error = true;
            throw (err);
          }
        }, 0).delay(1000);
      })
      .subscribe(recipeData => {
        this.recipe.name = recipeData.name + ' - Copy';
        this.recipe_user_id = recipeData.user_id;
        this.recipe.id = recipeData.id;
        this.recipe.brewer = recipeData.brewer;
        this.recipe.recipe_date = recipeData.recipe_date;
        this.recipe.version = recipeData.version;
        this.recipe.batch_size = this.checkGallonsToLiters(recipeData.batch_size);
        this.recipe.boil_time = recipeData.boil_time;
        this.recipe.equipment_id = recipeData.equipment_id;
        this.recipe.water_profile_id = recipeData.water_profile_id;
        this.recipe.target_water_id = recipeData.target_water_id;
        this.recipe.style_id = recipeData.style_id;
        this.recipe.notes = recipeData.notes;
        this.recipe.description = recipeData.description;
        this.recipe.taste_notes = recipeData.taste_notes;
        this.recipe.sparge_type = recipeData.sparge_type;
        this.recipe.global = recipeData.global;
        this.recipe.storage_type = recipeData.storage_type;
        this.recipe.storage_temperature = this.checkFahrenheitToCelsius(recipeData.storage_temperature);
        this.recipe.carbonation_volumes = recipeData.carbonation_volumes;
        this.recipe.carbonation_with = recipeData.carbonation_with;
        this.recipe.primary_ferm_temp = this.checkFahrenheitToCelsius(recipeData.primary_ferm_temp);
        this.recipe.secondary_ferm_temp = this.checkFahrenheitToCelsius(recipeData.secondary_ferm_temp);
        this.recipe.mash_ratio = this.checkMashRatioUnits(recipeData.mash_ratio);
        this.recipe.secondary_fermentation = recipeData.secondary_fermentation;
        this.recipe.primary_ferm_days = recipeData.primary_ferm_days;
        this.recipe.secondary_ferm_days = recipeData.secondary_ferm_days;
        this.recipe.efficiency = recipeData.efficiency;
        this.recipe.recipe_type = recipeData.recipe_type;
        this.recipe.mash_type = recipeData.mash_type;
        this.recipe.yeast_starters_attributes = recipeData.yeast_starters;

        this.used_waters = recipeData.waters;
        this.used_acids = recipeData.acids;
        this.used_sparge_acids = recipeData.sparge_acids;
        this.used_hops = recipeData.hops;
        this.used_miscellaneous = recipeData.miscellaneous;
        this.used_yeast = recipeData.yeasts;

        this.used_acids.forEach((used_acid, i) => {
          this.acids.some((acid) => {
            if (acid.name === used_acid.name) {
              this.used_acids[i] = acid;
              return true;
            }
          });
        });

        this.used_sparge_acids.forEach((used_acid, i) => {
          this.acids.some((acid) => {
            if (acid.name === used_acid.name) {
              this.used_sparge_acids[i] = acid;
              return true;
            }
          });
        });

        this.used_waters.forEach((used_water, i) => {
          this.waters.some((water) => {
            if (water.name === used_water.name) {
              this.used_waters[i] = water;
              return true;
            }
          });
        });

        this.equipment.some((equip) => {
          if (equip.id === this.recipe.equipment_id) {
            this.used_equipment = equip;
            return true;
          }
        });
        this.water_profiles.some((wp) => {
          if (wp.id === this.recipe.water_profile_id) {
            this.used_water_profile = wp;

            this.water_profile.style = wp.profile_type;
            this.setSliders(wp);
            return true;
          }
        });
        this.styles.some((style) => {
          if (style.id === this.recipe.style_id) {
            this.used_style = style;
            this.recipe.carbonation_volumes = (style.max_carb - style.min_carb) / 2 + style.min_carb;
            return true;
          }
        });

        this.waters.some((water) => {
          if (water.id === this.recipe.target_water_id) {
            this.target_water = water;
            return true;
          }
        });

        if (this.target_water === null) {
          this.target_water = undefined;
        }

        this.recipe.recipe_waters_attributes = recipeData.recipe_waters;

        this.recipe.recipe_malts_attributes = recipeData.recipe_malts;
        this.recipe.recipe_malts_attributes.forEach((recipe_malt) => {
          recipeData.malts.some((used_malt) => {
            if (recipe_malt.malt_id === used_malt.id) {
              this.used_malts.push(used_malt);
              return true;
            }
          });
        });

        this.recipe.recipe_hops_attributes = recipeData.recipe_hops;

        if (this.measurement.liquid !== 'us') {
          this.recipe.recipe_waters_attributes.forEach((recipe_water) => {
            recipe_water.quantity = this.checkGallonsToLiters(recipe_water.quantity);
          });
          this.recipe.recipe_malts_attributes.forEach((recipe_malt) => {
            recipe_malt.quantity = this.checkPoundsToGrams(recipe_malt.quantity, 'malts');
            recipe_malt.color = this.checkColor(recipe_malt.color);
          });
          this.recipe.recipe_hops_attributes.forEach((recipe_hop) => {
            recipe_hop.quantity = this.checkPoundsToGrams(recipe_hop.quantity, 'hops');
          });
        }
        this.setStrikeAmount();

        this.recipe.recipe_miscellaneous_attributes = recipeData.recipe_miscellaneous;
        this.recipe.recipe_miscellaneous_attributes.forEach((recipe_misc) => {
          if (recipe_misc.time >= 24 * 60) {
            recipe_misc.time_label = 'Days';
            recipe_misc.time = recipe_misc.time / 24 / 60;
          } else if (recipe_misc.time >= 60) {
            recipe_misc.time_label = 'Hours';
            recipe_misc.time = recipe_misc.time / 60;
          } else {
            recipe_misc.time_label = 'Minutes';
          }
        });

        this.recipe.recipe_yeasts_attributes = recipeData.recipe_yeasts;
        this.recipe.recipe_acids_attributes = recipeData.recipe_acids;
        this.recipe.recipe_sparge_acids_attributes = recipeData.recipe_sparge_acids;

        this._agentService.getAgents()
          .retryWhen((err) => {
            return err.scan((retryCount) => {
              retryCount++;
              if (retryCount < 3) {
                return retryCount;
              } else {
                throw (err);
              }
            }, 0).delay(1000);
          })
          .subscribe(agentData => {
            this.agents = agentData;
            agentData.forEach((agent, i) => {
              const new_agent = { 'id': null, 'water_agent_id': agent.id, 'quantity': 0 };
              recipeData.recipe_water_agents.some((used_agent) => {
                if (used_agent.water_agent_id === new_agent.water_agent_id) {
                  new_agent.id = used_agent.id;
                  new_agent.quantity = this.checkPoundsToGrams(used_agent.quantity, 'agents');
                  return true;
                }
              });
              this.recipe.recipe_water_agents_attributes.push(new_agent);
            });
            this.loading_agents = false;
            this.clearIds();
          },
            error => {
              this.error = true;
              console.error(error);
            });

        this._maltService.getMashSteps()
          .retryWhen((err) => {
            return err.scan((retryCount) => {
              retryCount++;
              if (retryCount < 3) {
                return retryCount;
              } else {
                throw (err);
              }
            }, 0).delay(1000);
          })
          .subscribe(mashStepData => {
            this.mash_steps = mashStepData;
            mashStepData.forEach((step, i) => {
              this.recipe.recipe_mashes_attributes.push({
                name: step.name,
                mash_step_id: step.id,
                id: null,
                used: false,
                temperature: this.checkFahrenheitToCelsius(Math.round((step.max_temp - step.min_temp) / 2 + step.min_temp)),
                time: Math.round((step.max_time - step.min_time) / 2 + step.min_time)
              });
              if (step.name === 'Alpha- and Beta-Amylase') {
                this.infusion_step = i;
              }
            });

            recipeData.recipe_mashes.forEach((used_step) => {
              this.recipe.recipe_mashes_attributes.forEach((step) => {
                if (used_step.mash_step_id === step.mash_step_id) {
                  step.id = used_step.id;
                  step.used = true;
                  step.temperature = this.checkFahrenheitToCelsius(used_step.temperature);
                  step.time = used_step.time;
                }
              });
            });
            this.loading_mashsteps = false;
            this.clearIds();
          },
            error => {
              this.error = true;
              console.error(error);
            });

        this.loading_recipe = false;
      },
        error => {
          if (error.status === 401) {
            console.error('You must log in first.');
          } else {
            console.error('Problem with the service. Please try again later.');
          }
          this.error = true;
          console.error(error);
        });
  }

  setLoadingMessage() {
    if (this.loading_waters) {
      this.loading_message = 'Loading water...';
      return;
    }
    if (this.loading_agents) {
      this.loading_message = 'Loading water agents...';
      return;
    }
    if (this.loading_acids) {
      this.loading_message = 'Loading acids...';
      return;
    }
    if (this.loading_mashsteps) {
      this.loading_message = 'Loading mash steps...';
      return;
    }
    if (this.loading_malttypes) {
      this.loading_message = 'Loading fermentable types...';
      return;
    }
    if (this.loading_malts) {
      this.loading_message = 'Loading fermentables...';
      return;
    }
    if (this.loading_styles) {
      this.loading_message = 'Loading styles...';
      return;
    }
    if (this.loading_equipment) {
      this.loading_message = 'Loading equipment...';
      return;
    }
    if (this.loading_water_profiles) {
      this.loading_message = 'Loading water profiles...';
      return;
    }
    if (this.loading_recipe) {
      this.loading_message = 'Loading recipe...';
      return;
    }
    if (this.loading_measurements) {
      this.loading_message = 'Loading measurements...';
      return;
    }
    if (this.loading_hops) {
      this.loading_message = 'Loading hops...';
      return;
    }
    if (this.loading_yeast) {
      this.loading_message = 'Loading yeast...';
      return;
    }
  }

  isLoading(): boolean {
    if (this.loading_waters || this.loading_agents || this.loading_mashsteps ||
      this.loading_malttypes || this.loading_malts || this.loading_hops ||
      this.loading_yeast || this.loading_styles || this.loading_equipment ||
      this.loading_recipe || this.loading_measurements || this.loading_water_profiles ||
      this.loading_acids) {
      this.setLoadingMessage();

      return true;
    }

    if (!this.old_recipe) {
      this.old_recipe = JSON.stringify(this.recipe);
    }
    return false;
  }

  // water

  styleChange(event): void {
    this.water_profiles.some((wp) => {
      if (wp.id === event.water_profile_id) {
        this.used_water_profile = wp;
        this.water_profile.style = wp.profile_type;

        this.setSliders(wp);

        return true;
      }
    });
  }

  setSliders(wp): void {
    if (wp.color === 'pale') {
      this.sliders.color = 1;
    } if (wp.color === 'amber') {
      this.sliders.color = 2;
    } else {
      this.sliders.color = 3;
    }

    if (wp.bitterness === 'soft') {
      this.sliders.hoppiness = 1;
    } if (wp.bitterness === 'moderate') {
      this.sliders.hoppiness = 2;
    } else {
      this.sliders.hoppiness = 3;
    }

    if (wp.strength === 'light') {
      this.sliders.strength = 1;
    } if (wp.strength === 'medium') {
      this.sliders.strength = 2;
    } else {
      this.sliders.strength = 3;
    }

    this.setProfileData();
  }

  setProfileData(): void {
    if (this.sliders.color === 1) {
      this.water_profile.color = 'pale';
    } else if (this.sliders.color === 2) {
      this.water_profile.color = 'amber';
    } else {
      this.water_profile.color = 'brown/black';
    }

    if (this.sliders.hoppiness === 1) {
      this.water_profile.hoppiness = 'soft';
    } else if (this.sliders.hoppiness === 2) {
      this.water_profile.hoppiness = 'moderate';
    } else {
      this.water_profile.hoppiness = 'assertive';
    }

    if (this.sliders.strength === 1) {
      this.water_profile.strength = 'light';
    } else if (this.sliders.strength === 2) {
      this.water_profile.strength = 'medium';
    } else {
      this.water_profile.strength = 'strong';
    }
  }

  sliderChange(event): void {
    this.setProfileData();

    this.water_profiles.some((wp) => {
      if (wp.profile_type === this.water_profile.style && wp.color === this.water_profile.color &&
        (wp.bitterness === this.water_profile.hoppiness || wp.bitterness_2 === this.water_profile.hoppiness) &&
        wp.strength === this.water_profile.strength) {
        this.used_water_profile = wp;
        return true;
      }
    });
  }

  onAddWaterProfile(add_water): void {
    setTimeout(() => {
      this.add_water = null;
    });

    if (!this.used_waters.includes(add_water)) {
      this.used_waters.push(add_water);
      this.recipe.recipe_waters_attributes.push({ 'water_id': add_water.id, 'quantity': 0, 'id': null, 'boil': false });
      if (this.addWaterGallons() < this.estimateGallonsNeeded()) {
        this.recipe.recipe_waters_attributes[this.recipe.recipe_waters_attributes.length - 1].quantity = this.checkGallonsToLiters(
          Math.round(10 * (this.estimateGallonsNeeded() - this.addWaterGallons())) / 10);
      }
    }
  }

  onAddAcid(add_acid, stage): void {
    setTimeout(() => {
      this.add_acid = null;
    });

    if (!this.used_acids.includes(add_acid)) {
      this.used_acids.push(add_acid);
      this.recipe.recipe_acids_attributes.push({ 'acid_id': add_acid.id, 'quantity': 0, 'id': null });
    }
  }

  onAddSpargeAcid(add_sparge_acid, stage): void {
    setTimeout(() => {
      this.add_sparge_acid = null;
    });

    if (!this.used_sparge_acids.includes(add_sparge_acid)) {
      this.used_sparge_acids.push(add_sparge_acid);
      this.recipe.recipe_sparge_acids_attributes.push({ 'acid_id': add_sparge_acid.id, 'quantity': 0, 'id': null });
    }
  }

  removeWater(remove_water): void {
    const index = this.used_waters.indexOf(remove_water);
    if (index > -1) {
      this.used_waters.splice(index, 1);
      this.recipe.recipe_waters_attributes.splice(index, 1);
    }
    this.waterAutoOnChange();
  }

  waterProfileTitle(w): string {
    if (!w) {
      return '';
    }
    const message: string[] = [w.name + '\n', 'pH: ' + w.ph, 'Calcium: ' + w.calcium, 'Magnesium: ' +
      w.magnesium, 'Sodium: ' + w.sodium, 'Sulfate: ' + w.sulfate, 'Chloride: ' +
    w.chloride, 'Bicarbonate: ' + w.bicarbonate, '\n' + (w.description ? w.description : 'No description')];
    return message.join(' ');
  }

  waterAgentTitle(w): string {
    const message: string = w.name + '\n' + (w.description ? (w.description + '\n') : '') +
      'pH: ' + w.ph.toString() + ' Calcium: ' + w.calcium.toString() + ' Magnesium: ' +
      w.magnesium.toString() + ' Sodium: ' + w.sodium.toString() + ' Sulfate: ' + w.sulfate.toString() + ' Chloride: ' +
      w.chloride.toString() + ' Bicarbonate: ' + w.bicarbonate.toString();
    return message;
  }

  agentTitle(agent: string): string {
    let returnString = 'No information available.';
    switch (agent) {
      case 'main':
        returnString = 'The warnings on this table are given as a general guideline \
        for what is acceptable levels. There are times where it is acceptable not to match these levels.';
        break;
      case 'ph':
        returnString = 'A log scale that measures the acidity or alkalinity of \
        a solution. A 7 is neutral or balance, 1-6 are acidic, 8-12 are basic.';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 5 and 9.5.';
        }
        break;
      case 'ca':
        returnString = 'Primary contributor to hardness, it plays a critical role in mashing and brew chemistry.';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 5 and 150.';
        }
        break;
      case 'mg':
        returnString = 'Secondary mineral of hardness. It is an enzyme cofactor and yeast nutrient.\
         It accentuates beer flavor in the right portions.';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 10 and 30.\
           It should never be greater than 125, at that point it is a diuretic and cathartic';
        }
        break;
      case 'na':
        returnString = 'Contributes sour, salty taste that can accentuate beer flavors at reasonable levels.';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 2 and 150.';
        }
        break;
      case 'so4':
        returnString = 'Produces a dry, fuller flavor with some sharpness.';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 20 and 400.';
        }
        break;
      case 'cl':
        returnString = 'Enhances beer flavor and palate fullness.\
         It increases the perception of sweetness, or mellowness. It also increases beer stability and improves clarity';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 1 and 150.';
        }
        break;
      case 'hco3':
        returnString = 'Usually expressed as alkalinity, it raises the pH and contributes harsh, bitter flavor.';
        if (!this.agentPortion(agent)) {
          returnString += '\n\nThe usual levels are between 30 and 200.';
        }
        break;
    }

    return returnString;
  }

  agentPortion(agent: string): boolean {
    switch (agent) {
      case 'ph':
        return !this.currentWater() || (this.currentWater().ph >= 5 && this.currentWater().ph <= 9.5);
      case 'ca':
        return !this.currentWater() || (this.currentWater().calcium >= 5 && this.currentWater().calcium <= 150);
      case 'mg':
        return !this.currentWater() || (this.currentWater().magnesium >= 10 && this.currentWater().magnesium <= 40);
      case 'na':
        return !this.currentWater() || (this.currentWater().sodium >= 2 && this.currentWater().sodium <= 150);
      case 'so4':
        return !this.currentWater() || (this.currentWater().sulfate >= 20 && this.currentWater().sulfate <= 400);
      case 'cl':
        return !this.currentWater() || (this.currentWater().chloride >= 1 && this.currentWater().chloride <= 150);
      case 'hco3':
        return !this.currentWater() || (this.currentWater().bicarbonate >= 30 && this.currentWater().bicarbonate <= 200);
    }

    return true;
  }

  getActiveAgents(): any {
    const activeAgents: { water_agent_id: number, id: number, name: string, quantity: number }[] = [];

    for (let i = 0; i < this.agents.length; i++) {
      if (this.recipe.recipe_water_agents_attributes[i].quantity > 0) {
        activeAgents.push({
          'water_agent_id': this.recipe.recipe_water_agents_attributes[i].water_agent_id,
          'name': this.agents[i].name,
          'quantity': this.recipe.recipe_water_agents_attributes[i].quantity,
          'id': this.recipe.recipe_water_agents_attributes[i].id
        });
      }
    }

    return activeAgents;
  }

  addWaterGallons(): number {
    let sum = 0;
    this.recipe.recipe_waters_attributes.forEach((water) => {
      sum += this.inputConversion(water.quantity, 'liquid');
    });
    return sum;
  }

  estimatedPostBoilGallons(): number {
    if (this.recipe.batch_size === null) {
      return this.used_equipment.wl_boil;
    }

    if (this.used_equipment) {
      return this.inputConversion(this.recipe.batch_size, 'liquid')
        + this.used_equipment.wl_boil + (this.recipe.secondary_fermentation ? .1 : 0);
    }
    return this.inputConversion(this.recipe.batch_size, 'liquid') + (this.recipe.secondary_fermentation ? .1 : 0);
  }

  estimatePreGallons(): number {
    if (this.used_equipment) {
      return this.estimatedPostBoilGallons() + this.used_equipment.boil_rate * this.recipe.boil_time / 60;
    }
    return this.estimatedPostBoilGallons();
  }

  estimateGallonsNeeded(): number {
    if (this.used_equipment) {
      return this.estimatePreGallons() +
        (this.recipe.recipe_type === 'All Grain' ? this.used_equipment.wl_mash : 0) +
        (this.recipe.recipe_type === 'All Grain' ? this.used_equipment.wl_hlt : 0) +
        this.getTotalGrainAbsorption();
    }
    return this.estimatePreGallons();
  }

  currentWater(): IWaterProfile {
    const total_gallons: number = this.addWaterGallons();
    const current_water: IWaterProfile = {
      id: 0,
      user_id: 0,
      name: 'Current Water Mix',
      ph: 0,
      calcium: 0,
      magnesium: 0,
      sodium: 0,
      sulfate: 0,
      chloride: 0,
      bicarbonate: 0,
      description: 'The current mix of the water profiles you have selected.',
      global: false,
      recipe_count: 0
    };

    if (this.used_waters.length === 0 || this.recipe.recipe_waters_attributes.length === 0) {
      return undefined;
    }

    this.used_waters.forEach((profile, i) => {
      let calcium_to_add = profile.calcium;
      let hco3final = profile.bicarbonate;

      if (this.recipe.recipe_waters_attributes[i].boil && profile.bicarbonate > 80) {
        hco3final = (profile.calcium < (profile.bicarbonate / 2) ? 80 : 61);
        calcium_to_add = profile.calcium - (profile.bicarbonate - hco3final) / 3.05;
      }
      current_water.ph += (Math.pow(10, profile.ph) * this.inputConversion(
        this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
      current_water.calcium += (calcium_to_add * this.inputConversion(this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
      current_water.magnesium += (profile.magnesium * this.inputConversion(this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
      current_water.sodium += (profile.sodium * this.inputConversion(this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
      current_water.sulfate += (profile.sulfate * this.inputConversion(this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
      current_water.chloride += (profile.chloride * this.inputConversion(this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
      current_water.bicarbonate += (hco3final * this.inputConversion(this.recipe.recipe_waters_attributes[i].quantity, 'liquid') / total_gallons);
    });

    this.agents.forEach((agent, i) => {
      current_water.calcium += (agent.calcium * this.inputConversion(this.recipe.recipe_water_agents_attributes[i].quantity, 'agents') / total_gallons);
      current_water.magnesium += (agent.magnesium * this.inputConversion(this.recipe.recipe_water_agents_attributes[i].quantity, 'agents') / total_gallons);
      current_water.sodium += (agent.sodium * this.inputConversion(this.recipe.recipe_water_agents_attributes[i].quantity, 'agents') / total_gallons);
      current_water.sulfate += (agent.sulfate * this.inputConversion(this.recipe.recipe_water_agents_attributes[i].quantity, 'agents') / total_gallons);
      current_water.chloride += (agent.chloride * this.inputConversion(this.recipe.recipe_water_agents_attributes[i].quantity, 'agents') / total_gallons);
      current_water.bicarbonate += (agent.bicarbonate * this.inputConversion(this.recipe.recipe_water_agents_attributes[i].quantity, 'agents') / total_gallons);
    });

    current_water.ph = Math.log10(current_water.ph);

    if (current_water.chloride !== 0) {
      this.so4_cl_ratio = this.roundHundredth(current_water.sulfate / current_water.chloride);
    } else {
      this.so4_cl_ratio = 10;
    }
    this.ra = this.roundHundredth(current_water.bicarbonate - current_water.calcium / 1.4 - current_water.magnesium / 1.7);

    return current_water;
  }

  waterDifference(): IWaterProfile {
    const water_diff: IWaterProfile = {
      id: 0,
      user_id: 0,
      name: 'Water Difference',
      ph: 0,
      calcium: 0,
      magnesium: 0,
      sodium: 0,
      sulfate: 0,
      chloride: 0,
      bicarbonate: 0,
      description: 'The difference between the current water profile and the target water profile..',
      global: false,
      recipe_count: 0
    };
    const current_water = this.currentWater();

    if (!this.currentWater() || !this.target_water) {
      return undefined;
    }

    water_diff.ph = (this.target_water.ph - current_water.ph);
    water_diff.calcium = (this.target_water.calcium - current_water.calcium);
    water_diff.magnesium = (this.target_water.magnesium - current_water.magnesium);
    water_diff.sodium = (this.target_water.sodium - current_water.sodium);
    water_diff.sulfate = (this.target_water.sulfate - current_water.sulfate);
    water_diff.chloride = (this.target_water.chloride - current_water.chloride);
    water_diff.bicarbonate = (this.target_water.bicarbonate - current_water.bicarbonate);

    return water_diff;
  }

  waterSumOfSquares(): number {
    const diff: IWaterProfile = this.waterDifference();
    return (Math.pow(diff.ph * 10, 2) + Math.pow(diff.calcium, 2) + Math.pow(diff.magnesium, 2) + Math.pow(diff.sodium, 2) +
      Math.pow(diff.sulfate, 2) + Math.pow(diff.chloride, 2) + Math.pow(diff.bicarbonate, 2));
  }

  matchWater(): void {
    let current_gallon_counts: any[];
    let best_index: number;
    let least_sos: number;
    let new_sos: number;

    if (this.recipe.recipe_waters_attributes.length <= 0) {
      return;
    } else if (!this.target_water) {
      return;
    } else if (this.recipe.recipe_waters_attributes.length === 1) {
      this.recipe.recipe_waters_attributes[0].quantity = this.checkGallonsToLiters(Math.round(this.estimateGallonsNeeded() * 10) / 10);
      return;
    }

    this.recipe.recipe_waters_attributes.forEach((water) => {
      water.quantity = 0;
    });

    while (this.addWaterGallons() < this.checkGallonsToLiters(this.estimateGallonsNeeded())) {
      current_gallon_counts = this.recipe.recipe_waters_attributes.slice();
      least_sos = undefined;
      this.recipe.recipe_waters_attributes.forEach((num, index) => {
        this.recipe.recipe_waters_attributes[index].quantity = this.addPointOne(this.recipe.recipe_waters_attributes[index].quantity);
        new_sos = this.waterSumOfSquares();
        if (!least_sos || new_sos < least_sos) {
          least_sos = new_sos;
          best_index = index;
        }
        this.recipe.recipe_waters_attributes = current_gallon_counts.slice();
      });

      this.recipe.recipe_waters_attributes[best_index].quantity = this.addPointOne(
        this.recipe.recipe_waters_attributes[best_index].quantity);
    }
  }

  matchAgents(): void {

    let least_sos: number;
    let dirty = true;

    if (this.recipe.recipe_waters_attributes.length <= 0) {
      return;
    } else if (!this.target_water) {
      return;
    }

    this.recipe.recipe_water_agents_attributes.forEach((agent) => {
      agent.quantity = 0;
    });

    least_sos = this.waterSumOfSquares();

    while (dirty) {
      dirty = false;
      this.recipe.recipe_water_agents_attributes.forEach((num, index) => {
        this.recipe.recipe_water_agents_attributes[index].quantity = this.addPointOne(
          this.recipe.recipe_water_agents_attributes[index].quantity);
        if (this.waterSumOfSquares() < least_sos) {
          least_sos = this.waterSumOfSquares();
          dirty = true;
        } else {
          this.recipe.recipe_water_agents_attributes[index].quantity = this.subtractPointOne(
            this.recipe.recipe_water_agents_attributes[index].quantity);
        }
        if (this.recipe.recipe_water_agents_attributes[index].quantity > 0) {
          this.recipe.recipe_water_agents_attributes[index].quantity = this.subtractPointOne(
            this.recipe.recipe_water_agents_attributes[index].quantity);
          if (this.waterSumOfSquares() < least_sos) {
            least_sos = this.waterSumOfSquares();
            dirty = true;
          } else {
            this.recipe.recipe_water_agents_attributes[index].quantity = this.addPointOne(
              this.recipe.recipe_water_agents_attributes[index].quantity);
          }
        }
      });
    }

    this.recipe.recipe_water_agents_attributes.some((agent_stats, index) => {
      if (this.agents[index].name === 'Lactic Acid') {
        agent_stats.quantity += this.getPhDrop('lactic', this.getEstimatedPh());
        return true;
      }

      if (this.agents[index].name === 'Chalk (CaC03)') {
        while (this.getEstimatedPh() < 5.2) {
          agent_stats.quantity = this.addPointOne(agent_stats.quantity);
        }
      }
    });
  }

  matchWaterAndAgents(): void {
    for (let i = 0; i < 5; i++) {
      this.matchWater();
      this.matchAgents();
    }
  }

  waterAutoOnChange(new_target = null): void {
    if (new_target) {
      this.target_water = new_target;
    }
    if (this.used_waters[1]) {
      this.used_water_ratio = 100 * this.recipe.recipe_waters_attributes[1].quantity
        / (this.recipe.recipe_waters_attributes[0].quantity + this.recipe.recipe_waters_attributes[1].quantity);
    }
    this.setStrikeAmount();
    if (!this.water_profile_select) {
      if (this.match_water && this.match_agent) {
        this.matchWaterAndAgents();
      } else if (this.match_water) {
        this.matchWater();
      } else if (this.match_agent) {
        this.matchAgents();
      }
    } else {
      const water_needed = this.checkGallonsToLiters(this.estimateGallonsNeeded());
      const water_used = this.recipe.recipe_waters_attributes[0].quantity + (this.recipe.recipe_waters_attributes[1]
        ? this.recipe.recipe_waters_attributes[1].quantity : 0);
      if (water_used < water_needed) {
        this.recipe.recipe_waters_attributes[0].quantity = this.roundPointOne(
          this.recipe.recipe_waters_attributes[0].quantity + water_needed - water_used);
      }
    }
  }

  setStrikeAmount(): void {
    this.strike_amount = this.recipe.mash_ratio * this.checkPoundsToGrams(this.getTotalGrainWeight(), 'malts');
  }

  strikeWaterOnChange(): void {
    this.recipe.mash_ratio = this.strike_amount / this.checkPoundsToGrams(this.getTotalGrainWeight(), 'malts');
  }

  waterPercentChange(): void {
    const water_total = (this.recipe.recipe_waters_attributes[0].quantity + this.recipe.recipe_waters_attributes[1].quantity);

    this.recipe.recipe_waters_attributes[0].quantity = water_total * (1 - this.used_water_ratio / 100);
    this.recipe.recipe_waters_attributes[1].quantity = water_total * this.used_water_ratio / 100;
  }

  // malt

  onAddMalt(add_malt): void {
    setTimeout(() => {
      this.add_malt = null;
    });

    this.used_malts.push(Object.assign({}, add_malt));
    this.recipe.recipe_malts_attributes.push({
      'id': null, 'malt_id': add_malt.id,
      'color': add_malt.color, 'quantity': 0, 'malt_usage':
        ((this.maltTypes[add_malt.malt_type_id - 1].name === 'Grain' || this.maltTypes[add_malt.malt_type_id - 1].name === 'Adjunct') ?
          'Mash' : 'Boil')
    });
  }

  removeMalt(malt_index): void {
    this.used_malts.splice(malt_index, 1);
    this.recipe.recipe_malts_attributes.splice(malt_index, 1);
  }

  getMashType(): string {
    if (this.recipe.mash_type === 'decoction') {
      return 'Decoction Mash';
    } else if (this.recipe.mash_type === 'step') {
      return 'Step Mash';
    } else {
      return 'Single Infusion';
    }
  }

  getSpargeType(): string {
    if (this.recipe.sparge_type === 'batch') {
      return 'Batch Sparge';
    } else if (this.recipe.mash_type === 'fly') {
      return 'Fly Sparge';
    } else {
      return 'None';
    }
  }

  getSpargeInfo(): string {
    return 'Sparging is the process of rinsing the grain to remove as much starch as possible.\n\n \
      Batch sparging involves removing the current wort from the grain and adding fresh water to extract more of the starch.\n\n \
      Fly sparging is a process where the wort is slowly drained from the bottom while fresh water is added on top to rinse the\
       grain as it travels downward.';
  }

  getMashInfo(): string {
    return 'It is optional to use different rests at different temperatures in order to active\
     or deactivate specific enzymes at their highest efficiency.\n\n \
      Step mashing is where you heat the wort without applying direct heat on the wort/grain,\
       but instead by adding water at specific temperatures and quanitites to raise the temperature.\n\n\
      Decoction mashing is where you remove quantities of wort/grain from the mash,\
       bring it to a boil and add it back in to raise the temperature.';
  }

  selectedMaltEvent(event): void {
    for (let i = 0; i < event.malts.length; i++) {
      this.used_malts.push(Object.assign({}, event.malts[i]));
      this.recipe.recipe_malts_attributes.push({
        id: null, malt_id: event.malts[i].id,
        color: event.malts[i].color, quantity: 0, malt_usage:
          ((this.maltTypes[event.malts[i].malt_type_id - 1].name === 'Grain'
            || this.maltTypes[event.malts[i].malt_type_id - 1].name === 'Adjunct')
            ? 'Mash' : 'Boil')
      });
    }
  }

  getTotalMaltWeight(): number {
    let weight = 0;
    this.recipe.recipe_malts_attributes.forEach((m) => {
      weight += this.inputConversion(m.quantity, 'malts');
    });

    return weight;
  }

  getMashWaterInfo(): {
    sparge_amount: number, step_info:
      { step_name: string, step_temp: number, step_time: number, water_amount: number, water_temp: number }[]
  } {
    const activate_steps: { step_name: string, step_temp: number, step_time: number, water_amount: number, water_temp: number }[] = [];
    let strike_temp: number;
    let previous_temp: number;
    let total_water = 0;
    if (this.recipe.recipe_type === 'Extract') {
      const mash_step_temp = this.recipe.recipe_mashes_attributes[this.infusion_step].temperature;

      activate_steps.push({
        water_amount: this.checkGallonsToLiters(this.estimateGallonsNeeded()),
        water_temp: this.inputConversion(mash_step_temp, 'temperature'),
        step_name: 'Steeping',
        step_time: 20,
        step_temp: this.inputConversion(mash_step_temp, 'temperature'),
      });

      total_water = activate_steps[0].water_amount;
    } else if (this.recipe.mash_type === 'none') {
      const mash_step_temp = this.recipe.recipe_mashes_attributes[this.infusion_step].temperature;
      activate_steps.push({
        water_amount: this.checkPoundsToGrams(this.getTotalGrainWeight(), 'malts') * this.recipe.mash_ratio,
        water_temp: Math.max(
          (.2 / this.recipe.mash_ratio) * (this.inputConversion(mash_step_temp, 'temperature') - 72) + this.inputConversion(mash_step_temp, 'temperature'), this.inputConversion(mash_step_temp, 'temperature')),
        step_name: 'Infusion',
        step_time: 20,
        step_temp: this.inputConversion(mash_step_temp, 'temperature'),
      });

      total_water = activate_steps[0].water_amount;
    } else if (this.recipe.mash_type === 'step') {
      this.recipe.recipe_mashes_attributes.forEach((mash_step, i) => {
        if (mash_step.used) {
          const new_step: { step_name: string, step_temp: number, step_time: number, water_amount: number, water_temp: number } = {
            step_name: '', step_temp: 0, step_time: 0, water_amount: 0, water_temp: 0
          };
          new_step.step_name = mash_step.name;
          new_step.step_temp = this.inputConversion(mash_step.temperature, 'temperature');
          new_step.step_time = mash_step.time;

          if (!strike_temp) {
            new_step.water_amount = this.checkPoundsToGrams(this.getTotalGrainWeight(), 'malts') * this.recipe.mash_ratio;
            strike_temp = Math.max((.2 / this.recipe.mash_ratio) * (this.inputConversion(mash_step.temperature, 'temperature') - 72) + this.inputConversion(mash_step.temperature, 'temperature'), this.inputConversion(mash_step.temperature, 'temperature'));
            new_step.water_temp = strike_temp;
          } else {
            new_step.water_amount = (this.inputConversion(mash_step.temperature, 'temperature') - previous_temp) * (.2
              * this.getTotalGrainWeight() + total_water) / (212 - this.inputConversion(mash_step.temperature, 'temperature'));
            new_step.water_temp = 212;
          }
          total_water += new_step.water_amount;
          previous_temp = this.inputConversion(mash_step.temperature, 'temperature');
          activate_steps.push(new_step);
        }
      });
    } else if (this.recipe.mash_type === 'decoction') {
      this.recipe.recipe_mashes_attributes.forEach((mash_step, i) => {
        if (mash_step.used) {

          const new_step: { step_name: string, step_temp: number, step_time: number, water_amount: number, water_temp: number } = {
            step_name: '', step_temp: 0, step_time: 0, water_amount: 0, water_temp: 0
          };
          new_step.step_name = mash_step.name;
          new_step.step_temp = this.inputConversion(mash_step.temperature, 'temperature');
          new_step.step_time = mash_step.time;

          if (!strike_temp) {
            new_step.water_amount = this.checkPoundsToGrams(this.getTotalGrainWeight(), 'malts') * this.recipe.mash_ratio;
            strike_temp = Math.max((.2 / this.recipe.mash_ratio) * (this.inputConversion(mash_step.temperature, 'temperature') - 72) + this.inputConversion(mash_step.temperature, 'temperature'), this.inputConversion(mash_step.temperature, 'temperature'));
            new_step.water_temp = strike_temp;
          } else {
            new_step.water_amount = (new_step.step_temp - previous_temp) / (this.inputConversion(212, 'temperature') - previous_temp - this.inputConversion(18, 'temperature')) * 100;
            new_step.water_temp = 212;
          }
          total_water += new_step.water_amount;
          previous_temp = this.inputConversion(mash_step.temperature, 'temperature');
          activate_steps.push(new_step);
        }
      });
    }

    return { 'sparge_amount': this.estimateGallonsNeeded() - this.inputConversion(total_water, 'liquid') / (this.measurement.liquid === 'us' ? 4 : 1), 'step_info': activate_steps };
  }

  getUsedMashSteps(): any[] {
    const steps: any[] = [];

    if (this.recipe.recipe_type === 'Extract') {
      steps.push(this.recipe.recipe_mashes_attributes[this.infusion_step]);
    } else if (this.recipe.mash_type === 'none') {
      steps.push(this.recipe.recipe_mashes_attributes[this.infusion_step]);
    } else {
      this.recipe.recipe_mashes_attributes.forEach((step) => {
        if (step.used) {
          steps.push(step);
        }
      });
    }

    return steps;
  }

  getBeerColorValue(): number {
    let srmValue = 0;
    this.recipe.recipe_malts_attributes.forEach((malt) => {
      srmValue += (this.inputConversion(malt.color, 'color') * this.inputConversion(malt.quantity, 'malts'));
    });

    srmValue = 1.4922 * Math.pow(srmValue / this.estimatedPostBoilGallons(), .6859);

    return this.checkColor(srmValue);
  }

  getBeerColor(): string {
    const srm = this.inputConversion(this.getBeerColorValue(), 'color');

    if (srm > 30) {
      return '#050B0A';
    }
    if (srm > 29) {
      return '#100B0A';
    }
    if (srm > 28) {
      return '#120D0C';
    }
    if (srm > 27) {
      return '#16100F';
    }
    if (srm > 26) {
      return '#19100F';
    }
    if (srm > 25) {
      return '#231716';
    }
    if (srm > 24) {
      return '#261716';
    }
    if (srm > 23) {
      return '#361F1B';
    }
    if (srm > 22) {
      return '#4A2727';
    }
    if (srm > 21) {
      return '#4E2A0C';
    }
    if (srm > 20) {
      return '#5D341A';
    }
    if (srm > 19) {
      return '#6B3A1E';
    }
    if (srm > 18) {
      return '#7C452D';
    }
    if (srm > 17) {
      return '#8D4C32';
    }
    if (srm > 16) {
      return '#985336';
    }
    if (srm > 15) {
      return '#A85839';
    }
    if (srm > 14) {
      return '#B26033';
    }
    if (srm > 13) {
      return '#BC6733';
    }
    if (srm > 12) {
      return '#BF7138';
    }
    if (srm > 11) {
      return '#C17A37';
    }
    if (srm > 10) {
      return '#BE823A';
    }
    if (srm > 9) {
      return '#BE8C3A';
    }
    if (srm > 8) {
      return '#C1963C';
    }
    if (srm > 7) {
      return '#CDAA37';
    }
    if (srm > 6) {
      return '#D5BC26';
    }
    if (srm > 5) {
      return '#E0D01B';
    }
    if (srm > 4) {
      return '#EAE615';
    }
    if (srm > 3) {
      return '#F6F513';
    }
    if (srm > 2) {
      return '#F5F75C';
    }
    if (srm > 1) {
      return '#F3F993';
    }
    return '#f0efb5';
  }

  getTotalGrainWeight(): number {
    let weight = 0;
    this.used_malts.forEach((m, i) => {
      if (this.recipe.recipe_malts_attributes[i].malt_usage === 'Mash'
        && (this.maltTypes[m.malt_type_id - 1].name === 'Grain' || this.maltTypes[m.malt_type_id - 1].name === 'Adjunct')) {
        weight += this.inputConversion(this.recipe.recipe_malts_attributes[i].quantity, 'malts');
      }
    });

    return weight;
  }

  riceHullsRequired(): boolean {

    let adjunct_total = 0;
    let hulls_found = false;
    this.used_malts.forEach((malt, i) => {
      if (this.maltTypes[malt.malt_type_id - 1].name === 'Adjunct') {
        if (malt.name.match(/hull/i) && this.recipe.recipe_malts_attributes[i].quantity > 0) {
          hulls_found = true;
        }
        adjunct_total += this.inputConversion(this.recipe.recipe_malts_attributes[i].quantity, 'malts');
      }
    });

    if (!hulls_found && (adjunct_total / this.getTotalGrainWeight() > .5 || this.getEstimatedOG() > 1.075)) {
      return true;
    }

    return false;
  }

  getTotalGrainAbsorption(): number {
    return this.getTotalGrainWeight() * 0.15;
  }

  getEstimatedPreboilPoints(): number {
    return (this.getEstimatedOG() - 1) * 1000 * this.estimatedPostBoilGallons();
  }

  getEstimatedOG(): number {
    let og = 0;
    this.used_malts.forEach((malt, i) => {
      if (this.maltTypes[malt.malt_type_id - 1].name === 'Grain' || this.maltTypes[malt.malt_type_id - 1].name === 'Adjunct') {
        if (this.recipe.recipe_type === 'Extract') {
          return;
        }

        og += (.046 * this.recipe.efficiency / 100 * malt.malt_yield / 100 * this.inputConversion(this.recipe.recipe_malts_attributes[i].quantity, 'malts'));
      } else {
        og += (.046 * malt.malt_yield / 100 * this.inputConversion(this.recipe.recipe_malts_attributes[i].quantity, 'malts'));
      }
    });

    return og / this.estimatedPostBoilGallons() + 1;
  }

  getEstimatedFG(): number {
    let highest_att = 0;
    this.used_yeast.forEach((yeast, i) => {
      const avg_att = yeast.min_attenuation + yeast.max_attenuation - yeast.min_attenuation;
      if (this.recipe.recipe_yeasts_attributes[i].quantity > 0 && avg_att > highest_att) {
        highest_att = avg_att;
      }
    });

    return (this.getEstimatedOG() - 1) * (1 - highest_att / 100) + 1;
  }

  getColorString(): string {
    if (this.measurement.color === 'srm') {
      return 'SRM';
    } else if (this.measurement.color === 'ebc') {
      return 'EBC';
    } else {
      return 'L';
    }
  }

  getEstimatedPh(): number {
    if (this.currentWater() === undefined || this.addWaterGallons() === 0) {
      return 5.72;
    }
    let water_ph = 5.72;
    water_ph -= this.getGristAffect();
    water_ph += this.getStrikeWaterAffect();
    this.mash_ph = this.roundHundredth(water_ph);
    return water_ph;
  }

  getPhDrop(chemical: string, currentPh: number, water_amount: number = null): number {
    if (currentPh < 5.5 || this.getChemicalAffect(chemical, 1) >= 0) {
      return 0;
    }
    let mash_thickness: number;
    if (water_amount) {
      mash_thickness = this.inputConversion(water_amount, 'liquid') / this.getTotalGrainWeight();
    } else {
      mash_thickness = this.inputConversion(this.recipe.mash_ratio, 'ratio');
    }
    mash_thickness = mash_thickness * 3.785 * 2.2 / 4; // (L/kg)
    const s_ra = .037 + .014 * mash_thickness;
    const change_amount = (chemical === 'lactic' ? 0.1 : 1);
    let quantity = change_amount;
    while ((currentPh + s_ra * this.getChemicalAffect(chemical, quantity)) > 5.5) {
      quantity += change_amount;
    }
    return quantity;
  }

  getGristAffect(): number {
    const grist_fraction: number[] = [];
    const acidity: number[] = [];
    let acidic_fraction = 0;

    this.used_malts.forEach((malt, i) => {
      if (this.recipe.recipe_malts_attributes[i].malt_usage === 'Mash') {
        if (malt.max_percent >= 90) {
          grist_fraction.push(this.recipe.recipe_malts_attributes[i].quantity / this.getTotalGrainWeight());
          acidity.push(-1.9 + this.recipe.recipe_malts_attributes[i].color);
        } else if (malt.name.match(/wheat/i)) {
          grist_fraction.push(this.recipe.recipe_malts_attributes[i].quantity / this.getTotalGrainWeight());
          acidity.push(-9.6);
        } else if (this.recipe.recipe_malts_attributes[i].color >= 180) {
          grist_fraction.push(this.recipe.recipe_malts_attributes[i].quantity / this.getTotalGrainWeight());
          acidity.push(42);
        } else {
          grist_fraction.push(this.recipe.recipe_malts_attributes[i].quantity / this.getTotalGrainWeight());
          acidity.push(5 + .453 * this.recipe.recipe_malts_attributes[i].color);
        }
      }
    });

    acidity.forEach((acid, i) => {
      acidic_fraction += grist_fraction[i] * acid;
    });

    return .0337 * acidic_fraction;
  }

  getStrikeWaterAffect(): number {
    const percentage_distilled = 0;
    let mash_thickness = this.inputConversion(this.recipe.mash_ratio, 'ratio');
    mash_thickness = mash_thickness * 3.785 * 2.2 / 4; // (L/kg)
    const s_ra = .037 + .014 * mash_thickness;
    const nutrients = this.currentWater();

    nutrients.calcium = nutrients.calcium * (1 - percentage_distilled / 100);
    nutrients.magnesium = nutrients.magnesium * (1 - percentage_distilled / 100);
    nutrients.sodium = nutrients.sodium * (1 - percentage_distilled / 100);
    nutrients.sulfate = nutrients.sulfate * (1 - percentage_distilled / 100);
    nutrients.chloride = nutrients.chloride * (1 - percentage_distilled / 100);
    nutrients.bicarbonate = nutrients.bicarbonate * (1 - percentage_distilled / 100);
    const normalities = {
      calcium: nutrients.calcium * 2 / 40.078,
      magnesium: nutrients.magnesium * 2 / 24.305,
      sodium: nutrients.sodium / 22.99,
      sulfate: nutrients.sulfate * 2 / 96.062,
      chloride: nutrients.chloride / 35.4527,
      bicarbonate: nutrients.bicarbonate / 61.016
    };
    const positive_ion_normality = normalities.calcium + normalities.magnesium + normalities.sodium;
    const negative_ion_normality = normalities.sulfate + normalities.chloride + normalities.bicarbonate;
    const ion_balance = positive_ion_normality - negative_ion_normality;
    const kt_ra = normalities.bicarbonate - normalities.calcium / 2.8 - normalities.magnesium / 5.6 + this.getAcidAffect();
    return s_ra * kt_ra;
  }

  getAcidAffect(): number {
    let acid_ounces = 0;
    let malt_alkalinity_meql = 0;

    this.used_malts.forEach((malt, i) => {
      if (this.recipe.recipe_malts_attributes[i].malt_usage === 'Mash' && malt.name.match(/acid/i)) {
        acid_ounces += this.inputConversion(this.recipe.recipe_malts_attributes[i].quantity, 'malts') * 16;
      }
    });
    const strength_percent = .03;
    const strike_volume_liters = this.inputConversion(this.recipe.mash_ratio, 'ratio') * 3.785 / 4 * this.getTotalGrainWeight();
    if (strike_volume_liters === 0) {
      return 0;
    }

    malt_alkalinity_meql = -strength_percent * acid_ounces * 28.35 / 90.09 / strike_volume_liters * 1000;

    let acid_alkalinity_meql = 0;

    this.used_acids.forEach((acid, i) => {
      acid_alkalinity_meql += -acid.strength / 100 * acid.density / acid.molecular_weight * 1000 * this.inputConversion(this.recipe.recipe_acids_attributes[i].quantity, 'liquid_agent') / strike_volume_liters;
    });

    return malt_alkalinity_meql + acid_alkalinity_meql;
  }

  getChemicalAffect(acid_type: string, acid_amount: number): number {
    let acid_ounces = 0;
    this.used_malts.forEach((malt, i) => {
      if (this.recipe.recipe_malts_attributes[i].malt_usage === 'Mash' && malt.name.match(/acid/i)) {
        acid_ounces += this.inputConversion(this.recipe.recipe_malts_attributes[i].quantity, 'malts') * 16;
      }
    });
    const strength_percent = .03;
    const strike_volume_liters = this.inputConversion(this.recipe.mash_ratio, 'ratio') * 3.785 / 4 * this.getTotalGrainWeight();
    if (strike_volume_liters === 0) {
      return 0;
    }
    let malt_alkalinity_meql = -strength_percent * acid_ounces * 28.35 / 90.09 / strike_volume_liters * 1000;

    let phosphoric_acid = 0;
    let lactic_acid = 0;

    this.used_acids.forEach((agent, i) => {
      if (agent.name.match(/phosphoric/i)) {
        phosphoric_acid += this.recipe.recipe_water_agents_attributes[i].quantity;
      } else if (agent.name.match(/lactic/i)) {
        lactic_acid += this.recipe.recipe_water_agents_attributes[i].quantity;
      }
    });

    if (acid_type !== null) {
      phosphoric_acid = 0;
      lactic_acid = 0;
      malt_alkalinity_meql = 0;
      if (acid_type === 'phosphoric') {
        phosphoric_acid = acid_amount;
      } else if (acid_type === 'lactic') {
        lactic_acid = acid_amount;
      }
    }

    const phosphoric_strength = .1;
    const lactic_strength = .88;
    const phosphoric_density = 1.05;
    const lactic_density = 1.21;

    const phosphoric_alkalinity_meql = -phosphoric_strength * phosphoric_density / 98 * 1000 * this.inputConversion(phosphoric_acid, 'liquid_agent') / strike_volume_liters;
    const lactic_alkalinity_meql = -lactic_strength * lactic_density / 90.09 * 1000 * this.inputConversion(lactic_acid, 'liquid_agent') / strike_volume_liters;

    return malt_alkalinity_meql + phosphoric_alkalinity_meql + lactic_alkalinity_meql;
  }

  // hop

  onAddHop(add_hop): void {
    setTimeout(() => {
      this.add_hop = null;
    });

    this.used_hops.push(Object.assign({}, add_hop));

    const newAddition = {
      hop_id: add_hop.id, id: null,
      quantity: 0, alpha: add_hop.alpha, time: 0, form: 'Pellet',
      usage: 'boil'
    };

    if (add_hop.hop_type === 'Bittering') {
      newAddition.time = 60;
    } else if (add_hop.hop_type === 'Aroma') {
      newAddition.time = 5;
    } else {
      newAddition.time = 15;
    }

    this.recipe.recipe_hops_attributes.push(newAddition);
  }

  removeHop(hop_index): void {
    this.used_hops.splice(hop_index, 1);
    this.recipe.recipe_hops_attributes.splice(hop_index, 1);
  }

  getHopSubstitutes(relation_list): IHop[] {
    const hop_list: IHop[] = [];

    relation_list.forEach((relation) => {
      this.hops.some((hop) => {
        if (hop.id === relation.hop_relation_id) {
          hop_list.push(hop);
          return true;
        }
      });
    });

    return hop_list;
  }

  substituteHop(index, sub) {
    this.used_hops[index] = sub;
    this.recipe.recipe_hops_attributes[index].hop_id = sub.id;
    this.recipe.recipe_hops_attributes[index].alpha = sub.alpha;
  }

  displayHopInfo(usage, time): string {
    switch (usage) {
      case 'boil':
        return 'boil - ' + time + ' min';
      case 'fwh':
        return 'first wort';
      case 'knockout':
        return 'knockout';
      case 'dryhop':
        return 'dry hop - ' + time + ' days';
      case 'whirlpool':
        return 'whirlpool';
    }
  }

  selectedHopEvent(event): void {
    for (let i = 0; i < event.hops.length; i++) {
      this.onAddHop(event.hops[i]);
    }
  }

  hopUsageOnChange(): void {
    if (this.used_equipment && !this.used_equipment.whirlpool) {
      this.recipe.recipe_hops_attributes.forEach((use) => {
        if (use.usage === 'whirlpool') {
          use.usage = 'knockout';
        }
      });
    }
    if (this.used_equipment && !this.used_equipment.hop_back) {
      this.recipe.recipe_hops_attributes.forEach((use) => {
        if (use.usage === 'hopback') {
          use.usage = 'knockout';
        }
      });
    }
  }

  calculateIBU(method: string): number {
    let ibu = 0;

    if (method === 'average') {
      return (this.calculateIBU('tinseth') + this.calculateIBU('rager') +
        this.calculateIBU('garetz') + this.calculateIBU('daniels')) / 4;
    }

    this.recipe.recipe_hops_attributes.forEach((hop, i) => {
      ibu += this.individualIBU(hop, i, method);
    });

    return ibu;
  }

  getIbuMethodText(): string {
    return 'Tinseth\nGenerally viewed as more accurate for full batch recipes.\
    \n\nRagers\nTends to be more accurate for extract and partial boils.\n\nGaretz\nAn older, less used model.\
    \n\nDaniels\nAnother older, less used model, closest to the average of all four methods.\
    \n\nAverage\nThe average of all four methods.';
  }

  individualIBU(hop, i, method: string): number {
    let add_ibu = 0;
    let utilization: number;
    let bigness: number;
    let boil_factor: number;

    if (hop.usage !== 'boil' && hop.usage !== 'fwh') {
      return 0;
    }

    if (method === 'tinseth') {
      bigness = 1.65 * Math.pow(0.000125, this.getEstimatedOG() - 1);
      boil_factor = (1 - Math.exp(-.04 * hop.time)) / 4.15;
      utilization = bigness * boil_factor;
      add_ibu = hop.alpha * this.inputConversion(hop.quantity, 'hops') * 74.89 / this.estimatedPostBoilGallons();
      add_ibu = add_ibu * utilization;
    } else if (method === 'rager') {
      utilization = (18.11 + (13.65 * Math.tanh((hop.time - 31.32) / 18.37))) / 100;
      add_ibu = (this.inputConversion(hop.quantity, 'hops') * utilization * (hop.alpha / 100) * 7489) /
        (this.estimatedPostBoilGallons() * (1 + Math.max(0, (this.getEstimatedOG() - 1.050) / .2)));
    } else if (method === 'garetz') {
      const desired_ibus = (this.calculateIBU('tinseth') + this.calculateIBU('rager')) / 2;
      const average_elevation = 2500;

      const cf: number = this.estimatedPostBoilGallons() / this.estimatePreGallons();
      const bg: number = (cf * (this.getEstimatedOG() - 1)) + 1;

      const gf: number = (bg - 1.050) / .2 + 1;
      const hf: number = (cf * desired_ibus / 260) + 1;
      const tf: number = (average_elevation / 550 * .02) + 1;

      const ca: number = gf * hf * tf;

      utilization = 7.2994 + (15.0746 * Math.tanh((hop.time - 21.86) / 24.71));
      add_ibu = (utilization * this.inputConversion(hop.quantity, 'hops') * hop.alpha * .749) / (this.estimatedPostBoilGallons() * ca);
    } else if (method === 'daniels') {
      bigness = 1.65 * Math.pow(0.000125, this.getEstimatedOG() - 1);
      boil_factor = (1 - Math.exp(-.04 * hop.time)) / 4.15;
      utilization = bigness * boil_factor;

      add_ibu = utilization / 100 * this.inputConversion(hop.quantity, 'hops') * hop.alpha * 7489 / this.estimatedPostBoilGallons();
    }

    if (hop.form === 'Pellet') {
      add_ibu = add_ibu * 1.1;
    }
    if (hop.usage === 'fwh') {
      add_ibu = add_ibu * 1.1;
    }

    return add_ibu;
  }

  getTotalHopWeight(): number {
    let weight = 0;
    this.recipe.recipe_hops_attributes.forEach((w) => {
      weight += this.inputConversion(w.quantity, 'hops');
    });

    return weight;
  }

  getHopByUsage(usage: string): { name: string, quantity: number, time: number, form: string }[] {
    const hops: { name: string, quantity: number, time: number, form: string }[] = [];

    this.recipe.recipe_hops_attributes.forEach((hop, i) => {
      if (hop.usage === usage && hop.quantity > 0) {
        hops.push({ 'name': this.used_hops[i].name, 'quantity': hop.quantity, 'time': hop.time, 'form': hop.form });
      }
    });

    return hops;
  }

  // misc

  capitalizeFirstLetter(cap_string: string): string {
    return cap_string.charAt(0).toUpperCase() + cap_string.slice(1);
  }

  onAddMiscellaneous(add_misc): void {
    setTimeout(() => {
      this.add_misc = null;
    });

    this.used_miscellaneous.push(Object.assign({}, add_misc));

    const newAddition = {
      miscellaneou_id: add_misc.id, id: null,
      quantity: (add_misc.amount / add_misc.batch_size) * this.recipe.batch_size,
      quantity_label: add_misc.amount_label, time: this._miscService.calculateTime(add_misc.time).time,
      time_label: this.capitalizeFirstLetter(this._miscService.calculateTime(add_misc.time).label),
      usage: add_misc.usage
    };

    this.recipe.recipe_miscellaneous_attributes.push(newAddition);
  }

  removeMiscellaneous(misc_index): void {
    this.used_miscellaneous.splice(misc_index, 1);
    this.recipe.recipe_miscellaneous_attributes.splice(misc_index, 1);
  }

  selectedMiscellaneousEvent(event): void {
    for (let i = 0; i < event.miscellaneous.length; i++) {
      this.onAddMiscellaneous(event.miscellaneous[i]);
    }
  }

  getUsedMiscellaneous(stage_used): {
    quantity: number, quantity_label: string, name: string,
    time: number, time_label: string
  }[] {
    const used_miscellaneous: {
      quantity: number, quantity_label: string, name: string,
      time: number, time_label: string
    }[] = [];
    this.recipe.recipe_miscellaneous_attributes.forEach((misc, i) => {
      if (misc.usage === stage_used) {
        used_miscellaneous.push({
          quantity: misc.quantity, quantity_label: misc.quantity_label,
          name: this.used_miscellaneous[i].name, time: misc.time, time_label: misc.time_label
        });
      }
    });

    return used_miscellaneous;
  }

  // yeast

  starterDMETotal(): number {
    let total = 0;
    for (let i = 0; i < this.recipe.yeast_starters_attributes.length; i++) {
      total += this.calculateStarterDME(i);
    }
    return total;
  }

  addYeastStarterStep() {
    this.recipe.yeast_starters_attributes.push({
      id: null, aeration_method: 'none', gravity: 1.036,
      volume: this.inputConversion(2 / 3.78541 * 4, 'liquidquart')
    });
  }

  removeYeastStarter(i: number) {
    this.recipe.yeast_starters_attributes.splice(i, 1);
  }

  calculateStarterDME(i: number): number {
    return this.inputConversion((this.recipe.yeast_starters_attributes[i].gravity - 1) * 1000 *
      this.checkGallonsToLiters(this.recipe.yeast_starters_attributes[i].volume, true) / 4 / 44, 'malts');
  }

  calculateStarterTotalCells(i: number): number {
    return 0;
  }

  viableCells(): number {
    // .97 * .8 * months * (1 - days / 30 * 20 * .01)
    return 0;
  }

  getTotalStarterYeast(): number {
    return this.getTotalNewYeastCells(this.recipe.yeast_starters_attributes.length - 1);
  }

  getTotalNewYeastCells(i: number): number {
    let old_cells;
    if (i < 0) {
      return this.getTotalYeastCells();
    } else if (i === 0) {
      old_cells = this.getTotalYeastCells();
    } else {
      old_cells = this.getTotalNewYeastCells(i - 1);
    }

    let new_cells: number = this.getNewYeastCells(i, old_cells);

    //Not used?
    //let growth_factor = new_cells / old_cells;
    return new_cells + old_cells;
  }

  getNewYeastCells(i: number, old_cells: number): number {
    return this.getEGrams(i) * this.getYeastGrowthRate(i, old_cells);
  }

  getYeastGrowthRate(i: number, old_cells: number): number {
    let cells_over_egrams: number = old_cells / this.getEGrams(i);
    switch (this.recipe.yeast_starters_attributes[i].aeration_method) {
      case 'stir':
        if (cells_over_egrams > 3.5) {
          return 0;
        } else if (cells_over_egrams < 1.4) {
          return 1.4;
        } else {
          return 2.33 - (.67 * cells_over_egrams);
        }
      case 'shake':
        if (cells_over_egrams > 3.5) {
          return 0;
        } else {
          return .62;
        }
      case 'none':
        if (cells_over_egrams > 3.5) {
          return 0;
        } else {
          return .4;
        }
      default:
        return 0;
    }
  }

  getEGrams(i: number): number {
    return (this.recipe.yeast_starters_attributes[i].gravity - 1) *
      this.checkGallonsToLiters(this.recipe.yeast_starters_attributes[i].volume, true) *
      1000 * 2.72715;
    // 2.72715 is #grams of extract / point of starter gravity / liter
  }

  yeastNeeded(): number {
    let pitch_factor = this.getPitchFactor();
    let batch_size = this.recipe.batch_size * 3.78541;

    return pitch_factor * batch_size * this.convertToPlato(this.getEstimatedOG());
  }

  getPitchFactor(): number {
    let pf = 0;
    this.used_yeast.forEach((yeast) => {
      let new_pf = 0;
      if (yeast.yeast_type === 'lager') {
        new_pf = 1.5;
      } else {
        new_pf = .75;
      }

      if (pf === 0) {
        pf = new_pf;
      } else {
        if (pf !== new_pf) {
          pf = 1;
        }
      }
    });

    return pf;
  }

  onAddYeast(add_yeast, stage): void {
    setTimeout(() => {
      this.add_yeast = null;
    });

    this.used_yeast.push(Object.assign({}, add_yeast));
    this.recipe.recipe_yeasts_attributes.push({
      id: null, yeast_id: add_yeast.id,
      quantity: 1, fermentation_stage: stage
    });
  }

  removeYeast(yeast): void {
    const index = this.used_yeast.indexOf(yeast);
    this.used_yeast.splice(index, 1);
    this.recipe.recipe_yeasts_attributes.splice(index, 1);
  }

  getYeastSubstitutes(relation_list): IYeast[] {
    const yeast_list: IYeast[] = [];

    relation_list.forEach((relation) => {
      this.yeast.some((yeast) => {
        if (yeast.id === relation.yeast_relation_id) {
          yeast_list.push(yeast);
          return true;
        }
      });
    });

    return yeast_list;
  }

  substituteYeast(index, sub) {
    this.used_yeast[index] = sub;
    this.recipe.recipe_yeasts_attributes[index].yeast_id = sub.id;
  }

  selectedYeastEvent(event, stage): void {
    for (let i = 0; i < event.yeast.length; i++) {
      const add_yeast = Object.assign({}, event.yeast[i]);
      this.used_yeast.push(add_yeast);
      this.recipe.recipe_yeasts_attributes.push({
        id: null, yeast_id: add_yeast.id,
        quantity: 1, fermentation_stage: stage
      });
    }
  }

  getEstimatedABV(): number {
    return (this.getEstimatedOG() - this.getEstimatedFG()) * 131.25;
  }

  getTotalYeast(): number {
    let amount = 0;
    this.recipe.recipe_yeasts_attributes.forEach((y) => {
      amount += y.quantity;
    });

    return amount;
  }

  getTotalYeastCells(): number {
    let amount = 0;
    this.recipe.recipe_yeasts_attributes.forEach((y, i) => {
      amount += y.quantity * this.used_yeast[i].cell_count;
    });
    return amount;
  }

  optimalYeastTemperature(stage): { min: number, max: number } {
    const range = { min: 0, max: 125 };
    this.used_yeast.forEach((yeast, i) => {
      if (this.recipe.recipe_yeasts_attributes[i].fermentation_stage === stage) {
        if (yeast.min_temperature > range.min) {
          range.min = yeast.min_temperature;
        }
        if (yeast.max_temperature < range.max) {
          range.max = yeast.max_temperature;
        }
      }
    });
    return range;
  }

  optimalYeastTemperatureCheck(stage): boolean {
    const temperature = this.inputConversion((stage === 1) ?
      this.inputConversion(this.recipe.primary_ferm_temp, 'temperature') :
      this.inputConversion(this.recipe.secondary_ferm_temp, 'temperature'), 'temperature');
    const range = this.optimalYeastTemperature(stage);
    if (range.min > temperature || range.max < temperature) {
      return false;
    }
    return true;
  }

  optimalYeastTemperatureMessage(stage): string {
    const range = this.optimalYeastTemperature(stage);
    if (range.min > range.max) {
      return 'The yeasts you have selected do not have an optimal temperature range that match eachother.';
    } else {
      return 'It is suggested to ferment at a temperature within the yeasts optimal temperature range of '
        + range.min + ' - ' + range.max + ' degrees F.\
       Temperatures outside of the optimal range can lead to failed fermentation and off flavors.';
    }
  }

  getUsedYeast(stage_used): { quantity: number, name: string, lab: string }[] {
    const used_yeast: { quantity: number, name: string, lab: string }[] = [];
    this.used_yeast.forEach((yeast, i) => {
      if (this.recipe.recipe_yeasts_attributes[i].fermentation_stage === stage_used) {
        used_yeast.push({
          'quantity': this.recipe.recipe_yeasts_attributes[i].quantity,
          'name': yeast.name, 'lab': yeast.lab
        });
      }
    });

    return used_yeast;
  }

  getVolumesQuantity(): number {
    let quantity = 0;
    let sugar_factor = 4;
    let sugar_volume_factor = 1;

    if (this.recipe.storage_type === "bottle" && this.recipe.carbonation_with === "pressure") {
      this.recipe.carbonation_with = "cornsugar";
    }

    switch (this.recipe.carbonation_with) {
      case 'pressure':
        quantity = -16.6999 - 0.0101059 * this.inputConversion(this.recipe.storage_temperature, 'temperature') +
          0.00116512 * Math.pow(this.inputConversion(this.recipe.storage_temperature, 'temperature'), 2) + 0.173354 *
          this.inputConversion(this.recipe.storage_temperature, 'temperature') * this.recipe.carbonation_volumes + 4.24267 *
          this.recipe.carbonation_volumes - 0.0684226 * Math.pow(this.recipe.carbonation_volumes, 2);
        return this.checkPsiToKpa(quantity);
      case 'cornsugar':
        sugar_factor = 4;
        sugar_volume_factor = 1;
        break;
      case 'dme':
        sugar_factor = 5.33;
        sugar_volume_factor = 1;
        break;
      case 'honey':
        sugar_factor = 4.9;
        sugar_volume_factor = 1;
        break;
      case 'tablesugar':
        sugar_factor = 4;
        sugar_volume_factor = 1;
        break;
      case 'gyle':
        const carbonation_beer = (1.013) * Math.pow(2.71828182845904,
          (-10.73797 + (2617.25 / (this.fahrToCels(this.inputConversion(this.recipe.storage_temperature, 'temperature')) + 273.15)))) * 10;
        quantity = 1.95 * 4 * this.inputConversion(this.recipe.batch_size, 'liquid') * (this.recipe.carbonation_volumes - carbonation_beer / 2) /
          (this.getEstimatedOG() - this.getEstimatedFG()) / 1000;
        return this.checkGallonsToLiters(quantity, true);
    }

    const dissolved_co2 = ((-0.9753) * Math.log(this.inputConversion(this.recipe.storage_temperature, 'temperature')) + 4.9648);
    const co2_factor = this.recipe.carbonation_volumes - dissolved_co2;
    const vol_factor = this.inputConversion(this.recipe.batch_size, 'liquid') * 3.78541;
    quantity = co2_factor * sugar_factor * vol_factor * sugar_volume_factor /
      (this.measurement.malts === 'us' ? 28.34952 : 1); // 28.34952 is gram to oz
    return this.recipe.storage_type === 'keg' ? (quantity / 2) : quantity;
  }

  volumesLabel(): string {
    switch (this.recipe.carbonation_with) {
      case 'pressure':
        return this.measurement['pressure'] === 'us' ? 'psi' : 'kPa';
      case 'cornsugar':
      case 'dme':
      case 'honey':
      case 'tablesugar':
        return this.measurement.malts === 'us' ? 'oz' : 'g';
      case 'gyle':
        return this.measurement.liquid === 'us' ? 'qt' : 'l';
    }
    return '';
  }

  getCarbonationWithDescription(): string {
    switch (this.recipe.carbonation_with) {
      case 'pressure':
        return 'Carbonate by kegging and using the pressure from the CO2 cannister.';
      case 'cornsugar':
        return 'Carbonate by adding corn sugar.';
      case 'dme':
        return 'Carbonate by adding dry malt extract.';
      case 'honey':
        return 'Carbonate by adding honey.';
      case 'tablesugar':
        return 'Carbonate by adding table sugar.';
      case 'gyle':
        return 'Carbonate by removing some wort after the boil and readding it for fermentation.';
    }
    return 'This is not a valid option.';
  }

  // general

  clearIds(): void {
    this.recipe.id = null;
    this.recipe.recipe_waters_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_water_agents_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_acids_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_sparge_acids_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_malts_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_hops_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_miscellaneous_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_yeasts_attributes.forEach((attribute) => {
      attribute.id = null;
    });
    this.recipe.recipe_mashes_attributes.forEach((attribute) => {
      attribute.id = null;
    });
  }

  isDirty(): boolean {
    return this.old_recipe && this.old_recipe !== JSON.stringify(this.recipe);
  }

  getRecipeCopy(): IRecipe {
    const recipe: IRecipe = {
      name: this.recipe.name,
      id: this.recipe.id,
      brewer: this.recipe.brewer,
      recipe_date: this.recipe.recipe_date,
      version: this.recipe.version,
      batch_size: this.inputConversion(this.recipe.batch_size, 'liquid'),
      boil_time: this.recipe.boil_time,
      equipment_id: this.recipe.equipment_id,
      water_profile_id: this.recipe.water_profile_id,
      target_water_id: this.recipe.target_water_id,
      style_id: this.recipe.style_id,
      notes: this.recipe.notes,
      description: this.recipe.description,
      taste_notes: this.recipe.taste_notes,
      sparge_type: this.recipe.sparge_type,
      mash_type: this.recipe.mash_type,
      global: this.recipe.global,
      storage_type: this.recipe.storage_type,
      storage_temperature: this.inputConversion(this.recipe.storage_temperature, 'temperature'),
      carbonation_volumes: this.recipe.carbonation_volumes,
      carbonation_with: this.recipe.carbonation_with,
      primary_ferm_temp: this.inputConversion(this.recipe.primary_ferm_temp, 'temperature'),
      secondary_ferm_temp: this.inputConversion(this.recipe.secondary_ferm_temp, 'temperature'),
      secondary_fermentation: this.recipe.secondary_fermentation,
      primary_ferm_days: this.recipe.primary_ferm_days,
      secondary_ferm_days: this.recipe.secondary_ferm_days,
      recipe_waters_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_waters_attributes)),
      recipe_water_agents_attributes: JSON.parse(JSON.stringify(this.getActiveAgents())),
      recipe_acids_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_acids_attributes)),
      recipe_sparge_acids_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_sparge_acids_attributes)),
      recipe_malts_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_malts_attributes)),
      recipe_hops_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_hops_attributes)),
      recipe_miscellaneous_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_miscellaneous_attributes)),
      recipe_yeasts_attributes: JSON.parse(JSON.stringify(this.recipe.recipe_yeasts_attributes)),
      recipe_mashes_attributes: JSON.parse(JSON.stringify(this.getUsedMashSteps())),
      yeast_starters_attributes: JSON.parse(JSON.stringify(this.recipe.yeast_starters_attributes)),
      mash_ratio: this.inputConversion(this.recipe.mash_ratio, 'ratio'),
      efficiency: this.recipe.efficiency,
      recipe_type: this.recipe.recipe_type,
      user_nickname: ''
    };

    if (recipe.mash_type === 'none') {
      recipe.recipe_mashes_attributes = [];
    }

    recipe.recipe_waters_attributes.forEach((recipe_water) => {
      recipe_water.quantity = this.inputConversion(recipe_water.quantity, 'liquid');
    });

    recipe.recipe_water_agents_attributes.forEach((recipe_agent, i) => {
      recipe_agent.quantity = this.inputConversion(recipe_agent.quantity, 'agent');
    });

    recipe.recipe_water_agents_attributes.forEach((recipe_agent, i) => {
      recipe_agent.quantity = this.inputConversion(recipe_agent.quantity, 'liquid_agent');
    });

    recipe.recipe_malts_attributes.forEach((recipe_malt) => {
      recipe_malt.quantity = this.inputConversion(recipe_malt.quantity, 'malts');
      recipe_malt.color = this.inputConversion(recipe_malt.color, 'color');
    });

    recipe.yeast_starters_attributes.forEach((yeast_starter) => {
      yeast_starter.volume = this.inputConversion(yeast_starter.volume, 'liquidquart');
    });

    recipe.recipe_miscellaneous_attributes.forEach((recipe_misc) => {
      let mult_by = 1;
      if (recipe_misc.time_label === 'Days') {
        mult_by = 24 * 60;
      } else if (recipe_misc.time_label === 'Hours') {
        mult_by = 60;
      }
      recipe_misc.time = recipe_misc.time * mult_by;
    });

    recipe.recipe_mashes_attributes.forEach((recipe_mash) => {
      recipe_mash.temperature = this.inputConversion(recipe_mash.temperature, 'temperature');
    });

    recipe.recipe_hops_attributes.forEach((recipe_hop) => {
      recipe_hop.quantity = this.inputConversion(recipe_hop.quantity, 'hops');
    });

    return recipe;
  }

  save(redirect: boolean = true): void {
    if (this.used_equipment) {
      this.recipe.equipment_id = this.used_equipment.id;
    }

    if (this.used_water_profile) {
      this.recipe.water_profile_id = this.used_water_profile.id;
    }

    if (this.target_water) {
      this.recipe.target_water_id = this.target_water.id;
    }

    if (this.used_style) {
      this.recipe.style_id = this.used_style.id;
    }

    const recipe = this.getRecipeCopy();

    this._recipeService.createRecipe(recipe)
      .subscribe((res) => {
        this.old_recipe = JSON.stringify(this.recipe);
        window.alert('Recipe saved.');
        if (redirect) {
          this._router.navigate(['/recipes', res.id, 'edit']);
        }
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  update() {
    if (this.used_equipment) {
      this.recipe.equipment_id = this.used_equipment.id;
    }

    if (this.used_water_profile) {
      this.recipe.water_profile_id = this.used_water_profile.id;
    }

    if (this.target_water) {
      this.recipe.target_water_id = this.target_water.id;
    }

    if (this.used_style) {
      this.recipe.style_id = this.used_style.id;
    }

    const recipe = this.getRecipeCopy();

    this._recipeService.editRecipe(recipe)
      .subscribe((res) => {
        this.old_recipe = JSON.stringify(this.recipe);
        window.alert('Recipe saved.');
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  copyRecipe(copy_name): void {
    if (this.used_equipment) {
      this.recipe.equipment_id = this.used_equipment.id;
    }

    if (this.used_water_profile) {
      this.recipe.water_profile_id = this.used_water_profile.id;
    }

    if (this.target_water) {
      this.recipe.target_water_id = this.target_water.id;
    }

    if (this.used_style) {
      this.recipe.style_id = this.used_style.id;
    }

    const recipe = this.getRecipeCopy();
    recipe.name = copy_name;
    recipe.id = null;

    for (let i = 0; i < recipe.recipe_waters_attributes.length; i++) {
      recipe.recipe_waters_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_water_agents_attributes.length; i++) {
      recipe.recipe_water_agents_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_acids_attributes.length; i++) {
      recipe.recipe_acids_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_sparge_acids_attributes.length; i++) {
      recipe.recipe_sparge_acids_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_malts_attributes.length; i++) {
      recipe.recipe_malts_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_hops_attributes.length; i++) {
      recipe.recipe_hops_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_miscellaneous_attributes.length; i++) {
      recipe.recipe_miscellaneous_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_yeasts_attributes.length; i++) {
      recipe.recipe_yeasts_attributes[i].id = null;
    }
    for (let i = 0; i < recipe.recipe_mashes_attributes.length; i++) {
      recipe.recipe_mashes_attributes[i].id = null;
    }

    this._recipeService.createRecipe(recipe)
      .subscribe((res) => {
        window.alert('Copy saved.');
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  setMeasurement(measure_type): void {
    this.measurement.temperature = measure_type;
    this.measurement.liquid = measure_type;
    this.measurement.hops = measure_type;
    this.measurement.malts = measure_type;
    this.measurement.agents = measure_type;
    this.measurement.pressure = measure_type;
  }

  efficiencyOnChange(new_efficiency): void {
    if (this.match_malt) {
      this.recipe.recipe_malts_attributes.forEach((malt, i) => {
        if (malt.malt_usage === 'Mash' && (this.maltTypes[this.used_malts[i].malt_type_id - 1].name === 'Grain' ||
          this.maltTypes[this.used_malts[i].malt_type_id - 1].name === 'Adjunct')) {
          malt.quantity = this.roundHundredth(malt.quantity / new_efficiency * this.recipe.efficiency);
        }
      });
    }

    this.recipe.efficiency = new_efficiency;

    this.waterAutoOnChange();
  }

  batchSizeOnChange(new_batch_size): void {
    if (this.match_malt) {
      this.recipe.recipe_malts_attributes.forEach((malt) => {
        malt.quantity = this.roundHundredth(malt.quantity * new_batch_size / this.recipe.batch_size);
      });
    }
    if (this.match_hop) {
      this.recipe.recipe_hops_attributes.forEach((hop) => {
        hop.quantity = this.roundHundredth(hop.quantity * new_batch_size / this.recipe.batch_size);
      });
    }
    if (this.match_misc) {
      this.recipe.recipe_miscellaneous_attributes.forEach((misc) => {
        misc.quantity = this.roundHundredth(misc.quantity * new_batch_size / this.recipe.batch_size);
      });
    }
    if (this.match_yeast) {
      this.recipe.recipe_yeasts_attributes.forEach((yeast) => {
        yeast.quantity = this.roundHundredth(yeast.quantity * new_batch_size / this.recipe.batch_size);
      });
    }

    this.recipe.batch_size = new_batch_size;

    this.waterAutoOnChange();
  }

  recipeScale(new_batch_size): void {
    const old_water_amount = this.estimateGallonsNeeded();

    this.recipe.recipe_malts_attributes.forEach((malt) => {
      malt.quantity = this.roundHundredth(malt.quantity * new_batch_size / this.recipe.batch_size);
    });

    this.recipe.recipe_hops_attributes.forEach((hop) => {
      hop.quantity = this.roundHundredth(hop.quantity * new_batch_size / this.recipe.batch_size);
    });

    this.recipe.recipe_miscellaneous_attributes.forEach((misc) => {
      misc.quantity = this.roundHundredth(misc.quantity * new_batch_size / this.recipe.batch_size);
    });

    this.recipe.recipe_yeasts_attributes.forEach((yeast) => {
      yeast.quantity = this.roundHundredth(yeast.quantity * new_batch_size / this.recipe.batch_size);
    });

    this.recipe.batch_size = new_batch_size;

    const new_water_amount = this.estimateGallonsNeeded();

    this.recipe.recipe_waters_attributes.forEach((water) => {
      water.quantity = this.roundHundredth(water.quantity * new_water_amount / old_water_amount);
    });

    this.recipe.recipe_water_agents_attributes.forEach((agent) => {
      agent.quantity = this.roundHundredth(agent.quantity * new_water_amount / old_water_amount);
    });

    this.recipe.recipe_acids_attributes.forEach((acid) => {
      acid.quantity = this.roundHundredth(acid.quantity * new_water_amount / old_water_amount);
    });

    this.recipe.recipe_sparge_acids_attributes.forEach((acid) => {
      acid.quantity = this.roundHundredth(acid.quantity * new_water_amount / old_water_amount);
    });

    this.recipe.yeast_starters_attributes.forEach((s) => {
      s.volume = this.roundHundredth(s.volume * new_water_amount / old_water_amount);
    });
  }

  clearRecipe(): void {
    this.recipe = {
      name: '',
      id: this.recipe.id,
      brewer: '',
      recipe_date: new Date(),
      version: this.recipe.version,
      batch_size: this.measurement.liquid === 'us' ? 5.5 : 20,
      boil_time: 60,
      equipment_id: this.recipe.equipment_id,
      water_profile_id: this.recipe.water_profile_id,
      target_water_id: this.recipe.target_water_id,
      style_id: this.recipe.style_id,
      notes: '',
      description: '',
      taste_notes: '',
      sparge_type: 'none',
      mash_type: 'none',
      global: false,
      storage_type: 'bottle',
      storage_temperature: this.checkFahrenheitToCelsius(45),
      carbonation_volumes: (this.used_style.max_carb - this.used_style.min_carb) / 2 + this.used_style.min_carb,
      carbonation_with: 'cornsugar',
      primary_ferm_temp: this.checkFahrenheitToCelsius(50),
      secondary_ferm_temp: this.checkFahrenheitToCelsius(50),
      recipe_waters_attributes: [],
      recipe_water_agents_attributes: [],
      recipe_acids_attributes: [],
      recipe_sparge_acids_attributes: [],
      recipe_malts_attributes: [],
      recipe_hops_attributes: [],
      recipe_miscellaneous_attributes: [],
      recipe_yeasts_attributes: [],
      recipe_mashes_attributes: [],
      yeast_starters_attributes: [],
      mash_ratio: this.checkMashRatioUnits(2.0),
      secondary_fermentation: false,
      primary_ferm_days: 14,
      secondary_ferm_days: 30,
      efficiency: this.used_equipment.efficiency,
      recipe_type: 'All Grain',
      user_nickname: ''
    };

    this.used_waters = [];
    this.used_malts = [];
    this.used_hops = [];
    this.used_miscellaneous = [];
    this.used_yeast = [];

    this.recipe.recipe_water_agents_attributes.forEach((agent) => {
      agent.quantity = 0;
    });

    this.recipe.recipe_mashes_attributes.forEach((mash) => {
      mash.used = false;
    });
  }

  addPointOne(num): number {
    return Math.round(num * 10 + 1) / 10;
  }

  subtractPointOne(num): number {
    return Math.round(num * 10 - 1) / 10;
  }

  roundPointOne(num): number {
    return Math.round(num * 10) / 10;
  }

  abs(num): number {
    return Math.abs(num);
  }

  roundHundredth(num): number {
    return Math.round(num * 100) / 100;
  }

  roundThousandth(num): number {
    return Math.round(num * 1000) / 1000;
  }

  fahrToCels(fahr: number): number {
    return (fahr - 32) * 5 / 9;
  }

  checkFahrenheitToCelsius(fahrenheit): number {
    return this.measurement.temperature === 'us' ? fahrenheit : (fahrenheit - 32) * 5 / 9;
  }

  checkGallonsToLiters(gallon, quarts = false): number {
    if (quarts) {
      return this.measurement.liquid === 'us' ? gallon : gallon * 3.78541 / 4;
    }
    return this.measurement.liquid === 'us' ? gallon : gallon * 3.78541;
  }

  checkPsiToKpa(pressure): number {
    return this.measurement.pressure === 'us' ? pressure : pressure * .145038;
  }

  checkMashRatioUnits(ratio): number {
    return ratio * (this.measurement.liquid === 'us' ? 1 : 1 * 3.78541 / 4) / (this.measurement.malts === 'us' ? 1 : 1 * .453592);
  }

  checkPoundsToGrams(pound, type): number {
    if (type === 'hops') {
      return this.measurement.hops === 'us' ? pound : pound * 28.3495;
    } else if (type === 'malts') {
      return this.measurement.malts === 'us' ? pound : pound * .453592;
    } else if (type === 'agents') {
      return this.measurement.agents === 'metric' ? pound : pound / 28.3495;
    } else if (type === 'finish') {
      return this.measurement.malts === 'us' ? pound : pound * 28.3495;
    }

    return pound;
  }

  checkTeaspoonsToMls(amount): number {
    return this.measurement.agents === 'metric' ? amount : amount * 4.92892;
  }

  checkColor(color): number {
    if (this.measurement.color === 'srm') {
      return color;
    } else if (this.measurement.color === 'ebc') {
      return color * 1.97;
    } else {
      return (color + .76) / 1.3546;
    }
  }

  convertToPlato(gravity): number {
    return 135.997 * gravity ** 3 - 630.272 * gravity ** 2 + 1111.14 * gravity - 616.868;
  }

  // convert to default (usually us)
  inputConversion(amount, type): number {
    if (type === 'hops') {
      return this.measurement.hops === 'us' ? amount : amount / 28.3495;
    } else if (type === 'malts') {
      return this.measurement.malts === 'us' ? amount : amount / .453592;
    } else if (type === 'agents') {
      return this.measurement.agents === 'metric' ? amount : amount * 28.3495;
    } else if (type === 'liquid_agent') {
      return this.measurement.agents === 'metric' ? amount : amount * .202884;
    } else if (type === 'liquid') {
      return this.measurement.liquid === 'us' ? amount : amount / 3.78541;
    } else if (type === 'liquidquart') {
      return this.measurement.liquid === 'us' ? amount : amount / 3.78541 * 4;
    } else if (type === 'temperature') {
      return this.measurement.temperature === 'us' ? amount : amount * 9 / 5 + 32;
    } else if (type === 'pressure') {
      return this.measurement.pressure === 'us' ? amount : amount / .145038;
    } else if (type === 'ratio') {
      return amount * (this.measurement.liquid === 'us' ? 1 : 1 / 3.78541 * 4) / (this.measurement.malts === 'us' ? 1 : 1 / .453592);
    } else if (type === 'color') {
      if (this.measurement.color === 'srm') {
        return amount;
      } else if (this.measurement.color === 'ebc') {
        return amount / 1.97;
      } else {
        return 1.3546 * amount - 0.76;
      }
    }

    return amount;
  }

  measurementChange(type, event = null): void {
    if (type === 'hop') {
      if (this.measurement.hops === 'us') {
        this.recipe.recipe_hops_attributes.forEach((hop) => {
          hop.quantity = hop.quantity / 28.3495;
        });
      } else if (this.measurement.hops === 'metric') {
        this.recipe.recipe_hops_attributes.forEach((hop) => {
          hop.quantity = hop.quantity * 28.3495;
        });
      }
    } else if (type === 'malt') {
      if (this.measurement.malts === 'us') {
        this.recipe.recipe_malts_attributes.forEach((malt) => {
          malt.quantity = malt.quantity / .453592;
        });
        this.recipe.mash_ratio = this.recipe.mash_ratio * .453592;
      } else if (this.measurement.malts === 'metric') {
        this.recipe.recipe_malts_attributes.forEach((malt) => {
          malt.quantity = malt.quantity * .453592;
        });
        this.recipe.mash_ratio = this.recipe.mash_ratio / .453592;
      }
      this.setStrikeAmount();
    } else if (type === 'color') {
      if (event === 'srm') {
        this.recipe.recipe_malts_attributes.forEach((malt) => {
          if (this.measurement.color === 'lovibond') {
            malt.color = (malt.color * 1.3546) - .76;
          } else if (this.measurement.color === 'ebc') {
            malt.color = malt.color / 1.97;
          }
        });
      } else if (event === 'lovibond') {
        this.recipe.recipe_malts_attributes.forEach((malt) => {
          if (this.measurement.color === 'srm') {
            malt.color = (malt.color + .76) / 1.3546;
          } else if (this.measurement.color === 'ebc') {
            malt.color = ((malt.color / 1.97) + .76) / 1.3546;
          }
        });
      } else if (event === 'ebc') {
        this.recipe.recipe_malts_attributes.forEach((malt) => {
          if (this.measurement.color === 'srm') {
            malt.color = malt.color * 1.97;
          } else if (this.measurement.color === 'lovibond') {
            malt.color = ((malt.color * 1.3546) - .76) * 1.97;
          }
        });
      }
    } else if (type === 'agent') {
      if (this.measurement.agents === 'us') {
        this.recipe.recipe_acids_attributes.forEach((agent, i) => {
          agent.quantity = agent.quantity / .202884;
        });
        this.recipe.recipe_sparge_acids_attributes.forEach((agent, i) => {
          agent.quantity = agent.quantity / .202884;
        });
        this.recipe.recipe_water_agents_attributes.forEach((agent, i) => {
          agent.quantity = agent.quantity / 28.3495;
        });
      } else if (this.measurement.agents === 'metric') {
        this.recipe.recipe_acids_attributes.forEach((agent, i) => {
          agent.quantity = agent.quantity * .202884;
        });
        this.recipe.recipe_sparge_acids_attributes.forEach((agent, i) => {
          agent.quantity = agent.quantity * .202884;
        });
        this.recipe.recipe_water_agents_attributes.forEach((agent, i) => {
          agent.quantity = agent.quantity * 28.3495;
        });
      }
    } else if (type === 'liquid') {
      if (this.measurement.liquid === 'us') {
        this.recipe.batch_size = this.recipe.batch_size / 3.78541;
        this.recipe.recipe_waters_attributes.forEach((water) => {
          water.quantity = water.quantity / 3.78541;
        });
        this.recipe.yeast_starters_attributes.forEach((s) => {
          s.volume = s.volume * 4 / 3.78541;
        })
        this.recipe.mash_ratio = this.recipe.mash_ratio / 3.78541 * 4;
      } else if (this.measurement.liquid === 'metric') {
        this.recipe.batch_size = this.recipe.batch_size * 3.78541;
        this.recipe.recipe_waters_attributes.forEach((water) => {
          water.quantity = water.quantity * 3.78541;
        });
        this.recipe.yeast_starters_attributes.forEach((s) => {
          s.volume = s.volume / 4 * 3.78541;
        })
        this.recipe.mash_ratio = this.recipe.mash_ratio * 3.78541 / 4;
      }
      this.setStrikeAmount();
    } else if (type === 'temperature') {
      if (this.measurement.temperature === 'us') {
        this.recipe.primary_ferm_temp = this.recipe.primary_ferm_temp * 9 / 5 + 32;
        this.recipe.secondary_ferm_temp = this.recipe.secondary_ferm_temp * 9 / 5 + 32;
        this.recipe.storage_temperature = this.recipe.storage_temperature * 9 / 5 + 32;
        this.recipe.recipe_mashes_attributes.forEach((mash) => {
          mash.temperature = mash.temperature * 9 / 5 + 32;
        });
      } else if (this.measurement.temperature === 'metric') {
        this.recipe.primary_ferm_temp = (this.recipe.primary_ferm_temp - 32) * 5 / 9;
        this.recipe.secondary_ferm_temp = (this.recipe.secondary_ferm_temp - 32) * 5 / 9;
        this.recipe.storage_temperature = (this.recipe.storage_temperature - 32) * 5 / 9;
        this.recipe.recipe_mashes_attributes.forEach((mash) => {
          mash.temperature = (mash.temperature - 32) * 5 / 9;
        });
      }
    }
  }

  getIngredientList(): string {
    const ingredients: string[] = [];
    this.used_malts.forEach((malt, i) => {
      ingredients.push(
        (this.maltTypes ? this.maltTypes[malt.malt_type_id - 1].name : '') + '\t' +
        this.roundPointOne(
          this.recipe.recipe_malts_attributes[i].quantity) + ' ' + (this.measurement.malts === 'us' ? 'lbs' : 'kg') + '\t' +
        malt.name + ' (' + (this.recipe.recipe_malts_attributes[i].malt_usage) + ')'
      );
    });
    this.used_miscellaneous.forEach((misc, i) => {
      ingredients.push(
        (misc.miscellaneous_type) + '\t' +
        this.roundHundredth(
          this.recipe.recipe_miscellaneous_attributes[i].quantity) + ' ' +
        (this.recipe.recipe_miscellaneous_attributes[i].quantity_label) + '\t' +
        (misc.name) + ' ' + (misc.usage)
      );
    });
    this.used_hops.forEach((hop, i) => {
      ingredients.push(
        'Hop\t' +
        this.roundPointOne(this.recipe.recipe_hops_attributes[i].quantity) + ' ' + (this.measurement.hops === 'us' ? 'oz' : 'g') + '\t' +
        (hop.name) + ' ' + ((this.displayHopInfo(
          this.recipe.recipe_hops_attributes[i].usage, this.recipe.recipe_hops_attributes[i].time)))
      );
    });
    this.used_yeast.forEach((yeast, i) => {
      ingredients.push(
        'Yeast\t' +
        this.roundPointOne(this.recipe.recipe_yeasts_attributes[i].quantity) + ' pkgs' + '\t' +
        (yeast.name) + (yeast.lab ? ' - ' + yeast.lab : '')
      );
    });
    this.used_waters.forEach((water, i) => {
      ingredients.push(
        'Water\t' +
        this.roundPointOne(
          this.recipe.recipe_waters_attributes[i].quantity) + ' ' + ((this.measurement.liquid === 'us' ? 'gallons' : 'liters')) + '\t' +
        (water.name)
      );
    });
    this.getActiveAgents().forEach((agent, i) => {
      ingredients.push(
        'Water Agent\t' +
        this.roundPointOne(agent.quantity) + ' ' + (this.measurement.agents === 'us' ? 'ounces' : 'grams') + '\t' +
        (agent.name)
      );
    });

    return ingredients.join('\n');
  }

  convertToXml(amount: number, type: string): number {
    if (type === 'hops') {
      return amount * .0283495;
    } else if (type === 'malts') {
      return amount * .453592;
    } else if (type === 'liquid') {
      return amount * 3.78541;
    } else if (type === 'temperature') {
      return (amount - 32) * 5 / 9;
    } else if (type === 'agents') {
      return amount / 1000;
    }

    return amount;
  }

  convertFromXml(amount: number, type: string): number {
    if (type === 'hops') {
      return (this.measurement.hops === 'us' ? (amount / .0283495) : (amount * 1000));
    } else if (type === 'malts') {
      return (this.measurement.malts === 'us' ? (amount / .453592) : amount);
    } else if (type === 'liquid') {
      return (this.measurement.liquid === 'us' ? (amount / 3.78541) : amount);
    } else if (type === 'temperature') {
      return (this.measurement.temperature === 'us' ? ((amount * 9 / 5) + 32) : amount);
    } else if (type === 'agents') {
      return (this.measurement.liquid === 'us' ? (amount / .0283495) : (amount * 1000));
    } else if (type === 'color') {
      if (this.measurement.color === 'ebc') {
        return amount * 1.97;
      } else if (this.measurement.color === 'lovibond') {
        return (amount + .76) / 1.3546;
      }
    }

    return amount;
  }

  formRecipeJson(): {} {
    const recipe_json = { recipe: {} };
    const recipe = this.getRecipeCopy();

    recipe_json.recipe['name'] = recipe.name;
    recipe_json.recipe['version'] = recipe.version;

    if (this.recipe.recipe_type === 'Extract') {
      recipe_json.recipe['type'] = 'Extract';
    } else {
      recipe_json.recipe['type'] = 'All Grain';
    }

    recipe_json.recipe['style'] = {
      name: this.used_style.name,
      category: this.used_style.category_name,
      version: 1,
      category_number: this.used_style.category_number,
      style_letter: this.used_style.subcategory,
      style_guide: this.used_style.global ? 'BJCP' : '',
      type: this.used_style.style_type,
      og_min: this.used_style.min_og,
      og_max: this.used_style.max_og,
      fg_min: this.used_style.min_fg,
      fg_max: this.used_style.max_fg,
      ibu_min: this.used_style.min_ibu,
      ibu_max: this.used_style.max_ibu,
      color_min: this.used_style.min_color,
      color_max: this.used_style.max_color
    };

    recipe_json.recipe['equipment'] = {
      name: this.used_equipment.name,
      version: 1,
      boil_size: this.convertToXml(this.estimatePreGallons(), 'liquid'),
      batch_size: this.convertToXml(recipe.batch_size, 'liquid')
    };

    recipe_json.recipe['brewer'] = recipe.brewer;
    // recipe_json.recipe.asst_brewer
    recipe_json.recipe['batch_size'] = this.convertToXml(recipe.batch_size, 'liquid');
    recipe_json.recipe['boil_size'] = this.convertToXml(this.estimatePreGallons(), 'liquid');
    recipe_json.recipe['boil_time'] = recipe.boil_time;
    recipe_json.recipe['efficiency'] = this.used_equipment.efficiency;

    recipe_json.recipe['hops'] = [];
    recipe.recipe_hops_attributes.forEach((hop, i) => {
      let usage = '';
      if (hop.usage === 'boil') {
        usage = 'Boil';
      } else if (hop.usage === 'fwh') {
        usage = 'First Wort';
      } else if (hop.usage === 'dryhop') {
        usage = 'Dry Hop';
        hop.time = hop.time * 24 * 60;
      } else {
        usage = 'Aroma';
      }
      recipe_json.recipe['hops'].push({
        name: this.used_hops[i].name, version: 1,
        alpha: hop.alpha, amount: this.convertToXml(hop.quantity, 'hops'),
        use: usage, time: hop.time, form: hop.form === 'Pellet' ? 'Pellet' : 'Plug'
      });
    });

    recipe_json.recipe['fermentables'] = [];
    recipe.recipe_malts_attributes.forEach((malt, i) => {
      let malt_type = '';
      this.maltTypes.some((mtype) => {
        if (mtype.id === malt.malt_id) {
          malt_type = mtype.name;
          return true;
        }
      });

      recipe_json.recipe['fermentables'].push({
        name: this.used_malts[i].name,
        version: 1,
        type: malt_type,
        amount: this.convertToXml(malt.quantity, 'malts'),
        yield: this.used_malts[i].malt_yield,
        color: malt.color,
        malt_usage: malt.malt_usage
      });
    });

    // recipe_json.recipe.miscs

    recipe_json.recipe['yeasts'] = [];
    recipe.recipe_yeasts_attributes.forEach((yeast, i) => {
      recipe_json.recipe['yeasts'].push({
        name: this.used_yeast[i].name,
        version: 1,
        type: this.used_yeast[i].yeast_type,
        form: this.used_yeast[i].form,
        amount: yeast.quantity,
        add_to_secondary: yeast.fermentation_stage === 1,
        laboratory: this.used_yeast[i].lab,
        product_id: this.used_yeast[i].product_id
      });
    });

    recipe_json.recipe['waters'] = [];
    recipe.recipe_waters_attributes.forEach((water, i) => {
      recipe_json.recipe['waters'].push({
        name: this.used_waters[i].name,
        version: 1,
        amount: this.convertToXml(water.quantity, 'liquid'),
        calcium: this.used_waters[i].calcium,
        bicarbonate: this.used_waters[i].bicarbonate,
        sulfate: this.used_waters[i].sulfate,
        chloride: this.used_waters[i].chloride,
        sodium: this.used_waters[i].sodium,
        magnesium: this.used_waters[i].magnesium,
        ph: this.used_waters[i].ph
      });
    });

    recipe_json.recipe['miscs'] = [];
    this.getActiveAgents().forEach((agent, i) => {
      let agent_amount = 0;
      agent_amount = this.inputConversion(agent.quantity, 'agent');
      recipe_json.recipe['miscs'].push({
        name: agent.name,
        version: 1,
        type: 'Water Agent',
        use: 'Mash',
        time: 0,
        amount: this.convertToXml(this.inputConversion(agent.quantity, 'agents'), 'agents'),
      });
    });
    recipe.recipe_miscellaneous_attributes.forEach((misc, i) => {
      let misc_time = misc.time;
      if (misc.time_label === 'Days') {
        misc_time = misc_time * 24 * 60;
      } else if (misc.time_label === 'Hours') {
        misc_time = misc_time * 60;
      }
      recipe_json.recipe['miscs'].push({
        name: this.used_miscellaneous[i].name,
        version: 1,
        type: this.used_miscellaneous[i].miscellaneous_type,
        use: this.used_miscellaneous[i].usage,
        time: misc_time,
        amount: misc.quantity,
        amount_label: misc.quantity_label,
        use_for: this.used_miscellaneous[i].use_for
      });
    });

    recipe_json.recipe['mash_steps'] = [];
    const mash_info = this.getMashWaterInfo();
    let mash_type = '';
    if (recipe.mash_type === 'none') {
      mash_type = 'Infusion';
    } else if (recipe.mash_type === 'decoction') {
      mash_type = 'Decoction';
    } else if (recipe.mash_type === 'step') {
      mash_type = 'Temperature';
    }
    mash_info.step_info.forEach((step, i) => {
      recipe_json.recipe['mash_steps'].push({
        name: step.step_name,
        version: 1,
        type: mash_type,
        infuse_amount: this.convertToXml(step.water_amount, 'liquid'),
        step_temp: this.convertToXml(step.step_temp, 'temperature'),
        step_time: step.step_time
      });
    });

    recipe_json.recipe['notes'] = recipe.notes;
    recipe_json.recipe['taste_notes'] = recipe.taste_notes;
    // recipe_json.recipe.taste_rating
    recipe_json.recipe['og'] = this.getEstimatedOG();
    recipe_json.recipe['fg'] = this.getEstimatedFG();
    // recipe_json.recipe.fermentation_stages
    recipe_json.recipe['primary_age'] = recipe.primary_ferm_days;
    recipe_json.recipe['primary_temp'] = this.convertToXml(recipe.primary_ferm_temp, 'temperature');
    recipe_json.recipe['secondary_age'] = recipe.secondary_ferm_days;
    recipe_json.recipe['secondary_temp'] = this.convertToXml(recipe.secondary_ferm_temp, 'temperature');
    // recipe_json.recipe.tertiary_age
    // recipe_json.recipe.tertiary_temp
    // recipe_json.recipe.age
    // recipe_json.recipe.age_temp
    recipe_json.recipe['date'] = recipe.recipe_date;
    recipe_json.recipe['carbonation'] = recipe.carbonation_volumes;
    // recipe_json.recipe.forced_carbonation
    // recipe_json.recipe.priming_sugar_name
    recipe_json.recipe['carbonation_temp'] = this.convertToXml(recipe.storage_temperature, 'temperature');
    // recipe_json.recipe.priming_sugar_equiv
    // recipe_json.recipe.keg_priming_factor

    return recipe_json;
  }

  parseXml(my_json: {}, key_name: string = null): string[] {
    let parsed_xml: string[] = [];

    for (const key in my_json) {
      if (my_json[key].constructor === Array) {
        parsed_xml.push('<' + (key_name === null ? key : key_name).toUpperCase() + '>');
        parsed_xml = [...parsed_xml, ...this.parseXml(my_json[key], key.substring(0, key.length - 1))];
        parsed_xml.push('</' + (key_name === null ? key : key_name).toUpperCase() + '>');
      } else if (typeof (my_json[key]) === 'object') {
        parsed_xml.push('<' + (key_name === null ? key : key_name).toUpperCase() + '>');
        parsed_xml = [...parsed_xml, ...this.parseXml(my_json[key])];
        parsed_xml.push('</' + (key_name === null ? key : key_name).toUpperCase() + '>');
      } else {
        parsed_xml.push('<' + (key_name === null ? key : key_name)
          .toUpperCase() + '>' + my_json[key] + '</' + (key_name === null ? key : key_name).toUpperCase() + '>');
      }
    }
    return parsed_xml;
  }

  exportXml(): void {
    const recipe_json: {} = this.formRecipeJson();
    let xml_file = ['<?xml version="1.0" encoding="ISO-8859-1"?>', '<RECIPES>'];

    xml_file = [...xml_file, ...this.parseXml(recipe_json)];
    xml_file.push('</RECIPES>');

    const blob: any = new Blob([xml_file.join('')], { type: 'xml' });
    FileSaver.saveAs(blob, recipe_json['recipe']['name'] + '.xml');
  }

  loadNode(node): string[] {
    let found = false;
    const error_list = [];

    switch (node.nodeName) {
      case 'NAME':
        this.recipe.name = node.innerHTML;
        break;
      case 'VERSION':
        this.recipe.version = parseFloat(node.innerHTML);
        break;
      case 'BREWER':
        this.recipe.brewer = node.innerHTML;
        break;
      case 'BATCH_SIZE':
        this.recipe.batch_size = this.convertFromXml(parseFloat(node.innerHTML), 'liquid');
        break;
      case 'BOIL_TIME':
        this.recipe.boil_time = parseInt(node.innerHTML, 10);
        break;
      case 'NOTES':
        this.recipe.notes = node.innerHTML;
        break;
      case 'TASTE_NOTES':
        this.recipe.taste_notes = node.innerHTML;
        break;
      case 'DATE':
        this.recipe.recipe_date = new Date(node.innerHTML);
        break;
      case 'CARBONATION':
        this.recipe.carbonation_volumes = parseFloat(node.innerHTML);
        break;
      case 'PRIMARY_AGE':
        this.recipe.primary_ferm_days = parseInt(node.innerHTML, 10);
        break;
      case 'PRIMARY_TEMP':
        this.recipe.primary_ferm_temp = this.convertFromXml(parseFloat(node.innerHTML), 'temperature');
        break;
      case 'SECONDARY_AGE':
        this.recipe.secondary_ferm_days = parseInt(node.innerHTML, 10);
        break;
      case 'SECONDARY_TEMP':
        this.recipe.secondary_ferm_temp = this.convertFromXml(parseFloat(node.innerHTML), 'temperature');
        break;
      case 'CARBONATION_TEMP':
        this.recipe.storage_temperature = this.convertFromXml(parseFloat(node.innerHTML), 'temperature');
        break;
      case 'EQUIPMENT':
        const name = node.getElementsByTagName('NAME')[0].innerHTML;

        this.equipment.some((equipment) => {
          if (equipment.name === name) {
            this.used_equipment = equipment;
            found = true;
            return true;
          }
        });
        if (!found) {
          error_list.push('Equipment with name of ' + name + ' not found.');
        }
        break;
      case 'TYPE':
        this.recipe.recipe_type = node.innerHTML;
        break;
      case 'STYLE':
        this.styles.some((style) => {
          if (style.category_number === parseInt(node.getElementsByTagName(
            'CATEGORY_NUMBER')[0].innerHTML, 10) &&
            style.subcategory === node.getElementsByTagName('STYLE_LETTER')[0].innerHTML) {
            this.used_style = style;
            found = true;
            return true;
          }
        });
        if (!found) {
          error_list.push('The style ' + node.getElementsByTagName(
            'CATEGORY_NUMBER')[0].innerHTML + node.getElementsByTagName('STYLE_LETTER')[0].innerHTML + ' was not found.');
        }
        break;
      case 'HOPS':
        const hop_list = node.getElementsByTagName('HOP');
        for (let i = 0; i < hop_list.length; i++) {
          const hop_node = hop_list[i];
          found = false;
          this.hops.some((hop) => {
            if (hop.name === hop_node.getElementsByTagName('NAME')[0].innerHTML) {
              this.used_hops.push(hop);
              const new_hop = {
                hop_id: hop.id, id: null,
                quantity: this.convertFromXml(parseFloat(hop_node.getElementsByTagName('AMOUNT')[0].innerHTML), 'hops'),
                alpha: parseFloat(hop_node.getElementsByTagName('ALPHA')[0].innerHTML),
                time: parseInt(hop_node.getElementsByTagName('TIME')[0].innerHTML, 10),
                form: hop_node.getElementsByTagName('FORM')[0] ? hop_node.getElementsByTagName('FORM')[0].innerHTML : 'Pellet',
                usage: hop_node.getElementsByTagName('USE')[0].innerHTML
              };

              if (new_hop.usage === 'Boil') {
                new_hop.usage = 'boil';
              } else if (new_hop.usage === 'First Wort') {
                new_hop.usage = 'fwh';
              } else if (new_hop.usage === 'Dry Hop') {
                new_hop.usage = 'dryhop';
                new_hop.time = new_hop.time / 24 / 60;
              } else {
                new_hop.usage = 'knockout';
              }

              if (new_hop.form === 'Plug' || new_hop.form === 'Leaf') {
                new_hop.form = 'Whole/Plug';
              }

              this.recipe.recipe_hops_attributes.push(new_hop);
              found = true;
              return true;
            }
          });
          if (!found) {
            error_list.push('Hop named ' + hop_node.getElementsByTagName('NAME')[0].innerHTML + ' was not found.');
          }
        }
        break;
      case 'FERMENTABLES':
        const malt_list = node.getElementsByTagName('FERMENTABLE');
        for (let i = 0; i < malt_list.length; i++) {
          const malt_node = malt_list[i];
          found = false;
          this.malts.some((malt) => {
            if (malt.name === malt_node.getElementsByTagName('NAME')[0].innerHTML) {
              this.used_malts.push(malt);
              const new_malt = {
                malt_id: malt.id, id: null,
                quantity: this.convertFromXml(parseFloat(malt_node.getElementsByTagName('AMOUNT')[0].innerHTML), 'malts'),
                color: this.convertFromXml(parseFloat(malt_node.getElementsByTagName('COLOR')[0].innerHTML), 'color'), malt_usage:
                  ((this.maltTypes[malt.malt_type_id - 1].name === 'Grain' || this.maltTypes[malt.malt_type_id - 1].name === 'Adjunct') ?
                    'Mash' : 'Boil')
              };

              this.recipe.recipe_malts_attributes.push(new_malt);
              found = true;
              return true;
            }
          });
          if (!found) {
            error_list.push('Fermentable named ' + malt_node.getElementsByTagName('NAME')[0].innerHTML + ' was not found.');
          }
        }
        break;
      case 'YEASTS':
        const yeast_list = node.getElementsByTagName('YEAST');
        for (let i = 0; i < yeast_list.length; i++) {
          const yeast_node = yeast_list[i];
          found = false;
          this.yeast.some((yeast) => {
            if ((yeast_node.getElementsByTagName(
              'PRODUCT_ID')[0] && yeast.product_id === yeast_node.getElementsByTagName('PRODUCT_ID')[0].innerHTML) ||
              (!yeast_node.getElementsByTagName('PRODUCT_ID')[0] && yeast.name === yeast_node.getElementsByTagName(
                'NAME')[0].innerHTML)) {
              this.used_yeast.push(yeast);
              const new_yeast = {
                yeast_id: yeast.id, id: null,
                quantity: this.convertFromXml(parseFloat(yeast_node.getElementsByTagName('AMOUNT')[0].innerHTML), 'yeasts'),
                fermentation_stage: yeast_node.getElementsByTagName(
                  'ADD_TO_SECONDARY')[0] ? (yeast_node.getElementsByTagName('ADD_TO_SECONDARY')[0].innerHTML === 'TRUE' ? 2 : 1) : 1
              };

              this.recipe.recipe_yeasts_attributes.push(new_yeast);
              found = true;
              return true;
            }
          });
          if (!found) {
            error_list.push('Yeast named ' + yeast_node.getElementsByTagName('NAME')[0].innerHTML + ' was not found.');
          }
        }
        break;
      case 'WATERS':
        const water_list = node.getElementsByTagName('WATER');
        for (let i = 0; i < water_list.length; i++) {
          const water_node = water_list[i];
          found = false;
          this.waters.some((water) => {
            if (water.name === water_node.getElementsByTagName('NAME')[0].innerHTML) {
              this.used_waters.push(water);
              const new_water = {
                water_id: water.id, id: null,
                quantity: this.convertFromXml(parseFloat(
                  water_node.getElementsByTagName('AMOUNT')[0].innerHTML), 'liquid'), boil: false
              };

              this.recipe.recipe_waters_attributes.push(new_water);
              found = true;
              return true;
            }
          });
          if (!found) {
            error_list.push('Water profile named ' + water_node.getElementsByTagName('NAME')[0].innerHTML + ' was not found.');
          }
        }
        break;
      case 'MASH_STEPS':
        const mash_step_list = node.getElementsByTagName('MASH_STEP');
        if (mash_step_list[0].getElementsByTagName('TYPE')[0].innerHTML === 'Infusion') {
          this.recipe.mash_type = 'none';
        } else if (mash_step_list[0].getElementsByTagName('TYPE')[0].innerHTML === 'Decoction') {
          this.recipe.mash_type = 'decoction';
        } else if (mash_step_list[0].getElementsByTagName('TYPE')[0].innerHTML === 'Temperature') {
          this.recipe.mash_type = 'step';
        }
        for (let i = 0; i < mash_step_list.length; i++) {
          const mash_step_node = mash_step_list[i];
          found = false;
          this.recipe.recipe_mashes_attributes.some((mash_step) => {
            if (mash_step.name === mash_step_node.getElementsByTagName(
              'NAME')[0].innerHTML || (mash_step_node.getElementsByTagName(
                'NAME')[0].innerHTML === 'Infusion' && i === this.infusion_step)) {
              mash_step.used = true;
              mash_step.temperature = this.convertFromXml(mash_step_node.getElementsByTagName('STEP_TEMP')[0].innerHTML, 'temperature');
              mash_step.time = mash_step_node.getElementsByTagName('STEP_TIME')[0].innerHTML;

              found = true;
              return true;
            }
          });
          if (!found) {
            error_list.push('Mash step named ' + mash_step_node.getElementsByTagName('NAME')[0].innerHTML + ' was not found.');
          }
        }

        break;
      case 'MISCS':
        const misc_step_list = node.getElementsByTagName('MISC');
        for (let i = 0; i < misc_step_list.length; i++) {
          const misc_step_node = misc_step_list[i];
          found = false;

          if (misc_step_node.getElementsByTagName('TYPE')[0].innerHTML === 'Water Agent') {
            const agent_name = misc_step_node.getElementsByTagName('NAME')[0].innerHTML;
            this.agents.some((agent) => {
              if (agent.name === agent_name) {
                this.recipe.recipe_water_agents_attributes.some((used_agent) => {
                  if (used_agent.water_agent_id === agent.id) {
                    used_agent.quantity = this.convertFromXml(
                      parseFloat(misc_step_node.getElementsByTagName('AMOUNT')[0].innerHTML), 'agents');
                    found = true;
                    return true;
                  }
                });
                return true;
              }
            });
          } else {
            const misc_name = misc_step_node.getElementsByTagName('NAME')[0].innerHTML;
            this.miscellaneous.some((misc) => {
              if (misc.name === misc_name) {
                const new_misc = {
                  miscellaneou_id: misc.id, id: null,
                  quantity: misc_step_node.getElementsByTagName('AMOUNT')[0].innerHTML,
                  quantity_label: (misc_step_node.getElementsByTagName('AMOUNT_IS_WEIGHT').length > 0 ? 'kg' : 'l'),
                  time: misc_step_node.getElementsByTagName('TIME')[0].innerHTML, time_label: 'Minutes',
                  usage: misc_step_node.getElementsByTagName('USE')[0].innerHTML
                };
                if (misc_step_node.getElementsByTagName('AMOUNT_LABEL').length > 0) {
                  new_misc.quantity_label = misc_step_node.getElementsByTagName('AMOUNT_LABEL')[0].innerHTML;
                }
                if (new_misc.time >= 120) {
                  new_misc.time = new_misc.time / 60;
                  new_misc.time_label = 'Hours';
                  if (new_misc.time >= 48) {
                    new_misc.time = new_misc.time / 24;
                    new_misc.time_label = 'Days';
                  }
                }
                this.recipe.recipe_miscellaneous_attributes.push(new_misc);
                this.used_miscellaneous.push(misc);
                found = true;
                return true;
              }
            });
          }
          if (!found) {
            error_list.push('Misc named ' + misc_step_node.getElementsByTagName('NAME')[0].innerHTML + ' was not found.');
          }
        }
        break;
    }

    return error_list;

    /*
      // recipe_json.recipe.asst_brewer
  
      // recipe_json.recipe.taste_rating
      // recipe_json.recipe.fermentation_stages
      // recipe_json.recipe.tertiary_age
      // recipe_json.recipe.tertiary_temp
      // recipe_json.recipe.age
      // recipe_json.recipe.age_temp
      // recipe_json.recipe.forced_carbonation
      // recipe_json.recipe.priming_sugar_name
      // recipe_json.recipe.priming_sugar_equiv
      // recipe_json.recipe.keg_priming_factor
      */
  }

  parseXmlImport(recipe) {
    let errors = [];
    this.clearRecipe();

    // run through import
    const child_nodes = recipe.childNodes;
    for (let i = 0; i < child_nodes.length; i++) {
      errors = errors.concat(this.loadNode(child_nodes.item(i)));
    }

    if (errors.length > 0) {
      console.error(errors.join('\n'));
      window.alert('Errors found:\n' + errors.join('\n'));
    }
  }

  importXml(xml_file: File): void {
    // upload file
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {

      // parse xml
      const parser = new DOMParser();
      const xml_output = parser.parseFromString(<string>fileReader.result, 'text/xml');
      const recipe = xml_output.getElementsByTagName('RECIPE')[0];

      if (recipe === undefined) {
        window.alert('No recipe found in xml.');
        return;
      }

      this.parseXmlImport(recipe);
    };
    // read in file
    fileReader.readAsText(xml_file);
  }

  massImportXml(xml_file: File): void {
    // upload file
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {

      // parse xml
      const parser = new DOMParser();
      const xml_output = parser.parseFromString(<string>fileReader.result, 'text/xml');
      const recipes = xml_output.getElementsByTagName('RECIPE');

      if (recipes.length === 0) {
        window.alert('No recipes found in xml.');
        return;
      }

      for (let i = 0; i < recipes.length; i++) {
        this.parseXmlImport(recipes[i]);
        this.save(false);
      }

      // window.location.reload();
    };
    // read in file
    fileReader.readAsText(xml_file);
  }

  openDetail(detailPopup, index = 0) {
    this.detailIndex = index;
    this.detailModal = this._modalService.open(detailPopup, { size: 'lg' });
  }
}
