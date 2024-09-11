/*
 * @flow
 */
export type ESLintReport = {
  node: any,
  message: string,
};

export type ESLintContext = {
  id: string,
  options: Array<Object>,
  report: (ESLintReport) => void,
  getSourceCode: () => {
    text: string,
  },
};
