import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
interface IFormData {
  toDo: string;
}
interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  //아래 두개를 합친게 위에 useRocilState임
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IFormData>({});
  const onValid = ({ toDo }: IFormData) => {
    console.log("add to Do", toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "할 일이 비어있습니다.",
          })}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
