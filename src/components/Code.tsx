"use client";

import { formatCode } from "@/lib/code";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  className?: string;
};

const Code: React.FC<Props> = ({ code, className }): React.JSX.Element => {
  const [formattedCode, setformattedCode] = useState<string>(code);

  useEffect(() => {
    const format = async () => {
      const formattedCodeResult = await formatCode(code);
      setformattedCode(formattedCodeResult);
    };

    format();
  }, [code]);

  return (
    <div className={className}>
      <SyntaxHighlighter
        language="javascript"
        showLineNumbers
        wrapLines
        wrapLongLines
        theme="vsc-dark-plus"
        customStyle={{
          fontSize: "1.2rem",
          lineHeight: "2rem",
          height: "100%",
          margin: 0,
        }}
        style={atomDark}
      >
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
