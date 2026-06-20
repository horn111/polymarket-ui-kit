export function shortenBuilderCode(code: string, chars = 6): string {
  if (code.length <= chars * 2 + 2) {
    return code;
  }

  return `${code.slice(0, chars)}...${code.slice(-chars)}`;
}
