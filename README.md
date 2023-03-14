![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Berliner EnergieCheckpoint
**This application is a prototype. It may contain errors and small bugs. If you notice something you can report an Issue. Thank you!**

Berlin aims to be climate neutral by 2045 at the latest. To this end, the Berlin Climate Protection and Energy Turnaround Act (EWG Bln) resolved to reduce carbon dioxide emissions by at least 95% compared to 1990. Public buildings such as schools and cultural institutions are to play a model role through energy savings and renovations. But which buildings consume how much energy and what potential savings can be found in the renovation of individual buildings? The application takes a closer look at the data on properties from BIM (Berliner Immobilien Management) as an example.

![Map](/public/social-image.jpg)

<!--

How to:

- You dont need to use every section. Only the ones that apply to your project.
- Adjust the files on .github/ISSUE_TEMPLATE/* how you need them
- Adjust the file on .github/CODEOWNERS to match your team
- If you use staging and main branches use this template for .github/renovate.json


```json
{
   "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "@inpyjamas"
  ],
    "baseBranches": [
    "staging"
  ]
}
```

Bonus:

Use all-contributors

npx all-contributors-cli check
npx all-contributors-cli add ff6347 doc

You can use it on GitHub just by commeting on PRs and issues:

```
@all-contributors please add @ff6347 for infrastructure, tests and code
```
Read more here https://allcontributors.org/


Get fancy shields at https://shields.io
 -->



## Context
   
This application is based on open data. Open data is an important part of Berlin's administrative activities and not only creates transparency and openness, but also enables analysis and applications like this. You can find more open data at the [Berlin Open Data Portal](https://daten.berlin.de).

   
## Data

You can find the raw data on the [BIM Website](https://bim-berlin.de/)
   
## Tech stack

This website is a NextJS app configured with:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)

## Project structure

Basic Next.js app

## Getting started

### Requirements

#### Node.js

This project is a Next.js app which requires you to have [Node.js](https://nodejs.org/en/) installed.

### Installation

Clone the repository to your local machine:

```bash
git clone git@github.com:technologiestiftung/energiekarte.git
```

Move into the repository folder:

```bash
cd energiekarte
```

Make sure you use the Node.js version specified in `.nvmrc`. Find out which Node version you're currently on with:

```bash
node --version
```

If this version differs from the one specified in `.nvmrc`, please install the required version, either manually, or using a tool such as [nvm](https://github.com/nvm-sh/nvm), which allows switching to the correct version via:

```bash
nvm use
```

With the correct Node version, install the dependencies:

```bash
npm install
```

Because the map uses a basemap from maptiler (https://www.maptiler.com/), you will need to provide connection details in your environment. In this repository you can find a file `.env.example`. Duplicate this file and name it `.env`. 

In `.env` you must enter the connection details to the Maptiler style file as suggested in `.env.example`.  If you do not know how to obtain the necessary details, please ask a repository maintainer for access. You can also use other basemaps by providing your own style file.  

You are now ready to start a local development server on http://localhost:3000 via:

```bash
npm run dev
```

## Workflow

New features, fixes, etc. should always be developed on a separate branch:

- In your local repository, checkout the `main` branch.
- Run `git checkout -b <name-of-your-branch>` to create a new branch (ideally following [Conventional Commits guidelines](https://www.conventionalcommits.org)).
- Make your changes
- Push your changes to the remote: `git push -u origin HEAD`
- Open a pull request.

You can commit using the `npm run cm` command to ensure your commits follow our conventions.

## Deployment

The app is deployed to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Map

The basemap style was created with maptiler (https://www.maptiler.com/).  Please note, that you need to update the MAPKEY with your own project's mapkey. You can also use any other basemap by adapting the code in the *src/Map* folder.

## Page analytics

We use [Matomo](https://matomo.org/) for website analytics. Matomo is respectful of the users' privacy, the page visits are tracked anonymously.

In the production environment, a `NEXT_PUBLIC_MATOMO_URL` and `NEXT_PUBLIC_MATOMO_SITE_ID` is configured for this purpose.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licencing

The data used is is derived from the [BIM website](https://bim-berlin.de/). We have processed and enriched the data for this application. If you use this dataset processed by us, you must indicate that the original raw data came from the BIM (BIM Berliner Immobilienmanagement GmbH).

## Credits

<table>
  <tr>
    <td>
      <a href="https://odis-berlin.de">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-odis-berlin.svg" />
      </a>
    </td>
    <td>
      Together with: <a href="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a href="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a>
    </td>
    <td>
      Supported by: <a href="https://www.berlin.de/sen/inneres/">
        <br />
        <br />
        <img width="100" src="https://logos.citylab-berlin.org/logo-berlin-seninnds-en.svg" />
      </a>
    </td>
  </tr>
</table>
