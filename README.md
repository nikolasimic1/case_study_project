# Setup Instructions

# My Docker version: 27.4.0

1. Create a `.env` file in the `backend` folder based on the `.env.example`, and change: `GUARDIAN_API_KEY`, `NEWS_API_KEY` and `NYT_API_KEY`.
2. Open a terminal in the `backend` folder and run the following commands: **composer install** and **npm install**
3. After that, in the same terminal, run the command: **php artisan key:generate**
4. The generated key is written in `.env` automatically. Copy it from there to root folder in file `docker-compose.yml` at this part: **environment: - APP_KEY=your-app-key**
5. Create a `.env` file in the `frontend` folder based on the `.env.example`.
6. Open a terminal in the `frontend` folder and run the following command: **npm install**
7. Navigate to the root folder of the project and open a terminal there, run the command: **docker compose up --build**
8. In the root folder, open a new terminal and run the command: **docker exec -it laravel_app php artisan migrate**
