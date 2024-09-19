# MANGAZINE FRONTEND

Discord server: https://discord.gg/eZQ83wzQ

## Overview

<br>

Mangazine is a source for Storytelling content. It's a web platform where users can discover and keep track of everything they want to read. We cover a wide range of content, such as mangas, comics, books, manhwa, magazines, etc.
Users can check information about what they are reading, rate titles, add titles they want to read to their 'readlist', create their own lists and we still have a lot of features coming in. At Mangazine, our goal is to be a comprehensive source of information, share amazing Storytelling works from diverse authors around the world, and connect people through culture.

This is the frontend of our platform, built using React, TypeScript, and CSS for an intuitive and responsive user experience.

<br>

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Environment Variables](#environment-variables)
4. [Available Scripts](#available-scripts)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Contributing](#contributing)
8. [License](#license)

<br>

## Prerequisites

> Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

<br>

## Installation

### Clone the repository

```
git clone https://github.com/lopesmfelipe/mangazine-frontend.git
```

```
cd mangazine-frontend
```

### Install dependencies

```
npm install
```

Or if you're using Yarn:

```
yarn install
```

<br>

## Project Structure

```
├── src/                       # Source code for the application
│   ├── components/            # Reusable components for the UI
│   ├── pages/                 # Page-level components for different routes
│   ├── fonts/                 # Style fonts
│   ├── app.tsx                # Main React component
│   ├── main.tsx               # Entry point for the React app
│   └── general.css            # General css styles
│   └── declarations.d.ts      # Typescript css module declaration
├── .env                       # Environment configuration variables
├── package.json               # Project metadata and scripts
├── tsconfig.json              # TypeScript configuration file
├── README.md                  # Project overview and instructions
├── LICENSE                    # License for the project

```

## Environment Variables

> Create a .env file in the root directory and add the following variables:

API URL

```
VITE_API_URL=<api-url>
```

Clerk Publishable Key

```
VITE_CLERK_PUBLISHABLE_KEY=<your-publishable-key>
```

Cloudinary Cloud Name

```
VITE_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
```

Cloudinary Upload Preset

```
VITE_CLOUDINARY_UPLOAD_PRESET=<your-upload-preset>
```

<br>

## Available Scripts

> #### Running the application in development

```
npm run dev
```

This will start the application using nodemon for hot-reloading.

<br>

> #### Running the application in production

```
npm start
```

This will start the application using node.

<br>

> #### Building the application for production

```
npm run build
```

This will create a production-ready build of the application.

<br>

## Application Routes

The following routes are used in the Mangazine frontend:

### Public Routes

- **`/auth`** - The authentication page where users can log in or sign up.
- **`/home`** - The home page, where users can browse popular titles and discover new content.
- **`/details/:titleId`** - Displays detailed information about a specific title (e.g., manga, book). The `:titleId` is a dynamic parameter representing the ID of the title.
- **`/about`** - A page providing information about Mangazine's mission and background.
- **`/contact`** - The contact page, where users can find ways to reach out to Mangazine's team.

### Protected Routes (Requires Authentication)

These routes are accessible only to logged-in users.

- **`/readlist`** - Displays the user's readlist, where they can keep track of titles they want to read.
- **`/lists`** - Shows all custom lists created by the user (e.g., "Top 10 Favorites").
- **`/list/:listId`** - Displays the content of a specific user-created list. The `:listId` is a dynamic parameter representing the ID of the list.
- **`/rating`** - A page where users can rate a title and provide feedback.
- **`/create-list`** - Allows users to create a new list of titles.

### Admin Routes (Requires Admin Access)

These routes are restricted to users with admin privileges.

- **`/create-title`** - Allows admin users to add a new title to the platform, such as a new manga or book.

<br>
<br>

## Contributing

1. Fork the repository
2. Create a new feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

<br>

## License

This project is licensed under the MIT License - see the LICENSE file for details.
