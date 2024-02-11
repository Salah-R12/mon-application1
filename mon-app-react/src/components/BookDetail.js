import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategories,fetchBookDetails } from '../apiService';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBookDetails = async () => {
            const details = await fetchBookDetails(id);
            setBook(details);
        };

        getBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h1>{book.title}</h1>

        </div>
    );
}

export default BookDetail;
