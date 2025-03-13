"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          success:
            "group-[.toast]:border-green-500 group-[.toast]:bg-green-500 group-[.toast]:text-white dark:group-[.toast]:border-green-900 dark:group-[.toast]:bg-green-900",
          error:
            "group-[.toast]:border-red-500 group-[.toast]:bg-red-500 group-[.toast]:text-white dark:group-[.toast]:border-red-900 dark:group-[.toast]:bg-red-900",
          info: "group-[.toast]:border-blue-500 group-[.toast]:bg-blue-500 group-[.toast]:text-white dark:group-[.toast]:border-blue-900 dark:group-[.toast]:bg-blue-900",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};
export { Toaster };
