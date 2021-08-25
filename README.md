# My test joyride

in this package we used [react-joyride](https://www.npmjs.com/package/react-joyride)

[![](https://badge.fury.io/js/react-joyride.svg)](https://www.npmjs.com/package/react-joyride) [![](https://travis-ci.org/gilbarbara/react-joyride.svg)](https://travis-ci.org/gilbarbara/react-joyride) [![](https://api.codeclimate.com/v1/badges/43ecb5536910133429bd/maintainability)](https://codeclimate.com/github/gilbarbara/react-joyride/maintainability) [![](https://api.codeclimate.com/v1/badges/43ecb5536910133429bd/test_coverage)](https://codeclimate.com/github/gilbarbara/react-joyride/test_coverage)

[![Joyride example image](http://gilbarbara.com/files/react-joyride.png)](https://react-joyride.com/)

#### Create awesome tours for your app!

Showcase your app to new users or explain functionality of new features.

It uses [react-floater](https://github.com/gilbarbara/react-floater) for positioning and styling.  
And you can use your own components too!

**View the demo [here](https://react-joyride.com/)** (or the codesandbox [examples](https://codesandbox.io/s/github/gilbarbara/react-joyride-demo))

**Read the [docs](https://docs.react-joyride.com/)**

Chat about it in our [Spectrum community](https://spectrum.chat/react-joyride)

## Setup

```bash
npm i my-test-joyride
```

## Getting Started

create new element in your [index.html] for [react portal]

```html
<div id="tour-buttons-container"></div>
```

in your [App.js] importing [TourBackdrop]
and wrap your components by [TourBackdrop]
and pass [config] to props in config value [baseUrl] waiting string with backend url it is for saving selected elements from admin tour like in example below

```jsx
import { TourBackdrop } from 'my-test-joyride';

const tourConfig = {
  baseUrl: 'https://<your backend address>/',
};

function App() {
  return (
    <TourBackdrop config={tourConfig}>
      // the example how can look like your components
      <AppBar />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>
        </Switch>
      </Suspense>
    </TourBackdrop>
  );
}
```

after this you need wrap your logic part of your app by [IntroductionTour] like this

```jsx
import { IntroductionTour } from 'my-test-joyride';
// it is AppBar from example before
export function AppBar() {
  return (
    <IntroductionTour className={styles.Header} tag="header" title="navigationInHeader">
      <Navigation />
    </IntroductionTour>
  );
}
```

<!--
> If you need to support legacy browsers you need to include the [scrollingelement](https://github.com/mathiasbynens/document.scrollingElement) polyfill. -->

**Start coding!** 🎉
