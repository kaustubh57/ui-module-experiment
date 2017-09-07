# Module-1 (v0.1.0)

"Module-1" is used as sub-module to the main module.
	
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