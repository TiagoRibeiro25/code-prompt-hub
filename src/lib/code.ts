import prettier from "prettier";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

export async function formatCode(code: string): Promise<string> {
  const formattedCode = await prettier.format(code, {
    parser: "babel",
    plugins: [babelPlugin, estreePlugin],
  });

  return formattedCode;
}
