import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { DneComponent } from './static-pages/dne/dne.component';
import { HomeComponent } from './static-pages/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { WaterProfileComponent } from './water-profile/water-profile/water-profile.component';
import { WaterProfileListComponent } from './water-profile/water-profile-list/water-profile-list.component';
import { WaterProfileService } from './water-profile/water-profile.service';
import { WaterProfileNewComponent } from './water-profile/water-profile-new/water-profile-new.component';
import { WaterProfileEditComponent } from './water-profile/water-profile-edit/water-profile-edit.component';
import { WaterCardComponent } from './water-profile/water-card/water-card.component';

import { AgentCardComponent } from './water-agent/agent-card/agent-card.component';
import { AgentComponent } from './water-agent/agent/agent.component';
import { AgentEditComponent } from './water-agent/agent-edit/agent-edit.component';
import { AgentListComponent } from './water-agent/agent-list/agent-list.component';
import { AgentNewComponent } from './water-agent/agent-new/agent-new.component';
import { AgentService } from './water-agent/agent.service';


import { UserService } from './user/user.service';
import { AuthService } from './user/auth.service';
import { AuthGuard } from './user/auth.guard';

import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { RecipeService } from './recipes/recipe.service';
import { DesignerService } from './recipes/designer.service';

import { PhValidator } from './shared/ph-validator.directive';

import { MaltListComponent } from './malt/malt-list/malt-list.component';
import { MaltCardComponent } from './malt/malt-card/malt-card.component';
import { MaltComponent } from './malt/malt/malt.component';
import { MaltEditComponent } from './malt/malt-edit/malt-edit.component';
import { MaltNewComponent } from './malt/malt-new/malt-new.component';
import { MaltService } from './malt/malt.service';

import { StyleComponent } from './style/style/style.component';
import { StyleCardComponent } from './style/style-card/style-card.component';
import { StyleEditComponent } from './style/style-edit/style-edit.component';
import { StyleListComponent } from './style/style-list/style-list.component';
import { StyleNewComponent } from './style/style-new/style-new.component';
import { StyleService } from './style/style.service';

import { HopComponent } from './hop/hop/hop.component';
import { HopCardComponent } from './hop/hop-card/hop-card.component';
import { HopEditComponent } from './hop/hop-edit/hop-edit.component';
import { HopListComponent } from './hop/hop-list/hop-list.component';
import { HopNewComponent } from './hop/hop-new/hop-new.component';
import { HopService } from './hop/hop.service';

import { YeastComponent } from './yeast/yeast/yeast.component';
import { YeastCardComponent } from './yeast/yeast-card/yeast-card.component';
import { YeastEditComponent } from './yeast/yeast-edit/yeast-edit.component';
import { YeastListComponent } from './yeast/yeast-list/yeast-list.component';
import { YeastNewComponent } from './yeast/yeast-new/yeast-new.component';
import { YeastService } from './yeast/yeast.service';

import { MaltSelectComponent } from './recipes/malt-select/malt-select.component';
import { HopSelectComponent } from './recipes/hop-select/hop-select.component';
import { YeastSelectComponent } from './recipes/yeast-select/yeast-select.component';

import { EquipmentComponent } from './equipment/equipment/equipment.component';
import { EquipmentCardComponent } from './equipment/equipment-card/equipment-card.component';
import { EquipmentEditComponent } from './equipment/equipment-edit/equipment-edit.component';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { EquipmentNewComponent } from './equipment/equipment-new/equipment-new.component';
import { EquipmentService } from './equipment/equipment.service';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { ContactUsComponent } from './static-pages/contact-us/contact-us.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AboutUsComponent } from './static-pages/about-us/about-us.component';
import { LoadingComponent } from './components/loading/loading.component';

import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { SaveDialogService } from './recipes/save-dialog.service';
import { CalendarComponent } from './user/calendar/calendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous/miscellaneous.component';
import { MiscellaneousCardComponent } from './miscellaneous/miscellaneous-card/miscellaneous-card.component';
import { MiscellaneousEditComponent } from './miscellaneous/miscellaneous-edit/miscellaneous-edit.component';
import { MiscellaneousListComponent } from './miscellaneous/miscellaneous-list/miscellaneous-list.component';
import { MiscellaneousNewComponent } from './miscellaneous/miscellaneous-new/miscellaneous-new.component';
import { MiscellaneousService } from './miscellaneous/miscellaneous.service';
import { MiscellaneousSelectComponent } from './recipes/miscellaneous-select/miscellaneous-select.component';
import { PrivacyPolicyComponent } from './static-pages/privacy-policy/privacy-policy.component';
import { HistoryComponent } from './user/history/history.component';
import { AcidCardComponent } from './acid/acid-card/acid-card.component';
import { AcidNewComponent } from './acid/acid-new/acid-new.component';
import { AcidEditComponent } from './acid/acid-edit/acid-edit.component';
import { AcidListComponent } from './acid/acid-list/acid-list.component';
import { AcidComponent } from './acid/acid/acid.component';
import { AcidService } from './acid/acid.service';
import { RadarChartComponent } from './recipes/radar-chart/radar-chart.component';
import { SourcesComponent } from './static-pages/sources/sources.component';
import { environment } from '../environments/environment';

