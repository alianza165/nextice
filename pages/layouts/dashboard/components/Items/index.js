import { useState, useEffect } from "react";
import { ListGroup, Card, Form } from "react-bootstrap";
import API from "API";
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const movies1 = [
    {
        "id": 1,
        "category": 2,
        "item": "Croissant Container",
        "product_type": 14,
        "measuring_unit": null,
        "company": 3,
        "quantity": 3.25,
        "running_low": true,
        "threshold": null
    },
    {
        "id": 2,
        "category": 2,
        "item": "Paper Tray Lids",
        "product_type": 14,
        "measuring_unit": null,
        "company": null,
        "quantity": 4.0,
        "running_low": false,
        "threshold": 3.0
    },
    {
        "id": 3,
        "category": 1,
        "item": "Small Cups",
        "product_type": 1,
        "measuring_unit": null,
        "company": 1,
        "quantity": 1.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 4,
        "category": 1,
        "item": "Large Cups",
        "product_type": 2,
        "measuring_unit": null,
        "company": 2,
        "quantity": 1.5,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 5,
        "category": 1,
        "item": "Flat Lid with Straw Slot",
        "product_type": 3,
        "measuring_unit": 3,
        "company": null,
        "quantity": 0.75,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 6,
        "category": 3,
        "item": "Kit Kats",
        "product_type": 4,
        "measuring_unit": 1,
        "company": null,
        "quantity": 40.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 7,
        "category": 3,
        "item": "Lucky Charms Cereal",
        "product_type": 5,
        "measuring_unit": 1,
        "company": null,
        "quantity": 1.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 8,
        "category": 5,
        "item": "Stickers with Logo",
        "product_type": 6,
        "measuring_unit": 4,
        "company": null,
        "quantity": 1.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 9,
        "category": 5,
        "item": "Taster Spoon",
        "product_type": 7,
        "measuring_unit": 3,
        "company": null,
        "quantity": 0.9,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 10,
        "category": 5,
        "item": "Large Gloves",
        "product_type": 8,
        "measuring_unit": 3,
        "company": null,
        "quantity": 6.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 11,
        "category": 5,
        "item": "#4 Paper Bag",
        "product_type": 9,
        "measuring_unit": 5,
        "company": null,
        "quantity": 4.5,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 12,
        "category": 5,
        "item": "Plastic Wrap (Medium)",
        "product_type": 10,
        "measuring_unit": 3,
        "company": null,
        "quantity": 1.75,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 13,
        "category": 4,
        "item": "Honey",
        "product_type": 11,
        "measuring_unit": 6,
        "company": null,
        "quantity": 1.3,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 14,
        "category": 4,
        "item": "Clear Glaze",
        "product_type": 13,
        "measuring_unit": 7,
        "company": null,
        "quantity": 2.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 15,
        "category": 4,
        "item": "Vanilla Icing",
        "product_type": 12,
        "measuring_unit": 3,
        "company": null,
        "quantity": 1.25,
        "running_low": null,
        "threshold": null
    }
]


const Items = ({ onAdd, args }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [starring, setStarring] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    API.get("/item/")
      .then((res) => {
        setMovies(res.data);
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setMovieId(res[0].id)
      })
      .catch(console.error);
  };

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, genre, starring };
    API.post("/item/", item).then(() => refreshMovies());
  };

  const onUpdate = (id) => {
    let item = { name };
    API.patch(`/item/${id}/`, item).then((res) => refreshMovies());
  };

  const onDelete = (id) => {
    API.delete(`/item/${id}/`).then((res) => refreshMovies());
  };

  // const editItem = (item) => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  function selectMovie(id) {
    let item = movies.filter((movie) => movie.id === id)[0];
    setName(item.name);
    setGenre(item.genre);
    setStarring(item.starring);
    setMovieId(item.id);
  }

  function handleToggleComplete(item) {
    API.put(`http://localhost:8000/item/${item.id}/`, item)
        .then((res) => refreshList());
      return;
  }


  function Haalo(props) {
    console.log(props);
  return (null
    );                    
  }

  const editItem = (movie) => {
    console.log(movie);
  };

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    return (
      console.log("yooo"))
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [modal, setModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const toggle = (movie) => {
    setModal(!modal);
    setSelectedMovie(movie);
  }


  return (
    <>

    <div className="container mt-5">
    <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{selectedMovie && selectedMovie.item}</ModalHeader>
        <ModalBody>
          {/* Add any desired content */}
          {selectedMovie && selectedMovie.item}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies1.map((movie, index) => {
                return (
                  <tr key="">
                    <th scope="row">{movie.id}</th>
                    <td> {movie.item}</td>
                    <td>{movie.quantity}</td>
                    <td> 
                    <Haalo name={movie} />
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => toggle(movie)}
                    >
                      Edit
                    </button>
                    
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

    </div>
    </>
  );
};

export default Items;

