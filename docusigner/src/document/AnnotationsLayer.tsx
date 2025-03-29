"use client"
import { CommentPopover } from "@/components/CommentPopover";
import { TextHighlight } from "@/components/TextHighlight";




interface AnnotationComment {
  id: string;
  position: { x: number; y: number };
  content: string;
}

interface TextAnnotation {
  id: string;
  type: "highlight" | "underline";
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
}

interface SignatureAnnotation {
  id: string;
  dataUrl: string;
  position: { x: number; y: number };
}

interface AnnotationsLayerProps {
  comments: AnnotationComment[];
  textAnnotations: TextAnnotation[];
  signatures: SignatureAnnotation[];
  onCommentSave: (id: string, content: string) => void;
  onCommentDelete: (id: string) => void;
  onTextAnnotationDelete: (id: string) => void;
}

export const AnnotationsLayer = ({
  comments,
  textAnnotations,
  signatures,
  onCommentSave,
  onCommentDelete,
  onTextAnnotationDelete,
}: AnnotationsLayerProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
      {/* Display text annotations (highlights and underlines) */}
      {textAnnotations.map((annotation) => (
        <TextHighlight
          key={annotation.id}
          annotation={annotation}
          onDelete={onTextAnnotationDelete}
        />
      ))}

      {/* Display comments */}
      {comments.map((comment) => (
        <CommentPopover
          key={comment.id}
          id={comment.id}
          position={comment.position}
          initialContent={comment.content}
          onSave={onCommentSave}
          onDelete={onCommentDelete}
        />
      ))}

      {/* Display signatures */}
      {signatures.map((signature) => (
        <div
          key={signature.id}
          className="absolute pointer-events-auto"
          style={{
            left: `${signature.position.x}px`,
            top: `${signature.position.y}px`,
            zIndex: 30,
          }}
        >
          <img
            src={signature.dataUrl}
            alt="Signature"
            className="max-w-[200px]"
          />
        </div>
      ))}
    </div>
  );
};
