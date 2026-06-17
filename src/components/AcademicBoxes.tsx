import { ReactNode } from "react";

interface AcademicBoxProps {
  children: ReactNode;
  title?: string;
}

export function Theorem({ children, title }: AcademicBoxProps) {
  return (
    <div className="my-6 border-l-4 border-foreground pl-4 py-2">
      <p className="font-semibold text-sm uppercase tracking-wider mb-2">
        Theorem{title ? `: ${title}` : ""}
      </p>
      <div className="italic">{children}</div>
    </div>
  );
}

export function Lemma({ children, title }: AcademicBoxProps) {
  return (
    <div className="my-6 border-l-4 border-muted pl-4 py-2">
      <p className="font-semibold text-sm uppercase tracking-wider mb-2">
        Lemma{title ? `: ${title}` : ""}
      </p>
      <div className="italic">{children}</div>
    </div>
  );
}

export function Definition({ children, title }: AcademicBoxProps) {
  return (
    <div className="my-6 border-l-4 border-accent pl-4 py-2">
      <p className="font-semibold text-sm uppercase tracking-wider mb-2">
        Definition{title ? `: ${title}` : ""}
      </p>
      <div>{children}</div>
    </div>
  );
}

export function Proof({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 pl-4 py-2">
      <p className="font-semibold text-sm italic mb-2">Proof.</p>
      <div>{children}</div>
      <div className="text-right text-sm mt-2">∎</div>
    </div>
  );
}

export function Remark({ children, title }: AcademicBoxProps) {
  return (
    <div className="my-6 border-l-4 border-border pl-4 py-2">
      <p className="font-semibold text-sm uppercase tracking-wider mb-2">
        Remark{title ? `: ${title}` : ""}
      </p>
      <div>{children}</div>
    </div>
  );
}

export function Example({ children, title }: AcademicBoxProps) {
  return (
    <div className="my-6 border-l-4 border-border pl-4 py-2 bg-border/10">
      <p className="font-semibold text-sm uppercase tracking-wider mb-2">
        Example{title ? `: ${title}` : ""}
      </p>
      <div>{children}</div>
    </div>
  );
}
