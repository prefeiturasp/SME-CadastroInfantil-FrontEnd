pipeline {
    agent {
      node { 
        label 'py-uniformes'
	    }
    }
    
    options {
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()
      skipDefaultCheckout()  
    }
           
    stages {
       stage('CheckOut') {
        steps {
          checkout scm	
        }
       }

       stage('Analise codigo') {
	       when {
           branch 'homolog-aux'
         }
            steps {
                sh 'sonar-scanner \
                    -Dsonar.projectKey=SME-CadastroInfantil-FrontEnd \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://sonar.sme.prefeitura.sp.gov.br \
                    -Dsonar.login=ea6cd1300ded24934a39dae3b104463d17a4f88e'
            }
       }
      
       stage('Deploy DEV') {
         when {
           branch 'develop'
         }
        steps {
          sh 'echo build docker image desenvolvimento'
          // Start JOB para build das imagens Docker e push SME Registry
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "dc065b32-1c35-41cd-b9c7-e3e38087ed2c",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
           }
                
       
       
       
           //Start JOB de deploy Kubernetes 
          sh 'echo Deploy ambiente desenvolvimento'
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "b45f8a28-90e3-4b6a-abb4-f593ce9a5cf0",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        } 
       }
       
       stage('Deploy homologacao') {
         when {
           branch 'homolog'
         }
        steps {
          timeout(time: 24, unit: "HOURS") {
          // telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
            input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'marcos_nastri, calvin_rossinhole, giuseppe_rosa, anderson_morais'
          }
         sh 'echo Deploying ambiente homologacao'
                
          // Start JOB para build das imagens Docker e push SME Registry
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                             
              //JOB DE BUILD
              jobId: "8af3acfd-547b-4b77-bab8-ca16b5b3e270",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
          //Start JOB deploy Kubernetes 
         
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "c87547a3-ffcd-44db-a8d9-86e73e6b11d4",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }

       stage('Deploy PROD') {
         when {
           branch 'master'
         }
        steps {
          timeout(time: 24, unit: "HOURS") {
          // telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
            input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'marcos_nastri, calvin_rossinhole, giuseppe_rosa, anderson_morais'
          }
            sh 'echo Build image docker Produção'
          // Start JOB para build das imagens Docker e push SME Registry
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                             
              //JOB DE BUILD
              jobId: "7debd03d-364d-48ea-892f-c86aebd4896a",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
          //Start JOB deploy kubernetes 
         
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "ddb1066d-0f57-42c8-a11a-8da2f0e2272a",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
              //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
       }
    } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
    }
    success {
      telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n\n Uma nova versão da aplicação esta disponivel!!!")
    }
    unstable {
      telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
    failure {
      telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME}  - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
    changed {
      echo 'Things were different before...'
    }
    aborted {
      telegramSend("O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
    }
  }
}
