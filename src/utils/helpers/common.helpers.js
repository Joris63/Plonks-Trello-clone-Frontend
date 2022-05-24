import moment from "moment";

function IsElementOffscreen(size = null, pos = null) {
  const res = `${pos?.x < 0 ? "left" : ""} ${pos?.y < 0 ? "up" : ""} ${
    pos?.x + size?.width > window.innerWidth ? "right" : ""
  } ${pos?.y + size?.height > window.innerHeight ? "down" : ""}`;

  return res;
}

function TurnStringToCamelCase(string) {
  const words = string.split(" ").map((word, index) => {
    let newWord = word;

    if (/[/]+/.test(word)) {
      newWord = word
        .split("/")
        .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
        .join("Or");
    }

    if (/[-]+/.test(word)) {
      newWord = word
        .split("-")
        .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
        .join("");
    }

    if (index === 0) {
      newWord = newWord = newWord[0].toLowerCase() + newWord.substr(1);
    } else {
      newWord = newWord = newWord[0].toUpperCase() + newWord.substr(1);
    }

    return newWord;
  });

  return words.join("");
}

function FormatTime(timestamp) {
  return moment(timestamp).calendar();
}

export { IsElementOffscreen, TurnStringToCamelCase, FormatTime };
