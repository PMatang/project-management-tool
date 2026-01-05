const ProductivityCard = ({ tasks }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const score = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="bg-green-100 p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-600">📈 Productivity</p>
      <p className="text-3xl font-bold text-green-600">
        {score}%
      </p>
    </div>
  );
};

export default ProductivityCard;
