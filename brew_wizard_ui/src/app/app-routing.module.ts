import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { AuthGuard } from './user/auth.guard';
import { DneComponent } from './static-pages/dne/dne.component';
import { HomeComponent } from './static-pages/home/home.component';
import { SourcesComponent } from './static-pages/sources/sources.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { WaterProfileComponent } from './water-profile/water-profile/water-profile.component';
import { WaterProfileListComponent } from './water-profile/water-profile-list/water-profile-list.component';
import { AgentComponent } from './water-agent/agent/agent.component';
import { AgentListComponent } from './water-agent/agent-list/agent-list.component';
import { MaltComponent } from './malt/malt/malt.component';
import { MaltListComponent } from './malt/malt-list/malt-list.component';
import { StyleComponent } from './style/style/style.component';
import { StyleListComponent } from './style/style-list/style-list.component';
import { HopComponent } from './hop/hop/hop.component';
import { HopListComponent } from './hop/hop-list/hop-list.component';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous/miscellaneous.component';
import { MiscellaneousListComponent } from './miscellaneous/miscellaneous-list/miscellaneous-list.component';
import { YeastComponent } from './yeast/yeast/yeast.component';
import { YeastListComponent } from './yeast/yeast-list/yeast-list.component';
import { EquipmentComponent } from './equipment/equipment/equipment.component';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { AcidComponent } from './acid/acid/acid.component';
import { AcidListComponent } from './acid/acid-list/acid-list.component';
import { ContactUsComponent } from './static-pages/contact-us/contact-us.component';
import { AboutUsComponent } from './static-pages/about-us/about-us.component';
import { LicenseComponent } from './static-pages/license/license.component';
import { PrivacyPolicyComponent } from './static-pages/privacy-policy/privacy-policy.component';

import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sources',
    component: SourcesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact_us',
    component: ContactUsComponent
  },
  {
    path: 'about_us',
    component: AboutUsComponent
  },
  {
    path: 'license',
    component: LicenseComponent
  },
  {
    path: 'privacy_policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'password_reset',
    component: PasswordResetComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'water_profiles',
    component: WaterProfileListComponent
  },
  {
    path: 'water_profiles/:id',
    component: WaterProfileComponent
  },
  {
    path: 'water_agents',
    component: AgentListComponent
  },
  {
    path: 'water_agents/:id',
    component: AgentComponent
  },
  {
    path: 'acids',
    component: AcidListComponent
  },
  {
    path: 'acids/:id',
    component: AcidComponent
  },
  {
    path: 'malts',
    component: MaltListComponent
  },
  {
    path: 'malts/:id',
    component: MaltComponent
  },
  {
    path: 'styles',
    component: StyleListComponent
  },
  {
    path: 'styles/:id',
    component: StyleComponent
  },
  {
    path: 'hops',
    component: HopListComponent
  },
  {
    path: 'hops/:id',
    component: HopComponent
  },
  {
    path: 'miscellaneous',
    component: MiscellaneousListComponent
  },
  {
    path: 'miscellaneous/:id',
    component: MiscellaneousComponent
  },
  {
    path: 'yeasts',
    component: YeastListComponent
  },
  {
    path: 'yeasts/:id',
    component: YeastComponent
  },
  {
    path: 'equipment',
    component: EquipmentListComponent
  },
  {
    path: 'equipment/:id',
    component: EquipmentComponent
  },
  {
    path: 'recipes/new',
    component: RecipeNewComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'recipes',
    component: RecipeListComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeViewComponent
  },
  {
    path: 'recipes/:id/edit',
    component: RecipeEditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: '**',
    component: DneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
