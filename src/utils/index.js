const numberToString = (number) => {
  const numberFixed = number.toString();
  return numberFixed.length < 2 ? `0${numberFixed}` : numberFixed;
};

export default numberToString;
