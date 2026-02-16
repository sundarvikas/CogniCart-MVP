export default function CategorySelect({ value, onChange }) {
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Sports & Fitness',
    'Books',
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-2">
        Product Category
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 glass-card border border-primary/30 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition bg-card/50"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
