// TODO: Generate code from ChatGPT API
export function generateExercise(difficulty: number): Promise<string> {
  return new Promise((resolve) => {
    console.log("difficulty:", difficulty);

    setTimeout(() => {
      resolve(
        `function exercise(str) {return str.split('').reverse().join('');}`,
      );
    }, 500);
  });
}

type ReviewResult = {
  review: string;
  score: number; // out of 100
};

// TODO: Generate review from ChatGPT API
export function reviewAnswer(
  code: string,
  answer: string,
): Promise<ReviewResult> {
  return new Promise((resolve) => {
    console.log("code:", code);
    console.log("answer:", answer);

    setTimeout(() => {
      const result = {
        review: "The user answer is wrong.",
        score: 5,
      };

      resolve(result);
    }, 500);
  });
}
