export interface AnnotationComment {
    id: string;
    position: { x: number; y: number };
    content: string;
  }
  
  export interface TextAnnotation {
    id: string;
    type: "highlight" | "underline";
    position: { x: number; y: number };
    width: number;
    height: number;
    color: string;
  }
  
  export interface SignatureAnnotation {
    id: string;
    dataUrl: string;
    position: { x: number; y: number };
  }