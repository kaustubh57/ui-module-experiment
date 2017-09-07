# Main module (v0.1.0)

"Main" component allows you to easily sub-modules to the page.
	
### Build commands:

In order to build and watch files as you modify, run:

    NODE_ENV=development gulp : Files are not minified and uglified. Easy to view and debug for development.
    OR
    gulp : Production version file with minified and uglified.
	
In order to clean your build, run:
    
    gulp clean

In order to build distribution files, run:

	gulp build
	gulp dist


###Note:
By adding prefix `NODE_ENV=development` to any gulp command will run in development mode, meaning files won't be minified or uglified.


# Using Markup Component:
- Prerequisite
  - AngularJS