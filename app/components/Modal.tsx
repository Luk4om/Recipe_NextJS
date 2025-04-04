import React from "react";

interface ModalProps {
  isOpen: boolean;
  recipe: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, recipe, onClose }) => {
  if (!isOpen || !recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-[#fefefe] p-6 rounded-lg w-1/2 max-w-3xl bg-opacity-95 backdrop-blur-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>

        {/* Display the meal's image */}
        {recipe.strMealThumb && (
          <div className="mb-4 flex items-center justify-center">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-auto h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <h2 className="text-3xl font-bold mb-4 text-gray-800">{recipe.strMeal}</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Ingredients:</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm">{ingredient}</li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No ingredients available.</p>
            )}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Instructions:</h3>
          <p className="text-sm text-gray-600">{recipe.strInstructions}</p>
        </div>

        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          View full recipe
        </a>
      </div>
    </div>
  );
};

export default Modal;
