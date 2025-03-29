"use client"
import { SignatureCanvas } from "@/components/SignatureCanvas";
import { useState } from "react";



interface AnnotationHandlerProps {
  showSignatureCanvas: boolean;
  signaturePosition: { x: number; y: number };
  onSignatureSave: (signatureDataUrl: string) => void;
  onSignatureCancel: () => void;
}

export const AnnotationHandler = ({
  showSignatureCanvas,
  signaturePosition,
  onSignatureSave,
  onSignatureCancel,
}: AnnotationHandlerProps) => {
  return (
    <>
      {/* Signature Canvas */}
      {showSignatureCanvas && (
        <SignatureCanvas
          position={signaturePosition}
          onSave={onSignatureSave}
          onCancel={onSignatureCancel}
        />
      )}
    </>
  );
};