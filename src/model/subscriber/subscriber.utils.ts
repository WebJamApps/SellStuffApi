const emailIsValid = (email:string):boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generateCode = (hi: number, low: number): number => {
  const min = Math.ceil(low);
  const max = Math.floor(hi);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default { emailIsValid, generateCode };
