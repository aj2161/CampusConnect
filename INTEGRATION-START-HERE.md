# CampusConnect — integration starter

This copy keeps the chosen CampusConnect UI and connects its account flow to the existing Spring Boot backend.

## Connected in this first integration pass
- Sign in: `POST http://localhost:8080/login`
- Registration: `POST http://localhost:8080/students`
- Password reset: `POST http://localhost:8080/reset-password`
- Dashboard student details: `GET http://localhost:8080/students/{id}`
- Profile identity fields: loaded from the same student endpoint
- Logout clears the saved student session

The UI's courses, timetable, notices, events, and community content are still demo data in this first pass. We will integrate those pages next, after confirming this copy starts and authentication works.

## Run it safely in a separate folder
1. Keep your current frontend folder as a backup; do not delete it.
2. Extract this ZIP to a new folder, for example `C:\Users\rudra\OneDrive\Desktop\fullstackproject\campusconnect-ui`.
3. Open a terminal in that new folder and run:
   ```powershell
   npm install
   npm run dev
   ```
4. Keep the Spring Boot backend running on `http://localhost:8080`.
5. Open the local URL Vite prints. The backend currently permits frontend origins on ports 5173 and 5174.
6. Test register → sign in → dashboard, then log out and sign in again.

If the backend is not on `localhost:8080`, create a `.env` file from `.env.example` and set `VITE_API_BASE_URL` to the backend URL. Restart Vite after changing `.env`.

## Notes
- This first pass preserves the chosen layout and styling.
- Student passwords are not saved to localStorage by the frontend.
- The existing backend currently compares/stores passwords as plain text. This is not production-safe and should be changed to password hashing before deployment.
- Profile edit controls, year/semester, course records, timetable, notices, and events are not connected to database endpoints yet.


## Combined frontend + backend
- Frontend: run `npm install` and `npm run dev` from this folder (Vite uses port 5173).
- Backend: open a second terminal, `cd backend`, then run `./mvnw spring-boot:run` on macOS/Linux or `..\backend\mvnw.cmd spring-boot:run` from the project root on Windows (from the backend folder use `..\mvnw.cmd` only if the wrapper is at root; otherwise use `mvn spring-boot:run`). The included backend folder may be run from IntelliJ as a Maven project.
- Ensure MySQL is running and update `backend/src/main/resources/application.properties` with your local MySQL username/password.
- Community posts are saved to MySQL. The backend derives each new post's author and department from the student ID in the database, instead of trusting a hard-coded demo name. Existing sample posts remain visible as demo content.
