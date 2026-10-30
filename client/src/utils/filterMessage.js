import badWordsConfig, { defaultBannedWords } from "../config/badWords.js";

let activeBannedWords = [...defaultBannedWords];
let activePartialMatch = badWordsConfig.partialMatch;

export const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const setClientBannedWords = ({ words, partialMatch }) => {
  if (Array.isArray(words)) {
    activeBannedWords = words.map((w) =>
      typeof w === "string" ? w.toLowerCase().trim() : w
    );
  }
  if (partialMatch !== undefined) {
    activePartialMatch = Boolean(partialMatch);
  }
};

export const getClientBannedWords = () => {
  return {
    bannedWords: activeBannedWords,
    partialMatch: activePartialMatch,
  };
};

export const filterMessage = (text, options = {}) => {
  if (!text || typeof text !== "string") {
    return {
      isBanned: false,
      flaggedWords: [],
      warning: "",
    };
  }

  const words = options.words || activeBannedWords;
  const partialMatch =
    options.partialMatch !== undefined ? options.partialMatch : activePartialMatch;

  const flaggedWords = [];

  for (const item of words) {
    const rawWord = typeof item === "string" ? item.trim() : item?.word?.trim();
    if (!rawWord) continue;

    const escaped = escapeRegex(rawWord);
    // If partialMatch is true, matches anywhere in string.
    // If partialMatch is false, matches whole word boundaries only.
    const regex = partialMatch
      ? new RegExp(escaped, "i")
      : new RegExp(`(?:^|[^a-zA-Z0-9_])${escaped}(?:$|[^a-zA-Z0-9_])`, "i");

    if (regex.test(text)) {
      flaggedWords.push(rawWord);
    }
  }

  const isBanned = flaggedWords.length > 0;

  return {
    isBanned,
    flaggedWords,
    warning: isBanned ? "Your message contains inappropriate content." : "",
  };
};

export default filterMessage;
