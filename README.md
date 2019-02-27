# BuildA.Beer

BuildA.Beer is an online beer recipe designer that enables brewers to more easily make potentially complex recipes with a high confidence of what the outcome of their brew day will be.

Immediate goals of the designer are to increase user design and user experience, increase accuracy of calculations, and increase options and advice to brewers for a more successful brew day.

Future goals of the designer include but are not limited to: 

* connect to automated brew systems and run commands through the recipe runner portion of the app
* combine artificial intelligence with a vast recipe library to advise brewers on how to build a better recipe.

BuildA.Beer is written using Ruby on Rails (back end) and Angular2+ (front end), published through Heroku.

# Installation
1. Install git (if not already installed). There are two options:
    
    a. Visit https://git-scm.com/
    
    b. `sudo apt-get install git`   
2. Create an empty folder named 'opensource', navigate to it
3. Clone the repo though 'git clone https://github.com/buildabeer/buildabeer.git'
4. Pick you favorite editor, personally I use sublime text https://www.sublimetext.com.
Sublime has a lot of plugin packages you can install, the more important ones are:
Rails: sublimelinter, sublimelinter-ruby, sublimelinter-rubocop
Angular: typescript, sublime-tslinter

    More options:
    Generic: https://www.shopify.com/partners/blog/sublime-text-plugins-2018
    Rails: https://mattbrictson.com/sublime-text-3-recommendations
    Angular: https://www.sitepoint.com/top-angular-plugins-sublime-text/

    Sublime has a lot of optional plugins, here is a sample of useful ones.
    https://www.shopify.com/partners/blog/sublime-text-plugins-2018

5. Install npm (if not already installed). You'll need this to get packages for the angular front end.

    `sudo apt-get install npm`

    `sudo apt install ng-common`
6. Install the angular cli to manage your project

    `npm install -g @angular/cli`
7. Install the required packages for the front end 

    `cd brew_wizard_ui`

    `npm install`
8. Make sure server starts (let us know if any issues arrise)

    `ng serve`

    open a browser and navigate to 'localhost:4200' 
        NOTE: the back end will not be running yet so you may see errors
9. Install rvm for the back end (rails) server
    visit https://rvm.io/rvm/install
    (If you're on Ubuntu, use this instead: https://github.com/rvm/ubuntu_rvm)
10. Install ruby

    `rvm install ruby-2.4.1`
11. Install required libs

    `sudo apt install libpq-dev`
12. Install gems

    `cd brew_wizard_server`
    
    `bundle install`
13. Setup your DB

    `rake db:create`

    `rake db:migrate`

    `rake db:seed`
14. Make sure server starts (let us know if any issues arrise)
 
    `rails s`
 
    open a browser and navigate to 'localhost:3000'


# Contributing
BuildA.Beer is built by the community for the community. We welcome contribution from everyone, especially new contributors.

You can help BuildA.Beer's development in many ways, including art, coding, design, and documentation.
### Developers
Please see https://github.com/buildabeer/buildabeer/wiki/Instructions-for-making-a-code-change for instructions on how to set things up and commit changes

# Support
If you have any feature requests or bug reports, please log them on our [issue tracker](https://github.com/buildabeer/buildabeer/issues).
Please report security issues directly to builda.beer8@gmail.com.

# License
The BuildA.Beer code is released under the GNUGPL license: https://www.gnu.org/licenses/gpl-3.0.en.html.

# Keeping in touch
We do not currently have any social media set up yet.
