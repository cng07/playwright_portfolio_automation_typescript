# Jenkins Setup Guide for Playwright Portfolio Automation

This guide explains how to run this Playwright TypeScript project in Jenkins using Docker.

## Prerequisites

Make sure the Jenkins machine has:

- Jenkins (2.400+ recommended)
- Docker
- Git
- Required Jenkins plugins

## Required Jenkins Plugins

Install from `Manage Jenkins -> Plugins -> Available Plugins`:

1. Docker Pipeline
2. HTML Publisher
3. Email Extension Plugin (Email-ext)
4. Pipeline
5. Git Plugin
6. JUnit Plugin
7. Workspace Cleanup (optional)

After installation, restart Jenkins.

## Docker Setup on Jenkins Server

### Windows (Docker Desktop)

```bash
docker --version
docker ps
```

### Linux

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

## Windows-Specific Docker Configuration

If Jenkins runs on Windows with Docker Desktop:

1. Enable file sharing for the Jenkins workspace.
Path in Docker Desktop: `Settings -> Resources -> File Sharing`
Add: `C:\ProgramData\Jenkins` (or your actual Jenkins root).

2. Enable WSL 2 backend.
Path: `Settings -> General`
Enable: `Use the WSL 2 based engine`

3. Validate volume mounts:

```powershell
mkdir C:\temp -ErrorAction SilentlyContinue
docker run --rm -v C:/temp:/test alpine ls /test
```

The Jenkinsfile for this repo should use Windows-compatible `bat` steps and `%WORKSPACE%` paths.

## Create the Jenkins Job

### Option 1: Pipeline from SCM (recommended)

1. Jenkins Dashboard -> `New Item`
2. Name: `Playwright-Portfolio-Tests`
3. Type: `Pipeline`
4. Under Pipeline section:
- Definition: `Pipeline script from SCM`
- SCM: `Git`
- Repository URL: `https://github.com/cng07/playwright_portfolio_automation_typescript.git`
- Branch: `*/main`
- Script Path: `Jenkinsfile`

Optional triggers:
- Poll SCM: `H/5 * * * *`
- Scheduled build: `0 2 * * *`
- GitHub hook trigger

### Option 2: Direct Pipeline Script

1. Create Pipeline job
2. Set Definition to `Pipeline script`
3. Paste Jenkinsfile content directly

## Email Notification Setup

1. Go to `Manage Jenkins -> System`
2. Configure `Extended E-mail Notification`:
- SMTP server: `smtp.gmail.com`
- SMTP port: `587`
- Enable SMTP authentication
- Username: `your-email@gmail.com`
- Password: Gmail app password
- Enable TLS

3. Update `Jenkinsfile`:

```groovy
EMAIL_RECIPIENTS = 'your-email@example.com'
```

For Gmail, enable 2-Step Verification and generate an app password.

## Running the Pipeline

### Manual run

1. Open the Jenkins job
2. Click `Build with Parameters`
3. Choose values:
- `BROWSER`: all, chromium, firefox, webkit
- `HEADED`: true or false
- `GREP_PATTERN`: optional tag/filter like `@smoke`

### Automated run

- GitHub webhook trigger on push
- Cron schedule in Jenkinsfile
- Poll SCM trigger

## Viewing Reports

After build completion:

1. Open build number
2. Open `Playwright Test Report`
3. Review `Console Output`
4. Review JUnit `Test Results`
5. Download `Build Artifacts` if needed

## Troubleshooting

### Docker permission denied (Linux)

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Email not sending

- Verify SMTP host and port
- Verify firewall rules for port 587
- Use app password (not account password)
- Run test email from Jenkins system config

### Playwright browsers not found

Rebuild Docker image:

```bash
docker build -t playwright-portfolio-tests .
```

### HTML report styles missing in Jenkins

If required, set CSP in Jenkins Script Console:

```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

### Windows Docker volume mount errors

If you see `Jenkins does not seem to be running inside a container`:

1. Confirm Docker Desktop file sharing includes Jenkins workspace
2. Confirm WSL 2 backend is enabled
3. Test mount manually:

```powershell
docker run --rm -v C:/temp:/test alpine ls /test
```

4. Confirm Jenkinsfile uses `bat` and `%WORKSPACE%`

## Local Docker Validation (Before Jenkins)

```bash
npm run docker:build
npm run docker:run
npm run docker:compose:up
```

Manual Docker examples:

```bash
docker build -t playwright-portfolio-tests .

docker run --rm \
  -v ${PWD}/playwright-report:/app/playwright-report \
  -v ${PWD}/test-results:/app/test-results \
  playwright-portfolio-tests
```

## Pipeline Capabilities

- Parallel browser execution
- Isolated Docker runtime
- HTML and JUnit reports
- Email notification
- Parameterized builds
- Scheduled execution
- Artifact archiving

## Optional: GitHub Webhook

In GitHub repo settings:

- `Settings -> Webhooks -> Add webhook`
- Payload URL: `http://your-jenkins-url/github-webhook/`
- Content type: `application/json`
- Event: push

In Jenkins job build triggers:

- Enable `GitHub hook trigger for GITScm polling`

## Next Steps

1. Validate Docker locally.
2. Create Jenkins pipeline job.
3. Run first build manually.
4. Confirm reports and email behavior.
5. Enable webhook or schedule.
