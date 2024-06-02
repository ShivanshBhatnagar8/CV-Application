/* eslint-disable react/prop-types */
import { Input } from "./Input";

function GeneralSection({ fields, onChange }) {
  return (
    <>
      <div className="general-section">
        <h2>General Information</h2>
        <form>
          {fields.map((element) => (
            <div key={element.Id} className="input-container">
              <label>{element.name}</label>
              {element.name === "Description" ? (
                <>
                  <textarea
                    value={element.value}
                    onChange={(e) => onChange(element.name, e.target.value)}
                    name={element.name}
                    type={element.type}
                    maxLength={255}
                  ></textarea>
                </>
              ) : (
                <>
                  <Input
                    value={element.value}
                    onchange={(e) => onChange(element.name, e.target.value)}
                    name={element.name}
                    type={element.type}
                  />
                </>
              )}
            </div>
          ))}
          ;
        </form>
      </div>
    </>
  );
}
export default GeneralSection;
