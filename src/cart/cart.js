import CartItem from "./cartItem";
import "./cart.css";

const Cart = ({ cartItems, handleAddItem, handleRemoveItem }) => {
    const getTotal = (items) => (
        items.reduce((acc, item) => acc + item.amount * item.ability, 0)
    )

    return (
        <div className="cart">
            <h2>Your Team</h2>
            {cartItems.map((item) => (
                <CartItem item={item} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem}>
                </CartItem>
            ))}
            <h2>Total Ability: {getTotal(cartItems).toFixed(0)}</h2>
        </div>
    )

}

export default Cart;