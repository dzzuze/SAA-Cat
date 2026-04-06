import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { Components } from "react-markdown";
import { useTheme } from "../../providers/theme-context";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  const { resolvedTheme } = useTheme();

  const components: Components = {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-text-primary">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold text-text-primary">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-4 leading-7 text-text-primary">{children}</p>
    ),

    ul: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-text-primary">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-text-primary">
        {children}
      </ol>
    ),

    li: ({ children }) => <li>{children}</li>,

    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),

    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || "");

      if (match) {
        return (
          <SyntaxHighlighter
            style={resolvedTheme === "dark" ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            className="my-4 rounded-xl border border-border-soft"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }

      return (
        <code className="rounded-md bg-surface-muted px-1.5 py-0.5 text-text-primary">
          {children}
        </code>
      );
    },
  };

  return (
    <div className="text-text-primary transition-colors duration-300">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
