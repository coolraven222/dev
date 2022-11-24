import { Button } from "@material-ui/core";
import "./cart.css";

const CartItem = ({ item, handleAddItem, handleRemoveItem }) => {
    return (
        <div className="cartItem">
            <div>
                <h3>{item.name}</h3>
                <p>Unit Ability: {item.ability}</p>
                <p>Total Ability: {(item.amount * item.ability).toFixed(0)}</p>
            </div>
            <img src={item.image} alt={item.title} />
            <div>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleRemoveItem(item.id)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAddItem(item)}
                >
                    +
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
