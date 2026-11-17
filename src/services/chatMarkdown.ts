import MarkdownIt from 'markdown-it';
type Token = ReturnType<InstanceType<typeof MarkdownIt>['parse']>[number];

// Parse only. Never turn model output into HTML or fetch embedded resources.
const markdown = new MarkdownIt({ html: false, linkify: false, breaks: true, typographer: false });
export interface MarkdownNode { type: string; tag: string; content: string; start: number; children: MarkdownNode[] }
function tree(tokens: Token[]): MarkdownNode[] {
  const root: MarkdownNode[] = [];
  const stack = [root];
  for (const token of tokens) {
    if (token.nesting === -1) { if (stack.length > 1) stack.pop(); continue; }
    const node: MarkdownNode = { type: token.type.replace(/_open$/, ''), tag: token.tag, content: token.children && token.type !== 'image' ? '' : token.content, start: Number(token.attrGet('start') ?? 1), children: token.children ? tree(token.children) : [] };
    stack[stack.length - 1].push(node);
    if (token.nesting === 1) stack.push(node.children);
  }
  return root;
}
export function parseChatMarkdown(text: string): MarkdownNode[] { return tree(markdown.parse(text.slice(0, 12000), {})); }
