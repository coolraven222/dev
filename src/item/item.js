import { Button } from "@material-ui/core";
import "./item.css";

const Item = ({ item, handleAddItem }) => {
    return (
        <div className="PokemonItem">
            <img src={item.image} alt={item.name} />
            <div>
                <h2>{item.name} - ID: {item.id}</h2>
                <h2>Type: {item.type}</h2>
                <h2>Ability: {item.ability} {item.ability > 100 ? "(High)" : "(Low)"}</h2>
            </div>
            <Button variant="contained" onClick={() => handleAddItem(item)}>ADD TO TEAM</Button>
        </div>
    );
};

export default Item;
