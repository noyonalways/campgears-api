<div align="center">

[![Youtube][youtube-shield]][youtube-url]
[![Facebook][facebook-shield]][facebook-url]
[![Facebook Page][facebook-shield]][facebook-group-url]
[![Instagram][instagram-shield]][instagram-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![VS Code Theme][vscode-shield]][vscode-theme-url]
[![NPM Package][npm-shield]][npm-package-url]

</div>

<div align="center">
<h3>Campgears API</h3>
    <a href="https://campgears-api.vercel.app">
      <strong>Live Server Link »</strong>
    </a>
</div>

## Overview:

Campgears is a fully-featured e-commerce website that allows users to browse, search, and purchase camping equipment and accessories. The platform includes essential e-commerce functionalities such as product categorization, price filtering, product reviews, and a secure checkout process. The project is built with scalability and user experience in mind, utilizing modern web development technologies.

## API Endpoints

### Products

- **POST** `/api/v1/products` (private) - admin
- **GET** `/api/v1/products` (public) - anyone
- **GET** `/api/v1/products/:productId` (public) - anyone
- **PUT** `/api/v1/products/:productId` (private) - admin
- **DELETE** `/api/v1/products/:productId` (private) - admin

### FAQ Questions

- **GET** `/api/v1/faqs`(public) - anyone
- **POST** `/api/v1/faqs`(private) - admin

### Orders

- **POST** `/api/v1/orders` (private) - user
- **GET** `/api/v1/orders` (private) - admin, user (user can see only own orders)
- **GET** `/api/v1/orders/:orderId` (private) - admin, user (user can see only own orders)

### Reviews

- **POST** `/api/v1/products/:productId/reviews` (private) - user
- **GET** `/api/v1/products/:productId/reviews` (public) - anyone

### Discount

- **POST** `/api/v1/discounts` (private) - admin
- **GET** `/api/v1/discounts` (private) - admin
- **GET** `/api/v1/discounts/:code` (public) - anyone

## Technology Stack

- Node.js
- Express.js
- TypeScript
- Mongoose
- Zod
- Stripe

## Installation Guideline

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB installed locally or a cloud database URI

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/noyonalways/campgears-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd campgears-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   Or if you're using Yarn:
   ```bash
   yarn install
   ```

### Configuration

Create a `.env` file in the root directory

```bash
PORT=5000 (you_can_change_the_port)
DATABASE_URL=your_mongodb_atlas_url
NODE_ENV=node_environment
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_BASE_URL=your_client_base_url
```

### Usage

1. **Running the application:**

   ```bash
   npm run dev
   ```

   Or with Yarn:

   ```bash
   yarn dev
   ```

   This will start the development server on `http://localhost:5000`

## Contact:

- Email: [noyonrahman2003@gmail.com](mailto:noyonrahman2003@gmail.com)
- LinkedIn: [Noyon Rahman](https://linkedin.com/in/noyonalways)
- Portfolio: [noyonrahman.xyz](https://noyonrahman.xyz)

[youtube-shield]: https://img.shields.io/badge/-Youtube-black.svg?style=round-square&logo=youtube&color=555&logoColor=white
[youtube-url]: https://youtube.com/@deskofnoyon
[facebook-shield]: https://img.shields.io/badge/-Facebook-black.svg?style=round-square&logo=facebook&color=555&logoColor=white
[facebook-url]: https://facebook.com/noyonalways
[facebook-group-url]: https://facebook.com/webbronoyon
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=round-square&logo=instagram&color=555&logoColor=white
[instagram-url]: https://instagram.com/noyonalways
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=round-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/noyonalways
[vscode-shield]: https://img.shields.io/badge/-VS%20Code%20Theme-black.svg?style=round-square&logo=visualstudiocode&colorB=555
[vscode-theme-url]: https://marketplace.visualstudio.com/items?itemName=noyonalways.codevibe-themes
[npm-shield]: https://img.shields.io/badge/-Package-black.svg?style=round-square&logo=npm&color=555&logoColor=white
[npm-package-url]: https://www.npmjs.com/package/the-magic-readme
[postman-shield]: https://img.shields.io/badge/-Postman_API_DOC-black.svg?style=round-square&logo=postman&color=555
[postman-api-doc-url]: https://documenter.getpostman.com/view/20724567/2sA3XV8esS
[overview-video-shield]: https://img.shields.io/badge/-Overview_Video-black.svg?style=round-square&logo=youtube&color=555&logoColor=c4302b
[overview-video-url]: https://youtu.be/J4QolLkmus4
