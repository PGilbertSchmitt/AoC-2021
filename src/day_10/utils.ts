type R_PAREN = ')';
type R_BRACK = ']';
type R_BRACE = '}';
type R_ANGLE = '>';
type L_PAREN = '(';
type L_BRACK = '[';
type L_BRACE = '{';
type L_ANGLE = '<';
type OPEN_CHAR = L_PAREN | L_BRACK | L_BRACE | L_ANGLE;
type CLOSE_CHAR = R_PAREN | R_BRACK | R_BRACE | R_ANGLE;
type CHAR = CLOSE_CHAR | OPEN_CHAR;

export const closeOf = (char: string): CLOSE_CHAR => {
  switch (char) {
    case '(':
      return ')';
    case '[':
      return ']';
    case '{':
      return '}';
    case '<':
      return '>';
    default:
      throw new Error(`Unexpected char "${char}"`);
  }
};

// Returning either a character or an array of characters? Ew, you nasty!
export const parseString = (line: string): CLOSE_CHAR | CHAR[] => {
  const stack: OPEN_CHAR[] = [];
  for (const char of line.split('')) {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        stack.push(char);
        break;
      default:
        const top = stack.pop()!;
        if (char !== closeOf(top)) {
          return char as CLOSE_CHAR;
        }
    }
  }
  return stack as OPEN_CHAR[];
};