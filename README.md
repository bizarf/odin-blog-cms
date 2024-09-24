# The Odin Project - Project: Blog API - CMS

The goal of this project is to make an REST API which will be used for a blog client and blog CMS. This is the CMS part of the project.

-   [View the live blog CMS site here](https://bizarf.github.io/odin-blog-cms/)
-   [View the live blog client site here](https://bizarf.github.io/odin-blog-client/)
-   [View the blog API repo](https://github.com/bizarf/odin-blog-api)
-   [View the blog client repo](https://github.com/bizarf/odin-blog-client)

#### Install:

To run this project on your local server, first install the dependencies with the command:

```
npm install
```

Now create a file called ".env.development" and ".env.production" at the root of the project and inside each file add:

```
VITE_API_HOST="(backend_host_location)"
```

The VITE_API_HOST variable in ".env.development" is for development purposes, while the variable in ".env.production" is used when Vite builds the site.

After that is done, you can start the server with:

```
npm run dev
```

<hr>

##### Tools and technologies used:

-   React
-   Vite
-   Typescript
-   TailwindCSS
-   shadcn/ui
-   ESLint
-   Prettier
