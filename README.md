# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS


## Fast local demo
- Start MySQL and confirm `campusconnect` credentials in `backend/src/main/resources/application.properties`.
- Run `RUN-BACKEND-8080.bat` or `RUN-BACKEND-8081.bat` (one backend port at a time).
- Run `RUN-FRONTEND.bat`; open the URL printed by Vite.
- Frontend API default is `http://localhost:8080`. For port 8081, create `.env` from `.env.example`, set `VITE_API_BASE_URL=http://localhost:8081`, and restart Vite.
