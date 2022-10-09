import { useForm } from "react-hook-form";
/* function ToDoList() {
  const [toDO, setTodo] = useState("");
  const [value, setValue] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDO.length < 8) {
      return setToDoError("To do Should be longer");
    }
  };

  const onValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onValueSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDO} placeholder="Write a to do" />
        <button>Add</button>
      </form>
      {toDoError !== "" ? toDoError : null}
    </div>
  );
} */

interface IFormData {
  errors: {
    email: {
      message: string;
    };
  };
  email: string;
  firstName: string;
  lastName?: string;
  userName: string;
  passWord: string;
  passWord1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IFormData) => {
    if (data.passWord !== data.passWord1) {
      setError(
        "passWord1",
        { message: "Password are not the same." },
        { shouldFocus: true }
      );
    }
    //setError("extraError", { message: "Server offline" });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com/,
              message: "Only naver.com emails Valid",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("firstName", {
            required: "Write here",
            validate: (value) =>
              value.includes("pru") ? "no pru allowed" : "yea",
          })}
          placeholder="FirstName"
        />
        <span>{errors.firstName?.message}</span>
        <input
          {...register("lastName", { required: "Write here" })}
          placeholder="LastName"
        />
        <span>{errors.lastName?.message}</span>
        <input
          {...register("userName", { required: "Write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors.userName?.message}</span>
        <input
          {...register("passWord", {
            required: "Write here",
            minLength: {
              value: 8,
              message: "too short",
            },
          })}
          placeholder="Password"
        />
        <span>{errors.passWord?.message}</span>
        <input
          {...register("passWord1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your Password is too short",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors.passWord1?.message}</span>
        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
