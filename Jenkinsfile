pipeline {
    agent any
    
    // Environment variables for the pipeline
    environment {
        // Docker image name (change to your Docker registry if needed)
        DOCKER_IMAGE = "playwright-portfolio-tests"
        DOCKER_TAG = "${BUILD_NUMBER}"
        
        // Email configuration
        EMAIL_RECIPIENTS = 'carlosng07@gmail.com'
        
        // Playwright configuration
        CI = 'true'
    }
    
    // Build triggers - uncomment the ones you want
    triggers {
        // Run tests every night at 2 AM
        cron('0 2 * * *')
        
        // Poll SCM every 5 minutes for changes
        // pollSCM('H/5 * * * *')
    }
    
    // Pipeline parameters - can be configured when running manually
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['all', 'chromium', 'firefox', 'webkit'],
            description: 'Select browser to run tests'
        )
        booleanParam(
            name: 'HEADED',
            defaultValue: false,
            description: 'Run tests in headed mode (visible browser)'
        )
        string(
            name: 'GREP_PATTERN',
            defaultValue: '',
            description: 'Optional: Filter tests by pattern (e.g., @smoke)'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from repository...'
                checkout scm
                
                // Display build information
                script {
                    echo "Build Number: ${BUILD_NUMBER}"
                    echo "Browser: ${params.BROWSER}"
                    echo "Headed Mode: ${params.HEADED}"
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    // Build Docker image with build arguments
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }
        
        stage('Run Tests - Parallel') {
            parallel {
                stage('Chromium Tests') {
                    when {
                        expression { params.BROWSER == 'all' || params.BROWSER == 'chromium' }
                    }
                    steps {
                        echo '🧪 Running Chromium tests...'
                        script {
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside('-u root:root') {
                                sh """
                                    npx playwright test --project=chromium \
                                    ${params.GREP_PATTERN ? "--grep '${params.GREP_PATTERN}'" : ''} \
                                    --reporter=html,json,junit
                                """
                            }
                        }
                    }
                }
                
                stage('Firefox Tests') {
                    when {
                        expression { params.BROWSER == 'all' || params.BROWSER == 'firefox' }
                    }
                    steps {
                        echo '🧪 Running Firefox tests...'
                        script {
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside('-u root:root') {
                                sh """
                                    npx playwright test --project=firefox \
                                    ${params.GREP_PATTERN ? "--grep '${params.GREP_PATTERN}'" : ''} \
                                    --reporter=html,json,junit
                                """
                            }
                        }
                    }
                }
                
                stage('WebKit Tests') {
                    when {
                        expression { params.BROWSER == 'all' || params.BROWSER == 'webkit' }
                    }
                    steps {
                        echo '🧪 Running WebKit tests...'
                        script {
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside('-u root:root') {
                                sh """
                                    npx playwright test --project=webkit \
                                    ${params.GREP_PATTERN ? "--grep '${params.GREP_PATTERN}'" : ''} \
                                    --reporter=html,json,junit
                                """
                            }
                        }
                    }
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                echo '📊 Generating test reports...'
                script {
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside('-u root:root') {
                        // Playwright HTML report is already generated
                        sh 'ls -la playwright-report || echo "No report directory"'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo '📁 Archiving test results and reports...'
            
            // Archive HTML reports
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                reportTitles: 'Playwright Report'
            ])
            
            // Archive test artifacts (screenshots, videos, traces)
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            
            // Publish JUnit test results (if generated)
            junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
            
            // Clean up Docker images to save space
            script {
                sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
            }
        }
        
        success {
            echo '✅ Tests passed successfully!'
            
            // Send success email notification
            emailext(
                subject: "✅ Jenkins Build Successful: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Successful! ✅</h2>
                    <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                    <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                    <p><strong>Browser:</strong> ${params.BROWSER}</p>
                    <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><strong>Test Report:</strong> <a href="${env.BUILD_URL}Playwright_20Test_20Report/">View Report</a></p>
                    <hr>
                    <p style="color: green;">All tests passed successfully!</p>
                """,
                to: "${EMAIL_RECIPIENTS}",
                mimeType: 'text/html'
            )
        }
        
        failure {
            echo '❌ Tests failed!'
            
            // Send failure email notification
            emailext(
                subject: "❌ Jenkins Build Failed: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Failed! ❌</h2>
                    <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                    <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                    <p><strong>Browser:</strong> ${params.BROWSER}</p>
                    <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><strong>Test Report:</strong> <a href="${env.BUILD_URL}Playwright_20Test_20Report/">View Report</a></p>
                    <p><strong>Console Output:</strong> <a href="${env.BUILD_URL}console">View Console</a></p>
                    <hr>
                    <p style="color: red;">Some tests failed. Please check the report for details.</p>
                """,
                to: "${EMAIL_RECIPIENTS}",
                mimeType: 'text/html'
            )
        }
        
        unstable {
            echo '⚠️ Tests are unstable!'
            
            // Send unstable email notification
            emailext(
                subject: "⚠️ Jenkins Build Unstable: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Unstable! ⚠️</h2>
                    <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                    <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                    <p><strong>Browser:</strong> ${params.BROWSER}</p>
                    <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><strong>Test Report:</strong> <a href="${env.BUILD_URL}Playwright_20Test_20Report/">View Report</a></p>
                    <hr>
                    <p style="color: orange;">Build is unstable. Please investigate.</p>
                """,
                to: "${EMAIL_RECIPIENTS}",
                mimeType: 'text/html'
            )
        }
    }
}
