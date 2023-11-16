export const telephoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4})$/;
export const namesOrSurnamesRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
export const documentRegex = /^(RD\d{7}|\d{3}-\d{7}-\d{1}|^\d{11})$/;
export const emailRegex =
  /^(?:[a-zA-Z0-9._%+-]+@gmail\.com|[^@]+@(?:hotmail\.com|outlook\.com))$/;
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!¡?¿*()])(?!.*\\s).{12,}$/;
