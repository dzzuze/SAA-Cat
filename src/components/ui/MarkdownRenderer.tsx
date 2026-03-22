import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { Components } from "react-markdown";

type Props = {
  content: string;
};

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-3">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-1 mb-4">{children}</ul>
  ),

  li: ({ children }) => <li>{children}</li>,

  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-xl my-4"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    return <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>;
  },
};

export default function MarkdownRenderer({ content }: Props) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
