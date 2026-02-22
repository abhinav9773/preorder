export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "image-caption"; text: string }
  | { type: "note"; text: string };

export interface BlogData {
  id: string;
  metadata: string;
  title: string;
  author: string;
  authorPosition: string;
  backgroundImage: string;
  content: BlogContentBlock[][];
}
