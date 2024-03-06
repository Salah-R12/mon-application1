// CategoryItem.js
import React, { useState } from 'react';
import chevronIcon from '../assets/chevron.svg'; // Assurez-vous d'avoir cette icône dans vos assets

const CategoryItem = ({ categoryName }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="category-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {categoryName}
            <img
                src={chevronIcon}
                alt="chevron"
                className={`chevron-icon ${isHovered ? 'flipped' : ''}`}
            />
        </div>
    );
};

export default CategoryItem;
