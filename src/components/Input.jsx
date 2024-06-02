/* eslint-disable react/prop-types */
function Input({ value, name, type, onchange }) {
  return (
    <>
      <input value={value} name={name} type={type} onChange={onchange}></input>
    </>
  );
}

export { Input };
