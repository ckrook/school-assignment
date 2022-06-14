import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IState } from "../../redux/models/IState";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {
  feedAnimal,
  animalBecomesHungry,
  setAll,
} from "../../redux/features/animalSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getList, save } from "../../services/StorageService";
import axios from "axios";

function Animal() {
  const params = useParams();
  const dispatch = useDispatch();
  let animals = useSelector((state: IState) => state.animal.value);
  let interval: NodeJS.Timer;
  useEffect(() => {
    // Only run this once if localstorage is empty
    if (getList().length > 0) return;
    axios
      .get("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        dispatch(setAll(response.data));
        save(response.data);
      });
  }, []);

  let animal = animals.find((animal) => {
    // Find the animal with the id in the url
    if (params.id) {
      return animal.id === parseInt(params.id);
    }
  });

  const isAnimalHungry = () => {
    // Check if the animal is hungry
    if (!animal?.isFed) return;
    let timebetween = new Date().getTime() - new Date(animal.lastFed).getTime();
    if (timebetween >= 10800000) {
      // 10800000 miliseconds = 3 hours
      dispatch(animalBecomesHungry(animal));
      clearInterval(interval);
    }
  };

  useEffect(() => {
    // Check if the animal is hungry every second
    if (!animal?.isFed) return;
    interval = setInterval(() => {
      isAnimalHungry();
    }, 3000);
  });

  const handlefeedAnimal = () => {
    // Feed the animal
    if (animal) {
      dispatch(feedAnimal(animal));
    }
  };

  return (
    <div>
      <div className="w-[600px] mx-auto">
        <Link to="/">
          <Button variant="contained">Go Home</Button>
        </Link>
        <h2>{animal?.name}</h2>
        <img
          className="mb-5"
          src={animal?.imageUrl}
          onError={(e) => {
            e.currentTarget.src =
              "https://i.guim.co.uk/img/media/4dbf7990b7967e4873195d8720c61f7008e5f3b4/0_274_4096_2458/master/4096.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e13eb4039af0ff5d4a77d38ad39d61a7";
          }}
          alt={animal?.name}
        />

        <div className="flex justify-between h-16 items-center">
          <div>
            {animal?.isFed ? (
              <div className="bg-green-400 px-4 py-1 rounded-xl font-semibold">
                Mätt
              </div>
            ) : (
              <div className="bg-red-400 px-4 py-1 rounded-xl font-semibold">
                Hungrig
              </div>
            )}
          </div>
          <div>
            {animal?.isFed ? (
              <Button variant="contained" disabled>
                I'm full!
              </Button>
            ) : (
              <Button onClick={handlefeedAnimal} variant="contained">
                Feed me please
              </Button>
            )}
          </div>
        </div>
        <p>
          Djuret matades: {animal?.lastFed.split("T")[0]} klockan{" "}
          {animal?.lastFed.split("T")[1].split(".")[0]}
        </p>
        <div className="flex items-center">
          Medicin:
          <Chip label={animal?.medicine} />
        </div>
        <p>{animal?.longDescription}</p>
      </div>
    </div>
  );
}

export default Animal;
