# Next Shop

A Online Shop

## Demo:

[shop.aionchain.co](https://shop.aionchain.co)

---

```bash

                 ┌────────────────────┐
                 │     (Backend)      │
                 │                    │              ┌──────────────────────┐
┌──────────┐     │   Django Server    │              │      (Frontend)      │
│  (Data)  ├─────►                    ├──────────────►                      │
│          │     └────────────────────┘              │                      │
│  MariaDB │                                         │     Next.js Server   │
│  Docker  │     ┌────────────────────┐              │                      │
│          ├─────►       (ML)         ├──────────────►                      │
└──────────┘     │                    │              │                      │
                 │    Flask Server    │              └──────────────────────┘
                 │                    │
                 └────────────────────┘

```

## How to run

### Data:

> Mariadb Database

1.  Install `Docker`

2.  Go to `Docker` folder:

```bash
    cd .\Data\Docker
```

3.  Run Mariadb docker compose:

```bash
    docker-compose -f "mariadb-docker-compose.yml" up -d --build
```

### Backend:

> Python Server (Django)

1.  Clone the project `https://github.com/barkand/next_shop`

2.  Install `python3.7.8` in your system.

3.  Install python Environement in `.\Backend` path:

```bash
   python -m venv .venv
```

4.  Active python and install python packages:

```bash
   .\.venv\Scripts\activate
   pip install -r requirements.txt
```

5.  Go to `backend` folder and run python:

```bash
    cd .\Backend\
    .\.venv\Scripts\activate
```

6.  Run `Backend Server` using `python manage.py runserver`

7.  Go to [http://localhost:8000](http://localhost:8000) to check backend Server.

### ML:

> Pyhton Server (Flask)

1.  Install python Environement in `.\Ml` path:

```bash
   python -m venv .ml
```

2.  Go to `api` folder and run python:

```bash
   cd .\ML\api\
   ..\.ml\Scripts\activat
```

3.  Install python packages:

```bash
   pip install -r requirements.txt
```

4.  Run `ML Server` using `flask run`

5.  Go to [http://localhost:5000](http://localhost:5000) to check ML Server.

### Frontend:

> Nodejs Server (Next.js)

1.  Install `nodejs` in your system.

2.  Install package.json.

3.  Go to `Shop` folder:

```bash
    cd .\Frontend\shop\
```

5.  Run `Frontend Server` using `npm run dev`

6.  Go to [http://localhost:3000](http://localhost:3000) to see your NextShop version.
