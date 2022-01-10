export const loginValidation = (email: string, password: string): [string, boolean] => {
  if (email.length === 0 || password.length === 0) {
    return ['Preencha a senha e/ou email', false];
  } else if (!email.match(`.*@.*\\.com.*`)) {
    return ['Insira um email válido', false];
  } else if (password.length < 7) {
    return ['Insira uma senha com pelo menos 7 caracteres', false];
  } else {
    return ['Login feito com sucesso', true];
  }
};
