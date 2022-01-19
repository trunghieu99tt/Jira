## Project Structure

### Basic Monolithic Application Structure

```
│ .env # Environment credentials
│ src/
│├── App.tsx
│├── i18.config.js # Config for i18
│├── routes.ts # routes of app
│├── index.tsx # routes of app
│├── common/ # Shared modules, dto, filter, middleware... that are used by multiple components
│├── assets/ # app's assets like images, audio, video,...
│├── config/ # configuration files for the application
│├── constants/ # constants which are shared across app
│├── hooks/ # hooks which are shared across app
│├── layout/ # layout HOCs
│├── model/ # files which convert db schema to objects used in your app
│├── pages/ # our app's page components
│├── recoil/ # app's global store using recoil lib
│├── routes/ # private route controller
│├── socket/ # socket related stuff
│├── talons/ # custom hooks which are shared across our app
│├── types/ # user's type definitions
│├── utils/ # helper functions
│├── components
││ ├── component/  # A component which manage to do specific thing
││ │   ├── Component.tsx  # Our ui code
││ │   ├── useComponent.ts # Custom hook of component, used to separate logic code and ui code
││ │   ├── component.module.css/ # css module files of component
││ │   └── ComponentStyled.ts # styled-component file
├── docs/  # documentations and readme files
├── generator/  # components generators cli
└── test/ # E2E tests
```
