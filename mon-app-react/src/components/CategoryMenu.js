import React, { useState, useEffect } from 'react';
import { getCategories } from '../apiService';
import chevronIcon from '../assets/chevron.svg'; // Assurez-vous d'avoir cette icône dans vos assets

const CategoryMenu = ({ categoryName }) => {
    const [categories, setCategories] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories: ", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div
            className="category-menu-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="category-item">
                {categoryName}
                <img
                    src={chevronIcon}
                    alt="chevron"
                    className={`chevron-icon ${isHovered ? 'flipped' : ''}`}
                />
            </div>
            {isHovered && (
                <div className="category-popin">
                    {categories.map((category) => (
                        <div key={category.id} className="category-item">
                            {category.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryMenu;
