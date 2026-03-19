const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center shadow-lg">
      <p className="font-medium text-red-300">{message}</p>
    </div>
  );
};

export default ErrorMessage;