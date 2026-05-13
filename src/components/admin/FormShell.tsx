import type { ReactNode } from "react";

type FormShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export default function FormShell({
  title,
  description,
  children,
  actions,
}: FormShellProps) {
  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-700 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
  actions,
}: FormShellProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-950 dark:text-white">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export const adminInputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

export const adminLabelClass =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";

export const adminHelpTextClass =
  "mt-1 text-xs text-gray-500 dark:text-gray-400";
