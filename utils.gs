const normalizedFromField = (() => {

  const email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
  const matchedEmail = (string) => {
    let match = string.match(email_regex);
    return !!match && match[0];
  }
  const email_extraction_regex = /<(.*@.*\..*)>/; 
  const extractedEmailFromAngleBrackets = (from_string) => {
    let match = email_extraction_regex.exec(from_string);
    return !!match && match[1];
  };

  return (from_string) => {
    if (!from_string) { throw 'Falsy from_string' };
    let email = matchedEmail(from_string) || extractedEmailFromAngleBrackets(from_string);
    if (!email) { throw `from_string without found email: ${from_string}` };
    return email.toLowerCase().normalize();
  }

})();