export const signUpValidations = (name: string, phone: string, birthDate: Date, email: string): [string, boolean] => {
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(birthDate?.getFullYear?.toString(), 10);

  if (name.length === 0 || phone.length === 0 || birthDate !== new Date() || email.length === 0) {
    return ['Preencha todos os campos correspondentes', false];
  } else if (!email.match(`.*@.*\\.com.*`)) {
    return ['Insira um email válido', false];
  } else if (!phone.match('^[0-9]*$')) {
    return ['Apenas números no telefone', false];
  } else if (phone.length < 11) {
    return ['Coloque o DD no telefone', false];
  } else if (birthDate > new Date() || birthYear < currentYear - 100) {
    return ['Insira uma data válida', false];
  } else {
    return ['Cadastro feito com sucesso', true];
  }
};
