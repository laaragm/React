import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

const firebaseCartUrl = process.env.REACT_APP_FIREBASE_CART;

export function fetchCartData() {
    return async (dispatch) => {
        async function fetchData() {
            const response = await fetch(firebaseCartUrl);
            if (!response.ok) {
                throw new Error('Could not fetch cart data');
            }
            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error =(',
                message: 'Fetching cart data failed. Please try again later'
            }));
        }
    };
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data'
        }));

        const sendRequest = async () => {
            const response = await fetch(firebaseCartUrl, {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
            });
    
            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        };

        try { 
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error =(',
                message: 'Something went wrong while sending cart data. Please try again later'
            }));
        };
    };
};