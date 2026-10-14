function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 group">
      <div className="w-12 h-12 rounded-lg bg-indigo-50 text-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
