const CalendarDate = ({ date }: { date: Date }) => {
  const formatedDate = date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="text-md md:text-2xl font-bold text-purple-500">
      {formatedDate}
    </div>
  );
};

export { CalendarDate };
