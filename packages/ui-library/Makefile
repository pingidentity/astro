HOSTING_SERVER_ADDRESS=uilibrary.ping-eng.com
HOSTING_SERVER_USERNAME=ubuntu


package-and-upload-for-hosting:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\

	npm run doc;\
	npm run pack;\
	cp -rf src build;\
	cp -rf build-doc build;\
	rm -rf ${LIB_VERSION}.tar.gz;\
	tar -czf ${LIB_VERSION}.tar.gz build;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf /var/www/html/${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir /var/www/html/${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf /var/www/html/${LIB_VERSION}.tar.gz --strip 1 -C /var/www/html/${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/versions.json ./;\
	node hosting/append_current_version.js;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ./versions.json $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/versions-$(UUID).json;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mv /var/www/html/versions-$(UUID).json /var/www/html/versions.json;\
	rm -f ./versions.json;\
	rm -f ${LIB_VERSION}.tar.gz;\



build-cdn-assets:
	# CDN_VERSION variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	npm run build-css
	mkdir cdn/${CDN_VERSION}
	mv cdn/css cdn/${CDN_VERSION}

	cp -rf src/images cdn/${CDN_VERSION}
	cp -rf src/fonts cdn/${CDN_VERSION}


# update the landing page
package-and-upload-landing:
	# PRIVATE_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\
	npm run pack-landing;\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} build-landing/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/;\

