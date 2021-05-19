include ../../Makefile

build-cdn-assets:
	# LIB_VERSION variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	yarn run build-css
	mkdir cdn/${LIB_VERSION}
	mv cdn/css cdn/${LIB_VERSION}

	cp -rf src/images cdn/${LIB_VERSION}
	cp -rf src/fonts cdn/${LIB_VERSION}
