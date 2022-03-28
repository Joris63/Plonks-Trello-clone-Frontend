/* eslint-disable no-useless-escape */
function CheckForNumberInString(string) {
  return /\d/.test(string);
}

function CheckForCapsInString(string) {
  return [...string]?.some((character) => /^[A-Z]*$/.test(character));
}

function CheckLengthInString(string, minLength = 0) {
  return string?.length >= minLength;
}

function CheckForBadCharacters(string) {
  return [...string]?.some(
    (character) => /^\s*$/.test(character) || /['||"]/.test(character)
  );
}

function ValidateEmail(email) {
  return email?.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export {
  CheckForNumberInString,
  CheckForCapsInString,
  CheckLengthInString,
  CheckForBadCharacters,
  ValidateEmail,
};
