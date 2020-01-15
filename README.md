# whatsapp formatting for the web

What if you could use an awesome text formatting syntax that millions of people are already used to in your app? Oh wait! You can! cue Whatsapp formatting. You can use \*bold*, \_italic_ or \~strike~.

## Installation
```shell
$ yarn add whatsapp-formatting

// or if you are feeling old school
$ npm install whatsapp-formatting
```

## Usage
The API is very very simple.
```javascript
import { format } from 'whatsapp-formating';

format('*hello* _wolrd_');
// « '<strong>hello</strong> <i>world</i>'

format('~how are you?~');
// « '<s>how are you?</s>'

format(`
multiline
string
`);
// « '<br>multiline<br>string<br>'
```
You can mix and match all of the formatters. OH! And you can customize the formatting rules if you want to:
```javascript
import { format, whatsappRules } from 'whatsapp-formating';

const customRules = [
  ...whatsappRules,
  {
    wildcard: '|',
    openTag: '<span style="font-family:monospace">',
    closeTag: '</span>',
  }
];

format('|some awesome code|', customRules);
// « '<span style="font-family:monospace">some awesome code</span>'
```
## MIT License
Copyright 2020 Marcel de Oliveira Coelho under the [MIT License](https://github.com/flasd/whatsapp-formatting/blob/master/LICENSE).
Go Crazy. :rocket: