import { ADD_TO_CART } from '../actions/cartActions';

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { item, quantity } = action.payload;
            const existingItem = state.items.find(i => i.item.id === item.id);
            if (existingItem) {
                // L'article existe déjà, augmentez la quantité
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                    ),
                };
            } else {
                // Nouvel article, ajoutez-le au panier
                return {
                    ...state,
                    items: [...state.items, { item, quantity }],
                };
            }
        default:
            return state;
    }
};

export default cartReducer;
