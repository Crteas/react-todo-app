import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
} from "./atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [cusCategories, setCusCategories] = useRecoilState(customCategoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const { register, handleSubmit, setValue, getValues } = useForm();

  console.log(category);

  const onSub = () => {
    const addItem = getValues("customCategory");
    setCusCategories([...cusCategories, addItem]);
    setValue("customCategory", "");
  };

  //toDos.map이 ToDo를 그려줌

  return (
    <div>
      <h1>To Do</h1>
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {cusCategories.map((item) => (
            <option key={item + Date.now()} value={item}>
              {item}
            </option>
          ))}
        </select>
      </form>
      <form onSubmit={handleSubmit(onSub)}>
        <input
          {...register("customCategory")}
          placeholder="추가할 카테고리를 입력"
        />
        <button>Add</button>
      </form>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
