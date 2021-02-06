export type Wildcard = "*" | "~" | "_" | "```" | string;

export interface IRule {
  wildcard: Wildcard;
  openTag: string;
  closeTag: string;
}

function isAplhanumeric(char: any): boolean {
  const x: number = `${char || ""}`.charCodeAt(0);

  if (!char || Number.isNaN(x)) {
    return false;
  }

  return !!(
    (x >= 65 && x <= 90)
    || (x >= 97 && x <= 122)
    || (x >= 48 && x <= 57)
  );
}

function getIndexes(text: string, wildcard: Wildcard): number[] {
  const indices: number[] = [];

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === wildcard[0]) {
      const match: string = text.slice(i, i + wildcard.length);
      
      if (match === wildcard) {
        if (indices.length % 2) {
          if (
            text[i - 1] === " "
            || isAplhanumeric(text[i + 1])
          ) {
            break;
          } else {
            indices.push(i);
          }
        } else if (
            typeof (text[i + 1]) === "undefined"
            || text[i + 1] === " "
            || isAplhanumeric(text[i - 1])
            ) {
          break;
        } else {
          indices.push(i);
        }
      }
    } else if (text[i].charCodeAt(0) === 10 && indices.length % 2) {
      indices.pop();
    }
  }

  if (indices.length % 2) {
    // we have unclosed tags
    indices.pop();
  }

  return indices;
}

function injectTags(text: string, indices: number[], rule: IRule): string {
  let e = 0;

  indices.forEach((value, index) => {
    const tag = (index % 2)
      ? rule.closeTag
      : rule.openTag;

    let v = value;
    v += e;

    text = text.substr(0, v) + tag + text.substr(v + rule.wildcard.length);

    e += (tag.length - rule.wildcard.length);
  });

  return text;
}

function execRule(text: string, rule: IRule): string {
  const indices: number[] = getIndexes(text, rule.wildcard);
  return injectTags(text, indices, rule);
}

function parseText(text: string, rules: IRule[]): string {
  const final: string = rules.reduce(
    (transformed, rule) => {
      return execRule(transformed, rule);
    },
   text,
  );

  return final.replace(/\n/gi, "<br>");
}

export const whatsappRules: IRule[] = [
  {
    closeTag: "</strong>",
    openTag: "<strong>",
    wildcard: "*",
  },
  {
    closeTag: "</i>",
    openTag: "<i>",
    wildcard: "_",
  },
  {
    closeTag: "</s>",
    openTag: "<s>",
    wildcard: "~",
  },
  {
    closeTag: "</span>",
    openTag: "<span style='font-family: monospace'>",
    wildcard: "```",
  },
];

export function format(text: string, rules?: IRule[]) {
  return parseText(text, rules || whatsappRules);
}
