export default function ProductImageGallery({ images, selectedImage, onSelect }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <img
          src={selectedImage}
          alt="Selected product"
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => {
          const isActive = image === selectedImage;
          return (
            <button
              key={image}
              type="button"
              onClick={() => onSelect(image)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                isActive
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt="Product thumbnail"
                className="h-20 w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
