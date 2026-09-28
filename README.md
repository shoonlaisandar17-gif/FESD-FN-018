# FESD-FN-018 — Front-End Final Lab

Ready-to-open Angular 18 + Bootstrap 5 registration project. The form, sample users, responsive list, age class and 10 specified age tests are included.

## Start in VS Code

1. Extract the ZIP and open the **FESD-FN-018** folder in VS Code (`File → Open Folder`).
2. Open `Terminal → New Terminal`.
3. Check Node: `node -v`. Use Node.js 20.11+ (or 22) if you need to update it.
4. Run `npm install` and wait for it to finish. You only need to do this once.
5. Run `npm start`.
6. Open `http://localhost:4200/` in your browser.

To stop the app, press `Ctrl+C` in the terminal.

## Test and submit

1. Stop the dev server or open a second VS Code terminal.
2. Run `npm test`. Chrome or Chromium needs to be installed. You should see **10 SUCCESS** tests.
3. Take a screenshot showing the result and put it in `test-report/test-results.png`.
4. Test the form: empty fields, invalid email, password of fewer than 8 characters, letters in phone (HTTP 400), an existing sample email (HTTP 422), and a valid new user (HTTP 201). The user should appear in the table.
5. Replace `018` in the project folder and `package.json` if the last three digits of your student ID are different. Do not include `node_modules` in your submission.
6. Create a public GitHub repository named `FESD-FN-018`. In the project terminal, run these commands one by one (replace `YOUR_USERNAME`):

```bash
git init
git add .
git commit -m "Complete front-end final lab"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/FESD-FN-018.git
git push -u origin main
```

Then submit the repository URL via MS Teams. The `test-report` folder and test scripts will be included.

## Project files

- `src/app/models/user.ts`: class-based User model and age logic.
- `src/app/models/user.spec.ts`: exactly the 10 lab test cases, using 2024-05-20 as the fixed reference date.
- `src/app/app.component.*`: registration form, alerts, user list and styling.
- `test-report/`: save your real test screenshot here.

This is a front-end-only assignment: registration is stored in memory and resets when the browser reloads. The HTTP numbers shown in alerts are the outcomes requested by the lab sheet; no backend request is made.
