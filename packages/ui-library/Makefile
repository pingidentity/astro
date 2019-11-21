include ../../Makefile

build-cdn-assets:
	# CDN_VERSION variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	npm run build-css
	mkdir cdn/${CDN_VERSION}
	mv cdn/css cdn/${CDN_VERSION}

	cp -rf src/images cdn/${CDN_VERSION}
	cp -rf src/fonts cdn/${CDN_VERSION}
