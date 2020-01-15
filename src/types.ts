export type Wildcard = "*" | "~" | "_" | "```" | string;

export interface IRule {
  wildcard: Wildcard;
  openTag: string;
  closeTag: string;
}
