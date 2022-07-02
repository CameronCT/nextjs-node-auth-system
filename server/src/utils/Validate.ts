const isAlphaNumerical = (str: string): boolean => {
    const re = /%CC%/g;
    const hasZalgo = (txt: string) => re.test(encodeURIComponent(txt));
    const isValid = (txt: string) => /^[0-9a-zA-Z_.!@$%^&*<> -]+$/.test(txt);
  
    return !(hasZalgo(str) || !isValid(str));
  };
  
  const isZalgo = (txt: string) => /%CC%/g.test(encodeURIComponent(txt));
  
  const isLegalName = (str: string): boolean => {
    // old /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(txt
    const isValid = (txt: string) => /^[a-zA-Z-,]+(\s?[a-zA-Z-, ])*$/.test(txt);
    return isValid(str);
  };
  
  const isPassword = (str: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
      return regex.test(str);
  }
  
  export default { isAlphaNumerical, isLegalName, isZalgo, isPassword };