import { format } from ".";

describe("Simplest test", () => {
  it("should exist", () => {
    expect(typeof format).toBe("function");
  });
});

describe("Multi-character wildcard test", () => {
  it("should handle triple backticks for monospace formatting", () => {
    const rule = {
      closeTag: "</p>",
      openTag: "<p style='font-family: monospace'>",
      wildcard: "```",
    };

    const result = format("```test```", [rule]);
    const expected = "<p style='font-family: monospace'>test</p>";

    expect(result).toBe(expected);
  });

  it("should still work with single character wildcards", () => {
    const result = format("*bold* _italic_ ~strikethrough~");
    const expected = "<strong>bold</strong> <i>italic</i> <s>strikethrough</s>";

    expect(result).toBe(expected);
  });

  it("should handle all default WhatsApp formatting", () => {
    const result = format(
      "*bold* _italic_ ~strikethrough~ ```monospace``` `inline code`"
    );
    const expected =
      "<strong>bold</strong> <i>italic</i> <s>strikethrough</s> <code>monospace</code> <code>inline code</code>";

    expect(result).toBe(expected);
  });

  it("should handle mixed single and multi-character wildcards", () => {
    const rules = [
      {
        closeTag: "</strong>",
        openTag: "<strong>",
        wildcard: "*",
      },
      {
        closeTag: "</code>",
        openTag: "<code>",
        wildcard: "```",
      },
    ];

    const result = format("*bold* and ```code```", rules);
    const expected = "<strong>bold</strong> and <code>code</code>";

    expect(result).toBe(expected);
  });
});

describe("Edge cases for complete coverage", () => {
  it("should break formatting when closing wildcard is preceded by space", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("*test *invalid", [rule]);
    const expected = "*test *invalid";

    expect(result).toBe(expected);
  });

  it("should break formatting when closing wildcard is followed by alphanumeric", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("*test*a", [rule]);
    const expected = "*test*a";

    expect(result).toBe(expected);
  });

  it("should break formatting when opening wildcard is at end of string", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("test*", [rule]);
    const expected = "test*";

    expect(result).toBe(expected);
  });

  it("should break formatting when opening wildcard is followed by space", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("test* invalid", [rule]);
    const expected = "test* invalid";

    expect(result).toBe(expected);
  });

  it("should break formatting when opening wildcard is preceded by alphanumeric", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("test*bold*", [rule]);
    const expected = "test*bold*";

    expect(result).toBe(expected);
  });

  it("should handle newlines that break formatting", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("*test\ninvalid*", [rule]);
    const expected = "*test<br>invalid*";

    expect(result).toBe(expected);
  });

  it("should handle unclosed wildcards", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("*unclosed", [rule]);
    const expected = "*unclosed";

    expect(result).toBe(expected);
  });

  it("should break formatting when opening wildcard is preceded by uppercase letter", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("testA*bold*", [rule]);
    const expected = "testA*bold*";

    expect(result).toBe(expected);
  });

  it("should break formatting when opening wildcard is preceded by digit", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("test5*bold*", [rule]);
    const expected = "test5*bold*";

    expect(result).toBe(expected);
  });

  it("should break formatting when closing wildcard is followed by digit", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("*test*5", [rule]);
    const expected = "*test*5";

    expect(result).toBe(expected);
  });

  it("should break formatting when closing wildcard is followed by uppercase letter", () => {
    const rule = {
      closeTag: "</strong>",
      openTag: "<strong>",
      wildcard: "*",
    };

    const result = format("*test*A", [rule]);
    const expected = "*test*A";

    expect(result).toBe(expected);
  });
});
