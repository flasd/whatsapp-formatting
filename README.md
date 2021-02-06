# whatsapp formatting for the web

[![Build Status](https://travis-ci.org/flasd/whatsapp-formatting.svg?branch=master)](https://travis-ci.org/flasd/whatsapp-formatting)
[![Coverage Status](https://coveralls.io/repos/github/flasd/whatsapp-formatting/badge.svg?branch=master)](https://coveralls.io/github/flasd/whatsapp-formatting?branch=master)
[![npm version](https://badge.fury.io/js/@flasd/whatsapp-formatting.svg)](https://www.npmjs.com/package/@flasd/whatsapp-formatting)
[![npm downloads per month](https://img.shields.io/npm/dm/@flasd/whatsapp-formatting.svg)](https://www.npmjs.com/package/@flasd/whatsapp-formatting)

What if you could use an awesome text formatting syntax that millions of people are already used to in your app? Oh wait! You can! cue Whatsapp formatting. You can use \*bold\*, \_italic\_, \~strike~ or \```monospace```. (it's only 473 bytes gzip!)

This lib follows the official Whatsapp markdown as you can see in this link: https://faq.whatsapp.com/general/chats/how-to-format-your-messages/?lang=en

## Installation

```shell
$ yarn add @flasd/whatsapp-formatting

// or if you are feeling old school
$ npm install @flasd/whatsapp-formatting
```

## Usage

The API is very very simple.

```javascript
import { format } from "@flasd/whatsapp-formatting";

format("*hello* _world_");
// « '<strong>hello</strong> <i>world</i>'

format("~how are you?~");
// « '<s>how are you?</s>'

format(`
multiline
string
`);
// « '<br>multiline<br>string<br>'
```

You can mix and match all of the formatters. OH! And you can customize the formatting rules if you want to:

```javascript
import { format, whatsappRules } from "@flasd/whatsapp-formatting";

const customRules = [
  ...whatsappRules,
  {
    wildcard: "|",
    openTag: '<span style="font-family:monospace">',
    closeTag: "</span>",
  },
];

format("|some awesome code|", customRules);
// « '<span style="font-family:monospace">some awesome code</span>'
```

## MIT License

Copyright 2020 Marcel de Oliveira Coelho under the [MIT License](https://github.com/flasd/whatsapp-formatting/blob/master/LICENSE).
Go Crazy. :rocket:
