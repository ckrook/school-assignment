import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IState } from "../../redux/models/IState";
import { useDispatch, useSelector } from "react-redux";
import { setAll } from "../../redux/features/animalSlice";
import { getList, save } from "../../services/StorageService";
import { resourceLimits } from "worker_threads";

function Home() {
  const animals = useSelector((state: IState) => state.animal.value);
  const dispatch = useDispatch();

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {animals?.map((animal) => (
        <Link to={"animal/" + animal.id} key={animal.id}>
          <div className="rounded-2xl bg-stone-200 p-2">
            <div className="cols-span-1 p-2 border cursor-pointer rounded-xl bg-stone-100">
              <h2 className="font-bold">{animal.name}</h2>
              <div>
                <img
                  src={animal.imageUrl}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://i.guim.co.uk/img/media/4dbf7990b7967e4873195d8720c61f7008e5f3b4/0_274_4096_2458/master/4096.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e13eb4039af0ff5d4a77d38ad39d61a7";
                  }}
                  alt={animal.name}
                  className="w-full h-56 object-cover"
                />
              </div>
              <p className="text-sm">{animal.shortDescription}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
