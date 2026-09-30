type NotFoundDataProps = {
  message: string;
  subMessage: string;
};
export default function NotFoundData({ message, subMessage }: NotFoundDataProps) {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center">
      <h2 className="text-sm font-semibold text-slate-700">
        {message}
      </h2>

      <p className="text-xs text-slate-400 mt-1.5">
        {subMessage}
      </p>
    </div>
  );
}
