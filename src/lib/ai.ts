// TODO: Generate code from ChatGPT API
export function generateExercise(difficulty: number): Promise<string> {
  return new Promise((resolve) => {
    console.log("difficulty:", difficulty);

    setTimeout(() => {
      resolve(
        `function exercise(str) {return str.split('').reverse().join('');}`
      );
    }, 500);
  });
}
