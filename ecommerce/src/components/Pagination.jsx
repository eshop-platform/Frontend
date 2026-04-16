const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
   <div className="flex justify-center items-center gap-2 mt-10 backdrop-blur-sm">
    

      {/* PREVIOUS */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="w-9 h-9 flex items-center justify-center rounded-full 
        bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        ←
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium
          transition-all duration-300
          ${
            currentPage === page
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-110"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* NEXT */}
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        className="w-9 h-9 flex items-center justify-center rounded-full 
        bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        →
      </button>

    </div>
  );
};

export default Pagination;