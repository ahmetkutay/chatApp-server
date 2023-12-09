pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-u root'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    // Your build commands go here
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    // Deploy to GitHub Pages using the gh-pages npm package
                    sh 'npm install -g gh-pages'
                    sh 'npx gh-pages -d dist'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment to GitHub Pages successful!'
        }
    }
}