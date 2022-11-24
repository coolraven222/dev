import './App.css';
import Cart from "./cart/cart";
import Item from "./item/item";

import { Drawer, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Ampharos from "./images/Ampharos.png";
import Flaaffy from "./images/Flaaffy.png";
import Mareep from "./images/Mareep.png";
import Eelektross from "./images/Eelektross.png";
import Eelektrik from "./images/Eelektrik.png";
import Thundurus from "./images/Thundurus.png";
import Jolteon from "./images/Jolteon.png";
import Pikachu from "./images/Pikachu.png";
import Tynamo from "./images/Tynamo.png";
import Tornadus from "./images/Tornadus.png";
import Rookidee from "./images/Rookidee.png";
import Corvisquire from "./images/Corvisquire.png";

const pokemonData = [
  { id: 0, name: 'Ampharos', type: "Electric", ability: 104, image: Ampharos },
  { id: 1, name: 'Flaaffy', type: "Electric", ability: 68, image: Flaaffy },
  { id: 2, name: 'Mareep', type: 'Electric', ability: 38, image: Mareep },
  { id: 3, name: 'Tynamo', type: 'Electric', ability: 28, image: Tynamo },
  { id: 4, name: 'Eelektrik', type: 'Electric', ability: 58, image: Eelektrik },
  { id: 5, name: 'Eelektross', type: 'Electric', ability: 107, image: Eelektross },
  { id: 6, name: 'Jolteon', type: 'Electric', ability: 102, image: Jolteon },
  { id: 7, name: 'Pikachu', type: 'Electric', ability: 45, image: Pikachu },
  { id: 8, name: 'Thundurus', type: 'Electric', ability: 112, image: Thundurus },
  { id: 9, name: 'Tornadus', type: 'Flying', ability: 109, image: Tornadus },
  { id: 10, name: 'Rookidee', type: 'Flying', ability: 32, image: Rookidee },
  { id: 11, name: 'Corvisquire', type: "Flying", ability: 101, image: Corvisquire }
]



function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [type, setType] = useState("All");
  const selectFilterType = eventKey => {
    setType(eventKey);
  };
  const [abilityStandard, setAbilityStandard] = useState("All");
  const selectAbilityStandard = eventKey => {
    setAbilityStandard(eventKey);
  };
  const [order, setOrder] = useState("By ID");
  const selectOrder = eventKey => {
    setOrder(eventKey);
  };

  const getTotalItems = (items) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddItem = (itemToBeAdded) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === itemToBeAdded.id);

      if (isItemInCart) {
        return prev.map((item) => {
          if (item.id === itemToBeAdded.id) {
            item.amount += 1;
          }
          return item
        }
        );
      }

      return [...prev, { ...itemToBeAdded, amount: 1 }];
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.reduce((acc, item) => {
      if (item.id === id) {
        if (item.amount === 1)
          return acc;
        return [...acc, Object.assign(Object.assign({}, item), { amount: item.amount - 1 })];
      }
      else {
        return [...acc, item];
      }
    }, []));
  };

  const matchesPokemonType = item => {
    // all items should be shown when no filter is selected
    if (type === "All") {
      return true
    } else if (type === item.type) {
      return true
    } else {
      return false
    }
  }
  const matchesAbilityStandard = item => {
    // all items should be shown when no filter is selected
    if (abilityStandard === "All") {
      return true
    } else if (abilityStandard === "High") {
      if (item.ability > 100) {
        return true
      } else {
        return false
      }

    } else {
      if (item.ability > 100) {
        return false
      } else {
        return true
      }
    }
  }
  const sortByOrder = (a, b) => {
    if (order === "By Ability") {
      return a.ability - b.ability;
    }
    else {
      return a.id - b.id;
    }
  }

  const filteredData = pokemonData.filter(matchesPokemonType).filter(matchesAbilityStandard).sort(sortByOrder);

  function MyNav() {
    return (
      <>
        <Navbar bg="dark" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand href="#home">Build Your Team</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavDropdown title="Filter By Type" id="basic-nav-dropdown" onSelect={selectFilterType}>
                  <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Electric">Electric</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Flying">Flying</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown title="Filter By Ability" id="basic-nav-dropdown" onSelect={selectAbilityStandard}>
                  <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
                  <NavDropdown.Item eventKey="High">High</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Low">Low</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown title="Sort" id="basic-nav-dropdown" onSelect={selectOrder}>
                  <NavDropdown.Item eventKey="By ID">By ID</NavDropdown.Item>
                  <NavDropdown.Item eventKey="By Ability">By Ability</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <button onClick={() => setCartOpen(true)}>
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <AddShoppingCart />
              </Badge>
            </button>

          </Container>
        </Navbar>
      </>
    );
  }


  return (
    <div className="App">
      <MyNav></MyNav>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
      </Drawer>

      <Grid container spacing={{ xs: 6, md: 9 }} columns={{ xs: 3, sm: 5, md: 4 }}>
        {filteredData.map((pokemon) => (
          <Grid item xs={1} sm={2} md={3} key={pokemon.id}>
            <Item item={pokemon} handleAddItem={handleAddItem}></Item>
          </Grid>
        ))}
      </Grid>
    </div >

  );
}

export default App;
