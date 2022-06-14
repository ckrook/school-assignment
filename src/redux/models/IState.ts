import IAnimal from "../../models/IAnimal";

export interface IState {
  animal: IValue;
}

interface IValue {
  value: IAnimal[];
}
