# Wordle Clone

This is a remake for the famous Wordle game, using only html, css and javascript.

## Requirements

The app was built using node v16

## Development

1. To test the frontend

```
cd frontend
npm run start
```

2. To test the full app

```
firebase serve --only functions,hosting
```
  * You have to build first using `npm run build` in frontend (hosting is lookin at `frontend/public`).
  * Change `isDebug` variable in `frontend/public/gameScript.js` to true.

## How To Deploy

1. Build the frontend

```
cd frontend
npm run build
```

2. Deploy using firebase

```
firebase deploy
```


Enjoy!
