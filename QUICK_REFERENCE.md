# Quick Reference - Jenkins and Docker

## Local Commands

```bash
npm test
npm run report
npm run test:debug
```

## Docker Commands

```bash
npm run docker:build
npm run docker:run
npm run docker:compose:up
```

## Jenkins Build Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| BROWSER | `all`, `chromium`, `firefox`, `webkit` | Browser selection |
| HEADED | `true`, `false` | Headed or headless run |
| GREP_PATTERN | e.g. `@smoke` | Test filter |

## Email Setting

Update in `Jenkinsfile`:

```groovy
EMAIL_RECIPIENTS = 'your-email@example.com'
```

## Common Fixes

### Docker permission denied (Linux)

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Jenkins HTML report styles missing

```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

### Gmail not sending email

1. Enable 2-Step Verification.
2. Create an app password.
3. Use the app password in Jenkins SMTP config.

## Report Access in Jenkins

1. Open build number.
2. Open `Playwright Test Report`.
3. Review screenshots, videos, and logs.
