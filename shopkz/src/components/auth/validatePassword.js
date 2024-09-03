export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (password.length < minLength) return 'Пароль должен содержать не менее 8 символов!';
    if (!hasUpperCase) return 'Пароль должен содержать хотя бы одну заглавную букву!';
    if (!hasLowerCase) return 'Пароль должен содержать хотя бы одну строчную букву!';
    if (!hasDigit) return 'Пароль должен содержать хотя бы одну цифру!';
    return null;
};