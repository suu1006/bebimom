interface AuthButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

export function AuthButton({
  isLoading,
  label,
  loadingLabel,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
}
