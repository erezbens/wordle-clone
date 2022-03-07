# Wordle Clone

You can play the game [here](https://wordle-clone-785d4.web.app/).  

This is a remake for the Wordle game using html, css and javascript.  
It is used as a playground for web development.  
If you have any suggestion or found a problem, you're more than welcome to contribute by cloning the repo and submit a PR.  
You can also open an [issue](https://github.com/erezbens/wordle-clone/issues), contact me via [linkedin](https://www.linkedin.com/in/erez-bens/) or [mail](mailto:erez1158@gmail.com)


## Requirements

- The app was built using node v16, so you need node and npm on your local machine.
- It is required to create a firebase project (it's free!):
  - Sign up to firebase at https://firebase.google.com/
  - Create a new project and enable hosting
- Clone the project, and create .env file (./frontend/.env)
- Copy the configuration from firebase to the .env (read the comments in [here](./frontend/src/firebase.js)


## Development

### First run

* Install dependencies

```
cd frontend
npm install
```

* Init firebase hosting and test locally

1. Run `firebase init`
2. Select hosting
3. Rewrite all urls / (SPA)
4. Dont override `index.html`

### Frontend Development

```
cd frontend
npm run start
```

* To test the full app run `test.sh` from the root folder.

Enjoy!
