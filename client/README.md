# COVID19 Client

The client for the COVID19 app.

## Setup

Change directory to `client` folder

```
$ cd client
```

Install dependencies

```
$ npm install
```

Create an env file

```
$ cp .env.example .env
```

**For Pusher Configs, Please [Signup](https://pusher.com/)**

Start the app

```
$ npm start
```

## Localization

In order to get translations from BE (now they are located in public folder) some changes should be implemented on FE and BE.

#### FE changes

**./i18n.js** file:

```
import i18n from 'i18next';
...
import config from './config';

i18n
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${config.domainURL}/locales/{{lng}}/{{ns}}`,
    },
...
```

**component** file (i.e. PatientBoard):

```
  constructor(props) {
    super(props);
    this.state = {
     ...
      lng: undefined,
    };
  }
  ...

  componentDidUpdate(prevProps) {
    const lng = prevProps.i18n.language;
    if (this.state.lng !== lng) {
      this.props.fetchQuestions(lng);
    }
  }
  ...

  render() {
    this.setState((state, props) => {
      if (state.lng !== props.i18n.language) {
        return ({ lng: props.i18n.language });
      }
  });
  ...
}

```

#### BE changes

**app.js** file:

```
app.get("/locales/:lng/:ns", (req, res, next) =>
  res.send(locales[req.params.lng][req.params.ns]).catch(next)
);

```
