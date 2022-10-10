import React, { useEffect, useRef } from "react";
import "../App.css";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ input, setInput, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="enter an item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
        ref={inputRef}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default InputField;
