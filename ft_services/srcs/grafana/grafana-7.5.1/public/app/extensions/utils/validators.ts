/**
  https://stackoverflow.com/a/46181/4468021
 */
export const isEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

/**
 * Validate multiple emails, stored as a separated string. Also validates that
 * emails are present
 */
export const validateMultipleEmails = (emails: string, separator = ';') => {
  if (!emails) {
    return false;
  }
  return emails
    .split(separator)
    .filter(Boolean)
    .every((email) => isEmail(email));
};

/**
 * Validate if image URL ends with allowed extension
 * @param fileName
 * @param allowedExtensions
 */
export const isValidImageExt = (fileName = '', allowedExtensions = ['png', 'jpg', 'gif']) => {
  if (!fileName) {
    return true;
  }
  const parts = fileName.split('.');
  return allowedExtensions.includes(parts[parts.length - 1]);
};
