# Next Shop

A Online Shop

## Demo:

[shop.aionchain.co](https://shop.aionchain.co)
[![shop.aionchain.co](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://shop.aionchain.co/) ![shop.aionchain.co](https://img.shields.io/badge/version-1.0-green.svg)

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

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white) ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

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
