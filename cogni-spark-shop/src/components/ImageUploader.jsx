import { useState } from 'react';

export default function ImageUploader({ onImageChange, preview }) {
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      onImageChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-2">
        Product Image
      </label>
      <div className="glass-card border-2 border-dashed border-primary/30 p-6 text-center hover:border-primary/60 transition cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          {preview ? (
            <div className="space-y-2 animate-fadeIn">
              <img
                src={preview}
                alt="Preview"
                className="h-48 w-full object-cover rounded-xl mx-auto border border-primary/20"
              />
              <p className="text-sm text-muted-foreground">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-primary/40 animate-float"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-2l6 6m0 0l6-6m-6 6v16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-foreground/80 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-muted-foreground">PNG, JPG, GIF (max 5MB)</p>
            </div>
          )}
        </label>
      </div>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
}
