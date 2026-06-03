const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-secondary/20 border border-accent/20 shadow-md rounded-xl p-5 w-64">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
};

export default StatsCard;