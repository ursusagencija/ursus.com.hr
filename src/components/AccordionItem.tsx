"use client";

import { useState, type ReactNode } from "react";

type AccordionItemProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  summaryClassName?: string;
  panelClassName?: string;
};

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  summaryClassName = "toggle px-5 py-4 leading-1.5 text-2md text-start w-full text-dark-1 font-serif font-semibold cursor-pointer flex items-center justify-between gap-4",
  panelClassName = "px-5 pb-5",
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="single__accordion border border-stock-1 bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={summaryClassName}
      >
        <span>{title}</span>
        <i
          className={`bi text-xl text-primary-1 transition-transform duration-300 ${
            open ? "bi-dash" : "bi-plus"
          }`}
          aria-hidden
        />
      </button>
      <div
        className={`accordion-panel grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden min-h-0">
          <div className={panelClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}
