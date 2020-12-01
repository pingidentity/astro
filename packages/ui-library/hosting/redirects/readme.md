## These folders are placed directly on the server to handle redirects. No build job exists for these. Need a custom Jenkins job to place them on the server. Use the following steps to delpoy a new redirect

    * make changes to redirect file and commit to new branch and submit merge request to master

    * once merge request is approved, make new deployable branch from the first branch and commit the following Jenkinsfile change

    * replace the Jenkinsfile.ui-library.build with the code between the comments

    ```groovy
        //Copy After this line
@Library(['mpl-library', 'jenkins-ci-library']) _
// https://gitlab.corp.pingidentity.com/devtools/icecream/jenkins-mpl-library
// https://gitlab.corp.pingidentity.com/devtools/icecream/jenkins-ci-library

def uiPipelineShared = libraryResource 'com/icecream/central-cluster-agent-definitions/ui-pipeline-shared.yaml';
def centralCluster = 'central-us-east-2-k8s'

pipeline {
  agent {
    kubernetes {
      cloud centralCluster
      yaml uiPipelineShared
    }
  }
    stages {
        stage ('package and upload for hosting') {
        steps {
            dir("${env.WORKSPACE}/packages/ui-library/hosting/redirects") {
            container('node-builder') {
                configFileProvider([configFile(fileId: 'art01.jenkins.settings.xml', targetLocation: 'settings.xml')]) {
                withCredentials([sshUserPrivateKey(credentialsId: "uilibrary.ping-eng.com-ubuntu-user", keyFileVariable: 'keyfile')]) {
                    sh """
                        yarn install --frozen-lockfile

                        yarn exec webpack

                        make PRIVATE_SSH_KEY_PATH=${keyfile} FOLDER="dist" REMOTE_FOLDER="latest" put-folder-on-server
                        make PRIVATE_SSH_KEY_PATH=${keyfile} FOLDER="dist" REMOTE_FOLDER="stable" put-folder-on-server
                        make PRIVATE_SSH_KEY_PATH=${keyfile} FOLDER="dist" REMOTE_FOLDER="snapshot" put-folder-on-server
                    """
                }
                }
            }
            }
        }
        }
    }
    post {
        cleanup {
            cleanWs()
        }
    }
}
        //end copy
    ```
    * push Jenkinsfile change to new deploy branch

    * run https://jenkins-icecream.pingdev.tools/job/PingOne/job/UI-Library/job/UI_library-build_Pipeline-V4/ on new deploy branch