import { GoogleAnalyticsService } from './services/google-analytics.service';
import { LicenseComponent } from './static-pages/license/license.component';
import { HopRelationsComponent } from './hop/hop-relations/hop-relations.component';
import { YeastRelationsComponent } from './yeast/yeast-relations/yeast-relations.component';
import { StyleYeastRelationsComponent } from './style/style-yeast-relations/style-yeast-relations.component';
import { ResourcesComponent } from './static-pages/resources/resources.component';

import { RecipeRunnerComponent } from './recipe-runner/recipe-runner/recipe-runner.component';
import { HltRunnerComponent } from './recipe-runner/hlt-runner/hlt-runner.component';
import { MashRunnerComponent } from './recipe-runner/mash-runner/mash-runner.component';
import { SpargeRunnerComponent } from './recipe-runner/sparge-runner/sparge-runner.component';
import { BoilRunnerComponent } from './recipe-runner/boil-runner/boil-runner.component';
import { ChillRunnerComponent } from './recipe-runner/chill-runner/chill-runner.component';
import { FermentationRunnerComponent } from './recipe-runner/fermentation-runner/fermentation-runner.component';
import { ReminderRunnerComponent } from './recipe-runner/reminder-runner/reminder-runner.component';
import { TimerComponent } from './recipe-runner/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    DneComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WaterProfileComponent,
    WaterProfileListComponent,
    WaterCardComponent,
    WaterProfileNewComponent,
    WaterProfileEditComponent,
    RecipeNewComponent,
    PhValidator,
    AgentCardComponent,
    AgentComponent,
    AgentEditComponent,
    AgentListComponent,
    AgentNewComponent,
    MaltListComponent,
    MaltCardComponent,
    MaltComponent,
    MaltEditComponent,
    MaltNewComponent,
    MaltSelectComponent,
    StyleComponent,
    StyleCardComponent,
    StyleEditComponent,
    StyleListComponent,
    StyleNewComponent,
    HopComponent,
    HopCardComponent,
    HopEditComponent,
    HopListComponent,
    HopNewComponent,
    YeastComponent,
    YeastCardComponent,
    YeastEditComponent,
    YeastListComponent,
    YeastNewComponent,
    HopSelectComponent,
    YeastSelectComponent,
    EquipmentComponent,
    EquipmentCardComponent,
    EquipmentEditComponent,
    EquipmentListComponent,
    EquipmentNewComponent,
    RecipeListComponent,
    RecipeCardComponent,
    RecipeViewComponent,
    RecipeEditComponent,
    PasswordResetComponent,
    ContactUsComponent,
    AppFooterComponent,
    AboutUsComponent,
    LoadingComponent,
    RecipeRunnerComponent,
    CalendarComponent,
    MiscellaneousComponent,
    MiscellaneousCardComponent,
    MiscellaneousEditComponent,
    MiscellaneousListComponent,
    MiscellaneousNewComponent,
    MiscellaneousSelectComponent,
    PrivacyPolicyComponent,
    HistoryComponent,
    AcidCardComponent,
    AcidNewComponent,
    AcidEditComponent,
    AcidListComponent,
    AcidComponent,
    RadarChartComponent,
    SourcesComponent,
    LicenseComponent,
    HopRelationsComponent,
    YeastRelationsComponent,
    StyleYeastRelationsComponent,
    HltRunnerComponent,
    MashRunnerComponent,
    SpargeRunnerComponent,
    BoilRunnerComponent,
    ChillRunnerComponent,
    FermentationRunnerComponent,
    ReminderRunnerComponent,
    TimerComponent,
    ResourcesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AngularTokenModule.forRoot(environment.token_auth_config),
    HttpClientModule
  ],
  providers: [AngularTokenModule, AuthGuard, AuthService, WaterProfileService,
                AgentService, MaltService, StyleService, HopService,
                YeastService, EquipmentService, RecipeService, DesignerService,
                CanDeactivateGuard, SaveDialogService, UserService, MiscellaneousService,
                AcidService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(protected _googleAnalyticsService: GoogleAnalyticsService) { }
}
